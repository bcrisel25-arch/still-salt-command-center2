# Still Salt Command Center — Required QA

## Code checks
- [ ] node --check server.js
- [ ] node --check app.js
- [ ] node --check chrome-extension/background.js
- [ ] node --check chrome-extension/content.js
- [ ] node --check chrome-extension/app-bridge.js
- [ ] node --check chrome-extension/popup.js
- [ ] npm start smoke test
- [ ] /api/health returns OK
- [ ] Frontend secret scan: no GEMINI_API_KEY / ANTHROPIC_API_KEY / hardcoded secret in frontend files
- [ ] Duplicate ID check
- [ ] Missing JS-connected element ID check
- [ ] One-dashboard-only check

## Visual/state checks
- [ ] Boot starts on black screen with only a tiny centered Still Salt orb wake target; no written wake phrase.
- [ ] Boot tunnel uses blue/orange only.
- [ ] Boot sequence includes flying data/tasks/updates/panels.
- [ ] Dashboard appears after boot.
- [ ] Dashboard has one locked layout only.
- [ ] Orb has exactly two layers.
- [ ] Talking mode hides side clutter.
- [ ] Talking mode shows large orb + small chat box only.
- [ ] Results mode docks orb aside but keeps it active.
- [ ] Incognito mode disables voice.
- [ ] Mobile and desktop remain readable.

## Function checks
- [ ] /api/agent works when GEMINI_API_KEY is configured.
- [ ] Missing key gives clear setup error.
- [ ] TikTok Scan button sends scan command.
- [ ] Amazon Scan button sends scan command.
- [ ] Results Launchpad opens center panel.
- [ ] Minimize returns orb to center.
- [ ] CSV import works.
- [ ] JSON import works.
- [ ] Product scoring works.
- [ ] CSV export works.
- [ ] JSON export works.
- [ ] Make webhook path exists.
- [ ] Chrome extension popup emergency stop exists.

## Live-environment items that cannot be fully verified in GitHub alone
- [ ] Real Gemini key response.
- [ ] Browser voice permission.
- [ ] Audio output/mute behavior.
- [ ] Chrome extension install.
- [ ] Logged-in visible-page TikTok/Hatfuls/Kalodata scan.
- [ ] Replit runtime with Secrets.
