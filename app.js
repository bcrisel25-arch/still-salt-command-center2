(() => {
  "use strict";

  const STORE_KEY = "stillSaltCoreProductsV1";
  const SETTINGS_KEY = "stillSaltCoreSettingsV1";
  const CHAT_KEY = "stillSaltCoreChatV1";

  const siteDirectory = [
    { name: "ChatGPT", url: "https://chatgpt.com", group: "AI", aliases: ["chat gpt", "openai"] },
    { name: "Claude", url: "https://claude.ai", group: "AI", aliases: ["anthropic"] },
    { name: "Gemini", url: "https://gemini.google.com", group: "AI", aliases: ["google gemini", "bard"] },
    { name: "Grok", url: "https://grok.com", group: "AI", aliases: ["x ai", "xai"] },
    { name: "Perplexity", url: "https://www.perplexity.ai", group: "AI", aliases: ["perplexity ai"] },
    { name: "Ollama", url: "https://ollama.com", group: "AI", aliases: ["local ai"] },
    { name: "Cursor", url: "https://cursor.com", group: "AI / Code", aliases: ["cursor ai"] },
    { name: "Replit", url: "https://replit.com", group: "Build", aliases: ["repl it"] },
    { name: "GitHub", url: "https://github.com", group: "Build", aliases: ["git hub"] },
    { name: "Make", url: "https://www.make.com", group: "Automation", aliases: ["make.com", "integromat"] },
    { name: "Google", url: "https://www.google.com", group: "Google", aliases: ["search"] },
    { name: "Google Drive", url: "https://drive.google.com", group: "Google", aliases: ["drive"] },
    { name: "Google Sheets", url: "https://sheets.google.com", group: "Google", aliases: ["sheets", "spreadsheet"] },
    { name: "Google Docs", url: "https://docs.google.com", group: "Google", aliases: ["docs", "documents"] },
    { name: "Chrome Web Store", url: "https://chromewebstore.google.com", group: "Google", aliases: ["google extensions", "chrome extensions", "extensions"] },
    { name: "Gmail", url: "https://mail.google.com", group: "Google", aliases: ["email"] },
    { name: "Google Calendar", url: "https://calendar.google.com", group: "Google", aliases: ["calendar"] },
    { name: "YouTube", url: "https://www.youtube.com", group: "Content", aliases: ["you tube"] },
    { name: "Spotify", url: "https://open.spotify.com", group: "Content", aliases: ["music"] },
    { name: "Facebook", url: "https://www.facebook.com", group: "Social", aliases: ["meta"] },
    { name: "Meta Business Suite", url: "https://business.facebook.com", group: "Social", aliases: ["business suite", "meta business"] },
    { name: "Instagram", url: "https://www.instagram.com", group: "Social", aliases: ["insta"] },
    { name: "TikTok", url: "https://www.tiktok.com", group: "Social / Sales", aliases: ["tik tok"] },
    { name: "TikTok Shop Seller Center", url: "https://seller-us.tiktok.com", group: "Sales", aliases: ["tiktok seller", "seller center", "tiktok shop"] },
    { name: "X / Twitter", url: "https://x.com", group: "Social", aliases: ["twitter", "x"] },
    { name: "Pinterest", url: "https://www.pinterest.com", group: "Social", aliases: ["pin"] },
    { name: "Amazon", url: "https://www.amazon.com", group: "Marketplace", aliases: ["amazon.com"] },
    { name: "Amazon Seller Central", url: "https://sellercentral.amazon.com", group: "Marketplace", aliases: ["seller central"] },
    { name: "Etsy", url: "https://www.etsy.com", group: "Marketplace", aliases: ["etsy shop"] },
    { name: "eBay", url: "https://www.ebay.com", group: "Marketplace", aliases: ["ebay"] },
    { name: "OfferUp", url: "https://offerup.com", group: "Marketplace", aliases: ["offer up"] },
    { name: "Shopify", url: "https://www.shopify.com", group: "Store", aliases: ["shopify admin"] },
    { name: "Canva", url: "https://www.canva.com", group: "Design", aliases: ["design"] },
    { name: "CapCut", url: "https://www.capcut.com", group: "Video", aliases: ["cap cut"] },
    { name: "ElevenLabs", url: "https://elevenlabs.io", group: "Voice", aliases: ["eleven labs", "voice ai"] },
    { name: "Google Trends", url: "https://trends.google.com", group: "Research", aliases: ["trends"] },
    { name: "Google Ads", url: "https://ads.google.com", group: "Ads", aliases: ["ads"] },
    { name: "TikTok Creative Center", url: "https://ads.tiktok.com/business/creativecenter", group: "Research", aliases: ["creative center"] },
    { name: "Kalodata", url: "https://www.kalodata.com", group: "Product Data", aliases: ["kalo data", "kalodata"] },
    { name: "Hatfuls", url: "https://www.hatfuls.com", group: "Product Data", aliases: ["hat fulls", "hatful"] },
    { name: "Alibaba", url: "https://www.alibaba.com", group: "Sourcing", aliases: ["alibaba"] },
    { name: "AliExpress", url: "https://www.aliexpress.com", group: "Sourcing", aliases: ["ali express"] }
  ];

  const sampleRows = [
    { product_name:"Prayer Corner LED Acrylic Light", category:"Christian gifts", keyword:"prayer light", price:24.99, orders:720, revenue:17992, sales_7d:180, sales_30d:650, growth_rate:58, creator_count:18, active_creators:11, video_count:42, shop_count:8, views:310000, source_cost:7.8, shipping_days:8, rating:4.5, review_count:214, demo_score:9, brand_fit:9, supplier_url:"https://example.com/supplier/light" },
    { product_name:"Magnetic Scripture Bookmark Set", category:"Bible study", keyword:"bible tabs bookmark", price:14.99, orders:1850, revenue:27731, sales_7d:360, sales_30d:1210, growth_rate:32, creator_count:41, active_creators:19, video_count:96, shop_count:12, views:420000, source_cost:3.1, shipping_days:6, rating:4.7, review_count:680, demo_score:8, brand_fit:10, supplier_url:"https://example.com/supplier/bookmark" }
  ];

  let products = readJSON(STORE_KEY, []);
  let settings = readJSON(SETTINGS_KEY, { mood: "balanced", useGoogleSearch: true, memory: "" });
  let chat = readJSON(CHAT_KEY, []);
  let muted = false;
  let recognition = null;

  function $(id) { return document.getElementById(id); }
  function readJSON(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; } }
  function writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function number(value, fallback = 0) {
    if (value === null || value === undefined || value === "") return fallback;
    if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
    const cleaned = String(value).replace(/[$,%+,]/g, "").trim();
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : fallback;
  }
  function value(row, keys, fallback = "") {
    const normalized = Object.fromEntries(Object.entries(row || {}).map(([k, v]) => [k.toLowerCase().replace(/\s+/g, "_"), v]));
    for (const key of keys) {
      if (row[key] !== undefined && row[key] !== null && row[key] !== "") return row[key];
      const nk = key.toLowerCase().replace(/\s+/g, "_");
      if (normalized[nk] !== undefined && normalized[nk] !== null && normalized[nk] !== "") return normalized[nk];
    }
    return fallback;
  }
  function clamp(n, min = 0, max = 100) { return Math.max(min, Math.min(max, n)); }
  function setState(state) {
    $("app").dataset.state = state;
    $("stateBadge").textContent = state.toUpperCase().replaceAll("_", " ");
    ["tikTokScanBtn", "amazonScanBtn", "muteBtn", "resultsBtn"].forEach(id => $(id)?.classList.remove("active"));
    if (state === "scanning_tiktok") $("tikTokScanBtn").classList.add("active");
    if (state === "scanning_amazon") $("amazonScanBtn").classList.add("active");
    if (state === "incognito") $("muteBtn").classList.add("active");
  }

  async function runBootSequence() {
    const steps = [
      "Tiny Still Salt orb wake target activated.",
      "Entering blue/orange dashboard ecosystem hallway.",
      "Data panels, task cards, scan systems, updates, and map fragments passing by.",
      "Still Salt orb and dashboard approaching.",
      "Two-layer orb turns and locks into the dashboard like a key.",
      "Dashboard powers on like an Iron Man suit sequence.",
      "Welcome back, sir.",
      "Thank you for saving our world again. What would we do without you?",
      "Daily briefing online. Product scans ready."
    ];
    for (const step of steps) {
      $("bootStatus").textContent = step;
      await wait(1000);
    }
    $("bootScreen").classList.add("hidden");
    setState("idle");
    brief("Command Center active. Current task stack ready.");
  }
  function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  function openWorkspace(panel = "resultsPanel") {
    $("workspace").hidden = false;
    $("centerStage").classList.add("workspace-open");
    showPanel(panel);
    $("resultsBtn").classList.add("active");
    setSmallTalking("Workspace open. Orb moved aside and remains available.", true);
  }
  function closeWorkspace() {
    $("workspace").hidden = true;
    $("centerStage").classList.remove("workspace-open");
    setSmallTalking("", false);
    setState(muted ? "incognito" : "idle");
  }
  function showPanel(panelId) {
    document.querySelectorAll(".workspace-panel").forEach(p => p.classList.toggle("active", p.id === panelId));
    document.querySelectorAll(".workspace-tabs button").forEach(btn => btn.classList.toggle("active", btn.dataset.panel === panelId));
  }
  function setSmallTalking(text, show = true) {
    const box = $("smallTalkingBox");
    const txt = $("talkingText");
    txt.textContent = text || "";
    box.hidden = !show;
  }
  function brief(text) { $("dailyBriefing").textContent = text; }

  function normalizeRow(row) {
    const price = number(value(row, ["price", "sale_price", "selling_price"]));
    const sourceCost = number(value(row, ["source_cost", "supplier_cost", "cost"]));
    const orders = number(value(row, ["orders", "sales", "total_orders", "units_sold", "sold", "items_sold", "order_count"]));
    const revenue = number(value(row, ["revenue", "total_revenue", "gmv", "sales_amount", "gross_sales", "product_revenue"]));
    const views = number(value(row, ["views", "video_views", "total_views"]));
    return {
      id: value(row, ["id"], `p_${Date.now()}_${Math.random().toString(36).slice(2)}`),
      product_name: String(value(row, ["product_name", "name", "title", "product", "item_name", "product_title"], "Untitled Product")),
      product_url: String(value(row, ["product_url", "url", "listing_url", "product_link", "item_url", "detail_url"], "")),
      image_url: String(value(row, ["image_url", "image", "img", "thumbnail", "image_link", "product_image"], "")),
      category: String(value(row, ["category"], "Uncategorized")),
      keyword: String(value(row, ["keyword", "search_keyword", "search"], "")),
      price, orders, revenue, views,
      sales_7d: number(value(row, ["sales_7d", "orders_7d", "seven_day_sales"])),
      sales_30d: number(value(row, ["sales_30d", "orders_30d", "thirty_day_sales"])),
      growth_rate: number(value(row, ["growth_rate", "growth", "trend"])),
      creator_count: number(value(row, ["creator_count", "creators", "total_creators", "affiliate_creators", "creator_num"])),
      active_creators: number(value(row, ["active_creators", "active_creator_count"])),
      video_count: number(value(row, ["video_count", "videos", "total_videos", "video_num", "related_videos"])),
      shop_count: number(value(row, ["shop_count", "shops", "seller_count", "store_count", "seller_num", "shop_num"])),
      active_ads: number(value(row, ["active_ads", "ad_count", "ads"])),
      source_cost: sourceCost,
      shipping_days: number(value(row, ["shipping_days", "shipping_time", "ship_days"])),
      supplier_url: String(value(row, ["supplier_url", "supplier", "source_url"], "")),
      rating: number(value(row, ["rating", "stars"])),
      review_count: number(value(row, ["review_count", "reviews"])),
      return_risk: number(value(row, ["return_risk", "refund_risk", "complaint_risk"])),
      top_creator_share: number(value(row, ["top_creator_share", "creator_concentration"])),
      top_shop_share: number(value(row, ["top_shop_share", "shop_concentration"])),
      demo_score: number(value(row, ["demo_score", "visual_score"], 5)),
      brand_fit: number(value(row, ["brand_fit", "faith_fit"], 5)),
      source_url: String(value(row, ["source_url"], "")),
      raw: row
    };
  }
  function scoreProduct(p) {
    const margin = p.price > 0 ? ((p.price - p.source_cost) / p.price) * 100 : 0;
    const demand = clamp((Math.log10(p.orders + 1) * 22) + (Math.log10(p.revenue + 1) * 8));
    const spread = clamp((p.creator_count * 2) + (p.active_creators * 2.3) + (p.shop_count * 3.2) + (p.video_count * .35));
    const conversionProxy = p.views ? (p.orders / p.views) * 100 : 0;
    const conversion = clamp((conversionProxy * 12) + (p.orders / Math.max(1, p.video_count)) * .55);
    const velocity = clamp((p.growth_rate * 1.15) + (p.sales_7d / Math.max(1, p.sales_30d || 1)) * 40 + Math.log10(p.sales_7d + 1) * 12);
    const sourceability = clamp((margin * 1.25) + (p.shipping_days ? Math.max(0, 30 - p.shipping_days) * 1.4 : 10) - (p.return_risk * 2));
    const ads = clamp(85 - Math.max(0, p.active_ads - 8) * 2.2);
    const demo = clamp((p.demo_score * 7) + (p.brand_fit * 3));
    const weighted = (demand*.18) + (spread*.17) + (conversion*.18) + (velocity*.15) + (sourceability*.17) + (ads*.10) + (demo*.05);
    const blockers = blockersFor(p, margin);
    const score = Math.round(weighted);
    let status = "WATCHLIST";
    if (score >= 78 && blockers.length <= 1) status = "SELL NOW";
    else if (score >= 60 && blockers.length <= 3) status = "RESEARCH DEEPER";
    if (blockers.length >= 4 || score < 40) status = "REJECT";
    return { score, status, margin: Math.round(margin), blockers };
  }
  function blockersFor(p, margin) {
    const b = [];
    if (!p.supplier_url) b.push("Missing supplier URL");
    if (!p.source_cost || p.source_cost <= 0) b.push("Missing source cost");
    if (!p.price || p.price <= 0) b.push("Missing sale price");
    if (margin < 35) b.push("Margin under 35%");
    if (p.shipping_days > 12) b.push("Shipping over 12 days");
    if (p.rating && p.rating < 4.1) b.push("Rating under 4.1");
    if (p.top_creator_share >= 70) b.push("Top creator concentration over 70%");
    if (p.top_shop_share >= 70) b.push("Top shop concentration over 70%");
    if (p.active_ads > 25 && p.views && p.orders / p.views < .01) b.push("Heavy ads with weak conversion");
    return b;
  }
  function importRows(rows, append = true) {
    const normalized = rows.map(normalizeRow);
    products = append ? [...products, ...normalized] : normalized;
    products = dedupeProducts(products);
    saveProducts();
    renderProducts();
    openWorkspace("resultsPanel");
    brief(`${normalized.length} new rows imported. ${products.length} total products on board.`);
  }
  function dedupeProducts(rows) {
    const seen = new Set();
    return rows.filter(p => {
      const key = `${p.product_url || ""}|${p.product_name || ""}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  function saveProducts() { writeJSON(STORE_KEY, products); }
  function renderProducts() {
    const board = $("productBoard");
    const scored = products.map(p => ({ p, s: scoreProduct(p) }));
    const sellNow = scored.filter(x => x.s.status === "SELL NOW").length;
    $("metricProducts").textContent = products.length;
    $("metricSellNow").textContent = sellNow;
    $("resultsSummary").textContent = products.length ? `${products.length} products loaded. ${sellNow} sell-now candidates. Results button opens this center workspace.` : "No product data loaded yet.";
    if (!products.length) { board.innerHTML = ""; return; }
    board.innerHTML = scored.map(({p, s}) => `
      <article class="product-card">
        <h3>${escapeHTML(p.product_name)}</h3>
        <div class="meta">${escapeHTML(p.category)} · ${escapeHTML(p.keyword || "no keyword")} · Orders: ${p.orders || 0} · Revenue: $${Math.round(p.revenue || 0).toLocaleString()}</div>
        <div class="score">Score ${s.score}/100 · ${s.status} · Margin ${s.margin}%</div>
        <div class="meta">Blockers: ${s.blockers.length ? s.blockers.map(escapeHTML).join("; ") : "None detected"}</div>
      </article>`).join("");
  }
  function escapeHTML(str) { return String(str ?? "").replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch])); }

  function parseInput(text) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed : (Array.isArray(parsed.rows) ? parsed.rows : [parsed]);
    }
    return parseCSV(trimmed);
  }
  function parseCSV(text) {
    const rows = [];
    const table = [];
    let cell = "", row = [], inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const next = text[i + 1];
      if (ch === '"' && inQuotes && next === '"') { cell += '"'; i++; continue; }
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === "," && !inQuotes) { row.push(cell); cell = ""; continue; }
      if ((ch === "\n" || ch === "\r") && !inQuotes) {
        if (ch === "\r" && next === "\n") i++;
        row.push(cell); table.push(row); row = []; cell = ""; continue;
      }
      cell += ch;
    }
    row.push(cell); table.push(row);
    const headers = (table.shift() || []).map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
    table.forEach(r => {
      const obj = {};
      headers.forEach((h, i) => obj[h || `col_${i+1}`] = r[i] || "");
      if (Object.values(obj).some(Boolean)) rows.push(obj);
    });
    return rows;
  }
  function exportFile(name, content, type) {
    const blob = new Blob([content], { type });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  function toCSV(rows) {
    const keys = Array.from(new Set(rows.flatMap(row => Object.keys(row).filter(k => k !== "raw"))));
    const esc = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
    return [keys.join(","), ...rows.map(row => keys.map(k => esc(row[k])).join(","))].join("\n");
  }

  async function askAgent(promptOverride = "") {
    const prompt = (promptOverride || $("agentPrompt").value || "").trim();
    if (!prompt) return;
    const siteMatch = findSiteFromCommand(prompt);
    if (siteMatch && /\b(open|launch|go to|pull up|bring up)\b/i.test(prompt)) {
      openSite(siteMatch, true);
      return;
    }
    setState("talking");
    setSmallTalking("Still Salt is thinking...", true);
    addChat("user", prompt);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          mood: settings.mood || "balanced",
          moodInstruction: moodInstruction(settings.mood || "balanced"),
          memory: settings.memory || "",
          useGoogleSearch: settings.useGoogleSearch !== false,
          recentChat: chat.slice(-10),
          context: { productCount: products.length, topProducts: products.slice(0, 5).map(p => ({ name: p.product_name, score: scoreProduct(p).score })) }
        })
      });
      const data = await res.json().catch(() => ({}));
      const answer = data.answer || data.error || "No answer returned.";
      addChat("assistant", answer);
      setSmallTalking(answer.slice(0, 170), true);
      if (!muted) speak(answer);
    } catch (err) {
      addChat("assistant", `Backend error: ${err.message || err}`);
      setSmallTalking("Backend error. Check /api/health and GEMINI_API_KEY.", true);
    } finally {
      setTimeout(() => setState(muted ? "incognito" : "idle"), 1200);
    }
  }
  function moodInstruction(mood) {
    const map = {
      balanced: "Balanced, useful, clear.",
      funny: "Funny, punchy, but still useful.",
      dry_sarcastic: "Dry sarcastic, blunt, but not cruel.",
      sour: "Sour and irritated in a playful way, still helpful.",
      bunny: "Odd, playful, hyper, mascot-like, still helpful.",
      direct: "Direct, tactical, minimal fluff."
    };
    return map[mood] || map.balanced;
  }
  function addChat(role, content) {
    chat.push({ role, content, at: new Date().toISOString() });
    chat = chat.slice(-80);
    writeJSON(CHAT_KEY, chat);
    renderChat();
  }
  function renderChat() {
    const log = $("agentChatLog");
    log.innerHTML = chat.map(m => `<div class="chat-msg ${m.role === "user" ? "user" : "assistant"}"><strong>${m.role === "user" ? "You" : "Still Salt"}</strong>\n${escapeHTML(m.content)}</div>`).join("");
    log.scrollTop = log.scrollHeight;
  }
  function speak(text) {
    if (muted || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(text).slice(0, 900));
    utterance.rate = 1.02;
    utterance.pitch = .92;
    utterance.onstart = () => { setState("talking"); setSmallTalking(String(text).slice(0, 170), true); };
    utterance.onend = () => { setState("idle"); };
    window.speechSynthesis.speak(utterance);
  }

  function startVoice(kind) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      const msg = "Speech recognition is not available in this browser. Type the command instead.";
      kind === "site" ? setLauncherStatus(msg) : addChat("assistant", msg);
      return;
    }
    recognition?.abort?.();
    recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      const phrase = event.results?.[0]?.[0]?.transcript || "";
      if (kind === "site") {
        $("siteCommandInput").value = phrase;
        handleSiteCommand(phrase);
      } else {
        $("agentPrompt").value = phrase;
        askAgent(phrase);
      }
    };
    recognition.onerror = event => {
      const msg = `Voice error: ${event.error || "unknown"}`;
      kind === "site" ? setLauncherStatus(msg) : addChat("assistant", msg);
    };
    recognition.start();
  }

  function renderWebsiteGrid() {
    const grid = $("websiteGrid");
    grid.innerHTML = siteDirectory.map(site => `<a class="site-link" href="${site.url}" target="_blank" rel="noopener noreferrer" data-site="${escapeHTML(site.name)}"><strong>${escapeHTML(site.name)}</strong><small>${escapeHTML(site.group)} · ${escapeHTML(site.url)}</small></a>`).join("");
  }
  function findSiteFromCommand(command) {
    const cleaned = String(command || "").toLowerCase().replace(/\b(open|launch|go to|pull up|bring up|start|website|site|please|the)\b/g, " ").replace(/\s+/g, " ").trim();
    if (!cleaned) return null;
    return siteDirectory.find(site => {
      const names = [site.name, ...(site.aliases || [])].map(x => x.toLowerCase());
      return names.some(name => cleaned === name || cleaned.includes(name) || name.includes(cleaned));
    });
  }
  function handleSiteCommand(command) {
    const site = findSiteFromCommand(command);
    if (!site) {
      setLauncherStatus(`No matching site found for: ${command}. Try “open ChatGPT” or click a tile.`);
      return;
    }
    openSite(site, true);
  }
  function openSite(site, fromCommand = false) {
    const win = window.open(site.url, "_blank", "noopener,noreferrer");
    const fallback = `<a href="${site.url}" target="_blank" rel="noopener noreferrer">Click here to open ${escapeHTML(site.name)}</a>`;
    setLauncherStatus(`${fromCommand ? "Command matched" : "Opening"}: ${site.name}. ${win ? "Opened in a new tab." : "Popup blocked. " + fallback}`);
    setSmallTalking(`Opening ${site.name}.`, true);
  }
  function setLauncherStatus(html) { $("launcherStatus").innerHTML = html; }

  function runProductScan(kind) {
    const isTikTok = kind === "tiktok";
    setState(isTikTok ? "scanning_tiktok" : "scanning_amazon");
    $("runnerStatus").textContent = `${isTikTok ? "TikTok" : "Amazon"} scan requested. Keep target research page open.`;
    openWorkspace("resultsPanel");
    const config = {
      jobLabel: isTikTok ? "TikTok Product Scan" : "Amazon Product Scan",
      urlHint: isTikTok ? "tiktok" : "amazon",
      maxPages: 5,
      delayMs: 5000
    };
    window.postMessage({ type: "STILL_SALT_RUN_PRODUCT_SCAN", config }, "*");
    setSmallTalking(`${config.jobLabel} sent to extension bridge.`, true);
  }

  async function testBackend() {
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      $("backendBadge").textContent = data.geminiKeyLoaded ? "BACKEND READY" : "BACKEND ONLINE / KEY MISSING";
      $("backendBadge").classList.toggle("ghost", !data.geminiKeyLoaded);
    } catch {
      $("backendBadge").textContent = "BACKEND OFFLINE";
      $("backendBadge").classList.add("ghost");
    }
  }
  async function sendResultsToMake() {
    const url = settings.makeWebhookUrl || "";
    if (!url) { $("resultsSummary").textContent = "Make webhook missing. Add it in Settings."; return; }
    try {
      const payload = { sentAt: new Date().toISOString(), products: products.map(p => ({...p, scoring: scoreProduct(p)})) };
      await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), mode: "no-cors" });
      $("resultsSummary").textContent = "Results sent to Make webhook. no-cors mode cannot confirm response body.";
    } catch (err) {
      $("resultsSummary").textContent = `Make send failed: ${err.message || err}`;
    }
  }

  function bindEvents() {
    $("bootOrbWakeBtn").addEventListener("click", runBootSequence);
    $("resultsBtn").addEventListener("click", () => openWorkspace("resultsPanel"));
    $("minimizeWorkspaceBtn").addEventListener("click", closeWorkspace);
    document.querySelectorAll(".workspace-tabs button").forEach(btn => btn.addEventListener("click", () => showPanel(btn.dataset.panel)));
    $("tikTokScanBtn").addEventListener("click", () => runProductScan("tiktok"));
    $("amazonScanBtn").addEventListener("click", () => runProductScan("amazon"));
    $("muteBtn").addEventListener("click", () => {
      muted = !muted;
      if (muted) { window.speechSynthesis?.cancel?.(); setState("incognito"); openWorkspace("agentPanel"); setSmallTalking("Silent incognito mode. Voice disabled.", true); }
      else { setState("idle"); setSmallTalking("Voice restored.", true); }
    });
    $("openSiteCommandBtn").addEventListener("click", () => handleSiteCommand($("siteCommandInput").value));
    $("voiceSiteCommandBtn").addEventListener("click", () => startVoice("site"));
    $("askAgentBtn").addEventListener("click", () => askAgent());
    $("voiceAgentBtn").addEventListener("click", () => startVoice("agent"));
    $("clearAgentBtn").addEventListener("click", () => { chat = []; writeJSON(CHAT_KEY, chat); renderChat(); });
    $("parseReplaceBtn").addEventListener("click", () => importRows(parseInput($("rawInput").value), false));
    $("parseAppendBtn").addEventListener("click", () => importRows(parseInput($("rawInput").value), true));
    $("loadSampleBtn").addEventListener("click", () => importRows(sampleRows, true));
    $("exportJsonBtn").addEventListener("click", () => exportFile("still_salt_results.json", JSON.stringify(products.map(p => ({...p, scoring: scoreProduct(p)})), null, 2), "application/json"));
    $("exportCsvBtn").addEventListener("click", () => exportFile("still_salt_results.csv", toCSV(products.map(p => ({...p, scoring_status: scoreProduct(p).status, score: scoreProduct(p).score}))), "text/csv"));
    $("sendMakeBtn").addEventListener("click", sendResultsToMake);
    $("clearResultsBtn").addEventListener("click", () => { products = []; saveProducts(); renderProducts(); });
    $("saveSettingsBtn").addEventListener("click", () => {
      settings = {
        makeWebhookUrl: $("makeWebhookUrl").value.trim(),
        mood: $("agentMood").value,
        useGoogleSearch: $("useGoogleSearch").checked,
        memory: $("agentMemory").value.trim()
      };
      writeJSON(SETTINGS_KEY, settings);
      $("settingsStatus").textContent = "Settings saved.";
    });

    window.addEventListener("message", event => {
      if (event.source !== window) return;
      const msg = event.data || {};
      if (msg.type === "STILL_SALT_RUNNER_STATUS") {
        $("extensionBadge").textContent = "EXTENSION CONNECTED";
        $("extensionBadge").classList.remove("ghost");
        $("runnerStatus").textContent = msg.message || "Runner status update.";
        setSmallTalking(msg.message || "Runner status update.", true);
      }
      if (msg.type === "STILL_SALT_IMPORT_PRODUCTS") {
        $("extensionBadge").textContent = "EXTENSION IMPORTED";
        $("extensionBadge").classList.remove("ghost");
        importRows(msg.rows || [], true);
      }
    });
  }

  function initSettings() {
    $("makeWebhookUrl").value = settings.makeWebhookUrl || "";
    $("agentMood").value = settings.mood || "balanced";
    $("useGoogleSearch").checked = settings.useGoogleSearch !== false;
    $("agentMemory").value = settings.memory || "";
  }

  function init() {
    bindEvents();
    initSettings();
    renderWebsiteGrid();
    renderProducts();
    renderChat();
    testBackend();
    setState("idle");
  }

  init();
})();
