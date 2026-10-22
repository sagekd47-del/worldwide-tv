const memory = globalThis.__SAVAGETECH_VERCEL_MEMORY ||= {
  analytics: { totalVisits: 0, uniqueVisitors: 0, uniqueDownloaders: 0, visitors: new Map(), daily: new Map() },
  ratings: []
};

export function json(data, status=200, extra={}) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...extra } });
}

export function visitorDay() {
  return new Date().toISOString().slice(0, 10);
}

export function getClientId(body) {
  return String(body?.visitorId || '').slice(0, 100);
}

export function getMediaBackend() {
  return String(process.env.MEDIA_BACKEND_URL || '').trim().replace(/\/$/, '');
}

export function validHttpUrl(value) {
  try {
    const u = new URL(String(value || ''));
    if (!['http:', 'https:'].includes(u.protocol)) return null;
    const host = u.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '::1') return null;
    if (/^(10|127)\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host) || /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return null;
    return u;
  } catch { return null; }
}

export function corsHeaders(contentType) {
  const h = new Headers({ 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' });
  if (contentType) h.set('Content-Type', contentType);
  return h;
}

export async function forwardToMediaBackend(pathname, request, { rewritePlaylist=false, segmentPrefix='' }={}) {
  const base = getMediaBackend();
  if (!base) return json({ ok:false, error:'MEDIA_BACKEND_URL is not configured. Deploy media-backend and add its URL to Vercel Environment Variables.' }, 503);
  const incoming = new URL(request.url);
  const target = new URL(pathname, base + '/');
  target.search = incoming.search;
  const headers = new Headers();
  for (const name of ['range','user-agent','accept','content-type']) {
    const value = request.headers.get(name); if (value) headers.set(name, value);
  }
  let upstream;
  try { upstream = await fetch(target, { method: request.method, headers, redirect: 'follow' }); }
  catch (e) { return json({ ok:false, error:`Media backend connection failed: ${e.message}` }, 502); }
  if (!upstream.ok) return new Response(upstream.body, { status: upstream.status, headers: upstream.headers });
  const ct = upstream.headers.get('content-type') || '';
  if (rewritePlaylist && /mpegurl|dash\+xml/i.test(ct)) {
    let text = await upstream.text();
    const origin = new URL(upstream.url);
    const self = new URL(request.url);
    const rewrite = (raw) => {
      try {
        const absolute = new URL(raw, origin).toString();
        const parsed = new URL(absolute);
        const tsMatch = parsed.pathname.match(/\/api\/ts-segment\/([^/]+)\/([^/]+)$/);
        if (tsMatch) {
          return self.origin + '/api/ts-segment?session=' + encodeURIComponent(tsMatch[1]) + '&file=' + encodeURIComponent(tsMatch[2]);
        }
        const mkvMatch = parsed.pathname.match(/\/api\/mkv-segment\/([^/]+)\/([^/]+)$/);
        if (mkvMatch) {
          return self.origin + '/api/mkv-segment?session=' + encodeURIComponent(mkvMatch[1]) + '&file=' + encodeURIComponent(mkvMatch[2]);
        }
        return self.origin + '/api/stream-proxy?url=' + encodeURIComponent(absolute);
      } catch { return raw; }
    };
    text = text.split(/\r?\n/).map(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        if (trimmed.startsWith('#') && /URI="([^"]+)"/.test(line)) return line.replace(/URI="([^"]+)"/g, (_,u)=>`URI="${rewrite(u)}"`);
        return line;
      }
      return rewrite(trimmed);
    }).join('\n');
    return new Response(text, { status: upstream.status, headers: corsHeaders(ct.includes('dash') ? 'application/dash+xml' : 'application/vnd.apple.mpegurl') });
  }
  const outHeaders = new Headers();
  for (const h of ['content-type','content-length','content-range','accept-ranges','etag','last-modified','cache-control']) {
    const v=upstream.headers.get(h); if(v) outHeaders.set(h,v);
  }
  outHeaders.set('Access-Control-Allow-Origin','*');
  outHeaders.set('Cache-Control','no-store');
  return new Response(upstream.body, { status: upstream.status, headers: outHeaders });
}
