@claude

You are the Orchestrator Agent for the Still Salt Command Center build.

Your job is to manage the build from the existing clean connected shell to a finished, testable, single-dashboard app. Do not freestyle. Do not create multiple dashboard versions. Do not delete working connected functions. Do not replace the project with a new unrelated app.

FIRST ACTION: Do not edit code yet.

First audit the repo and return a build map:
1. Inspect the repo structure.
2. Identify backend files.
3. Identify frontend dashboard files.
4. Identify voice/orb/state files.
5. Identify product scoring/export files.
6. Identify Chrome extension files.
7. Identify launchpad/results files.
8. Identify stale, confusing, duplicate, or leftover references.
9. Define exact task packets.
10. Define exact file boundaries.
11. Define which work can be parallel and which must be sequential.
12. Return a compact plan before editing.

Read AGENTS.md, DESIGN_LOCK.md, TASKS.md, QA_CHECKLIST.md, REFERENCE_IMAGES.md, README.md, and CLEAN_BUILD_AUDIT.md if present.

PROJECT LOCKS:
- One dashboard configuration only.
- Electric blue and neon orange.
- No rejected old activation symbol direction.
- Boot begins with a tiny centered Still Salt orb wake target only.
- The user may wake the AI by clicking the tiny orb or by speaking the wake phrase, but the wake phrase must not be written on the app screen.
- Exactly two orb layers.
- Bottom buttons: TikTok SCAN, Mute/INCOGNITO, Results/LAUNCHPAD, Amazon SCAN.
- Results mode opens center panel and docks orb to side while keeping it active.
- Only Mute / Incognito disables voice.
- Talking mode hides side clutter and shows large active orb and a small transparent blue electric chat box underneath.
- Boot sequence lasts about 10 seconds: black screen → tiny centered Still Salt orb wake target → optional user-spoken wake phrase, not written → blue/orange dashboard ecosystem hallway/tunnel → flying panels/tasks/updates/data → orb/dashboard approaching → orb turns and locks like a key → dashboard powers on like an Iron Man suit → welcome message → daily briefing → dashboard idle.

PRESERVE:
- /api/health
- /api/agent
- secure Gemini backend route
- product scoring
- CSV/JSON import
- CSV/JSON export
- Make/webhook export
- launchpad links
- text/voice website opener
- Chrome extension visible-page scanner bridge
- emergency stop popup

SECURITY:
- No API keys in frontend.
- GEMINI_API_KEY must come from environment/Replit Secrets.
- No hidden/private API scraping.
- No cookie/token/session harvesting.
- No CAPTCHA or rate-limit bypass.
- Visible-page automation only.

CREDIT/TOKEN CONTROL:
- Use exact file paths.
- Use grep before broad reads.
- Do not scan every file unless needed.
- Do not rewrite working code.
- Do not repeat analysis.
- Make the smallest correct change.
- Stop and report if live browser, API key, Replit, extension install, or microphone permissions are required.

REQUIRED QA:
- node --check server.js
- node --check app.js
- node --check chrome-extension/background.js
- node --check chrome-extension/content.js
- node --check chrome-extension/app-bridge.js
- node --check chrome-extension/popup.js
- npm start smoke test
- /api/health test
- frontend secret scan
- duplicate ID check
- missing JS-connected element ID check
- one-dashboard-only check

FINAL OUTPUT:
Return files changed, tests run, PASS/FAIL table, unresolved live-environment items, exact Replit setup steps, and final ready-to-import status.

## IMPORTANT — CURRENT UI IS NOT THE DESIGN

This repository is a function-core/wireframe shell. The visible HTML/CSS is intentionally plain and must not be copied as the final design. The final dashboard must be designed from the uploaded locked reference images and the design lock notes only.
