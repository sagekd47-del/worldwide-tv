DIGIDOCTOR — OFFLINE DIAGNOSTIC KNOWLEDGE SYSTEM

This version intentionally does NOT use Ollama, an AI inference engine, an AI model, or an AI API.
It uses a local rule-based diagnostic matcher and a searchable local knowledge library.

REQUIREMENTS
- Windows, macOS, or Linux
- Node.js 18 or newer
- Internet is not required for diagnosis after dependencies are installed.

START
1. Extract the ZIP.
2. Open the DigiDoctor_Web folder in VS Code.
3. Open Terminal in that folder.
4. Run: npm install
5. Run: npm start
6. Open: http://localhost:3000

HEALTH CHECK
Open http://localhost:3000/api/health
The response shows the offline engine, number of knowledge files, and diagnostic rules.

HOW DIAGNOSIS WORKS
- User-entered device details and symptoms are matched against local diagnostic rules.
- The system retrieves relevant local knowledge documents using keyword scoring.
- It provides safe checks, possible causes, follow-up questions, and safety warnings.
- It does not claim a physical diagnosis and does not invent model-specific repair procedures.
- If there is no reliable match, it asks for more details rather than guessing.

WORD-BY-WORD TYPING
The response presentation intentionally remains word-by-word from the first word to the end of the full answer. The five-second thinking indicator is also retained. Do not remove typeInto() or replace it with an instant text render.

LANGUAGE
The interface supports the existing language selector. The deterministic diagnostic content currently has full English and Kiswahili answer sets; other interface languages may show the diagnostic content in English until their rule translations are added.

KNOWLEDGE LIBRARY
The knowledge folder contains the offline troubleshooting documents. Add new .md or .txt documents there. Each document should include symptoms, safe checks, cautions, and evidence/source notes. The current rules are broad symptom categories, not an exhaustive database of every device model or fault code.

IMPORTANT
Do not upload sensitive credentials, passwords, one-time codes, or personal account information. For smoke, sparks, burning smell, swollen battery, liquid ingress, or dangerous electrical faults, stop using the device and seek qualified service.

HOW ANSWERS ARE BUILT (NO AI MODEL / NO OLLAMA / NO AI API)
1. The user submits a question with device type, brand, model and symptoms.
2. The server searches the files inside the knowledge/ folder.
3. It ranks the closest documents using keyword and synonym matching.
4. It extracts the matching file's Symptoms, Safe checks / Steps, and Cautions sections.
5. The website presents that extracted information as the answer.
6. The existing front-end types the answer one word at a time, after keeping the thinking indicator visible for at least five seconds.

To add knowledge, create a .md or .txt file in the knowledge/ folder. Use headings such as:
# Device / problem title
## Symptoms
Describe the documented symptoms.
## Safe checks
- First safe check.
- Second safe check.
## Cautions
- Safety warning.

Important: this is a local knowledge retrieval and response-assembly system, not a generative AI. It can only answer from information that exists in its knowledge files. If no close match is found, it asks for more details rather than inventing a repair.

FIX IN v7
- Fixed /api/health referencing an undefined variable that caused a server error.
- Unknown /api routes and server errors now return JSON rather than an HTML error page.
- The browser now checks the response before parsing JSON and displays a clear message if the site is deployed as static hosting without the Node API.
- Added render.yaml for deployment as a Node Web Service. Do not deploy this project as a Static Site: the /api/diagnose endpoint needs the Node server.

RENDER DEPLOYMENT
- Set the Render service type to Web Service (Node), not Static Site.
- Set the service Root Directory to DigiDoctor_Web if the repository contains the parent folder.
- Build command: npm install
- Start command: npm start
- Health check path: /api/health
