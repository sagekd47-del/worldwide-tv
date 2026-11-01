const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const ROOT = path.resolve(__dirname, '..');
const KB = path.join(ROOT, 'knowledge');
const PORT = Number(process.env.PORT || 3000);
app.use(express.json({ limit: '8mb' }));
app.get('/', (_req,res) => res.sendFile(path.join(ROOT, 'index.html')));
app.get('/home.html', (_req,res) => res.sendFile(path.join(ROOT, 'home.html')));
app.use('/css', express.static(path.join(ROOT, 'css')));
app.use('/js', express.static(path.join(ROOT, 'js')));
app.use('/assets', express.static(path.join(ROOT, 'assets')));

function words(s) {
 return String(s||'').toLowerCase().normalize('NFKD')
  .replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}\s-]/gu,' ')
  .split(/\s+/).filter(x=>x.length>2);
}
function loadKnowledge(){
 return fs.readdirSync(KB).filter(f=>/\.(md|txt)$/i.test(f))
  .map(file=>({file,text:fs.readFileSync(path.join(KB,file),'utf8')}));
}
const STOP = new Set(['the','and','for','with','from','that','this','your','you','are','has','have','was','were','into','when','what','why','how','does','can','not','but','una','kwa','cha','na','ya','wa','za','kama','kwenye','hiyo','hii','tatizo','kifaa','device','problem','issue']);
const SYNONYMS = {
 'haichaji':['charging','charge','battery'], 'inachaji':['charging','charge'], 'chaji':['charging','charge'],
 'haiwaki':['power','boot','turn','on'], 'kuwasha':['power','turn','on'], 'joto':['heat','hot','overheating'],
 'mtandao':['network','internet','wifi'], 'intaneti':['internet','network','wifi'], 'skrini':['screen','display'],
 'picha':['picture','display','screen'], 'sauti':['sound','audio','speaker'], 'spika':['speaker','audio'],
 'printer':['print','printing'], 'printe':['printer','print'], 'tv':['television','smart'], 'runinga':['tv','television'],
 'simu':['phone','smartphone','mobile'], 'kompyuta':['computer','laptop','windows'], 'betri':['battery'],
 'maji':['liquid','water','damage'], 'imeanguka':['drop','impact','damage']
};
function expandTokens(input){
 const out=new Set();
 for(const token of words(input)){
  if(!STOP.has(token)) out.add(token);
  (SYNONYMS[token]||[]).forEach(x=>out.add(x));
 }
 return [...out];
}
function section(text, names){
 const lines=text.split(/\r?\n/); let active=false; const out=[];
 for(const line of lines){
  const h=line.match(/^#{1,4}\s+(.+)$/);
  if(h){ active=names.some(n=>h[1].toLowerCase().includes(n)); continue; }
  if(active && line.trim()) out.push(line.trim().replace(/^[-*]\s*/,''));
 }
 return out;
}
function retrieve(query){
 const terms=expandTokens(query);
 return loadKnowledge().map(d=>{
  const body=expandTokens(d.text); const counts=new Map(); body.forEach(t=>counts.set(t,(counts.get(t)||0)+1));
  let score=0; for(const t of terms) if(counts.has(t)) score += 1 + Math.min(counts.get(t),3)*0.15;
  const plain=d.text.toLowerCase();
  for(const phrase of words(query).join(' ').split(' ').filter(x=>x.length>4)) if(plain.includes(phrase)) score+=0.4;
  const title=(d.text.match(/^#\s+(.+)$/m)||[])[1]||d.file.replace(/[-_]/g,' ');
  return {...d,title,score};
 }).filter(d=>d.score>=1.5).sort((a,b)=>b.score-a.score).slice(0,3);
}
app.get('/api/health',(_req,res)=>res.json({ok:true,engine:'offline-rule-based-knowledge-search',inferenceEngine:false,knowledgeFiles:loadKnowledge().length,diagnosticRules:'document-based retrieval',status:'ready'}));
app.post('/api/diagnose',(req,res)=>{
 const {deviceType='unknown',brand='',model='',problem='',language='en'}=req.body||{};
 if(typeof problem!=='string'||problem.trim().length<5) return res.status(400).json({error:'Please describe the issue in more detail.'});
 const query=[deviceType,brand,model,problem].filter(Boolean).join(' ');
 const docs=retrieve(query); const sw=language==='sw';
 const safety=sw
  ? 'Ikiwa kuna moshi, cheche, harufu ya kuungua, betri kuvimba au kifaa kina joto kali, acha kukitumia na tafuta fundi mwenye sifa. Usifungue kifaa ikiwa huna utaalamu.'
  : 'If there is smoke, sparks, a burning smell, a swollen battery, or extreme heat, stop using the device and seek qualified service. Do not open it unless qualified.';
 if(!docs.length){
  return res.json({title:sw?'Sijaona mwongozo unaolingana kwenye Knowledge Base':'No matching guide found in the Knowledge Base',
   causes:sw?'Sijapata faili lenye taarifa zinazolingana vya kutosha na maelezo haya. Sitabuni sababu. Tafadhali ongeza brand, model, ujumbe kamili wa error na dalili mahususi.':'I could not find a knowledge file that matches these symptoms closely enough. I will not invent a cause. Add the exact brand, model, full error message, and specific symptoms.',
   steps:sw?['Thibitisha aina ya kifaa, brand na model kamili.','Nakili ujumbe wote wa error kama upo.','Eleza dalili zinazoonekana na lini zilianza.']:['Confirm the device type, exact brand and model.','Copy the complete error message, if any.','Describe the observable symptoms and when they began.'],
   followUp:[],confidence:'low',warning:safety,sources:[],knowledgeMatched:[],engine:'Local knowledge-file retrieval'});
 }
 const first=docs[0];
 const symptomLines=section(first.text,['symptoms','overview','description']);
 let causes=sw
  ? 'Nimepata mwongozo unaohusiana kwenye Knowledge Base. Maelezo yafuatayo yametolewa kwenye faili husika; baadhi ya nyaraka za chanzo zimeandikwa kwa Kiingereza.'
  : 'I found relevant material in the local Knowledge Base. The guidance below is extracted from the matching files, not generated from a guess.';
 if(symptomLines.length) causes+='\n\n'+symptomLines.join(' ');
 let steps=[]; let cautions=[];
 for(const d of docs){
  const safe=section(d.text,['safe checks','troubleshooting steps','recommended steps','steps','diagnosis']);
  for(const item of safe) if(!steps.includes(item)) steps.push(item);
  const caution=section(d.text,['cautions','warnings','safety']);
  for(const item of caution) if(!cautions.includes(item)) cautions.push(item);
 }
 if(!steps.length){
  for(const d of docs){ const paragraphs=d.text.split(/\r?\n/).map(x=>x.trim()).filter(x=>x && !x.startsWith('#'));
   for(const para of paragraphs) if(!steps.includes(para)) steps.push(para);
  }
 }
 steps=steps.slice(0,12);
 const warning=[...cautions,safety].join(' ');
 const title=first.title.replace(/\s+/g,' ').trim();
 return res.json({title,causes,steps,followUp:[],confidence:docs.length>1?'medium':'low',warning,
  sources:docs.map(d=>d.file),knowledgeMatched:docs.map(d=>({file:d.file,score:Number(d.score.toFixed(2))})),
  retrievedDocuments:docs.map(d=>({title:d.title,file:d.file,excerpt:d.text.slice(0,1800)})),
  engine:'Local knowledge-file retrieval and evidence-based response assembly'});
});
// API routes always return JSON, including unknown routes and server errors.
app.use('/api', (req,res) => res.status(404).json({error:`API endpoint not found: ${req.method} ${req.originalUrl}`}));
app.use((err,_req,res,_next) => {
 console.error('DigiDoctor server error:', err);
 if(res.headersSent) return;
 res.status(500).json({error:'The diagnostic server encountered an internal error. Check the terminal for details.'});
});
app.listen(PORT,'0.0.0.0',()=>console.log(`DigiDoctor offline diagnostic system running at http://localhost:${PORT}`));
