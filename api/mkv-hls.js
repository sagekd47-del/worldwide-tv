import { forwardToMediaBackend } from './_lib.js';
export async function GET(request){return forwardToMediaBackend('/api/mkv-hls',request,{rewritePlaylist:true});}
