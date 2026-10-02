# Architecture

The SDLI website is a **static site**: every page is built ahead of time into plain HTML, CSS and a small amount of JavaScript, then served from Azure's global network. There is no web server to patch and no database to back up. The content lives in this GitHub repository as text files, edited through Decap CMS.

```mermaid
flowchart LR
  subgraph Editors
    E[SDLI volunteer editor]
  end
  subgraph Visitors
    V[Phone or computer browser]
  end
  subgraph GitHub["GitHub (michaelsrichter/sdli-website)"]
    R[(Repository<br/>content + code)]
    PR[Pull request<br/>editorial workflow]
    CI[GitHub Actions<br/>CI: types, unit, e2e, axe,<br/>links, Lighthouse, gitleaks, CodeQL]
    DEP[GitHub Actions<br/>build + deploy<br/>nightly rebuild]
  end
  subgraph Azure["Azure (rg-sdli-web, East US 2)"]
    SWA[Static Web Apps Free<br/>CDN, HTTPS, headers,<br/>301s, PR previews]
    FN[Managed Functions<br/>/api/auth, /api/callback,<br/>/api/telemetry]
    AI[Application Insights<br/>+ Log Analytics<br/>OpenTelemetry]
  end
  GH[GitHub OAuth]
  GA[Google Analytics 4<br/>optional, consent]
  MC[Microsoft Clarity<br/>optional, consent]
  MAIL[Mailchimp email list]

  E -- "/admin/ (Decap CMS)" --> SWA
  SWA --> FN
  FN -- OAuth code exchange --> GH
  E -- commits via GitHub API --> PR
  PR --> CI
  PR -- preview environment --> DEP
  PR -- merge --> R
  R --> DEP
  DEP -- upload dist/ + api/ --> SWA
  V -- HTTPS --> SWA
  V -- "sendBeacon (cookieless)" --> FN
  FN -- metrics + custom events --> AI
  V -. "after consent" .-> GA
  V -. "after consent" .-> MC
  V -- sign up --> MAIL
```

## Building blocks

| Part | Technology | Why |
| --- | --- | --- |
| Site generator | Astro 7 (static output), TypeScript strict | Fast static HTML, almost no JavaScript, first-class content collections |
| Content | Markdown/YAML in `src/content/`, validated by Zod schemas (`src/lib/schemas.ts`) | Git history is the audit trail; invalid content fails the build |
| Events engine | `src/lib/event-core.ts` | Expands recurring series, applies per-date overrides, keeps stable URLs |
| Dates | `src/lib/time.ts` | All times are New York wall-clock strings converted at build time with `Intl`; browsers never parse dates |
| Styling | One CSS file with custom properties and cascade layers (`src/styles/global.css`) | No CSS framework; light and dark themes. Dark follows the device unless the visitor picks Light or Dark (`html[data-theme]`, saved in `localStorage` and applied by the inline head script before the first paint; `scripts/theme.ts`) |
| Fonts | Fraunces 700 (self-hosted, one 30 KB file) + system fonts | One font request |
| Images | `astro:assets` → WebP + JPEG, `srcset`, intrinsic sizes | Small, sharp images with no layout shift |
| Client JS | Vanilla TypeScript modules (nav, share, filters, expiry, analytics) | Everything works without JavaScript; JS only enhances |
| CMS | Decap CMS 3, self-hosted in `/admin/`, GitHub backend, editorial workflow | Free, Git-backed, drafts and review via pull requests |
| Auth bridge | Azure Functions (`api/src/functions/oauth.js`) | Smallest secure GitHub OAuth flow for Decap on Azure |
| Telemetry | `api/src/functions/telemetry.js` + `@azure/monitor-opentelemetry` | First-party, cookieless metrics and events in Azure Monitor |
| Hosting | Azure Static Web Apps Free | Free HTTPS, global CDN, custom domains, PR previews, managed Functions |
| IaC | `infra/main.bicep`, `infra/deploy.ps1` | Repeatable provisioning |

## Request flow

1. A visitor opens `https://<site>/events/`. Azure serves pre-built `dist/events/index.html` with security headers from `staticwebapp.config.json`.
2. The page works fully as HTML. Small modules then enhance it: filter chips, hiding events that ended since the last build, share dialogs.
3. The analytics module sends anonymous counts and Core Web Vitals to `/api/telemetry` with `navigator.sendBeacon`. The function validates, rate-limits and records OpenTelemetry metrics and custom events in Application Insights.
4. If the visitor allows analytics in the consent banner, Google Analytics 4 and Microsoft Clarity load.

## Keeping "upcoming" honest on a static site

- **Nightly rebuild** (05:15 New York time) regenerates pages so the homepage and lists move forward and recurring dates extend.
- **Browser check:** each event card carries its end time (`data-end`, UTC milliseconds). If an event ended after the last build, the browser hides it from "upcoming" lists and the homepage promotes the next dance. This compares numbers only; no date parsing on the device.

## Recurring events

```mermaid
flowchart TB
  S["Series: Tuesday Night Swing<br/>weekly, Tuesday, 7:30 PM<br/>Moose Lodge, $10/$5/$15"] --> G{Generate dates<br/>start date to<br/>today + 12 weeks}
  G --> O1["2026-10-06<br/>/events/2026-10-06-tuesday-night-swing/"]
  G --> O2["2026-10-13 + override:<br/>Band Night, $15/$10/$20"]
  G --> O3["2026-10-20 + override:<br/>status cancelled (storm)"]
  G --> O4["..."]
```

An override is an ordinary event entry with `series` and `occurrenceDate`. Empty fields inherit from the series. The URL is always `<occurrenceDate>-<series slug>` and never changes, even if the title, band or time changes.

## Security model

- No server-side state, no database, no visitor accounts.
- Editors authenticate with GitHub; their token stays in their browser and is used only against the GitHub API. The OAuth client secret is only in Azure app settings.
- Strict Content Security Policy (`script-src 'self'` plus a hash for one tiny inline script, `style-src 'self'`, `frame-ancestors 'none'`); a separate, looser CSP applies only to `/admin/`, which Decap needs.
- `/api/telemetry` is the only public write endpoint: strict allow-lists, 8 KB limit, same-origin check and per-client rate limiting with salted, never-stored IP hashes.

See also: [deployment.md](deployment.md), [content-model.md](content-model.md), [analytics.md](analytics.md), [decision-log.md](decision-log.md).
