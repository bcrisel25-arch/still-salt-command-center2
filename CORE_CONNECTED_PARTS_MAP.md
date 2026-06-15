# Core Connected Parts Map

## Single dashboard expectation

There is only one dashboard configuration: `index.html`.

The dashboard has one center stage, one orb area, one center workspace, and one bottom command dock.

## IDs the next designer must not delete

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

## State names

- `idle`
- `talking`
- `incognito`
- `scanning_tiktok`
- `scanning_amazon`

## Extension message types preserved

App to extension:

- `STILL_SALT_RUN_PRODUCT_SCAN`
- `STILL_SALT_STOP_PRODUCT_SCAN`

Extension to app:

- `STILL_SALT_RUNNER_STATUS`
- `STILL_SALT_IMPORT_PRODUCTS`

## Result workspace behavior

Clicking `Results LAUNCHPAD` opens `workspace` in the middle. The orb docks to the side by adding the CSS class `workspace-open` to `centerStage`, but it remains active and communicative. It can still receive typed prompts, speak when not muted, pulse, spin, and respond while the workspace is open. Clicking `Minimize` hides the workspace and returns the orb to normal. Only `Mute INCOGNITO` disables voice and silent/offline behavior.

## Website opener behavior

Type or speak commands like:

- open ChatGPT
- launch Replit
- go to Google Drive
- pull up TikTok Seller Center
- open GitHub

The app matches aliases in `siteDirectory` inside `app.js` and opens the matching URL.
