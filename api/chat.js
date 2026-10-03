export async function POST(request) {
  let body={}; try { body=await request.json(); } catch {}
  const messages=Array.isArray(body.messages)?body.messages:[];
  const last=messages.filter(m=>m&&m.role==='user').pop();
  if(!last?.content) return Response.json({reply:'Please enter a SavageTech TV question.'},{status:400});
  return Response.json({reply:'SavageTech AI is running in local knowledge mode. Please use the SavageTech AI page.'});
}
