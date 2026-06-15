# Still Salt Command Center — Core Connected Shell

This build strips the previous app down to the connected internal parts and a single dashboard configuration target.

## Purpose

The next design/build bot should not decide what functions exist or where the main controls go. This shell keeps the core functions wired and places the required buttons on the correct single dashboard page.

## Main dashboard buttons

Bottom command dock:

1. **TikTok SCAN** — sends a TikTok scan command to the Chrome extension runner.
2. **Mute INCOGNITO** — disables voice, opens silent text mode, and keeps the orb muted/offline.
3. **Results LAUNCHPAD** — opens the center workspace where the chat/results area belongs; the orb moves to the side and remains usable.
4. **Amazon SCAN** — sends an Amazon scan command to the Chrome extension runner.


## Results / Launchpad behavior hard lock

When **Results LAUNCHPAD** opens, the center workspace opens and the orb docks to the side. The orb must remain active: it can still receive typed prompts, respond through the backend, speak when not muted, and visually pulse/spin while communicating. Only **Mute INCOGNITO** disables voice and puts the orb into silent/offline behavior.

## Preserved connected functions

- Secure backend Gemini proxy: `/api/agent`
- Health check: `/api/health`
- Replit secret support: `GEMINI_API_KEY`
- One-page dashboard shell
- Two-layer active orb component
- Boot overlay with tiny centered Still Salt orb wake activation
- 10-step boot sequence logic for the future 10-second tunnel animation
- Text chat with Still Salt through secure backend
- Browser speech synthesis for responses when not muted
- Browser speech recognition for text/site commands when supported
- Incognito/silent mode
- Results center workspace
- Product data import from CSV or JSON
- Product scoring logic
- JSON export
- CSV export
- Make webhook send path
- Website launchpad
- Text command site opener
- Voice command site opener
- Chrome extension visible-page scan bridge
- Emergency stop extension popup

## Website launchpad includes

AI / build tools:
ChatGPT, Claude, Gemini, Grok, Perplexity, Ollama, Cursor, Replit, GitHub, Make.

Google tools:
Google, Drive, Sheets, Docs, Chrome Web Store / Extensions, Gmail, Calendar, Trends, Ads.

Social/content:
Facebook, Meta Business Suite, Instagram, TikTok, TikTok Seller Center, X/Twitter, Pinterest, YouTube, Spotify.

Marketplaces/sourcing:
Amazon, Amazon Seller Central, Etsy, eBay, OfferUp, Shopify, Alibaba, AliExpress.

Product research/design/video/voice:
Kalodata, Hatfuls, Canva, CapCut, ElevenLabs, TikTok Creative Center.

## Compliance rule

Export/report-first. Visible-page second. Hidden-data never.

The Chrome extension scans visible tables/cards only. It does not use hidden/private APIs, devtools/network interception, cookies, tokens, CAPTCHA bypass, rate-limit bypass, stealth, proxy rotation, or credential exfiltration.

## Run locally or in Replit

```bash
npm start
```

Then open the provided Replit/web URL.

## Required Replit Secret

Add this secret for real AI responses:

```text
GEMINI_API_KEY=your_key_here
```

Optional:

```text
GEMINI_MODEL=gemini-2.0-flash
```

## What the next bot should design

Do not create a new function map. Keep this shell and reskin the exact elements:

- dashboard shell
- two-layer orb
- boot sequence tunnel
- center workspace
- dock buttons
- incognito mode
- talking mode
- results launcher

The next bot's job is visual design + motion polish, not redefining the app.


## IMPORTANT — CURRENT UI IS NOT THE DESIGN

This repository is a function-core/wireframe shell. The visible HTML/CSS is intentionally plain and must not be copied as the final design. The final dashboard must be designed from the uploaded locked reference images and the design lock notes only.
