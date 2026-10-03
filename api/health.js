export function GET() {
  return Response.json({ ok:true, platform:'vercel', aiMode:'local-knowledge', apiKeyRequired:false, mediaBackendConfigured:Boolean(process.env.MEDIA_BACKEND_URL), node:process.version });
}
