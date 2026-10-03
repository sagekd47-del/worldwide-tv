import { memory, json } from '../_lib.js';
export async function POST(request){
  let body={}; try{body=await request.json()}catch{}
  const username=String(body?.username||'').trim().slice(0,50);const message=String(body?.message||'').trim().slice(0,1000);const stars=Number(body?.stars||0);
  if(!username||!message||stars<1||stars>5)return json({ok:false,error:'Username, message and a 1–5 star rating are required.'},400);
  memory.ratings.push({username,message,stars,createdAt:new Date().toISOString()});
  return json({ok:true});
}
