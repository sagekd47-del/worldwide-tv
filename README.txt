DIGIDOCTOR — UPDATED WEB PROJECT
================================

PROJECT STRUCTURE
- index.html: dedicated loading page with progress bar; redirects to home.html within 7 seconds.
- home.html: main DigiDoctor website and diagnosis interface.
- css/style.css: responsive styles.
- js/main.js: language selector, image preview, and troubleshooting logic.
- assets/: brand artwork.

HOW TO RUN
1. Extract the ZIP.
2. Open the DigiDoctor_Web folder in VS Code.
3. Run index.html using VS Code Live Server (recommended), or open it in a browser.

CHANGES IN THIS VERSION
- Loading screen is now the only page named index.html and moves to home.html within a maximum of about 7 seconds.
- The main website is in its own home.html file and uses separate CSS and JavaScript files.
- Language options include English, Kiswahili, French, Spanish, German, Portuguese, Arabic, Chinese, Japanese, Korean, Hindi and Russian. Interface labels are translated for those languages; some device-specific diagnosis guidance is still authored in English.
- Image upload is visible without needing to click the Image Check tab. It supports selecting a device photo or screenshot and previewing it before submitting.

IMPORTANT LIMITATIONS
- This is a frontend-only starter. Uploaded images are previewed in the browser; they are not uploaded to a server, saved to an account, or interpreted by AI.
- Diagnosis uses a small local rule-based troubleshooting library. It is not a confirmed repair diagnosis and does not run commands on your device.
- Use Live Server for best results.

LOADING PAGE INTERNET REQUIREMENT
- index.html first checks for an active internet connection.
- The loading bar tracks download progress for a 3 MiB payload (3,145,728 bytes), then opens home.html at 100%.
- If the internet check or payload download fails, it stays on the loading page and offers Retry.
- The 3 MiB payload is assets/loading-payload.bin. Keep it in place when deploying the site.
- The site must be served through a web server (for example VS Code Live Server); opening index.html directly as file:// can block fetch requests.

LOCAL AI BACKEND (NEW)
- server/server.js: local Node.js backend; it calls Ollama on this same machine and retrieves relevant documents from knowledge/ before generating an answer.
- knowledge/: starter troubleshooting notes. Add authorized manuals and verified notes here.
- LOCAL_AI_SETUP_SW.md: Windows setup instructions in Kiswahili.
- package.json: Node dependency and start script.
- Run `npm install`, then `npm start`, then open http://localhost:3000.
- Install Ollama and pull a local model first (example: `ollama pull qwen2.5:7b`).
- No online AI API is used. The model download and any source research require internet once; after model and knowledge are local, inference and retrieval can run offline.
- The existing frontend keeps its 5-second typing indicator and feedback buttons. It now has a matching /api/diagnose backend.
- This is a foundation with a starter knowledge library, not a complete database of every model and fault. Read LOCAL_AI_SETUP_SW.md for limitations and safe expansion.
