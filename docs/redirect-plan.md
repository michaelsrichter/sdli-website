# Redirect plan

Goal: every address from the old `www.sdli.org` keeps working after DNS cutover, without losing search ranking or breaking links on Facebook posts, flyers and bookmarks.

## Why two layers

Azure Static Web Apps limits `staticwebapp.config.json` to **20 KB**, which fits about 150 redirect rules. The crawl found **2,756** distinct legacy addresses. So:

| Layer | What | How | HTTP status |
| --- | --- | --- | --- |
| 1. Server redirects | The ~20 most valuable old pages | `routes` in `public/staticwebapp.config.json` | **301 Moved Permanently** |
| 2. Redirect pages | Every other crawled legacy address | Generated at build time by `scripts/postbuild.mjs` from `src/data/legacy-redirects.json`. Each is a tiny HTML page at the old path with `<meta http-equiv="refresh" content="0; url=…">`, a `rel="canonical"` link to the new page, `noindex`, and a visible link. Search engines treat an immediate meta refresh as a permanent redirect. | 200 → instant redirect |
| 3. Safety net | Any old `/index.php/…` address not found in the crawl | Script on the 404 page sends the visitor to the matching section | 404 → redirect |

If a mapped target does not exist in a particular build (for example a calendar month outside the current range), the build falls back to the nearest parent page and reports how many fell back.

## Layer 1: server-side 301 redirects

| Old address | New address |
| --- | --- |
| `/index.php` | `/` |
| `/index.php/sdli/news/membership*` | `/membership/` |
| `/index.php/sdli/news/contact*` | `/contact/` |
| `/index.php/sdli/news/email*` | `/contact/#email-list` |
| `/index.php/sdli/news` | `/about/` |
| `/index.php/sdli/events/swing_dance_every_tuesday*` | `/events/series/tuesday-night-swing/` |
| `/index.php/sdli/events` | `/events/` |
| `/index.php/sdli/calendar` | `/events/calendar/` |
| `/index.php/sdli/events_archive` | `/events/past/` |
| `/index.php/sdli/venues/huntingtin_moose_lodge*` | `/venues/huntington-moose-lodge/` |
| `/index.php/sdli/venues` | `/venues/` |
| `/index.php/sdli/bands` | `/performers/` |
| `/index.php/sdli/sponsor` | `/about/#friends` |
| `/index.php/sdli/rss_2.0*`, `/index.php/sdli/atom*` | `/events/rss.xml` |

(Azure treats `/path` and `/path/` as the same route, so only one form is listed. A unit test enforces this.)

## Layer 2: generated redirect pages (2,756)

| Legacy pattern | Count | Target |
| --- | ---: | --- |
| `/index.php/sdli/events_archive/<permalink>/` | 1,772 | 2024 to Sept 2026: the matching event page. 2006 to 2023: `/events/past/#history-<year>`. |
| `/index.php/sdli/events_archive/<number>/` | 310 | Same as the permalink it belonged to (IDs taken from crawled pages and "Upcoming / Recent" lists) |
| `/index.php/sdli/events_archive/<yyyy>/<mm>/` | 255 | 2024 onward: `/events/calendar/<yyyy-mm>/`. Earlier: `/events/past/#history-<year>` |
| `/index.php/sdli/calendar/<yyyy>/<mm>/` | 255 | `/events/calendar/<yyyy-mm>/` when that month exists, else `/events/calendar/` |
| `/index.php/sdli/events_archive/C<n>/` (categories) | 8 | `/events/past/` |
| `/index.php/sdli/bands/<name>/` | 48 | Current performers: `/performers/<id>/`. Others: `/performers/#past-performers` |
| `/index.php/sdli/venues/<name>/` | 41 | Moose Lodge: `/venues/huntington-moose-lodge/`. Others: `/venues/#past-venues` |
| `/index.php/sdli/sponsor/<name>/` (Links) | 40 | `/about/#friends` (SDLI itself: `/about/`) |
| Info pages, feeds, search, member pages, sections | 27 | See `src/data/legacy-redirects.json` |

## Verification

- **Unit test** (`tests/unit/seo-config.test.ts`): every legacy address has a redirect page or server rule, and every target exists in the built site.
- **Link checker** (`npm run test:links`): every internal link and `#anchor` target exists (including `#past-venues`, `#history-2015`, `#email-list`, `#friends`).
- **End-to-end tests**: old event, venue and month addresses land on the right page.
- **Smoke test after each deployment** (`scripts/smoke.mjs`): checks the 301s on the live site.

## Updating the map

`src/data/legacy-redirects.json` is plain data (`from`, `to`, `kind`). To add a redirect for a newly discovered old address, add an entry and open a pull request. For a new *high-traffic* page, add a 301 route to `public/staticwebapp.config.json` instead (keep the file under 20 KB; the build fails if it is larger).

## After DNS cutover

- Keep the redirect pages for at least two years. They cost almost nothing (about 1.7 MB).
- In Google Search Console, submit `https://www.sdli.org/sitemap-index.xml` and use the URL Inspection tool on a few old addresses to confirm Google sees the redirects.
