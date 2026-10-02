# Swing Dance Long Island website

The website for **Swing Dance Long Island (SDLI)**, an all-volunteer, not-for-profit organization dedicated to the promotion of swing dancing on Long Island, New York.

- **Live (pre-launch):** https://witty-smoke-095ea140f.2.azurestaticapps.net
- **Future address:** https://www.sdli.org (after the [DNS cutover](docs/dns-cutover.md))
- **Content manager:** `/admin/` ([editor guide](docs/editor-guide.md))

## Purpose

Help people answer, in seconds: *Is there a dance coming up? When and where? Is there a lesson? How much? Do I need a partner? Is it beginner-friendly?* And make it easy to add the dance to a calendar, get directions and share it. SDLI's own dances always come first; other groups' dances around Long Island are listed after them as clearly labeled **community events** (see [/community/](https://witty-smoke-095ea140f.2.azurestaticapps.net/community/)).

## Architecture

Astro 7 static site + Decap CMS (Git-backed) + Azure Static Web Apps (Free) with three small managed Functions. Details and diagrams: [docs/architecture.md](docs/architecture.md).

```
Editor ─▶ /admin/ (Decap) ─▶ GitHub pull request ─▶ CI checks + preview ─▶ merge ─▶ GitHub Actions build ─▶ Azure Static Web Apps
Visitor ─▶ static HTML (works without JS) ─▶ /api/telemetry (OpenTelemetry → Application Insights)
```

## Prerequisites

- Node.js 24 LTS (`.nvmrc`) and npm
- For deployment: Azure CLI, GitHub CLI, an Azure subscription
- Optional: Azure Functions Core Tools + `@azure/static-web-apps-cli` to run the API locally

## Local development

```bash
npm ci                 # installs, self-hosts Decap CMS, generates public/admin/config.yml
npm --prefix api ci
npm run dev            # http://localhost:4321  (CMS: npm run cms:local, then /admin/index.html)
```

| Command | What it does |
| --- | --- |
| `npm run check` | Type-check and validate all content (Astro + TypeScript) |
| `npm test` | Unit tests (schemas, real content, events, timezones, recurrence, calendars, sharing, JSON-LD, redirects, CMS config) |
| `npm --prefix api test` | API tests (OAuth bridge, telemetry validation, rate limiting) |
| `npm run build` | Build to `dist/` (+ legacy redirect pages and CSP hashes) |
| `npm run test:links` | Check every internal link and `#anchor` in `dist/` |
| `npm run test:e2e` | Playwright journeys, axe accessibility, keyboard, 320 px, SEO (desktop + phone) |
| `npx lhci autorun` | Lighthouse quality gates |
| `npm run test:smoke -- <url>` | Smoke-test a deployed environment |

Set `BUILD_NOW=2026-10-01T22:00:00-04:00` for repeatable builds.

## Repository structure

```
api/                    Azure Functions: /api/auth, /api/callback (Decap OAuth), /api/telemetry (OpenTelemetry)
cms/config.yml          Decap CMS configuration source (anchors) → public/admin/config.yml
docs/                   Project documentation (start with legacy-site-migration.md and editor-guide.md)
infra/                  Bicep (main.bicep), parameters, deploy.ps1
public/                 Static files, staticwebapp.config.json (headers, 301s), /admin/
scripts/                Build helpers: postbuild (legacy redirects, CSP), link checker, smoke tests, CMS config
src/content/            ALL CONTENT: events, series, venues, people, styles, pages, FAQs, gallery, settings
src/data/               Legacy URL map and archive history (from the sdli.org crawl)
src/lib/                Event engine, time/zone utilities, schemas, calendar (.ics), sharing, SEO/JSON-LD
src/pages/              Routes
src/components/, src/layouts/, src/styles/, src/scripts/   UI
tests/unit/, tests/e2e/ Vitest and Playwright tests
```

## Content model

Events, recurring series (with per-date overrides), venues, teachers, bands/DJs, dance styles, pages, announcements, photo albums, FAQs and site settings. Every fact is stored once. See [docs/content-model.md](docs/content-model.md).

## CMS operation

Decap CMS at `/admin/` uses the **editorial workflow**: Draft → In review (pull request + preview site + automatic checks) → Ready → Published (merged and deployed). See [docs/editor-guide.md](docs/editor-guide.md) for posting band nights, cancelling for weather, photos and more.

## Authentication setup

Editors sign in with GitHub. One-time administrator setup: create a GitHub OAuth App with callback `<site>/api/callback`, then store `GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET` as Static Web App app settings (`infra/deploy.ps1 -OAuthClientId … -OAuthClientSecret …`). Never commit them. Details and fallbacks: [editor guide › CMS sign-in setup](docs/editor-guide.md#cms-sign-in-setup-administrator).

## Azure provisioning

```powershell
./infra/deploy.ps1 -Repo michaelsrichter/sdli-website
```

Creates `rg-sdli-web` (East US 2) with `swa-sdli-web` (Free), `log-swa-sdli-web` and `appi-swa-sdli-web`, stores the deployment token as a GitHub secret without printing it, and sets app settings. See [docs/deployment.md](docs/deployment.md).

## Deployment

Merging to `main` deploys production; pull requests get preview sites; a nightly run keeps "upcoming" current. Every deployment is smoke-tested. See [docs/deployment.md](docs/deployment.md).

## Custom domain setup and DNS cutover

Manual and deliberately not automated. Add `www.sdli.org` to the Static Web App, create a `CNAME www → witty-smoke-095ea140f.2.azurestaticapps.net`, forward the apex to `www`, then set `SITE_URL=https://www.sdli.org` and `ALLOW_INDEXING=true`. Step-by-step: [docs/dns-cutover.md](docs/dns-cutover.md).

## Rollback

Revert the commit (or re-run a previous good deployment); DNS can be pointed back to the old host within minutes. See [docs/rollback.md](docs/rollback.md).

## Testing

| Layer | Coverage |
| --- | --- |
| Unit (Vitest, 85 tests) | Timezones and DST, recurrence, overrides, upcoming vs past, cancelled/postponed, empty states, `.ics` (CRLF, folding, escaping), calendar links, share text, JSON-LD, redirects config, CMS config validity, schema rejection of invalid content, validation of every real content file, social-image glyph rendering |
| API (node:test, 11 tests) | OAuth state/CSRF, host allow-listing, scope limiting, telemetry validation, origin checks, rate limiting |
| End-to-end (Playwright, 121 tests) | The 12 required journeys, filters, calendar, no-JS mode, legacy redirects, 404, axe on 20 page types × 2 devices, keyboard, 320 px, touch targets, SEO metadata, Event structured data |
| Links | 11,000+ internal references and anchors per build; weekly external check |
| Lighthouse | Performance, Accessibility, Best Practices, SEO gates (local results: 96–100 / 100 / 100 / 100) |
| Security | gitleaks (full history), CodeQL, GitHub secret scanning + push protection, Dependabot |

## Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| Build error "Use the date format YYYY-MM-DD" | A content field is malformed; the message names the file |
| "Duplicate event URL" | Two events on the same date with the same title/slug; rename one |
| `/admin/` login says "not configured" | OAuth app settings missing; see Authentication setup |
| Login popup closes but nothing happens | Callback URL mismatch or host not in `ALLOWED_HOSTS` |
| Deployment fails "duplicate route" | Two routes in `staticwebapp.config.json` differ only by a trailing slash |
| Next dance looks out of date | The nightly rebuild failed; re-run the deploy workflow |
| Preview site not created | Free plan allows 3 previews; close old pull requests |
| Telemetry missing in Application Insights | Check `APPLICATIONINSIGHTS_CONNECTION_STRING` and `sdli.telemetry.rejected` |

## Cost considerations

Static Web Apps Free: **$0**. Application Insights/Log Analytics: pay-as-you-go with a **0.1 GB/day cap**, expected **$0–$1/month** at SDLI's traffic. GitHub (public repo): Actions, CodeQL and secret scanning free. No paid services are required. Optional upgrades: Static Web Apps Standard (~$9/month) for an SLA and more previews. See [docs/deployment.md](docs/deployment.md).

## Security considerations

Strict CSP (`script-src 'self'` + one hash; no inline styles), `frame-ancestors 'none'`, nosniff, Referrer-Policy, Permissions-Policy, HSTS; no secrets in Git (gitleaks + push protection); OAuth secret only in Azure app settings; telemetry endpoint validated, size-limited, same-origin and rate-limited with salted IP hashes; GA4/Clarity only after consent. See [SECURITY.md](SECURITY.md) and [docs/architecture.md](docs/architecture.md#security-model).

## Content editing guide

[docs/editor-guide.md](docs/editor-guide.md). Content issues can also be reported with the **Content correction** issue template.

## Known limitations

- CMS sign-in works on the production host only (one callback per GitHub OAuth App); previews are view-only.
- Free plan: 3 concurrent preview environments.
- "Upcoming" is refreshed nightly; between builds the browser hides ended events, but a dance added in the CMS appears only after it is published.
- Recurring Tuesday dates beyond the posted schedule (currently after October 2026) show the standing schedule with a note until editors add themes, bands or closures.
- Community events come from The Dance Calendar, Triple Step Swing's calendar and the SDLI Facebook group as of October 2026. Editors refresh them monthly (see the [editor guide](docs/editor-guide.md#add-a-community-event-another-groups-dance-or-class)).
- Moose Lodge parking and accessibility come from Google Maps and reviews; some bios are pending SDLI confirmation (see [legacy-site-migration.md §5](docs/legacy-site-migration.md#5-what-still-needs-a-volunteer-to-confirm)).
- Azure resources currently live in a Microsoft-internal sandbox subscription; move them to an SDLI-owned subscription before cutover ([decision log #3](docs/decision-log.md)).
- No code license has been chosen yet.

## Documentation index

[Legacy site migration](docs/legacy-site-migration.md) · [Content audit](docs/content-audit.md) · [Redirect plan](docs/redirect-plan.md) · [Image inventory](docs/image-inventory.md) · [Architecture](docs/architecture.md) · [Content model](docs/content-model.md) · [Editor guide](docs/editor-guide.md) · [Deployment](docs/deployment.md) · [DNS cutover](docs/dns-cutover.md) · [Rollback](docs/rollback.md) · [Accessibility test plan](docs/accessibility-test-plan.md) · [Analytics](docs/analytics.md) · [Decision log](docs/decision-log.md)
