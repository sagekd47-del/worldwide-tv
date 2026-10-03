import { memory, json } from '../_lib.js';
function stats(days){
  const cutoff=Date.now()-(days-1)*86400000; const visitors=new Set(); let chats=0,downloads=0;
  for(const [day,d] of memory.analytics.daily){ if(Date.parse(day+'T00:00:00Z')>=cutoff){for(const x of d.visitors)visitors.add(x);chats+=d.chats;downloads+=d.downloads;} }
  return {users:visitors.size,chats,downloads};
}
export function GET(){
  return json({ok:true,activeUsers:memory.analytics.visitors.size,uniqueVisitors:memory.analytics.uniqueVisitors,totalVisits:memory.analytics.totalVisits,totalDownloads:[...memory.analytics.daily.values()].reduce((n,d)=>n+d.downloads,0),uniqueDownloaders:memory.analytics.uniqueDownloaders,today:stats(1),week:stats(7),month:stats(30),year:stats(365),updatedAt:new Date().toISOString(),storage:'ephemeral-vercel-function-memory'});
}
