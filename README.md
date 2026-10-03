# SavageTech TV — Pro Starter

A modern, responsive front-end TV streaming website created from scratch and branded as **SavageTech TV**.

## Included
- Home page with hero section
- Live TV channel cards
- Sports / Movies / News sections
- Search
- Watch/player page
- Favorites
- Local demo login/signup
- Profile page
- Admin dashboard for adding/editing/deleting channels
- Responsive mobile navigation
- No build step required

## Run
Open `index.html` to start the 7-second splash screen, which then opens `home.html`.

For best results, use a local static server (for example VS Code Live Server).

## Adding real streams
The admin dashboard accepts a stream URL, but this starter does not include a backend or stream proxy. For real production streaming, connect the player to your licensed stream provider and use a secure backend/database.

## Production security
The admin page is intentionally a front-end demo. Do not use browser-only localStorage as real authentication or authorization. For production, use a server/database and proper authentication rules.

## SavageTech AI — OpenAI setup

The SavageTech AI page uses `/api/chat`. The OpenAI secret key is kept on the server and is loaded from `.env`, not from `savagetech-ai.html`.

1. Install Node.js 18+ (20+ recommended).
2. Open a terminal in the `SavageTech_TV_Pro-01` folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Open `.env` and replace `sk-your-openai-api-key-here` with the real OpenAI API key.
6. Run `npm start`.
7. Open `http://localhost:3000/savagetech-ai.html`.

Keep `.env` private and never upload it to GitHub or expose it in browser code.


## Render deployment (recommended)
This project now includes `server.js` and `render.yaml`. Deploy it as a **Render Web Service**, not a Static Site:
- Build Command: `npm install`
- Start Command: `npm start`
- Add `OPENAI_API_KEY` in Render Environment Variables (never commit `.env`).
- Optional: `OPENAI_MODEL=gpt-4o-mini` (the standard model used by this build).

The server serves `index.html`, `home.html`, `player.html`, and `/api/chat`. It also provides `/player`, `/home`, and `/ai` aliases. This prevents the common 404 caused by deploying only part of the HTML files or using the wrong service type.

## Important security note
The previous package contained an OpenAI secret key in `.env`. This fixed package deliberately removes `.env`. If that key was real and was ever uploaded to GitHub/another public service, revoke/rotate it in the OpenAI platform immediately and create a new key stored only in Render Environment Variables.

## ZIP-friendly free deployment
For a ZIP-based deployment, Cloudflare Pages Direct Upload or Netlify Drop are easier choices than GitHub. If using Render, connect the GitHub repository and deploy the whole project as a Web Service.


## Download Center
The website now has `download.html` with real byte-based download progress. Replace the placeholder platform URLs in `downloads/download-config.json` with real uploaded builds or official store URLs. Do not create fake APK/IPA/EXE/DMG files. A website URL cannot automatically become all native app formats; each native platform requires a real build.

## Gmail SMTP
For feedback/support email, copy `.env.example` to `.env` on the server and set `SMTP_PASS` to a Google App Password for `info.savagetech@gmail.com`. Never commit `.env`.


## SavageTech AI local testing

Live Server only serves the HTML files; it does not run `/api/chat`. To test AI locally, open a terminal in this project and run:

```bash
npm install
npm start
```

Then keep Live Server open if you prefer; the AI page automatically sends localhost Live Server requests to `http://localhost:3000/api/chat`. Set `OPENAI_API_KEY` in your environment before starting the server.
