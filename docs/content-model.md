# Content model

All content is in `src/content/`. Schemas are in `src/lib/schemas.ts` and enforced at build time; the CMS form for each collection is in `cms/config.yml`. A unit test checks that every event field is editable in the CMS and that every image field has an alt-text partner.

| Collection | Folder | Format | Purpose |
| --- | --- | --- | --- |
| `events` | `src/content/events/` | Markdown + front matter | One-time events, archived events, and changes to single dates of a series |
| `series` | `src/content/series/` | Markdown + front matter | Repeating dances (templates); dates are generated |
| `venues` | `src/content/venues/` | Markdown | Places, addresses, directions, parking, accessibility |
| `instructors` | `src/content/instructors/` | Markdown | Teachers |
| `performers` | `src/content/performers/` | Markdown | Bands and DJs |
| `styles` | `src/content/styles/` | YAML | Dance-style taxonomy |
| `pages` | `src/content/pages/` | Markdown | Home intro, New to Swing, Lessons, Membership, About, Contact, Gallery intro, Privacy |
| `announcements` | `src/content/announcements/` | YAML | Site-wide banner (with optional start/end dates) |
| `gallery` | `src/content/gallery/` | YAML | Photo albums |
| `faqs` | `src/content/faqs/` | YAML | Questions and answers (also published as FAQPage structured data) |
| `settings` | `src/content/settings/site.yml` | YAML | Contact details, hotline, mailing address, membership fee, standard prices, default venue |

Facts are stored once: venue addresses on the venue; styles in the style taxonomy; standard prices and contact details in settings; prices for a specific night on the event or series.

## Dates and times

| Field | Format | Example | Meaning |
| --- | --- | --- | --- |
| `startDateTime`, `endDateTime` | `YYYY-MM-DDTHH:mm` (or `YYYY-MM-DD` if the time is unknown) | `2026-10-06T19:30` | Wall-clock time in `timezone` (default `America/New_York`). **No offset.** |
| `doorsTime`, `lessonStartTime`, `danceStartTime`, `danceEndTime` | `HH:mm` (24-hour) | `19:30` | Same day as the start |
| `occurrenceDate` | `YYYY-MM-DD` | `2026-10-13` | Which series date an override changes |

The build converts to UTC with `Intl` (handles daylight saving time) and publishes ISO 8601 with offsets (`2026-10-06T19:30:00-04:00`) in structured data and UTC in calendar files. Visitors' browsers never parse event dates, so dates cannot shift to the wrong day on phones.

## Event fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | 3–120 characters |
| `status` | default `scheduled` | `draft` (hidden), `scheduled`, `cancelled` (stays visible, clearly marked), `postponed`, `soldOut`, `completed` (archive). Scheduled events that have ended display as "Past event" automatically. |
| `published` | default `true` | `false` hides the entry |
| `featured` | default `false` | Reserved for promoting special events |
| `series`, `occurrenceDate` | for overrides | Override one generated date |
| `startDateTime` | for one-time events | See above |
| `endDateTime` | no | Defaults to `danceEndTime`, else start + 3 hours, else end of day if time is unknown |
| `summary` | no | ≤ 300 characters; used on cards and in search results |
| `venue` | no | Venue ID; or use `address`/`city`/`state`/`postalCode` for one-off places |
| `latitude`, `longitude`, `directionsUrl` | no | Directions default to Google Maps for the address |
| `instructorNames`, `djNames`, `bandName` | no | IDs from Teachers / Bands and DJs |
| `danceStyles` | no | Style IDs |
| `eventTypes` | no | `weekly-dance`, `monthly-dance`, `live-band`, `dj-night`, `beginner-lesson`, `workshop`, `special-event`, `community-event` |
| `experienceLevel` | no | `all-levels` (default), `beginner`, `intermediate`, `advanced` |
| `partnerRequired`, `beginnerFriendly` | no | Defaults: no partner needed, beginner friendly |
| `admissionMember`, `admissionStudent`, `admissionNonMember`, `admissionNotes` | no | Numbers in dollars; `0` means free |
| `registrationUrl`, `registrationRequired`, `capacityNotes` | no | |
| `featuredImage` + `featuredImageAlt` | no | Alt text is required when an image is set |
| `gallery[]` | no | `image`, `alt` (required), `caption`, `credit` |
| `sponsor`, `contactName`, `contactEmail`, `contactPhone`, `facebookEventUrl` | no | |
| `cancelledMessage`, `postponedTo` | no | Shown when cancelled or postponed |
| `seoTitle` (≤ 70), `seoDescription` (≤ 170) | no | Defaults are generated from the facts |
| `lastUpdated` | no | `YYYY-MM-DD` |
| `editorialReview` | no | Internal notes; never rendered |
| `legacyUrl` | no | Old sdli.org address (for the record) |

## Series fields

Everything an event has (except title/status overrides), plus:

| Field | Notes |
| --- | --- |
| `slug` | Used in every generated URL. Do not change after publishing. |
| `recurrence.frequency` | `weekly` or `monthly` |
| `recurrence.interval` | 1 = every week/month, 2 = every other, … |
| `recurrence.weekday` | `sunday` … `saturday` |
| `recurrence.weekOfMonth` | Monthly only: 1–4, or -1 for "last" |
| `recurrence.startDate`, `recurrence.endDate` | Date range |
| `recurrence.horizonWeeks` | How far ahead dates are published (default 12) |
| `recurrence.exceptDates[]` | Dates to skip silently. Prefer a cancelled override if visitors should see "no dance this week". |
| `startTime`, `endTime` | Default times for every date |

## URLs

| Content | URL |
| --- | --- |
| Event (one-time) | `/events/<YYYY-MM-DD>-<slug or file name>/` |
| Event (series date) | `/events/<occurrenceDate>-<series slug>/` |
| Event calendar file | `/events/<slug>/calendar.ics` |
| Social images (upcoming events) | `/events/<slug>/social.png` (1200×630), `/events/<slug>/social-square.png` (1080×1080) |
| Series | `/events/series/<slug>/` |
| Month calendar | `/events/calendar/<YYYY-MM>/` |
| Past events by year | `/events/past/<YYYY>/` |
| Venue | `/venues/<id>/` |
| Teacher, band or DJ | `/performers/<id>/` |
| Feeds | `/events/rss.xml`, `/events/sdli-events.ics` |

## Validation

- `npm run check` / `npm run build`: Astro validates every entry against the schema. Errors name the file and field in plain language (for example "Use the date format YYYY-MM-DD.").
- `npm test`: also validates every content file directly and checks that every venue, person and style reference exists.
- The build fails on duplicate event URLs and on references to unknown series, venues or styles.
