import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Lightweight visitor analytics.
// Active users = unique browsers that sent a heartbeat within the last 75 seconds.
// The JSON file keeps totals across normal server restarts. Some hosts (including
// ephemeral deployments) may reset local files when a new instance is created.
const ANALYTICS_FILE = path.join(__dirname, 'analytics.json');
const ACTIVE_WINDOW_MS = 75 * 1000;
let analytics = { totalVisits: 0, uniqueVisitors: 0, uniqueDownloaders: 0, visitors: {}, daily: {} };
try {
  if (fs.existsSync(ANALYTICS_FILE)) {
    analytics = { ...analytics, ...JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8')) };
  }
} catch (e) {
  console.warn('Could not load analytics.json:', e.message);
}
function saveAnalytics() {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics), 'utf8');
  } catch (e) {
    console.warn('Could not save analytics:', e.message);
  }
}
function cleanAnalytics() {
  const cutoff = Date.now() - ACTIVE_WINDOW_MS;
  for (const [id, data] of Object.entries(analytics.visitors || {})) {
    if (!data || data.lastSeen < cutoff) delete analytics.visitors[id];
  }
}
const PORT = Number(process.env.PORT || 3000);


app.use((req,res,next)=>{
  const origin=req.headers.origin||'';
  if(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)){
    res.setHeader('Access-Control-Allow-Origin',origin);
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  }
  if(req.method==='OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname, { extensions: ['html'] }));

const CHANNEL_KNOWLEDGE = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'ai-knowledge.json'), 'utf8')); } catch(e) { return {channels:[],categories:['Sports','Entertainment','Documentary','Religious','Kids','Movies','News','Music']}; } })();

const SYSTEM_PROMPT = `
You are SavageTech AI, the official assistant built for SavageTech TV.
Creator: Victor Isack, Tanzania. SavageTech TV creator and SavageTech AI creator: Victor Isack.
Your job is to help users understand and use SavageTech TV: channels, categories, player, account, downloads, support, settings, Terms and Privacy.

Built-in categories: Sports, Entertainment, Documentary, Religious, Kids, Movies, News, Music.
The current build has a channel directory that is supplied to you dynamically. Use the channel names and categories from the supplied site context when answering. Never invent a channel.

Category meanings: Sports is for sports programming and matches; Entertainment for general entertainment; Documentary for factual/educational programming; Religious for faith-based programming; Kids for children; Movies for film channels; News for news/current-affairs channels; Music for music programming.

Terms summary: users agree to use SavageTech TV responsibly and legally; channel availability and streaming quality can change; features/channels may be changed; users should review the current Terms page.
Privacy summary: SavageTech TV may store basic preferences needed for the platform, may use browser local storage for preferences/theme/channel configuration, some streams use third parties, and the service does not intentionally sell personal information to third parties according to the current policy text.

Download rules: the website can offer platform-specific builds only when the creator has uploaded the real file or official store link. Do not claim an APK, IPA, EXE or DMG exists if no URL is supplied. Standard iPhone installation normally uses App Store/TestFlight rather than directly installing an IPA from a website.

Identity rules: when a signed-in user is supplied, address them by their username naturally, including greetings or goodbyes. If no signed-in user is supplied, tell them they need to sign in/create an account for personalized recognition. Never call the creator Victor_the_IT; the creator is Victor Isack.

Formatting: do not use Markdown bold with double asterisks. For quotations, prefer normal quotation marks like "this". Keep answers clear and friendly. If asked about unrelated topics, say you are focused on SavageTech TV and its features.
`;


function dayKey(ts=Date.now()) {
  return new Date(ts).toISOString().slice(0,10);
}
function ensureDay(key) {
  if (!analytics.daily) analytics.daily = {};
  if (!analytics.daily[key]) analytics.daily[key] = { visitors: [], chats: 0, downloads: 0 };
  return analytics.daily[key];
}
function addUnique(arr, value) {
  if (!arr.includes(value)) arr.push(value);
}
function periodStats(days) {
  const now = new Date();
  const cutoff = new Date(now.getTime() - (days-1)*86400000);
  const rows = Object.entries(analytics.daily || {}).filter(([key]) => key >= cutoff.toISOString().slice(0,10));
  const visitors = new Set(), chats = 0, downloads = 0;
  let c=0,d=0;
  for (const [,v] of rows) {
    (v.visitors || []).forEach(x => visitors.add(x));
    c += Number(v.chats||0); d += Number(v.downloads||0);
  }
  return { users: visitors.size, chats:c, downloads:d };
}

app.post('/api/analytics/event', (req, res) => {
  const visitorId = String(req.body?.visitorId || '').slice(0, 100);
  const type = String(req.body?.type || '').slice(0, 40);
  if (!visitorId || !['pageview','heartbeat','chat','download'].includes(type)) return res.status(400).json({ ok:false });

  const now = Date.now(), day = ensureDay(dayKey(now));
  if (!analytics.visitors[visitorId]) {
    analytics.visitors[visitorId] = { firstSeen: now, lastSeen: now };
    analytics.uniqueVisitors += 1;
  } else {
    analytics.visitors[visitorId].lastSeen = now;
  }
  if (type === 'pageview') {
    analytics.totalVisits += 1;
    addUnique(day.visitors, visitorId);
  } else if (type === 'chat') {
    day.chats += 1;
    addUnique(day.visitors, visitorId);
  } else if (type === 'download') {
    day.downloads += 1;
    if (!analytics.visitors[visitorId].downloaded) { analytics.visitors[visitorId].downloaded = true; analytics.uniqueDownloaders += 1; }
    addUnique(day.visitors, visitorId);
  }
  cleanAnalytics();
  saveAnalytics();
  res.json({ ok:true });
});

// Backward-compatible heartbeat endpoint.
app.post('/api/analytics/heartbeat', (req, res) => {
  req.body = { ...(req.body||{}), type:'heartbeat' };
  const visitorId = String(req.body?.visitorId || '').slice(0,100);
  if (!visitorId) return res.status(400).json({ok:false});
  const now=Date.now();
  if(!analytics.visitors[visitorId]){ analytics.visitors[visitorId]={firstSeen:now,lastSeen:now}; analytics.uniqueVisitors+=1; }
  else analytics.visitors[visitorId].lastSeen=now;
  cleanAnalytics(); saveAnalytics(); res.json({ok:true});
});

app.get('/api/analytics/stats', (req, res) => {
  cleanAnalytics();
  const day=periodStats(1), week=periodStats(7), month=periodStats(30), year=periodStats(365);
  res.json({
    ok:true,
    activeUsers:Object.keys(analytics.visitors||{}).length,
    uniqueVisitors:analytics.uniqueVisitors||0,
    totalVisits:analytics.totalVisits||0,
    totalDownloads:Object.values(analytics.daily||{}).reduce((n,v)=>n+Number(v.downloads||0),0),
    uniqueDownloaders:analytics.uniqueDownloaders||0,
    today:day, week, month, year,
    updatedAt:new Date().toISOString()
  });
});

// Feedback is delivered to the SavageTech support inbox through SMTP.
// Read environment variables at request time so Render Secure Variables are
// honored after a normal deployment/restart and so common SMTP aliases work.
const RATINGS_FILE = path.join(__dirname, 'ratings.json');
let ratings=[]; try{ if(fs.existsSync(RATINGS_FILE)) ratings=JSON.parse(fs.readFileSync(RATINGS_FILE,'utf8'))||[]; }catch(e){ratings=[]}
function saveRatings(){try{fs.writeFileSync(RATINGS_FILE,JSON.stringify(ratings),'utf8')}catch(e){}}
app.get('/api/ratings/summary',(req,res)=>{const count=ratings.length;const average=count?ratings.reduce((a,r)=>a+Number(r.stars||0),0)/count:0;res.json({ok:true,count,average})});
app.post('/api/ratings',(req,res)=>{const username=String(req.body?.username||'').trim().slice(0,50);const message=String(req.body?.message||'').trim().slice(0,1000);const stars=Number(req.body?.stars||0);if(!username||!message||stars<1||stars>5)return res.status(400).json({ok:false,error:'Username, message and a 1–5 star rating are required.'});ratings.push({username,message,stars,createdAt:new Date().toISOString()});saveRatings();res.json({ok:true})});

app.post('/api/chat', (req, res) => {
  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const last = messages.filter(m => m && m.role === 'user').pop();
  if (!last?.content) return res.status(400).json({ reply:'Please enter a SavageTech TV question.' });
  // The real response engine runs in savagetech-ai.html from the local SavageTech knowledge base.
  // This endpoint remains only as a compatibility route and never requires an API key.
  res.json({ reply:'SavageTech AI is running in local knowledge mode. Please use the SavageTech AI page.' });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, aiMode: 'local-knowledge', apiKeyRequired: false });
});

// Helpful aliases for hosts that rewrite extensionless routes.
app.get('/player', (req, res) => res.sendFile(path.join(__dirname, 'player.html')));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/ai', (req, res) => res.sendFile(path.join(__dirname, 'savagetech-ai.html')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));


/* ==========================================================
   UNIVERSAL STREAM PROXY
   Browser pages cannot load many cross-origin streams because
   of CORS, and HTTPS pages cannot directly load HTTP media
   (mixed content). These endpoints keep the original stream
   URL in app.js while the server fetches it for the browser.

   NOTE: This does not bypass DRM, login tokens, geo-blocking,
   referer requirements, or provider-side access controls.
========================================================== */
function absoluteUrl(base, value) {
  try { return new URL(value, base).toString(); } catch (e) { return value; }
}
function proxyMediaUrl(u) {
  return `/api/stream-proxy?url=${encodeURIComponent(u)}`;
}
function rewriteM3U8(text, baseUrl) {
  return text.split(/\r?\n/).map(line => {
    const trimmed=line.trim();
    if(!trimmed || trimmed.startsWith('#EXTM3U')) return line;
    // Rewrite URI="..." attributes used by keys, maps and other tags.
    if(trimmed.startsWith('#')){
      return line.replace(/URI="([^"]+)"/g, (_,u)=>`URI="${proxyMediaUrl(absoluteUrl(baseUrl,u))}"`);
    }
    return proxyMediaUrl(absoluteUrl(baseUrl,trimmed));
  }).join('\n');
}
function rewriteMPD(text, baseUrl) {
  // Keep XML intact while making common BaseURL/media/initialization
  // references go back through the same proxy.
  let out=text.replace(/(<BaseURL[^>]*>)([\s\S]*?)(<\/BaseURL>)/gi,(m,a,u,b)=>a+proxyMediaUrl(absoluteUrl(baseUrl,u.trim()))+b);
  out=out.replace(/\b(initialization|media)="([^"]+)"/gi,(m,k,u)=>`${k}="${proxyMediaUrl(absoluteUrl(baseUrl,u))}"`);
  return out;
}
async function fetchRemote(req,res,target){
  let u;
  try { u=new URL(target); } catch(e) { return res.status(400).send('Invalid stream URL'); }
  if(!/^https?:$/.test(u.protocol)) return res.status(400).send('Only HTTP/HTTPS stream URLs are supported');
  const headers={};
  if(req.headers.range) headers.Range=req.headers.range;
  if(req.headers['user-agent']) headers['User-Agent']=req.headers['user-agent'];
  try{
    const r=await fetch(u,{headers,redirect:'follow'});
    if(!r.ok && r.status!==206) return res.status(r.status).send(`Upstream stream returned HTTP ${r.status}`);
    for(const h of ['content-type','content-length','content-range','accept-ranges','etag','last-modified']){
      const v=r.headers.get(h); if(v) res.setHeader(h,v);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Cache-Control','no-store');
    const ct=(r.headers.get('content-type')||'').toLowerCase();
    const pathname=u.pathname.toLowerCase();
    const isM3U8=ct.includes('mpegurl')||ct.includes('vnd.apple.mpegurl')||pathname.endsWith('.m3u8');
    const isMPD=ct.includes('dash+xml')||pathname.endsWith('.mpd');
    if(isM3U8||isMPD){
      const body=await r.text();
      res.setHeader('Content-Type',isM3U8?'application/vnd.apple.mpegurl':'application/dash+xml');
      return res.status(r.status).send(isM3U8?rewriteM3U8(body,r.url):rewriteMPD(body,r.url));
    }
    if(!r.body) return res.status(502).send('No upstream response body');
    const reader=r.body.getReader();
    res.on('close',()=>{try{reader.cancel()}catch(e){}});
    while(true){
      const {done,value}=await reader.read();
      if(done) break;
      if(!res.write(Buffer.from(value))) await new Promise(resolve=>res.once('drain',resolve));
    }
    res.end();
  }catch(e){
    if(!res.headersSent) res.status(502).send(`Stream proxy error: ${e.message}`);
  }
}
app.get('/api/stream-proxy', (req,res)=>{
  const target=String(req.query.url||'');
  if(!target) return res.status(400).send('Missing url');
  fetchRemote(req,res,target);
});

/* ==========================================================
   MPEG-TS -> HLS TRANSCODER
   Raw .ts is not a browser-native streaming format. For .ts
   links the player asks this endpoint to create a short rolling
   HLS presentation using the bundled ffmpeg-static binary.
========================================================== */
const tsSessions=new Map();
const TS_ROOT=path.join(os.tmpdir(),'savagetech-ts');
fs.mkdirSync(TS_ROOT,{recursive:true});
function cleanupTsSession(id){
  const s=tsSessions.get(id);
  if(!s)return;
  try{s.proc?.kill('SIGTERM')}catch(e){}
  try{fs.rmSync(s.dir,{recursive:true,force:true})}catch(e){}
  tsSessions.delete(id);
}
function createTsSession(source){
  const id=crypto.randomBytes(12).toString('hex');
  const dir=path.join(TS_ROOT,id);
  fs.mkdirSync(dir,{recursive:true});
  const playlist=path.join(dir,'index.m3u8');
  const args=[
    '-hide_banner','-loglevel','error',
    '-reconnect','1','-reconnect_streamed','1','-reconnect_delay_max','5',
    '-i',source,
    '-map','0:v:0?','-map','0:a:0?',
    '-c:v','libx264','-preset','ultrafast','-tune','zerolatency','-pix_fmt','yuv420p',
    '-c:a','aac','-b:a','96k','-ac','2',
    '-f','hls','-hls_time','1','-hls_list_size','5',
    '-hls_flags','delete_segments+append_list+independent_segments',
    playlist
  ];
  const proc=spawn(ffmpegPath||'ffmpeg',args,{stdio:['ignore','ignore','pipe']});
  const session={id,dir,playlist,proc,source,createdAt:Date.now()};
  tsSessions.set(id,session);
  proc.stderr.on('data',d=>console.warn('[TS ffmpeg]',String(d).trim()));
  proc.on('exit',()=>{ if(tsSessions.has(id)) setTimeout(()=>cleanupTsSession(id),15000); });
  setTimeout(()=>cleanupTsSession(id),30*60*1000);
  return session;
}
function waitForFile(file,ms=12000){
  return new Promise(resolve=>{
    const start=Date.now();
    const t=setInterval(()=>{
      if(fs.existsSync(file)){clearInterval(t);resolve(true)}
      else if(Date.now()-start>ms){clearInterval(t);resolve(false)}
    },200);
  });
}
app.get('/api/ts-status', (req,res)=>{
  const source=String(req.query.url||'');
  if(!/^https?:\/\//i.test(source)) return res.status(400).json({ok:false,error:'Invalid HTTP/HTTPS .ts URL'});
  const active=[...tsSessions.values()].filter(s=>s.source===source).map(s=>({id:s.id,ageMs:Date.now()-s.createdAt,playlist:fs.existsSync(s.playlist),running:!s.proc?.killed}));
  res.json({ok:true,active});
});

app.get('/api/ts-hls', async (req,res)=>{
  const source=String(req.query.url||'');
  if(!/^https?:\/\//i.test(source)) return res.status(400).send('Invalid HTTP/HTTPS .ts URL');
  let session=createTsSession(source);
  const ok=await waitForFile(session.playlist,15000);
  if(!ok) return res.status(502).send('FFmpeg could not open the MPEG-TS stream. Check the URL and server logs.');
  const raw=fs.readFileSync(session.playlist,'utf8');
  const base=`/api/ts-segment/${session.id}/`;
  const out=raw.split(/\r?\n/).map(line=>{
    const t=line.trim();
    if(!t || t.startsWith('#')) return line;
    return base+encodeURIComponent(t);
  }).join('\n');
  res.setHeader('Content-Type','application/vnd.apple.mpegurl');
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','no-store');
  res.send(out);
});

/* ==========================================================
   MKV -> HLS TRANSCODER
   Browsers have inconsistent native MKV support. This endpoint
   uses the bundled FFmpeg process to convert remote .mkv media
   into a short rolling HLS presentation that the web player can
   play reliably. It does not bypass DRM/authentication.
========================================================== */
const mkvSessions=new Map();
const MKV_ROOT=path.join(os.tmpdir(),'savagetech-mkv');
fs.mkdirSync(MKV_ROOT,{recursive:true});

function cleanupMkvSession(id){
  const s=mkvSessions.get(id);
  if(!s)return;
  try{s.proc?.kill('SIGTERM')}catch(e){}
  try{fs.rmSync(s.dir,{recursive:true,force:true})}catch(e){}
  mkvSessions.delete(id);
}

function createMkvSession(source){
  const id=crypto.randomBytes(12).toString('hex');
  const dir=path.join(MKV_ROOT,id);
  fs.mkdirSync(dir,{recursive:true});
  const playlist=path.join(dir,'index.m3u8');
  const args=[
    '-hide_banner','-loglevel','error',
    '-reconnect','1','-reconnect_streamed','1','-reconnect_delay_max','5',
    '-i',source,
    '-map','0:v:0?','-map','0:a:0?',
    '-c:v','libx264','-preset','veryfast','-pix_fmt','yuv420p',
    '-c:a','aac','-b:a','128k','-ac','2',
    '-f','hls','-hls_time','4','-hls_list_size','8',
    '-hls_flags','delete_segments+append_list',
    playlist
  ];
  const proc=spawn(ffmpegPath||'ffmpeg',args,{stdio:['ignore','ignore','pipe']});
  const session={id,dir,playlist,proc,source,createdAt:Date.now()};
  mkvSessions.set(id,session);
  proc.stderr.on('data',d=>console.warn('[MKV ffmpeg]',String(d).trim()));
  proc.on('exit',()=>{ if(mkvSessions.has(id)) setTimeout(()=>cleanupMkvSession(id),15000); });
  setTimeout(()=>cleanupMkvSession(id),60*60*1000);
  return session;
}

app.get('/api/mkv-hls', async (req,res)=>{
  const source=String(req.query.url||'');
  if(!/^https?:\/\//i.test(source)) return res.status(400).send('Invalid HTTP/HTTPS .mkv URL');
  const session=createMkvSession(source);
  const ok=await waitForFile(session.playlist,20000);
  if(!ok) return res.status(502).send('FFmpeg could not open the MKV media. Check the URL and server logs.');
  const raw=fs.readFileSync(session.playlist,'utf8');
  const base=`/api/mkv-segment/${session.id}/`;
  const out=raw.split(/\r?\n/).map(line=>{
    const t=line.trim();
    if(!t || t.startsWith('#')) return line;
    return base+encodeURIComponent(t);
  }).join('\n');
  res.setHeader('Content-Type','application/vnd.apple.mpegurl');
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','no-store');
  res.send(out);
});

app.get('/api/mkv-segment/:id/:file', async (req,res)=>{
  const s=mkvSessions.get(req.params.id);
  if(!s)return res.status(404).send('MKV session expired');
  const file=decodeURIComponent(req.params.file);
  if(file.includes('/')||file.includes('\\')||file.includes('..')) return res.status(400).send('Invalid segment');
  const full=path.join(s.dir,file);
  if(!fs.existsSync(full)) return res.status(404).send('Segment not ready');
  res.setHeader('Content-Type',file.endsWith('.m3u8')?'application/vnd.apple.mpegurl':'video/mp2t');
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Access-Control-Allow-Origin','*');
  fs.createReadStream(full).pipe(res);
});

app.get('/api/ts-segment/:id/:file', async (req,res)=>{
  const s=tsSessions.get(req.params.id);
  if(!s)return res.status(404).send('TS session expired');
  const file=decodeURIComponent(req.params.file);
  if(file.includes('/')||file.includes('\\')||file.includes('..')) return res.status(400).send('Invalid segment');
  const full=path.join(s.dir,file);
  if(!fs.existsSync(full)) return res.status(404).send('Segment not ready');
  res.setHeader('Content-Type',file.endsWith('.m3u8')?'application/vnd.apple.mpegurl':'video/mp2t');
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Access-Control-Allow-Origin','*');
  fs.createReadStream(full).pipe(res);
});

app.listen(PORT, () => {
  console.log(`SavageTech TV running on port ${PORT}`);
});
