// Still Salt Command Center Core Shell — Secure Gemini Backend Proxy
// Run with: node server.js
// Required Replit Secret / environment variable: GEMINI_API_KEY
// Optional: GEMINI_MODEL=gemini-2.0-flash

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 5000);
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8"
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(body);
}

function json(res, status, obj) {
  send(res, status, JSON.stringify(obj), "application/json; charset=utf-8");
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
      if (data.length > 2_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function buildSystemPrompt(payload) {
  const moodInstruction = payload.moodInstruction || "Balanced, useful, clear.";
  const memory = payload.memory || "No saved memory.";
  return [
    "You are Agent Still Salt inside Brandon's Still Salt Command Center.",
    "You are the operating brain for product research, Still Salt strategy, conversation, current info, sports/weather/news questions, and app workflow support.",
    "Tone/mood: " + moodInstruction,
    "Be useful, clear, and willing to be funny or dry sarcastic when that mood is chosen. Do not be cruel.",
    "When current information is requested, use Google Search grounding if available.",
    "When product decisions are discussed, think like a TikTok Shop product intelligence analyst.",
    "Saved user/app memory:",
    memory
  ].join("\n");
}

function buildUserPrompt(payload) {
  const prompt = payload.prompt || "";
  const recentChat = Array.isArray(payload.recentChat) ? payload.recentChat : [];
  const recent = recentChat.slice(-10).map(item => `${item.role}: ${item.content}`).join("\n");
  const context = payload.context || {};
  return [
    "Recent conversation:",
    recent || "None.",
    "",
    "App context:",
    JSON.stringify(context, null, 2),
    "",
    "User message:",
    prompt,
    "",
    "Instructions:",
    "- Answer naturally in the selected mood.",
    "- Keep it concise unless the user asks for detail.",
    "- For sports/weather/current events, rely on search grounding when available.",
    "- If live search cannot answer, say that clearly.",
    "- If the user asks for product scans/music/memory, the front-end may handle those local tools; respond with what happened or what to do next."
  ].join("\n");
}

function extractGeminiText(result) {
  const parts = result?.candidates?.[0]?.content?.parts || [];
  return parts.map(p => p.text || "").filter(Boolean).join("\n").trim();
}

function extractSources(result) {
  const chunks = result?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return chunks
    .map((chunk, index) => {
      if (!chunk.web) return null;
      return {
        index: index + 1,
        title: chunk.web.title || "Source",
        uri: chunk.web.uri || ""
      };
    })
    .filter(Boolean);
}

async function handleAgent(req, res) {
  if (!process.env.GEMINI_API_KEY) {
    return json(res, 500, {
      error: "GEMINI_API_KEY is missing. Add it to Replit Secrets or environment variables.",
      setup: "Set GEMINI_API_KEY in Replit Secrets, then restart the server."
    });
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(req) || "{}");
  } catch (err) {
    return json(res, 400, { error: "Invalid JSON body." });
  }

  const model = process.env.GEMINI_MODEL || payload.geminiModel || "gemini-2.0-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`;

  const body = {
    systemInstruction: {
      parts: [{ text: buildSystemPrompt(payload) }]
    },
    contents: [{
      role: "user",
      parts: [{ text: buildUserPrompt(payload) }]
    }],
    generationConfig: {
      temperature: payload?.mood === "dry_sarcastic" || payload?.mood === "funny" || payload?.mood === "bunny" ? 0.85 : 0.55,
      maxOutputTokens: 1400
    }
  };

  if (payload.useGoogleSearch !== false) {
    body.tools = [{ google_search: {} }];
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const text = await upstream.text();
    let result;
    try { result = JSON.parse(text); }
    catch {
      return json(res, 502, { error: "Gemini returned non-JSON response.", raw: text.slice(0, 500) });
    }

    if (!upstream.ok) {
      return json(res, upstream.status, {
        error: result?.error?.message || `Gemini request failed with ${upstream.status}`,
        details: result?.error || result
      });
    }

    return json(res, 200, {
      answer: extractGeminiText(result) || "Gemini returned no text.",
      sources: extractSources(result),
      model,
      grounded: Boolean(result?.candidates?.[0]?.groundingMetadata)
    });
  } catch (err) {
    return json(res, 500, { error: err.message || String(err) });
  }
}

function isInsideRoot(filePath) {
  const relative = path.relative(ROOT, filePath);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function serveStatic(req, res) {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!isInsideRoot(filePath)) return send(res, 403, "Forbidden");
  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, "Not found");
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, MIME[ext] || "application/octet-stream");
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store"
    });
    return res.end();
  }
  if (req.method === "POST" && req.url === "/api/agent") return handleAgent(req, res);
  if (req.method === "GET" && req.url === "/api/health") {
    return json(res, 200, {
      ok: true,
      geminiKeyLoaded: Boolean(process.env.GEMINI_API_KEY),
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash"
    });
  }
  if (req.method === "GET") return serveStatic(req, res);
  send(res, 405, "Method not allowed");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Still Salt Command Center Core Shell running on port ${PORT}`);
});
