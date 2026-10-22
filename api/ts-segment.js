import { getMediaBackend, json } from '../lib/vercel.js';
export async function GET(request){
  const u=new URL(request.url); const session=String(u.searchParams.get('session')||''); const file=String(u.searchParams.get('file')||'');
  if(!/^[a-f0-9]{8,64}$/i.test(session) || !/^[^/\\.][^/\\]*\.(ts|m3u8)$/i.test(file)) return json({ok:false,error:'Invalid TS segment request'},400);
  const base=getMediaBackend(); if(!base)return json({ok:false,error:'MEDIA_BACKEND_URL is not configured.'},503);
  const target=new URL(`/api/ts-segment/${encodeURIComponent(session)}/${encodeURIComponent(file)}`,base);
  let r; try{r=await fetch(target)}catch(e){return new Response('Media backend connection failed: '+e.message,{status:502})}
  const h=new Headers({'Access-Control-Allow-Origin':'*','Cache-Control':'no-store','Content-Type':file.toLowerCase().endsWith('.m3u8')?'application/vnd.apple.mpegurl':'video/mp2t'});
  return new Response(r.body,{status:r.status,headers:h});
}
