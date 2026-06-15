let stopRequested = false;
let lastNonAppTabId = null;

chrome.tabs.onActivated.addListener(async ({tabId}) => {
  try {
    const tab = await chrome.tabs.get(tabId);
    const title = (tab.title || "").toLowerCase();
    const url = (tab.url || "").toLowerCase();
    const isApp = title.includes("still salt command center") || url.includes("still_salt");
    if (!isApp && !url.startsWith("chrome://") && !url.startsWith("chrome-extension://")) {
      lastNonAppTabId = tabId;
      await chrome.storage.local.set({stillSaltLastResearchTabId: tabId});
    }
  } catch {}
});


async function sendStatus(message, level = "info") {
  const appTab = await findAppTab();
  if (!appTab?.id) return;
  try {
    await chrome.tabs.sendMessage(appTab.id, {type:"SS_RUNNER_STATUS", message, level});
  } catch (err) {
    // App bridge may not be ready. Ignore.
  }
}

async function sendRowsToApp(rows, meta = {}) {
  const appTab = await findAppTab();
  if (!appTab?.id) throw new Error("Still Salt app tab not found.");
  await chrome.tabs.sendMessage(appTab.id, {type:"SS_IMPORT_ROWS_TO_APP", rows, meta});
}

async function findAppTab() {
  const tabs = await chrome.tabs.query({});
  return tabs.find(tab =>
    (tab.title || "").toLowerCase().includes("still salt command center") ||
    (tab.url || "").includes("still_salt")
  );
}

async function findResearchTab(urlHint = "") {
  const tabs = await chrome.tabs.query({});
  const hint = String(urlHint || "").toLowerCase().trim();

  const stored = await chrome.storage.local.get(["stillSaltLastResearchTabId"]);
  const storedTab = stored.stillSaltLastResearchTabId ? tabs.find(tab => tab.id === stored.stillSaltLastResearchTabId) : null;
  if (storedTab) {
    const storedUrl = (storedTab.url || "").toLowerCase();
    const storedTitle = (storedTab.title || "").toLowerCase();
    const storedIsApp = storedTitle.includes("still salt command center") || storedUrl.includes("still_salt");
    if (!storedIsApp && !storedUrl.startsWith("chrome://") && !storedUrl.startsWith("chrome-extension://")) return storedTab;
  }

  const candidates = tabs.filter(tab => {
    const url = (tab.url || "").toLowerCase();
    const title = (tab.title || "").toLowerCase();
    if (!url || url.startsWith("chrome://") || url.startsWith("chrome-extension://")) return false;
    if (title.includes("still salt command center")) return false;
    if (url.includes("still_salt")) return false;
    return true;
  });

  if (hint) {
    const hit = candidates.find(tab => (tab.url || "").toLowerCase().includes(hint) || (tab.title || "").toLowerCase().includes(hint));
    if (hit) return hit;
  }

  const likely = candidates.find(tab => {
    const combined = `${tab.url || ""} ${tab.title || ""}`.toLowerCase();
    return /kalodata|hatfuls|tiktok|seller|shop|product|analytics|research/.test(combined);
  });

  return likely || candidates[candidates.length - 1];
}

async function injectCollector(tabId) {
  try {
    await chrome.tabs.sendMessage(tabId, {type:"SS_PING"});
  } catch (err) {
    await chrome.scripting.executeScript({target:{tabId}, files:["content.js"]});
  }
}

async function runScan(config = {}) {
  stopRequested = false;
  await chrome.storage.local.set({stillSaltStopRequested:false});

  const appTab = await findAppTab();
  if (!appTab?.id) {
    throw new Error("Still Salt app tab not found. Keep the app open.");
  }

  const researchTab = await findResearchTab(config.urlHint || "");
  if (!researchTab?.id) {
    throw new Error("Research tab not found. Open the product research page first.");
  }

  await sendStatus(`Runner starting on: ${researchTab.title || researchTab.url}`);
  await chrome.tabs.update(researchTab.id, {active:true});
  await injectCollector(researchTab.id);

  const response = await chrome.tabs.sendMessage(researchTab.id, {
    type: "SS_RUN_PAGES",
    jobLabel: config.jobLabel || "",
    nextSelector: config.nextSelector || "",
    maxPages: config.maxPages || 5,
    delayMs: config.delayMs || 5000
  });

  const rows = response?.rows || [];
  if (stopRequested) {
    await sendStatus(`Runner stopped. Returning ${rows.length} rows collected before stop.`);
  } else {
    await sendStatus(`Runner finished. Returning ${rows.length} rows to app.`);
  }

  await sendRowsToApp(rows, {
    jobLabel: config.jobLabel || "",
    sourceUrl: response?.sourceUrl || researchTab.url || "",
    sourceTabTitle: researchTab.title || "",
    runAt: new Date().toISOString()
  });

  await chrome.tabs.update(appTab.id, {active:true});
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SS_START_SCAN") {
    runScan(message.config || {}).catch(async err => {
      await sendStatus(err.message || String(err), "error");
    });
    sendResponse({ok:true});
    return true;
  }

  if (message.type === "SS_STOP_SCAN") {
    stopRequested = true;
    chrome.storage.local.set({stillSaltStopRequested:true});
    sendStatus("Emergency stop requested.", "error");
    sendResponse({ok:true});
    return true;
  }

  if (message.type === "SS_GET_STOP") {
    chrome.storage.local.get(["stillSaltStopRequested"]).then(data => {
      sendResponse({stop: Boolean(data.stillSaltStopRequested)});
    });
    return true;
  }
});
