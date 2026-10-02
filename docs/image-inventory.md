# Image inventory

All images live in `src/assets/uploads/`. Astro creates resized WebP versions (with JPEG fallback) at build time, sets width and height to prevent layout shift, lazy-loads everything below the fold and loads only the homepage hero eagerly. Originals were re-encoded on import, which **removed all camera and location metadata (EXIF/GPS)**.

Rules for new images (also shown in the CMS):

- Use only photos SDLI has permission to use. Record the photographer in the credit field.
- Every image needs a description (alt text). The CMS asks for it and the build fails without it.
- Never put important text (dates, prices) inside an image. Type it as text.
- Do not use AI-generated or stock photos to depict a specific SDLI event.

| File | Source | License / rights | Status |
| --- | --- | --- | --- |
| `big-band-horns.jpg` | | SmugMug i-C4kd4WP (old homepage banner) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `big-band-singer.jpg` | | SmugMug i-9v7kv2q (old homepage banner) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `carol-fraser.jpg` | | sdli.org/images/uploads/callahanska.jpeg (instructor photo) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `gail-storm.jpg` | | sdli.org/images/uploads/gail_storm_pr_shot.jpg (band promo photo) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `gene-casey-and-the-lone-sharks.jpg` | | sdli.org/images/uploads/Gene-Casey-Lone-Sharks.jpg (band promo photo) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `jitterbug-dancers-1938.jpg` | Wikimedia Commons: [Jitterbug dancers NYWTS.jpg](https://commons.wikimedia.org/wiki/File:Jitterbug_dancers_NYWTS.jpg) by New York World-Telegram and the Sun staff photographer: Fish | Public domain | Illustrative only (not an SDLI event). Credit shown on page. |
| `lindy-couple-hand-in-hand.jpg` | Wikimedia Commons: [Hand-in-hand Lindy Hop dancers.jpg](https://commons.wikimedia.org/wiki/File:Hand-in-hand_Lindy_Hop_dancers.jpg) by quinet | CC BY 2.0 | Illustrative only (not an SDLI event). Credit shown on page. |
| `lindy-dancer-red-hat-polka-dots.jpg` | Wikimedia Commons: [Lindy Hop dancer with red hat and red belt.jpg](https://commons.wikimedia.org/wiki/File:Lindy_Hop_dancer_with_red_hat_and_red_belt.jpg) by quinet | CC BY 2.0 | Illustrative only (not an SDLI event). Credit shown on page. |
| `lindy-dancers-purple-and-green.jpg` | Wikimedia Commons: [Lindy Hop dancers in purple and green.jpg](https://commons.wikimedia.org/wiki/File:Lindy_Hop_dancers_in_purple_and_green.jpg) by quinet | CC BY 2.0 | Illustrative only (not an SDLI event). Credit shown on page. |
| `playing-favorites.jpg` | | sdli.org/images/uploads/Playing_Favorites_blue.jpg (band promo photo) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `sdli-big-band-drums.jpg` | | SmugMug i-VhktQmm (old page banner) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `sdli-couple-dancing-red-dress.jpg` | | SmugMug i-65k24k5 (old page banner) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `sdli-dancers-in-tuxedos.jpg` | | SmugMug i-3dmn3NM (old page banner) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `sdli-formal-group-photo.jpg` | | SmugMug i-Fz85Cgm (old page banner) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `sdli-halloween-dance-floor.jpg` | | SmugMug i-pHM6rQs (old page banner) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `social-dance-floor-ballroom.jpg` | Wikimedia Commons: [Dancing after Masters of Lindy Hop and Tap 2009 02.jpg](https://commons.wikimedia.org/wiki/File:Dancing_after_Masters_of_Lindy_Hop_and_Tap_2009_02.jpg) by Joe Mabel/Century Ballroom | CC BY-SA 3.0 | Illustrative only (not an SDLI event). Credit shown on page. |
| `the-buzzards-roy-wilson.jpg` | | sdli.org/images/uploads/buzzards-roysolo.jpg (band promo photo) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `tuesday-band-singer-and-guitarist.jpg` | | SmugMug i-TXrcnbQ (old homepage banner) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `tuesday-dance-floor.jpg` | | SmugMug i-kbsX56w (old homepage banner) | Used by SDLI on its own website | Migrated. **Confirm photographer and permission.** |
| `young-couple-jitterbugging-1945.jpg` | Wikimedia Commons: [Young couple jitterbugging circa 1945.jpg](https://commons.wikimedia.org/wiki/File:Young_couple_jitterbugging_circa_1945.jpg) by Unknown authorUnknown author | Public domain | Illustrative only (not an SDLI event). Credit shown on page. |

## Not migrated

| Old image | Reason |
| --- | --- |
| `SDLI-Every-Tuesday.jpeg` (event poster) | Important text inside the image; appears to be an AI-style illustration rather than a photo of SDLI |
| `2026-09-_Dance_Calendar.jpg` (September flyer) | Schedule is text inside an image; the five dances were entered as real events instead |
| `TheLodge.jpg` | The venue's logo (Moose Lodge trademark), not needed |
| `SDLI_Feet_on_Fire_copy.gif` | Old logo graphic (283×121); replaced by the new SVG mark. Keep the original if SDLI wants to restore it. |
| `DJ-Turntable.jpg` | Generic stock photo (CC BY 2.0, tatsuhico/Flickr); replaced by a real SDLI dance-floor photo for DJ nights |
| Band photos smaller than 400 px wide (Long Island Jazz Orchestra, New Vintage Swing Band) | Too small for modern screens; ask the bands for larger photos |
| `/gallery/2007-01-06/*` | Files no longer exist on the old server |

## Placeholders

When an event has no photo, the site shows the event's date ticket and text, not a fake photo. Recurring Tuesday dances use a real SDLI dance-floor photo; band nights use the band's photo when one is on file.

## Cropping and focus points (October 2026)

Photos are no longer cropped by the browser. When a page needs a photo in a fixed shape, the build crops it around a hand-picked **focus point** (ocus: "x% y%", for example 50% 30% keeps faces near the top). Teacher and band photos on event pages are shown whole. The homepage slideshow shows each photo whole, with a blurred copy filling any space around it. Editors can set a focus point on any photo in the CMS (**Photo focus point**).

## Huntington Moose Lodge photos and videos (src/assets/uploads/lodge/, public/media/videos/)

Provided by the site owner in October 2026: photos and two short phone videos shared by SDLI members in the SDLI Facebook group, plus photos of the Moose Lodge. Only photos of people dancing at the Lodge were used (14 photos, 2 videos). Party setups, vendor tables and close-ups of individuals were left out. Files were resized to 1600 px and re-encoded, which **removed camera and location metadata**. The videos were trimmed to 16 seconds, made silent and compressed (under 1 MB each).

| File | Shows | Status |
| --- | --- | --- |
| lodge/moose-lodge-couples-swing-dancing-holiday.jpg | Two couples swing dancing at a holiday dance | **Confirm photographer and permission** |
| lodge/sdli-moose-lodge-110th-anniversary-dance.jpg | Group photo with the band, Lodge 110th anniversary | **Confirm** |
| lodge/sdli-couple-swing-dancing.jpg | A couple mid-turn | **Confirm** |
| lodge/sdli-band-night-group-photo.jpg, lodge/sdli-rockabilly-night-group-photo.jpg | Group selfies in front of the band | **Confirm** |
| lodge/sdli-st-patricks-day-dance-group.jpg | St. Patrick's Day group photo on the dance floor | **Confirm** |
| lodge/sdli-swing-lesson-circle.jpg | Beginner lesson in a circle | **Confirm** |
| lodge/sdli-dancers-selfie.jpg | Dancers' selfie in the hall | **Confirm** |
| lodge/moose-lodge-*.jpg (6 more) | Couples and line dances on the Lodge floor | **Confirm** |
| media/videos/sdli-dance-floor-1.mp4, -2.mp4 (+ posters in lodge/) | Social dancing, band night | **Confirm** |

Several of these photos show people's faces clearly. Before launch, confirm each photographer's permission, add a credit in **Photo credit**, and remove any photo if someone in it asks.

## Open-licensed photos added (October 2026)

Seven more Lindy Hop photos by Thomas Quine (Wikimedia Commons, **CC BY 2.0**, 2018 Lindy Bout, Vancouver): lindy-couple-dance-fun.jpg, lindy-couple-black-and-yellow.jpg, lindy-dancer-teal-top-at-the-dance-hop.jpg, lindy-same-sex-couple.jpg, lindy-dancer-green-jumpsuit-skip-hop.jpg, lindy-dancer-black-dress.jpg, solo-jazz-dancer-hop-and-a-skip.jpg. They appear in the gallery album "Swing style at other dances" with credit and license links, and are labeled "not SDLI".