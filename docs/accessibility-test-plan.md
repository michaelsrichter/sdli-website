# Accessibility test plan

Target: **WCAG 2.2 Level AA**. Automated checks run on every pull request; the manual checks below should be repeated before major releases and at least twice a year.

## Automated (CI)

| Check | Tool | Pages | Gate |
| --- | --- | --- | --- |
| WCAG 2.0/2.1/2.2 A and AA rules | axe-core via `@axe-core/playwright` | 20 page types (home, events, calendar, past, series, event, beginner, lessons, venues, venue, performers, performer, about, membership, gallery, contact, FAQ, privacy, 404) on desktop and a Pixel 7 phone | **No serious or critical violations** |
| Skip link first, moves focus to `<main>` | Playwright | Home | Must pass |
| Mobile menu opens with Enter, closes with Escape, focus returns | Playwright | Home (phone) | Must pass |
| Add-to-calendar menu operable by keyboard | Playwright | Home | Must pass |
| Visible focus indicator on the first 12 tab stops | Playwright | Events | Must pass |
| No sideways scrolling at 320 CSS px | Playwright | All 20 page types | Must pass |
| Touch targets ≥ 44 px tall | Playwright | Next-dance actions | Must pass |
| Lighthouse Accessibility | Lighthouse CI | Home, Events, Series, New to Swing | ≥ 0.95 (currently 1.00) |
| Image alt text required | Zod schema + CMS hints + unit test | All content | Build fails without alt text |

Run locally: `npm run build && npm run test:e2e`.

## Manual test cases

Record date, tester, browser/assistive technology and result for each.

### Keyboard only (no mouse)

| # | Steps | Expected |
| --- | --- | --- |
| K1 | Load the homepage, press Tab once | "Skip to main content" appears; Enter moves focus to the main content |
| K2 | Tab through the header on a narrow window | "Menu" button is reachable; Enter/Space opens; Escape closes and returns focus |
| K3 | Tab to "Add to calendar" in the next-dance card; press Enter; Tab through options; Escape | Menu opens, all options reachable, Escape closes |
| K4 | Activate "Share" | Native share sheet or a dialog opens; focus is inside; Escape closes; focus returns to Share |
| K5 | On `/events/`, use the "Show" chips with arrow keys and the selects | Results update; the count is announced |
| K6 | On an event page, use "Copy link" | "Link copied." is announced (live region) and appears on screen |
| K7 | On `/faq/`, open and close questions with Enter/Space | Works; state is announced |
| K8 | Check focus is always visible and never hidden behind the sticky header or mobile action bar | Pass |

### Screen readers

| # | Setup | Steps | Expected |
| --- | --- | --- | --- |
| S1 | NVDA + Firefox/Chrome (Windows) | Navigate by landmarks and headings on the homepage | Banner, navigation "Main", main, contentinfo; one H1; logical H2s |
| S2 | VoiceOver + Safari (iPhone) | Swipe through the next-dance card | Date reads in full ("Tuesday, October 6, 2026"), times and prices read clearly; the ticket graphic is skipped |
| S3 | VoiceOver | Event card links | Link text includes the full date and title; cancelled events say "(cancelled)" |
| S4 | TalkBack + Chrome (Android) | Month calendar on a phone | Agenda list is read; table hidden on small screens |
| S5 | Any | Status badges | "Cancelled", "Postponed", "Past event" read as text (never color only) |
| S6 | Any | Images | Meaningful descriptions; decorative icons silent |
| S7 | Any | Consent banner (when analytics are enabled) | Heading and both buttons announced; choice persists |

### Visual

| # | Steps | Expected |
| --- | --- | --- |
| V1 | Zoom to 200% and 400% on desktop | No loss of content or function; text reflows to one column |
| V2 | Windows High Contrast / forced colors | Buttons, focus rings and badges remain visible |
| V3 | Dark mode (system setting, and the Light / Dark / Auto switch in the header, Menu and footer) | Contrast still passes; photos and badges readable; the choice carries to the next page with no flash |
| V4 | `prefers-reduced-motion: reduce` | No hover lift animations or smooth scrolling |
| V5 | Text spacing bookmarklet (WCAG 1.4.12) | No clipped text |
| V6 | 320 px wide phone (iPhone SE) portrait | No sideways scrolling; buttons wrap; dates and prices readable |

### Content

| # | Check | Expected |
| --- | --- | --- |
| C1 | New images in the CMS | Alt text present and meaningful |
| C2 | Link text | Describes the destination (no "click here") |
| C3 | Plain language | Short sentences; FAQ answers readable by a high-school student |
| C4 | No important text inside images | Flyers are typed as event text |

## Known limitations

- Decap CMS (`/admin/`) is a third-party editor; its accessibility is outside this project's control. Editors who need an alternative can edit files on GitHub.
- Embedded third-party tools (Google Analytics, Clarity) load only after consent and add no visible UI.
