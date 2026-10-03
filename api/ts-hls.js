import { forwardToMediaBackend } from './_lib.js';
export async function GET(request){return forwardToMediaBackend('/api/ts-hls',request,{rewritePlaylist:true});}
