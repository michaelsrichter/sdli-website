// Smoke tests for a deployed environment. Usage: node scripts/smoke.mjs https://<host>
const base = (process.argv[2] || process.env.SMOKE_BASE_URL || '').replace(/\/$/, '');
if (!base) {
  console.error('Usage: node scripts/smoke.mjs https://your-site');
  process.exit(1);
}
const results = [];
const check = async (name, fn) => {
  try {
    const detail = await fn();
    results.push({ name, ok: true, detail: detail ?? '' });
  } catch (e) {
    results.push({ name, ok: false, detail: e.message });
  }
};
const get = (path, opts = {}) => fetch(base + path, { redirect: 'manual', ...opts });
const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

await check('Homepage loads with the next SDLI dance', async () => {
  const r = await get('/');
  assert(r.status === 200, `status ${r.status}`);
  const html = await r.text();
  assert(html.includes('Next SDLI dance'), 'missing "Next SDLI dance"');
  return html.match(/<title>([^<]+)/)?.[1];
});
await check('Community page and community calendar feed', async () => {
  const r = await get('/community/');
  assert(r.status === 200, `status ${r.status}`);
  const html = await r.text();
  assert(html.includes('Triple Step Swing'), 'organizer missing');
  const feed = await get('/events/community-events.ics');
  assert(/text\/calendar/.test(feed.headers.get('content-type') || ''), `content-type ${feed.headers.get('content-type')}`);
  return `${((await feed.text()).match(/BEGIN:VEVENT/g) || []).length} community events in feed`;
});
await check('Security headers', async () => {
  const h = (await get('/')).headers;
  for (const k of ['content-security-policy', 'x-content-type-options', 'referrer-policy', 'permissions-policy', 'strict-transport-security']) assert(h.get(k), `missing ${k}`);
  assert(/frame-ancestors 'none'/.test(h.get('content-security-policy')), 'CSP missing frame-ancestors');
  assert(!/unsafe-inline/.test(h.get('content-security-policy').split('style-src')[0]), "script-src allows 'unsafe-inline'");
  return 'CSP, nosniff, referrer, permissions, HSTS present';
});
await check('Hashed assets are cached for a year', async () => {
  const html = await (await get('/')).text();
  const css = html.match(/href="(\/_astro\/[^"]+\.css)"/)?.[1];
  assert(css, 'no stylesheet found');
  const cc = (await get(css)).headers.get('cache-control') || '';
  assert(/immutable/.test(cc), `cache-control: ${cc}`);
  return cc;
});
for (const [from, to] of [
  ['/index.php', '/'],
  ['/index.php/sdli/news/membership/', '/membership/'],
  ['/index.php/sdli/news/contact/', '/contact/'],
  ['/index.php/sdli/venues/huntingtin_moose_lodge/', '/venues/huntington-moose-lodge/'],
  ['/index.php/sdli/events/swing_dance_every_tuesday/', '/events/series/tuesday-night-swing/'],
  ['/index.php/sdli/rss_2.0/', '/events/rss.xml'],
]) {
  await check(`301 ${from}`, async () => {
    const r = await get(from);
    assert(r.status === 301, `status ${r.status}`);
    const loc = new URL(r.headers.get('location'), base).pathname;
    assert(loc === to, `location ${loc}`);
    return `→ ${loc}`;
  });
}
await check('Legacy archive page redirects (meta refresh)', async () => {
  const r = await get('/index.php/sdli/events_archive/gail_storm_band5/');
  assert(r.status === 200 || r.status === 301, `status ${r.status}`);
  const html = await r.text();
  assert(html.includes('url=/events/2026-08-18-gail-storm-band/'), 'wrong target');
  return '→ /events/2026-08-18-gail-storm-band/';
});
await check('Custom 404', async () => {
  const r = await get('/no-such-page/');
  assert(r.status === 404, `status ${r.status}`);
  assert((await r.text()).includes('Oops, we missed a step'), 'not the custom page');
});
await check('Sitemap', async () => {
  const r = await get('/sitemap-index.xml');
  assert(r.status === 200, `status ${r.status}`);
  const s = await (await get('/sitemap-0.xml')).text();
  const n = (s.match(/<loc>/g) || []).length;
  assert(n > 100, `only ${n} URLs`);
  return `${n} URLs`;
});
await check('robots.txt', async () => {
  const t = await (await get('/robots.txt')).text();
  assert(/User-agent/.test(t), 'invalid');
  return t.includes('Disallow: /\n') ? 'pre-launch: indexing disabled' : 'indexing allowed';
});
await check('llms.txt', async () => {
  const t = await (await get('/llms.txt')).text();
  assert(t.includes('(631) 476-3707'), 'missing hotline');
});
await check('Calendar feed and event .ics', async () => {
  const feed = await get('/events/sdli-events.ics');
  assert(/text\/calendar/.test(feed.headers.get('content-type') || ''), `content-type ${feed.headers.get('content-type')}`);
  const body = await feed.text();
  assert(body.startsWith('BEGIN:VCALENDAR'), 'not iCalendar');
  return `${(body.match(/BEGIN:VEVENT/g) || []).length} events in feed`;
});
await check('Event structured data', async () => {
  const html = await (await get('/events/2026-09-29-band-night-playing-favorites/')).text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const ev = blocks.find((b) => b['@type'] === 'DanceEvent');
  assert(ev && ev.startDate === '2026-09-29T19:30:00-04:00', 'DanceEvent missing or wrong date');
  return `${ev.name} @ ${ev.location?.name}`;
});
await check('CMS admin page', async () => {
  const r = await get('/admin/');
  assert(r.status === 200, `status ${r.status}`);
  assert((await r.text()).includes('decap-cms.js'), 'bundle not referenced');
  const js = await get('/admin/decap-cms.js', { method: 'HEAD' });
  assert(js.status === 200, `bundle status ${js.status}`);
  const cfg = await (await get('/admin/config.yml')).text();
  assert(cfg.includes('michaelsrichter/sdli-website'), 'config not found');
});
await check('CMS sign-in endpoint', async () => {
  const r = await get('/api/auth?provider=github&scope=public_repo');
  if (r.status === 302) return `redirects to ${new URL(r.headers.get('location')).host} (OAuth configured)`;
  assert(r.status === 503, `status ${r.status}`);
  return '503: GitHub OAuth app not configured yet (manual step)';
});
await check('Telemetry endpoint accepts a same-origin beacon', async () => {
  const r = await get('/api/telemetry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify({ v: 1, page: '/', pageType: 'smoke', release: 'smoke-test', items: [{ name: 'page_view', props: {} }] }),
  });
  assert(r.status === 204, `status ${r.status}`);
});
await check('Telemetry endpoint rejects cross-origin posts', async () => {
  const r = await get('/api/telemetry', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://evil.example' }, body: '{}' });
  assert(r.status === 403, `status ${r.status}`);
});

const width = Math.max(...results.map((r) => r.name.length));
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name.padEnd(width)}  ${r.detail}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} smoke checks passed against ${base}`);
process.exit(failed ? 1 : 0);
