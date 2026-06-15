# Clean Build Audit — Still Salt Core Connected Shell

## Audit goal

Confirm this package is a clean, single-dashboard, build-ready foundation for the next design/animation pass. The next builder should not have to decide which dashboard, which buttons, which scanner path, or which internal functions to keep.

## Cleanup performed

| Item | Result |
|---|---|
| Removed stale app-bridge selector `#runProductScanBtn` | FIXED |
| Removed legacy `product_intelligence` app-tab detection references from extension background worker | FIXED |
| Removed confusing `orb placeholder` language from app markup/docs | FIXED |
| Added hard Results / Launchpad rule: orb docks aside but remains active and communicative | FIXED |
| Confirmed one dashboard entry point: `index.html` | PASS |
| Confirmed no duplicate dashboard HTML files | PASS |
| Confirmed no duplicate element IDs | PASS |
| Confirmed every JavaScript `$()` ID reference exists in `index.html` | PASS |
| Confirmed required four dock buttons exist | PASS |
| Confirmed two-layer orb markup exists | PASS |
| Confirmed secure backend routes exist | PASS |
| Confirmed extension bridge message names are preserved | PASS |

## Required IDs preserved

The next design pass must not delete these IDs because they are the stable connection points for the internal app functions:

- `bootScreen`
- `bootOrbWakeBtn`
- `app`
- `stateBadge`
- `backendBadge`
- `extensionBadge`
- `centerStage`
- `orbStage`
- `stillSaltOrb`
- `smallTalkingBox`
- `talkingText`
- `workspace`
- `minimizeWorkspaceBtn`
- `resultsPanel`
- `launcherPanel`
- `agentPanel`
- `intakePanel`
- `settingsPanel`
- `tikTokScanBtn`
- `muteBtn`
- `resultsBtn`
- `amazonScanBtn`
- `siteCommandInput`
- `openSiteCommandBtn`
- `voiceSiteCommandBtn`
- `agentPrompt`
- `askAgentBtn`
- `voiceAgentBtn`
- `rawInput`
- `parseReplaceBtn`
- `parseAppendBtn`
- `exportJsonBtn`
- `exportCsvBtn`
- `sendMakeBtn`
- `makeWebhookUrl`
- `agentMood`
- `useGoogleSearch`
- `agentMemory`

## Final function map

| Function | Status |
|---|---|
| Secure Gemini backend proxy | KEPT |
| `/api/health` | KEPT |
| `/api/agent` | KEPT |
| Replit Secrets support through `GEMINI_API_KEY` | KEPT |
| One-page dashboard shell | KEPT |
| Boot screen with tiny centered Still Salt orb wake target | KEPT |
| Two-layer active orb component | KEPT |
| Results / Launchpad center workspace | KEPT |
| Results mode orb side-dock while staying active | KEPT |
| Incognito / silent mode | KEPT |
| Voice output through browser speech synthesis | KEPT |
| Voice command input through browser speech recognition when supported | KEPT |
| Website launchpad | KEPT |
| Text/voice site opener | KEPT |
| Product CSV/JSON intake | KEPT |
| Product scoring | KEPT |
| JSON export | KEPT |
| CSV export | KEPT |
| Make webhook export | KEPT |
| Chrome extension visible-page scanner bridge | KEPT |
| Emergency stop popup | KEPT |

## Results / Launchpad hard rule

When `Results LAUNCHPAD` opens, the center workspace opens and the orb docks to the side. The orb must remain active. It can still receive typed prompts, respond through the backend, speak when not muted, pulse, spin, and communicate while results are visible. Only `Mute INCOGNITO` disables voice and places the orb into silent/offline behavior.

## Checks run

| Check | Result |
|---|---|
| `node --check server.js` | PASS |
| `node --check app.js` | PASS |
| `node --check chrome-extension/background.js` | PASS |
| `node --check chrome-extension/content.js` | PASS |
| `node --check chrome-extension/app-bridge.js` | PASS |
| `node --check chrome-extension/popup.js` | PASS |
| `npm start` launches server | PASS |
| `GET /api/health` responds | PASS |
| `GET /` serves app HTML | PASS |
| Required dashboard IDs exist | PASS |
| JavaScript ID references resolve | PASS |
| No duplicate HTML IDs | PASS |
| No stale `runProductScanBtn` reference | PASS |
| No stale `product_intelligence` reference | PASS |
| No alternate dashboard files | PASS |
| No hardcoded `GEMINI_API_KEY` value found | PASS |

## Still unverified because they require a live environment

- Real Gemini answer with a real `GEMINI_API_KEY` in Replit Secrets.
- Live Chrome extension install and real visible-page scan on TikTok/Amazon/Kalodata/Hatfuls pages.
- Browser speech recognition behavior, because it depends on browser support and permissions.
- Final visual match to the generated reference images, because this shell intentionally preserves function first and leaves design/animation for the next build pass.

## Final verdict

This package is clean and ready for the next app/design build pass. It has one dashboard configuration, preserved connected internal functions, correct button placement, no old competing dashboard references, and clear hard rules for Results Mode, Incognito Mode, scanner behavior, and secure backend use.
