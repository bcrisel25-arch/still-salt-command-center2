(() => {
  "use strict";

  function isStillSaltAppPage() {
    return Boolean(
      document.querySelector("#app")?.dataset?.state !== undefined ||
      document.querySelector("#stillSaltOrb") ||
      document.title.toLowerCase().includes("still salt command center") ||
      document.body?.innerText?.includes("STILL SALT COMMAND CENTER")
    );
  }

  if (!isStillSaltAppPage()) return;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SS_RUNNER_STATUS") {
      window.postMessage({
        type: "STILL_SALT_RUNNER_STATUS",
        message: message.message,
        level: message.level || "info"
      }, "*");
      sendResponse({ok:true});
      return true;
    }

    if (message.type === "SS_IMPORT_ROWS_TO_APP") {
      window.postMessage({
        type: "STILL_SALT_IMPORT_PRODUCTS",
        rows: message.rows || [],
        meta: message.meta || {}
      }, "*");
      sendResponse({ok:true});
      return true;
    }
  });

  window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    const msg = event.data || {};

    if (msg.type === "STILL_SALT_RUN_PRODUCT_SCAN") {
      chrome.runtime.sendMessage({
        type: "SS_START_SCAN",
        config: msg.config || {}
      });
      return;
    }

    if (msg.type === "STILL_SALT_STOP_PRODUCT_SCAN") {
      chrome.runtime.sendMessage({ type: "SS_STOP_SCAN" });
      return;
    }
  });

  window.postMessage({
    type: "STILL_SALT_RUNNER_STATUS",
    message: "Chrome extension bridge connected. Ready for one-button scan.",
    level: "info"
  }, "*");
})();
