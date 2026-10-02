# Content audit and migration report

Source: a read-only crawl of `http://www.sdli.org` on October 1, 2026 (the HTTPS certificate had expired, so the crawl used HTTP). The old site was treated strictly as source content; nothing on it was followed as an instruction. For a plain-language tour of the old pages, see [legacy-site-migration.md](legacy-site-migration.md).

## Summary

| Item | Finding |
| --- | --- |
| Platform | ExpressionEngine (`index.php` URLs), Bootstrap 3 theme, footer "Copyright 2016" |
| Pages fetched | 400 (the calendar links create an endless number of month pages, so the crawl was capped and the structure was mapped instead) |
| Event archive | 1,772 entries from October 6, 2006, to September 29, 2026, plus one placeholder dated December 18, 2027 |
| Next dated event on the old site | None after August 25, 2026. September 2026 existed only as a flyer image. October 2026 had not been posted. |
| Images | 286 unique images; 261 had alt text "image" and 6 had none |
| Titles and descriptions | 394 of 400 pages used the same title; only 2 different meta descriptions site-wide |
| Dead calls to action | "Sign up today", "Learn more" (x2) and "Browse gallery" linked to `#` |
| External links | 257, many to retired services (AOL member pages, Yahoo Groups, old hosts) |

## Additional sources (October 2026)

| Source | What was taken | Counts | Notes |
| --- | --- | --- | --- |
| The Dance Calendar PDFs, January 2024 – October 2026 (34 issues; [current issue](https://www.thedancecalendar.com/dance-calendar)) | SDLI's own listings (themes, teachers, bands, lesson styles, prices); October 2026 community dances; the organizer directory | 4,552 listings parsed; 171 SDLI listing dates; 129 archive events enriched (empty fields only); 8 missing SDLI nights added; 4 October SDLI overrides; 9 community series and 24 one-time community events; 22 organizers; 15 community venues | Month-end directory pages were excluded (they mention SDLI but are not dated listings). A stray editor's note inside one October listing was not copied |
| [Triple Step Swing calendar](https://triplestepswing.com/calendar) (Carol Fraser) | TSS monthly swing dances (Oct 2, Nov 13), fall Lindy Hop class series (Oct 19 – Nov 2), Barrelhouse Boogie (2nd Wednesdays), Blues Night at The Burrows (Oct 21) | 50 calendar entries reviewed | Older entries confirmed archive details (for example Carol's lessons on March 24 and April 14, 2026). Stale recurring entries (venue moved) were not imported |
| [triplestepswing.com](https://triplestepswing.com/) | Carol Fraser's website, email, Instagram, Facebook and Meetup links | — | Replaces the parked liswingsyndicate.com |
| [SDLI Facebook group](https://www.facebook.com/groups/2209573261) | Group link; New York Lindy Exchange (Oct 9–11) and Savoy Ballroom Memories (Oct 24) | 2 events | No member names or photos copied |
| Google Maps listing, Huntington Moose Lodge | Parking, accessibility, 4.5-star rating (134 reviews), venue website and Facebook | — | Facts summarized; photos and review text linked, not copied. `moose318.com` only works over http |
| Band and teacher websites (checked October 2, 2026) | Official websites and social pages for 12 bands and Carol Fraser | 85 unique outside links checked | Facebook and Instagram block automated checks; those links were verified by hand. `lijazz.com` is down (replaced with Mike Ficco's Long Island Jazz Orchestra page). No official pages found for Nick Palumbo, Ben Hoffman, Lourdes Cruz (personal) or Ellen McCreary |

## Facts migrated (and where they came from)

| Fact | Value on the new site | Source on the old site | Status |
| --- | --- | --- | --- |
| Organization | Swing Dance Long Island, Inc. (SDLI), an all-volunteer, not-for-profit organization dedicated to the promotion of swing dancing on Long Island, New York | Homepage, footer, organizer block | Migrated |
| Weekly dance | Every Tuesday, Huntington Moose Lodge, 631 Pulaski Road, Greenlawn, NY | Homepage, event pages | Migrated |
| Lesson | 7:30 PM | Homepage, September 2026 flyer, event pages | Migrated |
| Social dancing | 8 to 10 PM | Homepage hero (10:00) and September 2026 flyer (8-10PM) | **Contradiction resolved:** the carousel text said 10:30 PM; the newer flyer and hero say 10 PM |
| DJ-night admission | $10 members, $5 students, $15 non-members | Homepage | Migrated |
| Band-night admission | $15 members, $10 students, $20 non-members | Homepage | Migrated |
| Membership | $12 per person per year; October 1 to September 30; join at the door; membership card is the receipt | Join us › SDLI Membership | Migrated |
| Hotline | 24-hour Dance Hotline (631) 476-3707 | Homepage footer, Contact | Migrated |
| Email | info@sdli.org | September 2026 flyer | Migrated |
| Mailing address | P.O. Box 508, Centereach, NY 11720 | Footer, Contact | Migrated |
| Email list | Mailchimp sign-up `http://eepurl.com/f77YX`; weekly emails; emergency cancellations; no membership needed | Join us › SDLI Email Announcements | Migrated |
| Venue phone | (631) 757-2777 (the Lodge, not SDLI) | Venue page | Migrated, labeled as the venue's phone |
| Venue location | 40.8676878, -73.3536959 | Old Google Maps script | Migrated |
| Dance styles | East Coast Swing, Savoy Lindy Hop, Hollywood Lindy, West Coast Swing, Balboa, Collegiate Shag, some ballroom | Homepage, organizer block | Migrated as the style taxonomy |
| Board | President Maria; Treasurer John; Secretary Tom; Director Ed; Board members Peter, Shelia, Edie, Deb | Contact page (undated) | **Needs editorial review** |
| Teachers | Carol Fraser (also "Carol Callahan Fraser"; LISS lead instructor), Lourdes Cruz (WCS), Ellen McCreary (WCS, 2024) | Event titles and band pages | Migrated; bios need review |

## Duplicated, stale, contradictory or incomplete content

1. **End time** listed as both 10:00 PM and 10:30 PM (resolved to 10 PM; see above).
2. **Placeholder event** "Swing Dance Every Tuesday" dated *Saturday*, December 18, 2027, shown as the only upcoming event.
3. **Monthly Saturday Dances** block: "We currently do not have any Saturday Swing dances scheduled" alongside Saturday prices. Omitted; prices for band nights kept in settings.
4. **September 2026 schedule** only as an image. Typed in as five events with an editor note.
5. **Weather notices** posted as separate events (January 2024). Merged into the cancelled dance.
6. **Two entries for the same night** (March 12, 2024 and May 26, 2026). Merged.
7. **Categories** for non-SDLI dance types and "Not a SDLI Event" listings mixed into the archive. Not migrated as events.
8. **Links page** with 40 mostly stale entries. Only active links kept.
9. **Typos:** "Tusday", "SDHI Holiday Party", "Huntingtin" (in the venue URL), "Activites", "reciept", "do to". Fixed in migrated text where the meaning was clear.
10. **Missing facts:** parking, accessibility, whether the lesson is included in admission, October 2026 themes, photographer credits. Marked for review; not invented.

<!-- Tables below were generated from the October 2026 crawl of sdli.org. -->

### Crawled page inventory (400 pages fetched; 2,756 legacy addresses mapped)

| Page type | Pages fetched | Legacy addresses mapped |
| --- | ---: | ---: |
| Monthly event archive | 229 | |
| Band profile | 49 | |
| Venue | 42 | |
| Links ("sponsor") entry | 41 | |
| Other | 12 | |
| Event entry (numeric address) | 9 | |
| Event category archive | 8 | |
| Information ("Join us") | 5 | |
| Calendar | 3 | |
| Event entry | 1 | |
| Member profile | 1 | |
| **All mapped legacy addresses by kind** | | page: 12, section: 12, feed: 2, performer: 48, calendar: 255, event-id: 310, event: 1772, month: 255, category: 8, series: 1, link: 40, venue: 41 |

### Event archive by year (old site)

| Year | Entries | Year | Entries | Year | Entries |
| --- | ---: | --- | ---: | --- | ---: |
| 2006 | 6 | 2007 | 192 | 2008 | 143 |
| 2009 | 95 | 2010 | 113 | 2011 | 108 |
| 2012 | 94 | 2013 | 99 | 2014 | 122 |
| 2015 | 123 | 2016 | 99 | 2017 | 121 |
| 2018 | 102 | 2019 | 84 | 2020 | 25 |
| 2021 | 9 | 2022 | 44 | 2023 | 56 |
| 2024 | 55 | 2025 | 44 | 2026 | 37 |
| 2027 | 1 |  |  |  |  |

### Venues

| Venue | Old address | Status |
| --- | --- | --- |
| Huntington Moose Lodge | `/index.php/sdli/venues/huntingtin_moose_lodge/` | Migrated → `/venues/huntington-moose-lodge/` |
| Ballroom Legacy | `/index.php/sdli/venues/ballroom_legacy/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Bayard Cutting Arboretum | `/index.php/sdli/venues/bayard_cutting_arboretum/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Blacksmith Tavern | `/index.php/sdli/venues/blacksmith_tavern/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Bongo's Night Club | `/index.php/sdli/venues/bongos_night_club/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Brookhaven National Lab | `/index.php/sdli/venues/brookhaven_national_lab/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Brush Barn | `/index.php/sdli/venues/brush_barn/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Butterfields Restaurant | `/index.php/sdli/venues/butterfields_restaurant/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Cinema Arts Center - Huntington | `/index.php/sdli/venues/cinema_arts_center_huntington/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| City Café | `/index.php/sdli/venues/city_cafe/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Club 412 | `/index.php/sdli/venues/club_412/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Coopers Beach | `/index.php/sdli/venues/coopers_beach/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Deer Park Community Center | `/index.php/sdli/venues/deer_park_community_center/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Dominican Village | `/index.php/sdli/venues/dominican_village/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Ethical Humanist Society | `/index.php/sdli/venues/ethical_humanist_society/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Heckscher Park Huntington Village | `/index.php/sdli/venues/heckscher_park_huntington_village/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Huntington Elks | `/index.php/sdli/venues/huntington_elks/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Huske Hall | `/index.php/sdli/venues/huske_hall/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Intermedia Arts Center Theater | `/index.php/sdli/venues/intermedia_arts_center_theater/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Islip Arts Council | `/index.php/sdli/venues/islip_arts_council/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Knights of Columbus Hall - Lindenhurst | `/index.php/sdli/venues/knights_of_columbus_hall_lindenhurst/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Lisa Sparkles Dance Studio | `/index.php/sdli/venues/lisa_sparkles_dance_studio/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Matty T's Roadhouse USA | `/index.php/sdli/venues/matty_ts_roadhouse_usa1/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Mills Pond House Gallery | `/index.php/sdli/venues/mills_pond_house_gallery/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Mirelle's | `/index.php/sdli/venues/mirelles/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Molly Blooms | `/index.php/sdli/venues/molly_blooms/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Morgan Park Summer Festival, Glen Cove NY | `/index.php/sdli/venues/morgan_park_summer_festival_glen_cove_ny/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Old Westbury Gardens | `/index.php/sdli/venues/old_westbury_gardens/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Pomodorino Ristorante Italiano | `/index.php/sdli/venues/pomodorino/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Sachem Public Library | `/index.php/sdli/venues/sachem_public_library/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Sayville Common Ground | `/index.php/sdli/venues/sayville_common_ground/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| South Huntington Public Library | `/index.php/sdli/venues/south_huntington_public_library/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| St Cyril & St Methodius Croatian Church | `/index.php/sdli/venues/st_cyril_st_methodius_croatian_church/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Stony Brook Village Green | `/index.php/sdli/venues/stony_brook_village_green/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Student Activites Center - Stony Brook University | `/index.php/sdli/venues/student_activites_center_stony_brook_university/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Suffolk Theater | `/index.php/sdli/venues/suffolk_theater/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| The Jazz Loft | `/index.php/sdli/venues/the_jazz_loft/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| The Riverhead Polish Hall | `/index.php/sdli/venues/the_riverhead_polish_hall/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Vanderbilt Museum | `/index.php/sdli/venues/vanderbilt_museum/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Whiskey Wind Tavern | `/index.php/sdli/venues/whiskey_wind_tavern/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |
| Winner's Circle | `/index.php/sdli/venues/winners_circle/` | Name kept in "Places SDLI has danced" (`/venues/#past-venues`) |

### Bands and teachers

| Name | Old address | Status |
| --- | --- | --- |
| Americano | `/index.php/sdli/bands/americano/` | Name kept in history list |
| Bay Big Band | `/index.php/sdli/bands/bay_big_band/` | Name kept in history list |
| Big Bad Voodoo Daddy | `/index.php/sdli/bands/big_bad_voodoo_daddy/` | Name kept in history list |
| Big Daddy Deluxe | `/index.php/sdli/bands/big_daddy_deluxe/` | Name kept in history list |
| Brooklyn Swing Ensemble | `/index.php/sdli/bands/brooklyn_swing_ensemble/` | Name kept in history list |
| Carol Callahan Fraser | `/index.php/sdli/bands/carol_callahan_fraser/` | Profile migrated → `/performers/carol-fraser/` |
| Central Park Stompers | `/index.php/sdli/bands/central_park_stompers/` | Name kept in history list |
| City Rhythm Orchestra | `/index.php/sdli/bands/city_rhythm/` | Name kept in history list |
| DJ Frankie | `/index.php/sdli/bands/dj_frankie/` | Name kept in history list |
| DJ Music | `/index.php/sdli/bands/dj_music/` | Name kept in history list |
| Edward deCorsia and New York's Most Dangerous Big Band | `/index.php/sdli/bands/edward_decorsia_and_new_yorks_most_dangerous_big_band/` | Name kept in history list |
| Eight to the Bar | `/index.php/sdli/bands/eight_to_the_bar/` | Name kept in history list |
| Ellen McCreary | `/index.php/sdli/bands/ellen_mccreary/` | Profile migrated → `/performers/ellen-mccreary/` |
| Fleur Seule Band with Allyson Briggs | `/index.php/sdli/bands/fleur_seule_band_with_allyson_briggs/` | Profile migrated → `/performers/fleur-seule/` |
| Gail Storm Band | `/index.php/sdli/bands/gail_storm/` | Profile migrated → `/performers/gail-storm-band/` |
| Gene Casey and the Lone Sharks | `/index.php/sdli/bands/gene_casey_and_the_lone_sharks/` | Profile migrated → `/performers/gene-casey-and-the-lone-sharks/` |
| Glenn Crytzer Orchestra | `/index.php/sdli/bands/glenn_crytzer_orchestra/` | Name kept in history list |
| Good Old Dance Band | `/index.php/sdli/bands/good_old_dance_band/` | Name kept in history list |
| Isotope Stompers Dixieland Jazz Band | `/index.php/sdli/bands/isotope_stompers_dixieland_jazz_band/` | Name kept in history list |
| Jerry Costanzo and His Gotham City Swingers | `/index.php/sdli/bands/jerry_costanzo_and_his_gotham_city_swingers/` | Name kept in history list |
| Lady Luck and the Suicide Kings | `/index.php/sdli/bands/lady_luck_and_the_suicide_kings/` | Name kept in history list |
| Lil' Cliff & The Cliffhangers | `/index.php/sdli/bands/lil_cliff_the_cliffhangers/` | Name kept in history list |
| Long Island Jazz Orchestra | `/index.php/sdli/bands/long_island_jazz_orchestra/` | Profile migrated → `/performers/long-island-jazz-orchestra/` |
| Long Island Sound Swing Band | `/index.php/sdli/bands/long_island_sound_swing_orchestra/` | Name kept in history list |
| Lost Bayou Ramblers | `/index.php/sdli/bands/lost_bayou_ramblers/` | Name kept in history list |
| Lt. Jim and The Blue Saracens | `/index.php/sdli/bands/lt_jim_and_the_blue_saracens/` | Name kept in history list |
| Madeline Kole Quartet | `/index.php/sdli/bands/madeline_kole_quartet/` | Profile migrated → `/performers/madeline-kole-quartet/` |
| Melody Rose | `/index.php/sdli/bands/melody_rose/` | Name kept in history list |
| Michael Arenella & His Dreamland Orchestra | `/index.php/sdli/bands/michael_arenella_his_dreamland_orchestra/` | Name kept in history list |
| New Vintage Swing Band | `/index.php/sdli/bands/new_vintage_swing_band/` | Profile migrated → `/performers/new-vintage-swing-band/` |
| Nick Palumbo and the Flipped Fedoras | `/index.php/sdli/bands/nick_palumbo_and_the_flipped_fedoras/` | Profile migrated → `/performers/nick-palumbo-and-the-flipped-fedoras/` |
| Patti Panebianco | `/index.php/sdli/bands/patti_panebianco/` | Name kept in history list |
| Playing Favorites | `/index.php/sdli/bands/playing_favorites/` | Profile migrated → `/performers/playing-favorites/` |
| Professor Cunningham and his Old School | `/index.php/sdli/bands/professor_cunningham_and_his_old_school/` | Name kept in history list |
| Ray Abrams Big Swing Band | `/index.php/sdli/bands/ray_abrams_big_swing_band/` | Name kept in history list |
| Ron Sunshine | `/index.php/sdli/bands/ron_sunshine/` | Name kept in history list |
| Solomon Douglas Trio | `/index.php/sdli/bands/solomon_douglas_trio/` | Name kept in history list |
| Susquehanna Industrial Tool & Die Co. | `/index.php/sdli/bands/susquehanna_industrial_tool_die_co/` | Name kept in history list |
| Swingtime Big Band | `/index.php/sdli/bands/swing_time_big_band/` | Name kept in history list |
| The Blue Vipers of Brooklyn | `/index.php/sdli/bands/the_blue_vipers_of_brooklyn/` | Name kept in history list |
| The Buzzards | `/index.php/sdli/bands/the_buzzards/` | Profile migrated → `/performers/the-buzzards/` |
| The Cangelosi Cards | `/index.php/sdli/bands/the_cangelosi_cards/` | Name kept in history list |
| The Lustre Kings | `/index.php/sdli/bands/the_lustre_kings/` | Profile migrated → `/performers/the-lustre-kings/` |
| The Swing Alliance Septet with Jerry Costanzo | `/index.php/sdli/bands/the_swing_alliance_septet_with_jerry_costanzo/` | Name kept in history list |
| Tommy James & His Allstars | `/index.php/sdli/bands/tommy_james_his_allstars/` | Name kept in history list |
| Trevor Davison Trio | `/index.php/sdli/bands/trevor_davison_trio/` | Name kept in history list |
| Venessa Trouble and her Red Hot Swing Band | `/index.php/sdli/bands/venessa_trouble_and_her_red_hot_swing_band/` | Name kept in history list |
|  | `/index.php/sdli/bands/long_island_swing_syndicate/` | → `/about/#friends` |

### "Links" page entries

| Name | Website on old site | Status |
| --- | --- | --- |
| Swing Dance Long Island, Inc. (SDLI) | — | Omitted: stale or not current |
| Blake Hobby (Blake Hobby) | `http://www.goldfish78.com/` | Omitted: stale or not current |
| BNL Social & Cultural Club (BNL) | `http://davinci.rodal-intl.org:8020/social/activities.html` | Omitted: stale or not current |
| Brown University Swing Club (Brown U. Swing) | `http://brown.edu/Students/swing/` | Omitted: stale or not current |
| Dance Magic Ballroom (Dance Magic) | `http://www.DanceMagicBallroom.com/` | Omitted: stale or not current |
| Dance! Dance! Dance! (Dance!) | `http://www.danceschedule.com` | Omitted: stale or not current |
| DanceFlurry Organization (Flurry) | `http://danceflurry.org` | Omitted: stale or not current |
| DanceNet: Swing Dancing in and around Boston (havetodance.com) | `http://www.havetodance.com/` | Omitted: stale or not current |
| Dancin.com (Dancin.com) | `http://www.dancin.com` | Omitted: stale or not current |
| Ed & Maria Urbat (Ed & Maria) | — | Omitted: stale or not current |
| Ellen (Ellen) | — | Omitted: stale or not current |
| Huntington Arts Council, Inc. (Huntington Arts) | `http://www.huntingtonarts.org/` | Omitted: stale or not current |
| Innovative DanceSport (Innovative) | `http://fit2dnce.com` | Omitted: stale or not current |
| Intermedia Arts Center (IMAC) | `http://www.imactheater.org/` | Omitted: stale or not current |
| Islip Arts Council (IslipArtsCouncil) | `http://www.islipartscouncil.org` | Omitted: stale or not current |
| Islip Arts Council (Islip Arts) | — | Omitted: stale or not current |
| LI Country Music Association (LICMA) | `http://www.licma.org` | Omitted: stale or not current |
| LI Dance Connection (LIDC) | `http://www.lidance.org/` | Omitted: stale or not current |
| Lisa "Sparkles" Paternoster (Sparkles) | `http://www.LisaSparkles.com` | Omitted: stale or not current |
| Lo-Fi Entertainment (Lo-Fi) | `http://lofientertainment.com/nyc-swing/` | Omitted: stale or not current |
| Long Island Swing Syndicate (LISS) | `http://www.liswingsyndicate.com` | Replaced in October 2026: the domain is now parked. Carol Fraser's current site, Triple Step Swing (`https://triplestepswing.com/`), is linked instead |
| Long Island Traditional Music Association (LITMA) | `http://www.litma.org` | Omitted: stale or not current |
| Louis del Prete (Louis) | `http://groups.yahoo.com/group/ultimate-dance-li/messages` | Omitted: stale or not current |
| Mary Piazza (Mary Piazza) | `http://www.lidance.com/` | Omitted: stale or not current |
| New York Swing Dance Society (NYSDS) | `http://www.nysds.org/` | Omitted: stale or not current |
| Old Westbury Gardens (Old Westbury) | — | Omitted: stale or not current |
| Patti & Anthony (Patti & Anthony) | `http://nydscentre.com` | Omitted: stale or not current |
| Smooth Street Ballroom (Smooth Street) | `http://smoothstreetballroom.com/` | Omitted: stale or not current |
| Southampton Cultural Center (SCC) | `http://www.southamptonculturalcenter.org/` | Omitted: stale or not current |
| Stony Brook University Dance Club (SBU Dance Club) | `http://www.liballroom.com/` | Omitted: stale or not current |
| Swing Remix (Swing Remix) | `http://www.swingremix.com` | Omitted: stale or not current |
| Swingin' 88's (Swingin' 88's) | `http://www.swingin88.com/` | Omitted: stale or not current |
| Swingtime Entertainment (Rob & Patty) | `http://members.aol.com/LindyHolly/Summer2007.htm` | Omitted: stale or not current |
| The Social Club Calendar (SCC) | — | Omitted: stale or not current |
| This is not a Swing Dance Long Island Event (Not a SDLI Event) | — | Omitted: stale or not current |
| Town Of Oyster Bay (Oyster Bay) | `http://www.oysterbaytown.com` | Omitted: stale or not current |
| Ultimate Dance Zone (Mark James) | `http://www.mjames.org` | Omitted: stale or not current |
| Vanderbilt Museum (Vanderbilt) | — | Omitted: stale or not current |
| Yehoodi.com (Yehoodi) | `http://yehoodi.com` | Omitted: stale or not current |
| You Should Be Dancing… (YSBD...) | `http://www.youshouldbedancing.net` | Omitted: stale or not current |

### Migration report

**Migrated (134 events, 2024 to September 2026):**

<details><summary>Show all migrated events</summary>

- 2024-01-02 Swing Dance Evening with Pizza (completed) → `/events/2024-01-02-swing-dance-evening-with-pizza/`
- 2024-01-09 Swing Dance with WCS Lesson by Ellen (cancelled) → `/events/2024-01-09-swing-dance-with-wcs-lesson-by-ellen/`
- 2024-01-16 Playing Favorites at SDLI's Swing Dance (cancelled) → `/events/2024-01-16-playing-favorites-at-sdli-s-swing-dance/`
- 2024-01-23 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-01-23-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-01-30 Fleur Seule Band (completed) → `/events/2024-01-30-fleur-seule-band/`
- 2024-02-06 Swing Dance with Pizza (completed) → `/events/2024-02-06-swing-dance-with-pizza/`
- 2024-02-13 Swing Dance with WCS Lesson by Ellen (cancelled) → `/events/2024-02-13-swing-dance-with-wcs-lesson-by-ellen/`
- 2024-02-20 The Lustre Kings Band (completed) → `/events/2024-02-20-the-lustre-kings-band/`
- 2024-02-27 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-02-27-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-03-05 Swing Dance Evening with Pizza (completed) → `/events/2024-03-05-swing-dance-evening-with-pizza/`
- 2024-03-12 Playing Favorites at SDLI's Swing Dance (completed) → `/events/2024-03-12-playing-favorites-at-sdli-s-swing-dance/`
- 2024-03-19 Gene Casey and the Lone Sharks (completed) → `/events/2024-03-19-gene-casey-and-the-lone-sharks/`
- 2024-03-26 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-03-26-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-04-02 Swing Dance Evening with Pizza (completed) → `/events/2024-04-02-swing-dance-evening-with-pizza/`
- 2024-04-09 Swing Dance with WCS Lesson by Ellen (completed) → `/events/2024-04-09-swing-dance-with-wcs-lesson-by-ellen/`
- 2024-04-16 Nick Palumbo and the Flipped Fedoras (completed) → `/events/2024-04-16-nick-palumbo-and-the-flipped-fedoras/`
- 2024-04-23 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-04-23-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-04-30 SockHop with The Haymakers (completed) → `/events/2024-04-30-sockhop-with-the-haymakers/`
- 2024-05-07 Swing Dance Evening with Pizza (completed) → `/events/2024-05-07-swing-dance-evening-with-pizza/`
- 2024-05-14 Swing Dance with WCS Lesson by Ellen (completed) → `/events/2024-05-14-swing-dance-with-wcs-lesson-by-ellen/`
- 2024-05-21 Gail Storm Band (completed) → `/events/2024-05-21-gail-storm-band/`
- 2024-05-28 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-05-28-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-06-04 Gene Casey and the Lone Sharks (completed) → `/events/2024-06-04-gene-casey-and-the-lone-sharks/`
- 2024-06-11 Swing Dance with WCS Lesson by Ellen (completed) → `/events/2024-06-11-swing-dance-with-wcs-lesson-by-ellen/`
- 2024-06-18 Brian Lewis and the New Vintage Swing (completed) → `/events/2024-06-18-brian-lewis-and-the-new-vintage-swing/`
- 2024-06-25 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-06-25-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-07-09 Swing Dance with WCS Lesson by Ellen (completed) → `/events/2024-07-09-swing-dance-with-wcs-lesson-by-ellen/`
- 2024-07-16 Playing Favorites at SDLI's Swing Dance (completed) → `/events/2024-07-16-playing-favorites-at-sdli-s-swing-dance/`
- 2024-07-23 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-07-23-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-07-30 Nick Palumbo and the Flipped Fedoras (completed) → `/events/2024-07-30-nick-palumbo-and-the-flipped-fedoras/`
- 2024-08-06 Member Appreciation & Pizza Night (completed) → `/events/2024-08-06-member-appreciation-and-pizza-night/`
- 2024-08-13 Swing Dance with WCS Lesson by Ellen (completed) → `/events/2024-08-13-swing-dance-with-wcs-lesson-by-ellen/`
- 2024-08-20 The Haymakers (completed) → `/events/2024-08-20-the-haymakers/`
- 2024-08-27 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-08-27-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-09-10 Swing Dance with Jitterbug Stroll (completed) → `/events/2024-09-10-swing-dance-with-jitterbug-stroll/`
- 2024-09-17 Roy Wilson and the Buzzards (completed) → `/events/2024-09-17-roy-wilson-and-the-buzzards/`
- 2024-09-24 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-09-24-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-10-01 Swing Dance with Pizza (completed) → `/events/2024-10-01-swing-dance-with-pizza/`
- 2024-10-08 Tuesday Swing Dance with Monster Mash Lesson (completed) → `/events/2024-10-08-tuesday-swing-dance-with-monster-mash-lesson/`
- 2024-10-15 Gold Coast Jazz Band (completed) → `/events/2024-10-15-gold-coast-jazz-band/`
- 2024-10-22 Swing Dance with drop in lesson by Carol Fraser (completed) → `/events/2024-10-22-swing-dance-with-drop-in-lesson-by-carol-fraser/`
- 2024-10-29 Halloween Swing Dance (completed) → `/events/2024-10-29-halloween-swing-dance/`
- 2024-11-05 Swing Dance with Pizza (completed) → `/events/2024-11-05-swing-dance-with-pizza/`
- 2024-11-12 Swing Dance (completed) → `/events/2024-11-12-swing-dance/`
- 2024-11-19 Gene Casey and the Lone Sharks (completed) → `/events/2024-11-19-gene-casey-and-the-lone-sharks/`
- 2024-11-26 Swing Dance (completed) → `/events/2024-11-26-swing-dance/`
- 2024-12-03 Swing Dance with Pizza (completed) → `/events/2024-12-03-swing-dance-with-pizza/`
- 2024-12-10 Just another Swing Dance (completed) → `/events/2024-12-10-just-another-swing-dance/`
- 2024-12-17 SDLI Holiday Party with Live Band and Food (completed) → `/events/2024-12-17-sdli-holiday-party-with-live-band-and-food/`
- 2024-12-24 No Tuesday Swing Dance (cancelled) → `/events/2024-12-24-no-tuesday-swing-dance/`
- 2024-12-31 New Years Eve at the Huntington Moose Lodge (completed) → `/events/2024-12-31-new-years-eve-at-the-huntington-moose-lodge/`
- 2025-02-04 Swing Dance with Pizza (completed) → `/events/2025-02-04-swing-dance-with-pizza/`
- 2025-02-11 Valentine's Themed Swing Dance - Shim Sham with Carol (completed) → `/events/2025-02-11-valentine-s-themed-swing-dance-shim-sham-with-carol/`
- 2025-02-18 Gail Storm Band (completed) → `/events/2025-02-18-gail-storm-band/`
- 2025-02-25 Swing Dance (completed) → `/events/2025-02-25-swing-dance/`
- 2025-03-04 Mardi Gras & Pizza Night (completed) → `/events/2025-03-04-mardi-gras-and-pizza-night/`
- 2025-03-11 Shim Sham Lesson with Carol (completed) → `/events/2025-03-11-shim-sham-lesson-with-carol/`
- 2025-03-18 The Mess Around - St Patrick's Day Theme (completed) → `/events/2025-03-18-the-mess-around-st-patrick-s-day-theme/`
- 2025-03-25 Swing Dance (completed) → `/events/2025-03-25-swing-dance/`
- 2025-04-01 Swing Dance with Pizza (completed) → `/events/2025-04-01-swing-dance-with-pizza/`
- 2025-04-08 Swing Dance (completed) → `/events/2025-04-08-swing-dance/`
- 2025-04-15 The Lustre Kings (completed) → `/events/2025-04-15-the-lustre-kings/`
- 2025-04-22 Swing Dance (completed) → `/events/2025-04-22-swing-dance/`
- 2025-04-29 Laura Meade & Playing Favorites (completed) → `/events/2025-04-29-laura-meade-and-playing-favorites/`
- 2025-05-06 Swing Dance with Pizza (completed) → `/events/2025-05-06-swing-dance-with-pizza/`
- 2025-05-13 Swing Dancing at the Moose Lodge (completed) → `/events/2025-05-13-swing-dancing-at-the-moose-lodge/`
- 2025-05-20 Gail Storm Band (completed) → `/events/2025-05-20-gail-storm-band/`
- 2025-05-27 Swing Dance with Carol Teaching (completed) → `/events/2025-05-27-swing-dance-with-carol-teaching/`
- 2025-06-03 Swing Dancing with Pizza (completed) → `/events/2025-06-03-swing-dancing-with-pizza/`
- 2025-06-10 Swing Dance with West Coast Swing Lesson by Lourdes Cruz (completed) → `/events/2025-06-10-swing-dance-with-west-coast-swing-lesson-by-lourdes-cruz/`
- 2025-06-17 Brian Lewis and New Vintage Swing (completed) → `/events/2025-06-17-brian-lewis-and-new-vintage-swing/`
- 2025-06-24 Swing Dance with Carol Teaching (completed) → `/events/2025-06-24-swing-dance-with-carol-teaching/`
- 2025-07-01 Swing Dancing with Pizza (completed) → `/events/2025-07-01-swing-dancing-with-pizza/`
- 2025-07-08 Swing Dance with West Coast Swing Lesson by Lourdes Cruz (completed) → `/events/2025-07-08-swing-dance-with-west-coast-swing-lesson-by-lourdes-cruz/`
- 2025-07-15 Playing Favorites (completed) → `/events/2025-07-15-playing-favorites/`
- 2025-07-22 Swing Dance with Carol Teaching (completed) → `/events/2025-07-22-swing-dance-with-carol-teaching/`
- 2025-07-29 The Mess Around (completed) → `/events/2025-07-29-the-mess-around/`
- 2025-08-12 Swing Dance with West Coast Swing Lesson by Lourdes Cruz (completed) → `/events/2025-08-12-swing-dance-with-west-coast-swing-lesson-by-lourdes-cruz/`
- 2025-08-19 Roy Wilson and the Buzzards - Swing Dance (completed) → `/events/2025-08-19-roy-wilson-and-the-buzzards-swing-dance/`
- 2025-08-26 Swing Dance with Carol Fraser Teaching (completed) → `/events/2025-08-26-swing-dance-with-carol-fraser-teaching/`
- 2025-09-02 Swing Dancing with Pizza (completed) → `/events/2025-09-02-swing-dancing-with-pizza/`
- 2025-09-16 The Lone Sharks (completed) → `/events/2025-09-16-the-lone-sharks/`
- 2025-09-30 Nick Palumbo and the Flipped Fedoras (completed) → `/events/2025-09-30-nick-palumbo-and-the-flipped-fedoras/`
- 2025-10-07 Swing Dance with Pizza (completed) → `/events/2025-10-07-swing-dance-with-pizza/`
- 2025-10-14 Swing Dance Every Tuesday (completed) → `/events/2025-10-14-swing-dance-every-tuesday/`
- 2025-10-21 Halloween Dance with Gail Storm (completed) → `/events/2025-10-21-halloween-dance-with-gail-storm/`
- 2025-11-04 Swing Dance with Pizza (completed) → `/events/2025-11-04-swing-dance-with-pizza/`
- 2025-11-11 Swing Dance with West Coast Swing Lesson by Lourdes Cruz (completed) → `/events/2025-11-11-swing-dance-with-west-coast-swing-lesson-by-lourdes-cruz/`
- 2025-11-18 Swing Dance with the Madeline Kole Quartet (completed) → `/events/2025-11-18-swing-dance-with-the-madeline-kole-quartet/`
- 2025-11-25 Swing Dance (completed) → `/events/2025-11-25-swing-dance/`
- 2025-12-02 Swing Dance with Pizza (completed) → `/events/2025-12-02-swing-dance-with-pizza/`
- 2025-12-09 Swing Dance with Carol Fraser Teaching (completed) → `/events/2025-12-09-swing-dance-with-carol-fraser-teaching/`
- 2025-12-16 SDLI Holiday Party with the Gold Coast Jazz Band (completed) → `/events/2025-12-16-sdli-holiday-party-with-the-gold-coast-jazz-band/`
- 2025-12-23 No dance this week (cancelled) → `/events/2025-12-23-no-dance-this-week/`
- 2025-12-30 Swing Dance with Playing Favorites Band (completed) → `/events/2025-12-30-swing-dance-with-playing-favorites-band/`
- 2026-01-06 Swing Dance with Pizza (completed) → `/events/2026-01-06-swing-dance-with-pizza/`
- 2026-01-13 Swing Dance this Tuesday (completed) → `/events/2026-01-13-swing-dance-this-tuesday/`
- 2026-01-20 The Mutant Kings (completed) → `/events/2026-01-20-the-mutant-kings/`
- 2026-01-27 Swing Dance with Carol Fraser Teaching (cancelled) → `/events/2026-01-27-swing-dance-with-carol-fraser-teaching/`
- 2026-02-03 Swing Dance with Pizza (completed) → `/events/2026-02-03-swing-dance-with-pizza/`
- 2026-02-10 Valentine's Swing Dance (completed) → `/events/2026-02-10-valentine-s-swing-dance/`
- 2026-02-17 Nick Palumbo and the Flipped Fedoras (completed) → `/events/2026-02-17-nick-palumbo-and-the-flipped-fedoras/`
- 2026-02-24 Tuesday Swing Dance (cancelled) → `/events/2026-02-24-tuesday-swing-dance/`
- 2026-03-03 Swing Dance with Pizza (completed) → `/events/2026-03-03-swing-dance-with-pizza/`
- 2026-03-10 Swing Dance with Carol Fraser Teaching (completed) → `/events/2026-03-10-swing-dance-with-carol-fraser-teaching/`
- 2026-03-17 Swing Dance with the Madeline Kole Quartet (completed) → `/events/2026-03-17-swing-dance-with-the-madeline-kole-quartet/`
- 2026-03-24 Swing Dance at the Moose Lodge (completed) → `/events/2026-03-24-swing-dance-at-the-moose-lodge/`
- 2026-03-31 Swing Dance with the Playing Favorites Band (completed) → `/events/2026-03-31-swing-dance-with-the-playing-favorites-band/`
- 2026-04-07 Swing Dance with Pizza (completed) → `/events/2026-04-07-swing-dance-with-pizza/`
- 2026-04-14 Tuesday Swing Dance (completed) → `/events/2026-04-14-tuesday-swing-dance/`
- 2026-04-21 Mess Around Band (completed) → `/events/2026-04-21-mess-around-band/`
- 2026-04-28 Tuesday Swing Dance with Carol (completed) → `/events/2026-04-28-tuesday-swing-dance-with-carol/`
- 2026-05-05 Cinco de Mayo Swing Dance (completed) → `/events/2026-05-05-cinco-de-mayo-swing-dance/`
- 2026-05-12 Swing Dance with Lourdes Cruz instruction (completed) → `/events/2026-05-12-swing-dance-with-lourdes-cruz-instruction/`
- 2026-05-19 No dance this week (cancelled) → `/events/2026-05-19-no-dance-this-week/`
- 2026-05-26 Gene Casey & The Lone Sharks (completed) → `/events/2026-05-26-gene-casey-and-the-lone-sharks/`
- 2026-06-02 Swing Dance with Pizza (completed) → `/events/2026-06-02-swing-dance-with-pizza/`
- 2026-06-09 Swing Dance with Lourdes Cruz instruction (completed) → `/events/2026-06-09-swing-dance-with-lourdes-cruz-instruction/`
- 2026-06-16 Band Night with Ben Hoffman Band (completed) → `/events/2026-06-16-band-night-with-ben-hoffman-band/`
- 2026-06-23 EC Swing Lesson with Carol Fraser (completed) → `/events/2026-06-23-ec-swing-lesson-with-carol-fraser/`
- 2026-06-30 Red, White and Blue Swing Dance - The Brian Lewis New Vintage Orchestra (completed) → `/events/2026-06-30-red-white-and-blue-swing-dance-the-brian-lewis-new-vintage-orchestra/`
- 2026-07-07 Swing Dance with Pizza (completed) → `/events/2026-07-07-swing-dance-with-pizza/`
- 2026-07-14 West Coast Swing Lesson with Lourdes Cruz (completed) → `/events/2026-07-14-west-coast-swing-lesson-with-lourdes-cruz/`
- 2026-07-21 Band Night - The Haymakers (completed) → `/events/2026-07-21-band-night-the-haymakers/`
- 2026-07-28 Swing Dance with Carol Fraser Teaching East Coast Swing (completed) → `/events/2026-07-28-swing-dance-with-carol-fraser-teaching-east-coast-swing/`
- 2026-08-04 Swing Dance with Pizza (completed) → `/events/2026-08-04-swing-dance-with-pizza/`
- 2026-08-11 Swing Dance with Lourdes Cruz instruction (completed) → `/events/2026-08-11-swing-dance-with-lourdes-cruz-instruction/`
- 2026-08-18 Gail Storm Band (completed) → `/events/2026-08-18-gail-storm-band/`
- 2026-08-25 Advanced Swing Drop-in Lesson by Carol Fraser (completed) → `/events/2026-08-25-advanced-swing-drop-in-lesson-by-carol-fraser/`
- 2026-09-01 Pizza Night (completed) → `/events/2026-09-01-pizza-night/`
- 2026-09-08 West Coast Swing Lesson with Lourdes Cruz (completed) → `/events/2026-09-08-west-coast-swing-lesson-with-lourdes-cruz/`
- 2026-09-15 Band Night: Nick Palumbo and the Flipped Fedoras (completed) → `/events/2026-09-15-band-night-nick-palumbo-and-the-flipped-fedoras/`
- 2026-09-22 East Coast Swing Lesson with Carol Fraser (completed) → `/events/2026-09-22-east-coast-swing-lesson-with-carol-fraser/`
- 2026-09-29 Band Night: Playing Favorites (completed) → `/events/2026-09-29-band-night-playing-favorites/`

</details>

**Consolidated (6):**

- 2024-01-07 "Weather Update:" — weather notice folded into that week's cancelled dance
- 2024-01-09 "Weather Update: Tuesday Dance Cancelled" — weather notice folded into that week's cancelled dance
- 2024-01-14 "Weather Update: Tuesday Dance with Playing Favorites Cancelled" — weather notice folded into that week's cancelled dance
- 2026-09-29 "September 2026 Events" — flyer image replaced by five individual September 2026 events
- 2024-03-12 "Swing Dance with WCS Lesson by Ellen" merged into "Playing Favorites at SDLI's Swing Dance" (same night)
- 2026-05-26 "Get Ready to Swing the Night Away!" merged into "Gene Casey & The Lone Sharks" (same night)

**Intentionally omitted from the event archive:**

- 2026-02-22 "Sunday E&M Lesson Cancelled" — not a Tuesday SDLI dance and no venue listed
- 1,635 archive entries from October 2006 through 2023 (summarized by year on `/events/past/`; every old address redirects there)
- Entries marked "Not a SDLI Event" and the non-swing categories (Cajun, Contra, Country, Salsa, Zydeco)
- The 2027 placeholder entry "Swing Dance Every Tuesday" (replaced by the recurring series)
- Member profile pages and site statistics counters

## Content that could not be migrated confidently

- **Event times for archived nights** whose description did not state times: kept as date-only ("time not listed") rather than guessing.
- **Admission for archived nights:** only shown when the old entry stated it.
- **Photos on the old site's SmugMug account:** only the 9 banner photos used on the site itself were found; no public SDLI gallery was reachable.
- **Old galleries** under `/gallery/2007-…`: image files returned "not found".

## Needs editorial review

Every item is recorded in the `editorialReview` field of the relevant content file (shown in the CMS as **Notes for editors**; never displayed publicly). Search the repository for `editorialReview` to list them.