const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const app = express();
const ROOT = path.resolve(__dirname, '..');
const KB = path.join(ROOT, 'knowledge');
const PORT = Number(process.env.PORT || 3000);
const OLLAMA_URL = (process.env.OLLAMA_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
const MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b';
app.use(express.json({ limit: '8mb' }));
app.get('/', (_req,res) => res.sendFile(path.join(ROOT, 'index.html')));
app.get('/home.html', (_req,res) => res.sendFile(path.join(ROOT, 'home.html')));
app.use('/css', express.static(path.join(ROOT, 'css')));
app.use('/js', express.static(path.join(ROOT, 'js')));
app.use('/assets', express.static(path.join(ROOT, 'assets')));

function words(s) { return (s || '').toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s-]/gu, ' ').split(/\s+/).filter(x => x.length > 2); }
function loadKnowledge() {
  const files = fs.readdirSync(KB).filter(f => f.endsWith('.md'));
  return files.map(file => ({ file, text: fs.readFileSync(path.join(KB, file), 'utf8') }));
}
function retrieve(query, limit = 5) {
  const q = new Set(words(query));
  return loadKnowledge().map(doc => {
    const tokens = words(doc.text); let score = 0;
    for (const t of tokens) if (q.has(t)) score++;
    // Boost matching headings and device/symptom terms.
    const heading = doc.text.split('\n').filter(x => x.startsWith('#')).join(' ');
    for (const t of words(heading)) if (q.has(t)) score += 3;
    return { ...doc, score };
  }).filter(d => d.score > 0).sort((a,b) => b.score-a.score).slice(0, limit);
}
function ollamaRequest(payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const url = new URL(OLLAMA_URL + '/api/chat');
    const req = http.request({ hostname: url.hostname, port: url.port || 80, path: url.pathname, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } }, res => {
      let body = ''; res.setEncoding('utf8'); res.on('data', c => body += c); res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) return reject(new Error(`Ollama HTTP ${res.statusCode}: ${body.slice(0,300)}`));
        try { resolve(JSON.parse(body)); } catch(e) { reject(e); }
      });
    });
    req.setTimeout(180000, () => req.destroy(new Error('Local AI timed out after 180 seconds')));
    req.on('error', reject); req.write(data); req.end();
  });
}
app.get('/api/health', async (_req,res) => {
  try {
    const url = new URL(OLLAMA_URL + '/api/tags');
    const r = await fetch(url); const data = await r.json();
    res.json({ ok:true, ollama:true, model:MODEL, installedModels:(data.models||[]).map(m=>m.name), knowledgeFiles:loadKnowledge().length });
  } catch(e) { res.status(503).json({ ok:false, ollama:false, model:MODEL, error:'Ollama haipatikani. Hakikisha imewashwa na model imepakuliwa.', detail:e.message, knowledgeFiles:loadKnowledge().length }); }
});
app.post('/api/diagnose', async (req,res) => {
  const { deviceType='unknown', brand='', model='', problem='', language='en', mode='automatic' } = req.body || {};
  if (typeof problem !== 'string' || problem.trim().length < 5) return res.status(400).json({ error:'Please describe the issue in more detail.' });
  const query = `${deviceType} ${brand} ${model} ${problem}`;
  const docs = retrieve(query, 6);
  const context = docs.map((d,i)=>`[LOCAL SOURCE ${i+1}: ${d.file}]\n${d.text.slice(0,6500)}`).join('\n\n---\n\n');
  const languageNames = {en:'English',sw:'Kiswahili',fr:'French',es:'Spanish',de:'German',pt:'Portuguese',ar:'Arabic',zh:'Chinese',ja:'Japanese',ko:'Korean',hi:'Hindi',ru:'Russian'};
  const langName = languageNames[language] || 'English';
  const system = `You are DigiDoctor, a careful professional device troubleshooting assistant running locally. Answer ONLY in ${langName}. Never claim certainty without evidence. Do not invent model-specific facts, error-code meanings, measurements, menu paths, or repair steps. Use the supplied local reference excerpts as evidence; if they do not cover the issue, say what is unknown and ask focused follow-up questions. Separate confirmed facts from possible causes. Start with non-invasive checks. Warn users not to open power supplies, CRT televisions, microwave ovens, swollen batteries, or mains-powered equipment; advise unplugging and qualified service when there is shock, smoke, sparks, burning smell, liquid ingress, overheating, or battery swelling. Never instruct bypassing safety interlocks or handling live circuits. Do not say you inspected the device physically. Provide a concise, practical response. Return valid JSON only with keys: title (string), causes (string), steps (array of strings), warning (string), confidence ("high"|"medium"|"low"), followUp (array of strings), sources (array of strings). Cite only local source filenames supplied below. If no relevant source is present, sources must be [].`;
  const user = `DEVICE TYPE: ${deviceType}\nBRAND: ${brand || 'not supplied'}\nMODEL: ${model || 'not supplied'}\nMODE: ${mode}\nUSER PROBLEM: ${problem}\n\nLOCAL KNOWLEDGE BASE EXCERPTS:\n${context || 'No matching local knowledge documents found.'}\n\nDiagnose conservatively. If information is insufficient, do not guess: state what can be safely checked and ask for exact model/error details.`;
  try {
    const result = await ollamaRequest({ model:MODEL, stream:false, format:'json', options:{temperature:0.2}, messages:[{role:'system',content:system},{role:'user',content:user}] });
    let answer = JSON.parse(result.message.content);
    if (!Array.isArray(answer.steps)) answer.steps = [];
    answer.sources = Array.isArray(answer.sources) ? answer.sources.filter(s => docs.some(d => d.file === s)) : [];
    answer.knowledgeMatched = docs.map(d=>d.file);
    answer.engine = 'Ollama local model + local knowledge retrieval';
    res.json(answer);
  } catch(e) {
    res.status(503).json({ error:'Local AI haipatikani kwa sasa. Angalia Ollama na model.', detail:e.message, title:'Local AI unavailable', causes:'DigiDoctor haikuweza kuwasiliana na model ya ndani.', steps:['Hakikisha Ollama imewashwa.','Kagua kuwa model iliyowekwa kwenye OLLAMA_MODEL ipo kwenye kompyuta.','Fungua /api/health kuona hali ya huduma.'], warning:'Usifanye matengenezo ya ndani ya kifaa chenye umeme au betri iliyovimba.' });
  }
});
app.listen(PORT, '0.0.0.0', () => console.log(`DigiDoctor running at http://localhost:${PORT} | Ollama=${OLLAMA_URL} | model=${MODEL}`));
