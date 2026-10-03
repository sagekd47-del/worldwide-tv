/* SavageTech TV analytics client */
(function () {
  if (location.pathname.endsWith('/admin.html') || location.pathname.endsWith('admin.html')) return;

  const KEY = 'st_visitor_id';
  let visitorId = localStorage.getItem(KEY);
  if (!visitorId) {
    visitorId = (window.crypto && crypto.randomUUID ? crypto.randomUUID() :
      'st-' + Date.now() + '-' + Math.random().toString(36).slice(2));
    localStorage.setItem(KEY, visitorId);
  }

  async function event(type, extra={}) {
    try {
      await fetch('/api/analytics/event', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ visitorId, type, ...extra }),
        keepalive: true
      });
    } catch (_) {}
  }

  window.SavageTechAnalytics = { visitorId, track: event };
  event('pageview');
  setInterval(() => event('heartbeat'), 20000);
  window.addEventListener('pagehide', () => event('heartbeat'));
})();
