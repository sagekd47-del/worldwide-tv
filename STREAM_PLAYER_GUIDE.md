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
