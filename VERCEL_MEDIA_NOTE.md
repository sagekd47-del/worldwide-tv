# Media architecture note

The Vercel deployment handles the website, API, HLS/DASH proxying and stateless API routes.

Raw `.ts` and `.mkv` conversion is delegated through `MEDIA_BACKEND_URL` to the Node/FFmpeg service in `media-backend/`. This keeps live FFmpeg processes off the Vercel request lifecycle while keeping the browser URLs same-origin (`/api/ts-hls`, `/api/mkv-hls`).
