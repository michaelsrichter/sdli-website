'use strict';
/** Host helpers for functions running behind Azure Static Web Apps. */

/** Public host the visitor used. SWA forwards the original URL in x-ms-original-url. */
function publicHost(request) {
  const original = request.headers.get('x-ms-original-url');
  if (original) {
    try {
      return new URL(original).host.toLowerCase();
    } catch {
      /* fall through */
    }
  }
  return (request.headers.get('x-forwarded-host') || new URL(request.url).host).toLowerCase();
}

function allowedHosts() {
  return (process.env.ALLOWED_HOSTS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** True for hosts this site may legitimately be served from. */
function isAllowedHost(host) {
  const h = (host || '').toLowerCase();
  const list = allowedHosts();
  if (list.length) return list.includes(h);
  return /(^|\.)azurestaticapps\.net$/.test(h) || /(^|\.)sdli\.org$/.test(h) || /^localhost(:\d+)?$/.test(h) || /^127\.0\.0\.1(:\d+)?$/.test(h);
}

module.exports = { publicHost, isAllowedHost, allowedHosts };
