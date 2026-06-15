# Still Salt Command Center — Agent Operating Rules

## Mission
Build the Still Salt Command Center from this clean connected shell. Preserve working connected parts. Replace/improve only the visual shell, motion states, and UI wiring needed to match the locked design.

## Hard locks
- One dashboard configuration only.
- No duplicate dashboards.
- Main colors: electric blue + neon orange.
- Boot begins with a tiny centered Still Salt orb wake target only. The wake phrase is spoken by the user only and must not be written on the app screen.
- Orb has exactly two visible layers:
  1. inner electric blue SS Still Salt orb
  2. outer blue/orange electric reactor ring
- Do not create one orb.
- Do not create three orbs.
- Do not remove connected backend, scanner, export, launchpad, or extension bridge functions.
- Results mode docks the orb to the side but keeps it active.
- Only Mute / Incognito disables voice.

## Required app states
1. BOOT_SEQUENCE
2. DASHBOARD_IDLE
3. TALKING_MODE
4. INCOGNITO_MODE
5. RESULTS_LAUNCHPAD
6. SCANNING_TIKTOK
7. SCANNING_AMAZON
8. ERROR_STATE

## Preserve functions
Do not delete or break:
- /api/health
- /api/agent
- server-side Gemini key handling
- product scoring
- CSV/JSON import
- CSV/JSON export
- Make/webhook export
- launchpad links
- voice/text command launcher
- Chrome extension visible-page scanner
- emergency stop popup

## Security
- No API keys in frontend.
- GEMINI_API_KEY must come from environment/Replit Secrets.
- No hidden API scraping.
- No cookies/tokens/session harvesting.
- No CAPTCHA/rate-limit bypass.
- Visible-page automation only.

## Build discipline
- Work state by state.
- Do not redesign multiple versions.
- Do not add random extra features.
- After every change run QA.
- Document every changed file and why.

## Token/credit control
- Use exact file paths.
- Use grep before broad reads.
- Do not scan every file unless needed.
- Do not rewrite working code.
- Do not repeat analysis.
- Make the smallest correct change.
- Stop and report when live browser, API key, extension install, microphone, or Replit runtime verification is required.


## IMPORTANT — CURRENT UI IS NOT THE DESIGN

This repository is a function-core/wireframe shell. The visible HTML/CSS is intentionally plain and must not be copied as the final design. The final dashboard must be designed from the uploaded locked reference images and the design lock notes only.
