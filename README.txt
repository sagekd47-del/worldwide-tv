DIGIDOCTOR LOCAL AI — VERSION 3
==============================

IMPORTANT: This is a LOCAL AI application, not a static website demo.
Do not open index.html directly and do not use VS Code Live Server by itself.
Run the Node.js backend; it serves the pages and calls Ollama on this computer.

RUN ON WINDOWS
1. Install Node.js 18+.
2. Install Ollama for Windows.
3. In PowerShell run: ollama pull qwen3:4b
4. Extract the ZIP and open the DigiDoctor_Web folder in VS Code.
5. Open Terminal in that folder and run: npm install
6. Run: npm start
7. Open: http://localhost:3000
8. Check: http://localhost:3000/api/health
   The response should show ok:true and modelInstalled:true.

WHAT CHANGED IN V3
- Fixed the main reason for repeated generic answers: the frontend previously swallowed backend connection errors and silently displayed the same generic fallback. It now shows a clear Local AI connection/model error instead of pretending that answer came from AI.
- The loading page now waits for the local Node + Ollama service and configured model to be ready. It no longer requires a 3 MB download or a stable internet connection at runtime.
- Diagnosis keeps the typing indicator for at least 5 seconds, then waits for local AI readiness and the model response (up to 10 minutes for slow CPU inference).
- The local model may use its general technical knowledge for safe general troubleshooting even when a knowledge document does not match. It must not invent exact model-specific codes, menu paths, firmware or part numbers.
- Improved retrieval ranking, Swahili/English symptom synonyms, error/model identifier matching and up to 8 local reference documents per question.
- Expanded curated local knowledge from 8 to 13 documents: safety, Windows, Wi-Fi, printers, Android, iPhone/iPad, Smart TVs, laptops, storage, phones, gaming and more.
- Results show follow-up questions, confidence and the local knowledge filenames used.
- Like/Dislike feedback continues to be saved locally in the browser.

OFFLINE BEHAVIOUR
Once Node.js, Ollama, the model and knowledge files are installed locally, the AI diagnosis works without internet. Internet is only needed to download/install the model, install Node packages, or manually obtain/update reference documents. A local model does not become more accurate merely by waiting for the user's internet connection.

IMPORTANT DEPLOYMENT LIMITATION
If you upload only the frontend to Render, it cannot use Ollama installed on your personal laptop. The Node backend and Ollama must run on the same machine/server, or you must configure a secure private connection to the machine hosting Ollama. Do not expose Ollama's port publicly without authentication and network protections.

KNOWLEDGE BASE LIMITATION
The included 13 documents are a curated starter pack, not a complete repair encyclopedia. There is no single complete database of every device and fault. Add legally reusable manufacturer manuals, official troubleshooting pages and verified service notes to the knowledge/ folder. Include exact model/version, symptom, diagnostic tests, confirmed fix, source URL, and date checked. Do not copy copyrighted manuals wholesale without permission.
