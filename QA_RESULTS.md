# QA Results — Still Salt Core Connected Shell

## Scope

This is a stripped connected shell, not the final visual design. The goal is to preserve working internal functions, reduce expectation confusion, keep one dashboard configuration, place the correct buttons on the correct page, and add the Results / Launchpad function.

## Build checks performed

| Check | Result |
|---|---|
| `node --check server.js` | PASS |
| `node --check app.js` | PASS |
| `node --check chrome-extension/background.js` | PASS |
| `node --check chrome-extension/content.js` | PASS |
| `node --check chrome-extension/app-bridge.js` | PASS |
| `node --check chrome-extension/popup.js` | PASS |
| `npm start` launches server | PASS |
| `/api/health` responds | PASS |
| `/` serves index.html | PASS |
| Required dashboard IDs exist | PASS |
| One dashboard configuration only | PASS |
| Results / Launchpad button added | PASS |
| Website launchpad directory added | PASS |
| Text command site opener added | PASS |
| Voice command site opener added, browser support dependent | PASS with browser dependency |
| TikTok Scan button sends extension command | CODE PASS, live browser extension install not verified here |
| Amazon Scan button sends extension command | CODE PASS, live browser extension install not verified here |
| Chrome extension visible-page scanner preserved | PASS |
| Secure Gemini backend preserved | PASS |
| Product scoring/import/export preserved in stripped form | PASS |

## Known unverified items

These require a real browser/Replit/extension/API-key environment:

- Real Gemini response through `/api/agent` with `GEMINI_API_KEY` loaded.
- Chrome extension install and live tab scan.
- Voice recognition opening websites; browser popup policies may require fallback click.
- Speech synthesis voice output quality.
- Final visual design match to generated images.

## Intentional design decision

The app has been reduced to a **single dashboard shell** with multiple states. The next build bot should not add alternate dashboards. It should reskin and animate this one shell.

## Safety rule preserved

Export/report-first. Visible-page second. Hidden-data never.

## Additional clean-build pass

| Check | Result |
|---|---|
| Stale `runProductScanBtn` bridge selector removed | PASS |
| Legacy `product_intelligence` app-detection references removed | PASS |
| Confusing orb placeholder language removed | PASS |
| Results mode hard rule added: orb docks aside but remains active | PASS |
| JavaScript `$()` ID references checked against HTML IDs | PASS |
| Duplicate HTML IDs checked | PASS |
| Server launched and `/api/health` tested after cleanup | PASS |
