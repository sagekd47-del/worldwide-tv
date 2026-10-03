import { memory, json, getClientId, visitorDay } from '../_lib.js';
export async function POST(request) {
  let body={}; try { body=await request.json(); } catch {}
  const visitorId=getClientId(body); const type=String(body?.type||'').slice(0,40);
  if(!visitorId || !['pageview','heartbeat','chat','download'].includes(type)) return json({ok:false},400);
  const now=Date.now(), day=visitorDay();
  let v=memory.analytics.visitors.get(visitorId);
  if(!v){ v={firstSeen:now,lastSeen:now,downloaded:false}; memory.analytics.visitors.set(visitorId,v); memory.analytics.uniqueVisitors++; }
  else v.lastSeen=now;
  if(!memory.analytics.daily.has(day)) memory.analytics.daily.set(day,{visitors:new Set(),chats:0,downloads:0});
  const d=memory.analytics.daily.get(day); d.visitors.add(visitorId);
  if(type==='pageview') memory.analytics.totalVisits++;
  if(type==='chat') d.chats++;
  if(type==='download'){ d.downloads++; if(!v.downloaded){v.downloaded=true;memory.analytics.uniqueDownloaders++;} }
  const cutoff=now-75_000; for(const [id,x] of memory.analytics.visitors) if(x.lastSeen<cutoff) memory.analytics.visitors.delete(id);
  return json({ok:true});
}
