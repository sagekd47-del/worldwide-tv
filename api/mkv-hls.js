import { forwardToMediaBackend } from '../lib/vercel.js';
export async function GET(request){return forwardToMediaBackend('/api/mkv-hls',request,{rewritePlaylist:true});}
