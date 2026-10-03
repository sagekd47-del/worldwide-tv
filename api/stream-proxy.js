import { validHttpUrl, corsHeaders } from './_lib.js';
function abs(base,v){try{return new URL(v,base).toString()}catch{return v}}
function proxyLink(origin,u){return origin+'/api/stream-proxy?url='+encodeURIComponent(u)}
function rewriteM3U8(text,base,origin){return text.split(/\r?\n/).map(line=>{const t=line.trim();if(!t)return line;if(t.startsWith('#'))return line.replace(/URI="([^"]+)"/g,(_,u)=>`URI="${proxyLink(origin,abs(base,u))}"`);return proxyLink(origin,abs(base,t))}).join('\n')}
function rewriteMPD(text,base,origin){let out=text.replace(/(<BaseURL[^>]*>)([\s\S]*?)(<\/BaseURL>)/gi,(_,a,u,b)=>a+proxyLink(origin,abs(base,u.trim()))+b);out=out.replace(/\b(initialization|media)="([^"]+)"/gi,(_,k,u)=>`${k}="${proxyLink(origin,abs(base,u))}"`);return out}
export async function GET(request){
  const u=validHttpUrl(new URL(request.url).searchParams.get('url')); if(!u)return new Response('Invalid or blocked HTTP/HTTPS stream URL',{status:400});
  const headers={}; const range=request.headers.get('range'); if(range)headers.Range=range; const ua=request.headers.get('user-agent'); if(ua)headers['User-Agent']=ua;
  let r; try{r=await fetch(u,{headers,redirect:'follow'})}catch(e){return new Response('Stream proxy error: '+e.message,{status:502})}
  if(!r.ok&&r.status!==206)return new Response(`Upstream stream returned HTTP ${r.status}`,{status:r.status});
  const ct=(r.headers.get('content-type')||'').toLowerCase(), path=u.pathname.toLowerCase();
  const isM3U8=ct.includes('mpegurl')||ct.includes('vnd.apple.mpegurl')||path.endsWith('.m3u8'); const isMPD=ct.includes('dash+xml')||path.endsWith('.mpd');
  if(isM3U8||isMPD){const body=await r.text();const text=isM3U8?rewriteM3U8(body,r.url,new URL(request.url).origin):rewriteMPD(body,r.url,new URL(request.url).origin);return new Response(text,{status:r.status,headers:corsHeaders(isM3U8?'application/vnd.apple.mpegurl':'application/dash+xml')})}
  const h=corsHeaders(ct||'application/octet-stream'); for(const k of ['content-length','content-range','accept-ranges','etag','last-modified']){const v=r.headers.get(k);if(v)h.set(k,v)} return new Response(r.body,{status:r.status,headers:h});
}
