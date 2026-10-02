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