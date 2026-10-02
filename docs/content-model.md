# Content model

All content is in `src/content/`. Schemas are in `src/lib/schemas.ts` and enforced at build time; the CMS form for each collection is in `cms/config.yml`. A unit test checks that every event field is editable in the CMS and that every image field has an alt-text partner.

| Collection | Folder | Format | Purpose |
| --- | --- | --- | --- |
| `events` | `src/content/events/` | Markdown + front matter | One-time events, archived events, and changes to single dates of a series |
| `series` | `src/content/series/` | Markdown + front matter | Repeating dances (templates); dates are generated |
| `venues` | `src/content/venues/` | Markdown | Places, addresses, directions, parking, accessibility, Google Maps listing |
| `organizers` | `src/content/organizers/` | Markdown | Other dance groups, studios and teachers who run **community events** (contacts, links, classes) |
| `instructors` | `src/content/instructors/` | Markdown | Teachers (with their website and social links) |
| `performers` | `src/content/performers/` | Markdown | Bands and DJs (with their website and social links) |
| `styles` | `src/content/styles/` | YAML | Dance-style taxonomy (`family: swing` for SDLI styles, `other` for ballroom, Latin, tango, country) |
| `pages` | `src/content/pages/` | Markdown | Home intro, New to Swing, Lessons, Membership, About, Contact, Gallery intro, Privacy |
| `announcements` | `src/content/announcements/` | YAML | Site-wide banner (with optional start/end dates) |
| `gallery` | `src/content/gallery/` | YAML | Photo albums |
| `faqs` | `src/content/faqs/` | YAML | Frequently Asked Questions (also published as FAQPage structured data) |
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
| `host` | default `sdli` | `sdli` (an official SDLI event) or `community` (run by another group). Community events get a "Community event" badge, are listed after SDLI events, never become the "Next SDLI dance", stay out of the SDLI calendar feed, RSS and past-events archive, and name their organizer (not SDLI) in structured data |
| `organizer` | for community events | Organizer ID. Their phone, email, website and social links appear on the event |
| `cadence` | no | Plain-language repeat pattern for community events ("First and third Fridays of the month") |
| `infoUrl` | no | The organizer's own page for this event |
| `sourceName`, `sourceUrl` | for community events | Where the listing came from ("The Dance Calendar, October 2026"); shown on the event page |
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
| `eventTypes` | no | `weekly-dance`, `monthly-dance`, `live-band`, `dj-night`, `beginner-lesson`, `workshop`, `special-event`, `community-event`, `social-dance`, `practice`, `festival` (dance weekend), `class` |
| `experienceLevel` | no | `all-levels` (default), `beginner`, `intermediate`, `advanced` |
| `partnerRequired`, `beginnerFriendly` | no | SDLI events default to "no partner needed" and "beginner friendly". Community events only show these when set |
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
| `startTime`, `endTime` | Default times for every date. An `endTime` at or before `startTime` (for example 20:00 to 00:00) means the event ends after midnight |

## Organizer fields (community events)

| Field | Notes |
| --- | --- |
| `name`, `shortName` | Shown on events and the Dance community page |
| `active` | `false` hides the group from the Dance community page |
| `tagline` | One line (≤ 160 characters) about what they run |
| `town`, `venue` | Main town and usual venue ID |
| `danceStyles` | Style IDs. The **first** style decides the group on the Dance community page ("Swing and blues" or "Ballroom, Latin and more") |
| `phone`, `phoneAlt`, `email`, `website`, `facebookUrl`, `instagramUrl`, `moreLinks[]` | As the organizer publishes them. `moreLinks` items have `label` and `url` |
| `classes` | Classes they teach; shown under "Take a class" and on the Lessons page for swing styles |
| `sourceName`, `sourceUrl` | Where the details came from |

## People (teachers, bands, DJs)

`website`, `facebookUrl`, `instagramUrl`, `youtubeUrl` and `moreLinks[]` (label + URL) are shown wherever the person is mentioned: their name on event cards and the next-dance card links to their website (or first social page), event pages and profiles show every link, and structured data lists them as `sameAs`. `organizer` links a teacher to the group they run.

## Venues

`googleMapsUrl` adds a "Photos & reviews" button. `parkingNotes`, `accessibilityNotes` and `factsSource` (where those facts came from) appear in the venue panel. Venues used only by community events appear under "Other dance venues around Long Island". `latitude`, `longitude` and `coordinatesSource` place the venue on the dance map; `npm run geocode` (and the "Venue map locations" GitHub Action) fills them in from the street address.

## Photos

Gallery album photos (`images[]`) have `image`, `alt` (required), `caption`, `credit`, `creditUrl`, `focus` (`"x% y%"` crop focus point) and an optional `video` (`/media/videos/<file>.mp4`, a short silent clip with the photo as its poster). Albums with `homepageSlideshow: true` feed the homepage slideshow, in album `order`. Events have `featuredImageFocus` and people have `imageFocus` for the same purpose.

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
| Dance community (organizers) | `/community/` (each group at `/community/#<id>`) |
| Feeds | `/events/rss.xml` (SDLI), `/events/sdli-events.ics` (SDLI), `/events/community-events.ics` (community) |
| Dance map | `/events/map/` (each place at `/events/map/#place-<venue id>`; filters `?host=sdli`, `?when=week`) |

## Validation

- `npm run check` / `npm run build`: Astro validates every entry against the schema. Errors name the file and field in plain language (for example "Use the date format YYYY-MM-DD.").
- `npm test`: also validates every content file directly and checks that every venue, person, style and organizer reference exists, that every community event names an organizer and a listing source, and that every series, venue, organizer, person and style field is editable in the CMS.
- The build fails on duplicate event URLs and on references to unknown series, venues, styles or organizers.
