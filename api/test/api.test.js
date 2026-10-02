'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { validate, createRateLimiter } = require('../src/telemetry-validate');

// Capture function handlers without starting the Functions host.
const functions = require('@azure/functions');
const handlers = {};
functions.app.http = (name, opts) => {
  handlers[name] = opts.handler;
};
require('../src/functions/oauth');
require('../src/functions/telemetry');

const ctx = { warn() {}, log() {} };
function req(url, headers = {}, body) {
  return new Request(url, { method: body ? 'POST' : 'GET', headers, body });
}

test('accepts a valid telemetry batch and strips unknown fields', () => {
  const r = validate(
    JSON.stringify({
      v: 1,
      page: '/events/',
      pageType: 'events',
      release: 'abc123',
      items: [
        { name: 'add_to_calendar', props: { method: 'google', location: 'event', email: 'x@y.z' } },
        { name: 'web_vital', value: 1234, props: { metric: 'LCP', rating: 'good' } },
        { name: 'not_allowed', props: {} },
      ],
    }),
  );
  assert.equal(r.ok, true);
  assert.equal(r.batch.items.length, 2);
  assert.deepEqual(r.batch.items[0].props, { method: 'google', location: 'event' });
  assert.equal(r.batch.items[1].value, 1234);
});

test('rejects malformed, oversized and empty payloads', () => {
  assert.equal(validate('').ok, false);
  assert.equal(validate('{nope').reason, 'bad_json');
  assert.equal(validate(JSON.stringify({ v: 2, items: [] })).reason, 'bad_shape');
  assert.equal(validate('x'.repeat(9000)).reason, 'too_large');
  assert.equal(validate(JSON.stringify({ v: 1, items: Array(26).fill({ name: 'share' }) })).reason, 'bad_count');
  assert.equal(validate(JSON.stringify({ v: 1, items: [{ name: 'web_vital', value: -5, props: { metric: 'LCP' } }] })).reason, 'no_valid_items');
});

test('rejects script-like property values', () => {
  const r = validate(JSON.stringify({ v: 1, items: [{ name: 'share', props: { method: '<script>alert(1)</script>' } }] }));
  assert.equal(r.ok, true);
  assert.deepEqual(r.batch.items[0].props, {});
});

test('rate limiter blocks after the limit and resets after the window', () => {
  const allow = createRateLimiter({ limit: 3, windowMs: 1000 });
  assert.equal(allow('a', 1, 0), true);
  assert.equal(allow('a', 2, 10), true);
  assert.equal(allow('a', 1, 20), false);
  assert.equal(allow('b', 1, 20), true);
  assert.equal(allow('a', 1, 1500), true);
});

test('telemetry endpoint rejects cross-origin posts', async () => {
  const res = await handlers.telemetry(
    req('https://example.azurestaticapps.net/api/telemetry', { origin: 'https://evil.example', host: 'example.azurestaticapps.net' }, '{}'),
    ctx,
  );
  assert.equal(res.status, 403);
});

test('telemetry endpoint accepts same-origin beacons', async () => {
  const body = JSON.stringify({ v: 1, page: '/', pageType: 'home', items: [{ name: 'page_view', props: {} }] });
  const res = await handlers.telemetry(
    req('https://example.azurestaticapps.net/api/telemetry', { origin: 'https://example.azurestaticapps.net', host: 'example.azurestaticapps.net', 'x-forwarded-for': '203.0.113.9' }, body),
    ctx,
  );
  assert.equal(res.status, 204);
});

test('auth reports missing configuration instead of failing silently', async () => {
  delete process.env.GITHUB_OAUTH_CLIENT_ID;
  const res = await handlers.auth(req('https://example.azurestaticapps.net/api/auth?provider=github'), ctx);
  assert.equal(res.status, 503);
});

test('auth redirects to GitHub with a state cookie and least-privilege scope', async () => {
  process.env.GITHUB_OAUTH_CLIENT_ID = 'test-client';
  const res = await handlers.auth(req('https://example.azurestaticapps.net/api/auth?provider=github&scope=repo%20admin:org'), ctx);
  assert.equal(res.status, 302);
  const loc = new URL(res.headers.Location);
  assert.equal(loc.host, 'github.com');
  assert.equal(loc.searchParams.get('redirect_uri'), 'https://example.azurestaticapps.net/api/callback');
  assert.equal(loc.searchParams.get('scope'), 'repo read:user');
  const state = loc.searchParams.get('state');
  assert.match(res.headers['Set-Cookie'], new RegExp(`sdli_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax`));
});

test('auth refuses unknown hosts', async () => {
  process.env.GITHUB_OAUTH_CLIENT_ID = 'test-client';
  const res = await handlers.auth(req('https://attacker.example/api/auth'), ctx);
  assert.equal(res.status, 503);
});

test('callback rejects a state mismatch without contacting GitHub', async () => {
  const res = await handlers.callback(
    req('https://example.azurestaticapps.net/api/callback?code=abcdefghij123&state=AAAAAAAAAAAAAAAA', { cookie: 'sdli_oauth_state=BBBBBBBBBBBBBBBB' }),
    ctx,
  );
  assert.equal(res.status, 200);
  assert.match(res.body, /authorization:github:error/);
  assert.doesNotMatch(res.body, /<script>(?!<\/script>)/);
});
