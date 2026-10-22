# SavageTech TV Pro — Universal Stream Player

## Supported stream types
Put the stream URL in `js/app.js` inside a channel's `stream:"..."` field.

Examples:
- `https://example.com/live/channel.m3u8`
- `http://example.com/live/channel.m3u8`
- `https://example.com/live/channel.mpd`
- `http://example.com/live/channel.mpd`
- `https://example.com/live/channel.ts`
- `http://example.com/live/channel.ts`

The player automatically detects `.m3u8`, `.mpd`, and `.ts`.

### Important
A browser cannot directly play a raw MPEG-TS (`.ts`) URL. When SavageTech TV is run with the included Node server, `.ts` is converted to a rolling HLS stream by `ffmpeg-static`.

For HTTP and cross-origin streams, the Node server includes `/api/stream-proxy` so the browser can request the media through the same origin. This helps with mixed-content and CORS restrictions.

This does NOT bypass:
- DRM
- username/password authentication
- expired signed URLs
- geo-blocking
- provider-side referer/origin restrictions
- a stream that is offline or malformed

## Run
1. Install Node.js 18+.
2. Open a terminal in this folder.
3. Run:
   `npm install`
4. Start:
   `npm start`
5. Open:
   `http://localhost:3000`

Do not open `player.html` directly with `file://` if you want `.ts` conversion or HTTP/CORS proxying; use the Node server.

## Example channel config
```js
{id:201,name:"My Channel",cat:"Sports",desc:"Live TV",logo:"TV",logoImage:"assets/my-logo.png",stream:"http://server.example/live/channel.ts"}
```


### MKV support
Remote `.mkv` URLs are detected automatically. When the site is running through the included Node/FFmpeg server, the server converts MKV to HLS for browser playback. The original `.mkv` URL can remain in `app.js`.

## SASU-style playback features in SavageTech TV
The built-in web player remains independent of SASU Player and includes HLS.js playback, automatic/available quality selection, subtitle-track selection when provided by the stream, playback controls, fullscreen, Picture-in-Picture where supported, and a retry control when playback fails. It also supports MPEG-DASH via dash.js. A browser cannot play every provider stream: some sources require provider-specific authorization, DRM, expiring tokens, or headers that the provider explicitly allows.

### Optional upstream request headers (Node media backend)
On Render, you may set these environment variables only when the stream provider documents/requires them:
- `STREAM_USER_AGENT` — optional User-Agent value
- `STREAM_REFERER` — optional Referer URL
- `STREAM_ORIGIN` — optional Origin value
- `STREAM_ACCEPT` — optional Accept value

Do not put credentials or short-lived signed tokens into public frontend code. These settings do not bypass DRM, authentication, expired tokens, geo-restrictions, or provider access controls. After changing Render environment variables, redeploy/restart the media backend.
