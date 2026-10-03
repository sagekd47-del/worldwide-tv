# SavageTech TV — Vercel deployment

This build is split into two roles:

1. Vercel hosts the static SavageTech TV frontend and stateless API endpoints.
2. `media-backend/` contains the existing Node + FFmpeg service for raw `.ts` and `.mkv` conversion. Put this folder on Render (or another Node server) and set `MEDIA_BACKEND_URL` in Vercel.

Direct `.m3u8` and `.mpd` playback/proxying works from Vercel without the media backend. Raw `.ts` and `.mkv` conversion needs the media backend because live FFmpeg transcoding is a long-running workload; Vercel Functions have finite execution durations.

## GitHub layout

Upload the CONTENTS of this folder to the repository root. Do not put the whole project inside another `SavageTech_TV_Pro-01` folder.

## Vercel settings

Framework Preset: Other
Root Directory: `./`
Build Command: leave empty
Output Directory: leave empty
Install Command: `npm install` (or leave automatic)
Node.js: 24.x

Environment Variable:
`MEDIA_BACKEND_URL` = your Render media backend URL, without a trailing slash.

## Render media backend

Deploy the `media-backend` folder as a Node service. It keeps the existing Express + FFmpeg stream conversion endpoints. Copy its package.json and server.js together. The start command is `node server.js`.

## Quick test endpoints

`/api/health`
`/api/stream-proxy?url=<encoded-url>`
`/api/ts-status?url=<encoded-url>`

