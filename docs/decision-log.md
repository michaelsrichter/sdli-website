# Decision log

| # | Date | Decision | Why | Reversible? |
| --- | --- | --- | --- | --- |
| 1 | 2026-10-01 | **Astro 7** static site, TypeScript strict, content collections with Zod | Fast, minimal JavaScript, schema-validated content | Yes |
| 2 | 2026-10-01 | Repository **`michaelsrichter/sdli-website`, public** | Requested by the owner. The Microsoft EMU account (`mrichter_microsoft`) cannot host public repos or add outside SDLI volunteers as editors. Public repos get free CodeQL, secret scanning and push protection. | Transfer to an SDLI GitHub organization later (Settings → Transfer) |
| 3 | 2026-10-01 | Azure resources in the signed-in default subscription (**MCAPS-Hybrid-REQ-119059-2025-mrichter**), resource group `rg-sdli-web`, East US 2 | The owner asked to deploy using the existing sign-in. Free plan, near-zero cost. **This is a Microsoft-internal sandbox subscription; move to an SDLI-owned subscription before DNS cutover.** | Yes: re-run `infra/deploy.ps1` elsewhere, update the GitHub secret |
| 4 | 2026-10-01 | Static Web Apps **Free** plan with managed Functions | Covers HTTPS, CDN, custom domains, previews and small APIs at no cost | Upgrade to Standard anytime |
| 5 | 2026-10-01 | Self-host the Decap CMS bundle under `/admin/` | No third-party CDN script; tighter CSP | Yes |
| 6 | 2026-10-01 | Custom GitHub OAuth bridge in Azure Functions with CSRF state cookie | Decap needs an OAuth endpoint; Netlify's is not available on Azure. ~150 lines, unit tested. Alternatives documented (GitHub web editing, local CMS, DecapBridge). | Yes |
| 7 | 2026-10-01 | Store event times as **local wall-clock strings + IANA timezone** | Avoids browser date parsing and DST bugs; converted at build time | — |
| 8 | 2026-10-01 | **Recurring series with per-date overrides**; URL = date + series slug | Editors do not enter every Tuesday; links never change | — |
| 9 | 2026-10-01 | Publish series dates **12 weeks ahead** | Enough for planning; limits stale guesses. Generated dates show a "regular schedule" note. | Change `horizonWeeks` |
| 10 | 2026-10-01 | **Nightly rebuild** + client-side expiry check | A static site would otherwise show yesterday's dance as "next" | — |
| 11 | 2026-10-01 | Migrate **2024–Sept 2026** archive (134 events) as pages; summarize 2006–2023 by year | Recent history is useful; older entries are mostly stale and mixed with non-SDLI listings | Older entries can be migrated later from the crawl |
| 12 | 2026-10-01 | End time **10 PM** (not 10:30) | The newer homepage hero and the Sept 2026 flyer both say 10 | Edit the series |
| 13 | 2026-10-01 | Two-layer legacy redirects (301 rules + generated redirect pages) | 2,756 legacy URLs exceed the 20 KB config limit | — |
| 14 | 2026-10-01 | No embedded map; directions links to Google and Apple Maps | Performance, privacy, CSP | Add click-to-load map later |
| 15 | 2026-10-01 | WebP + JPEG fallback (no AVIF) | AVIF was larger than WebP for these grainy photos and slowed builds | Re-enable in `ResponsiveImage.astro` |
| 16 | 2026-10-01 | One self-hosted display font (Fraunces 700) + system fonts | Minimal font requests | — |
| 17 | 2026-10-01 | Real SDLI photos where available; open-licensed Wikimedia Commons photos only as credited, clearly labeled inspiration | Owner asked for photos of dancing and people in nice clothing; brief forbids fabricated event photos | Replace with SDLI photos anytime |
| 18 | 2026-10-01 | **Analytics:** first-party cookieless OpenTelemetry always on; GA4 and Clarity opt-in by consent (GPC honored) | Owner requested GA4, Clarity and OTel; brief requires privacy-respecting defaults | Set `PUBLIC_ANALYTICS_CONSENT_MODE=opt-out` to load by default |
| 19 | 2026-10-01 | `noindex` and canonical = Azure hostname until DNS cutover | Avoid duplicate-content indexing of the preview host | Flip `ALLOW_INDEXING` and `SITE_URL` |
| 20 | 2026-10-01 | Mailchimp link for the email list (no custom form or email relay) | Existing, works, no insecure relay or new personal-data handling | — |
| 21 | 2026-10-01 | Unknown facts (parking, accessibility, lesson included in admission, October themes) left as "call the hotline" with editor notes | Brief forbids inventing facts | Fill in via CMS |
| 22 | 2026-10-01 | Commits authored with the GitHub noreply address | Avoid publishing a work email in a public repo's history | — |
| 23 | 2026-10-01 | Code license not chosen | SDLI should decide (content is © SDLI). Repo is public but "all rights reserved" by default. | Add a LICENSE file |
| 24 | 2026-10-01 | `gitleaks` binary (checksum-verified) instead of the gitleaks Action | The Action crashed on harmless git warnings | — |
