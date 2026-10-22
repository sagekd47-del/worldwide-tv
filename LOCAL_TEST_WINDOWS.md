# SavageTech TV — Windows local streaming test

## Important
Do not use VS Code Live Server or `python -m http.server` for this test: they serve static files only and do not run the streaming proxy/transcoder API. Use the included Node media backend instead.

## 1. Install Node.js
Install the current Node.js LTS release from https://nodejs.org/en/download and restart VS Code.

## 2. Open the project
Extract the ZIP. In VS Code choose File → Open Folder and select the extracted project folder (the folder containing `home.html`, `player.html`, and `media-backend`).

## 3. Install server dependencies
In VS Code choose Terminal → New Terminal, then run:

```powershell
cd media-backend
npm install
```

Wait for it to finish.

## 4. Start the local server
Run:

```powershell
npm start
```

Keep this terminal open. Open Chrome or Edge and visit:

http://localhost:3000/index.html

The media backend now serves the parent project folder and provides `/api/stream-proxy`, `/api/ts-hls`, and `/api/mkv-hls` locally.

## 5. Test a channel
Add the stream URL in the channel data in `js/app.js` or use the project's admin page if the channel is saved there. URLs ending in `.hls` are now treated as HLS playlists, and playlist/segment references are rewritten through the proxy.

## Supported stream types
- HLS playlists: `.m3u8` and `.hls`
- MPEG-DASH: `.mpd`
- MPEG-TS: `.ts` via the included FFmpeg media backend
- MKV: `.mkv` via the included FFmpeg media backend
- Browser-native formats such as `.mp4`, `.webm`, `.m4v`, and `.ogg`

Support still depends on the provider's stream being available and authorized, valid playlist/segments, any required headers/cookies/referer, DRM, and network access. The proxy does not bypass DRM, login, geo restrictions, or provider access controls. Some providers may block server-side requests or require specific headers.

## Stop server
Press Ctrl+C in the terminal.
