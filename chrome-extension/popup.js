const statusEl = document.getElementById("status");

document.getElementById("emergencyStop").addEventListener("click", async () => {
  try {
    await chrome.runtime.sendMessage({type:"SS_STOP_SCAN"});
    statusEl.textContent = "Emergency stop sent.";
  } catch (err) {
    statusEl.textContent = "Error: " + (err?.message || err);
  }
});
