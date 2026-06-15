(() => {
  "use strict";

  function clean(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  async function shouldStop() {
    try {
      const res = await chrome.runtime.sendMessage({type:"SS_GET_STOP"});
      return Boolean(res?.stop);
    } catch {
      return false;
    }
  }

  function detectStopCondition() {
    const pageText = clean(document.body?.innerText || "").toLowerCase();
    const flags = ["captcha", "verify you are human", "unusual traffic", "rate limit", "too many requests", "sign in", "login expired"];
    const hit = flags.find(flag => pageText.includes(flag));
    return hit ? { stop: true, reason: hit } : { stop: false, reason: "" };
  }

  function numberFrom(text) {
    if (!text) return 0;
    const m = String(text).match(/([\d,.]+)\s*([kKmM])?/);
    if (!m) return 0;
    let n = Number(m[1].replace(/,/g, ""));
    if (!Number.isFinite(n)) return 0;
    if (m[2] && m[2].toLowerCase() === "k") n *= 1000;
    if (m[2] && m[2].toLowerCase() === "m") n *= 1000000;
    return Math.round(n);
  }

  function extractMetricsFromText(text) {
    const out = {};
    const lower = text.toLowerCase();
    const price = text.match(/\$\s*([\d,.]+)/);
    if (price) out.price = Number(price[1].replace(/,/g, ""));
    const orders = lower.match(/([\d,.]+\s*[kKmM]?)\s*(orders|sold|sales|units)/);
    if (orders) out.orders = numberFrom(orders[1]);
    const revenue = text.match(/\$\s*([\d,.]+\s*[kKmM]?)\s*(revenue|gmv|sales)/i);
    if (revenue) out.revenue = numberFrom(revenue[1]);
    const views = lower.match(/([\d,.]+\s*[kKmM]?)\s*(views|view)/);
    if (views) out.views = numberFrom(views[1]);
    const creators = lower.match(/([\d,.]+\s*[kKmM]?)\s*(creators|creator)/);
    if (creators) out.creator_count = numberFrom(creators[1]);
    const shops = lower.match(/([\d,.]+\s*[kKmM]?)\s*(shops|sellers|stores)/);
    if (shops) out.shop_count = numberFrom(shops[1]);
    const videos = lower.match(/([\d,.]+\s*[kKmM]?)\s*(videos|video)/);
    if (videos) out.video_count = numberFrom(videos[1]);
    return out;
  }

  function collectTables() {
    const rows = [];
    document.querySelectorAll("table").forEach((table, tableIndex) => {
      const headers = [...table.querySelectorAll("thead th")].map(th => clean(th.innerText).toLowerCase().replace(/\s+/g, "_"));
      table.querySelectorAll("tbody tr").forEach((tr, rowIndex) => {
        const cells = [...tr.querySelectorAll("td")].map(td => clean(td.innerText));
        if (!cells.some(Boolean)) return;
        const row = {};
        cells.forEach((cell, i) => row[headers[i] || `col_${i+1}`] = cell);
        row.source_url = location.href;
        row.source_type = "visible_table";
        row.table_index = tableIndex;
        row.row_index = rowIndex;
        row.captured_at = new Date().toISOString();
        const link = tr.querySelector("a[href]");
        if (link) row.product_url = link.href;
        const img = tr.querySelector("img[src]");
        if (img) row.image_url = img.src;
        rows.push(row);
      });
    });
    return rows;
  }

  function collectCards() {
    const rows = [];
    const candidates = [...document.querySelectorAll("article, [class*='card'], [class*='product'], [data-testid*='product']")];
    candidates.slice(0, 300).forEach((card, index) => {
      const text = clean(card.innerText);
      if (text.length < 25) return;
      const link = card.querySelector("a[href]");
      const img = card.querySelector("img[src]");
      rows.push({
        product_name: clean(card.querySelector("h1,h2,h3,[class*='title'],[class*='name']")?.innerText) || text.slice(0, 90),
        raw_visible_text: text,
        ...extractMetricsFromText(text),
        product_url: link?.href || "",
        image_url: img?.src || "",
        source_url: location.href,
        source_type: "visible_card",
        card_index: index,
        captured_at: new Date().toISOString()
      });
    });
    return rows;
  }

  function dedupe(rows) {
    const seen = new Set();
    return rows.filter(row => {
      const key = JSON.stringify([row.product_url, row.product_name, row.raw_visible_text, row.row_index]);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function collectVisible(jobLabel = "") {
    const stop = detectStopCondition();
    if (stop.stop) return [{
      source_url: location.href,
      source_type: "STOP_CONDITION",
      stop_reason: stop.reason,
      job_label: jobLabel,
      captured_at: new Date().toISOString()
    }];
    return dedupe([...collectTables(), ...collectCards()]).map(row => ({...row, job_label: jobLabel}));
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function findNextButton() {
    const selectors = [
      "button[aria-label*='Next' i]",
      "a[aria-label*='Next' i]",
      "button[title*='Next' i]",
      "a[title*='Next' i]",
      ".next",
      "[class*='pagination'] button:last-child",
      "[class*='pagination'] a:last-child"
    ];
    for (const s of selectors) {
      const found = document.querySelector(s);
      if (found) return found;
    }
    return [...document.querySelectorAll("button,a")].find(el => /next|›|»/i.test(clean(el.innerText)));
  }

  async function runPages({nextSelector, maxPages, delayMs, jobLabel}) {
    let all = [];
    maxPages = Math.min(Number(maxPages || 1), 25);
    delayMs = Math.max(Number(delayMs || 5000), 3000);

    for (let page = 1; page <= maxPages; page++) {
      if (await shouldStop()) {
        all.push({ source_url: location.href, source_type: "EMERGENCY_STOP", runner_page: page, job_label: jobLabel || "", captured_at: new Date().toISOString() });
        break;
      }

      const stop = detectStopCondition();
      if (stop.stop) {
        all.push({ source_url: location.href, source_type: "STOP_CONDITION", stop_reason: stop.reason, runner_page: page, job_label: jobLabel || "", captured_at: new Date().toISOString() });
        break;
      }

      all.push(...collectVisible(jobLabel).map(row => ({...row, runner_page: page})));
      const next = nextSelector ? document.querySelector(nextSelector) : findNextButton();
      if (!next || next.disabled || next.getAttribute("aria-disabled") === "true") break;
      next.click();
      await wait(delayMs);
    }

    return dedupe(all);
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SS_PING") {
      sendResponse({ok:true, href: location.href});
      return true;
    }

    if (message.type === "SS_COLLECT_VISIBLE") {
      const rows = collectVisible(message.jobLabel || "");
      sendResponse({rows, sourceUrl: location.href});
      return true;
    }

    if (message.type === "SS_RUN_PAGES") {
      runPages(message).then(rows => sendResponse({rows, sourceUrl: location.href}));
      return true;
    }
  });
})();
