# No-Design Function Core QA Results

## Latest update

The rejected old activation symbol direction was removed. Boot now starts from a tiny centered Still Salt orb wake target only. The wake phrase is voice-only and must not be written on the app screen.

## Checks run

| Check | Result |
|---|---|
| `node --check server.js` | PASS |
| `node --check app.js` | PASS |
| `node --check chrome-extension/background.js` | PASS |
| `node --check chrome-extension/content.js` | PASS |
| `node --check chrome-extension/app-bridge.js` | PASS |
| `node --check chrome-extension/popup.js` | PASS |
| Duplicate HTML IDs | PASS |
| Missing JS `$()` ID references | PASS |
| `npm start` launches server on port 5000 | PASS |
| `GET /api/health` | PASS |
| `GET /` serves app HTML | PASS |
| Old activation symbol references | PASS — removed |
| Old `bootPlusBtn` ID | PASS — replaced with `bootOrbWakeBtn` |

## Still requires live environment

- Real Gemini answer with `GEMINI_API_KEY`
- Speech permission and voice wake testing
- Chrome extension install
- Logged-in visible-page scanner testing
- Replit runtime with secrets
