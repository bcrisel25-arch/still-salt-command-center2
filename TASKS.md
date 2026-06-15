# Still Salt Command Center — Task Packets

## 00-orchestrator-audit
Do not edit code. Inspect repo. Return file map, stale references, working parts, task order, and file boundaries.

## 01-backend-guardian
Allowed files: server.js, package.json, README/setup docs.
Verify /api/health, /api/agent, environment secret handling, package scripts.
Do not edit dashboard UI.

## 02-extension-bridge
Allowed files: chrome-extension/* and scanner bridge section in app.js only.
Verify Manifest V3, emergency stop, visible-page scan bridge, app/background/content messaging.
Do not edit dashboard design.

## 03-results-launchpad
Allowed files: index.html, styles.css, app.js.
Verify Results/Launchpad center panel, links, command opener, minimize, and active side-docked orb behavior.

## 04-ui-shell
Allowed files: index.html, styles.css, app.js.
Build one dashboard shell only. Correct bottom buttons. Preserve IDs and connected functions.

## 05-motion-system
Allowed files: styles.css, app.js, optional orb-engine.js, boot-sequence.js, voice-engine.js.
Build idle electricity, two-layer orb motion, panel transitions, talking transition, incognito transition, results dock motion.

## 06-voice-orb
Allowed files: app.js, voice-engine.js, styles.css.
Make orb remain active in normal/results/talking mode. Mute/incognito disables voice only. Orb pulses/spins/breathes while speaking/thinking.

## 07-opening-sequence
Allowed files: index.html, styles.css, app.js, boot-sequence.js.
Build 10-second black screen → tiny centered Still Salt orb wake target → blue/orange dashboard ecosystem hallway/tunnel → flying panels/tasks/updates/data → orb/dashboard approach → orb turns and locks like a key → dashboard powers on like an Iron Man suit → welcome/daily briefing → dashboard idle.

## 08-qa-auditor
Read-only first. Run all QA. Edit only if explicitly asked. Produce PASS/FAIL table and unresolved live-environment list.

## IMPORTANT — CURRENT UI IS NOT THE DESIGN

This repository is a function-core/wireframe shell. The visible HTML/CSS is intentionally plain and must not be copied as the final design. The final dashboard must be designed from the uploaded locked reference images and the design lock notes only.
