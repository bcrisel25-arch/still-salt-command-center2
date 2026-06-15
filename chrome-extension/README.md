# Still Salt Command Center Runner Extension

This is the preserved visible-page scanner bridge.

- Popup is emergency stop only.
- App buttons send scan commands through `window.postMessage`.
- Background worker finds the last non-app research tab.
- Content script reads visible tables/cards only.
- Hidden APIs, cookies, tokens, devtools/network scraping, CAPTCHA bypass, and rate-limit bypass are not used.
