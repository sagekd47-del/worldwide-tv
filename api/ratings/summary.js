import { memory, json } from '../../lib/vercel.js';
export function GET(){const count=memory.ratings.length;const average=count?memory.ratings.reduce((a,r)=>a+Number(r.stars||0),0)/count:0;return json({ok:true,count,average});}
