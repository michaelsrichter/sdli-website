# Analytics and telemetry

The site measures visits in three ways. Only the first is always on, and it uses **no cookies and no personal data**.

| Layer | Always on? | Cookies | Where data goes | Configure |
| --- | --- | --- | --- | --- |
| First-party OpenTelemetry (`/api/telemetry`) | Yes | None | Azure Monitor: Application Insights `appi-swa-sdli-web` | `APPLICATIONINSIGHTS_CONNECTION_STRING` app setting (set by `infra/deploy.ps1`) |
| Google Analytics 4 | Only after the visitor clicks **Allow** (default `opt-in`) | Yes | Google | GitHub variable `PUBLIC_GA4_ID` |
| Microsoft Clarity | Only after the visitor clicks **Allow** | Yes | Microsoft Clarity | GitHub variable `PUBLIC_CLARITY_ID` |

If neither GA4 nor Clarity is configured, no consent banner is shown. Global Privacy Control (`navigator.globalPrivacyControl`) is treated as "No, thanks". Visitors can change their choice from **Privacy choices** in the footer.

## Custom events

Tracked declaratively with `data-track` attributes and in `src/scripts/*.ts`. All events go to OpenTelemetry; GA4 and Clarity receive them only after consent.

| Event | When | Properties |
| --- | --- | --- |
| `page_view` | Every page (OTel only; GA4 records its own) | `page_type` |
| `view_event` | Event detail page | `event_slug`, `event_status`, `days_until` |
| `select_event` | "View event details" on the homepage | `location` |
| `add_to_calendar` | Google, Outlook, Outlook work/school, `.ics`, calendar subscription | `method` (`google`, `outlook`, `office365`, `ics`, `subscribe_feed`), `location` |
| `share` | Native share, copy link, copy details, Facebook, email, SMS, download image | `method`, `event_slug`, `location` |
| `share_open` | Share dialog opened (no native share available) | `event_slug` |
| `copy_failed` | Clipboard copy failed | `method` |
| `get_directions` | Google Maps or Apple Maps | `method`, `location` |
| `outbound_click` | Opened a teacher's, band's, organizer's or venue's website or social page, or tapped an organizer's phone/email | `method` (`website`, `facebook`, `instagram`, `youtube`, `link`, `phone`, `email`, `reviews`), `location`, `target` (destination site, e.g. `triplestepswing.com`) |
| `click_hotline` | Tapped the hotline phone number | `location` |
| `click_email` | Tapped `info@sdli.org` | `location` |
| `newsletter_click` | Opened the Mailchimp sign-up | `location` |
| `filter_events` | Changed event filters | `filter`, `value`, `results` |
| `view_calendar_month` | Moved to the previous/next month | `method` |
| `show_more` | "Show N more SDLI dances" / "Show fewer" on a list that starts with the next 3 | `method` (`expand`, `collapse`), `location` (the list: `home`, `events`, `event_more`, `venue`, `series`, `performer`, `lessons`), `results` (how many extra dances) |
| `theme_change` | Picked light, dark or auto (match the device) mode | `method` (`light`, `dark`, `auto`), `location` (`header`, `menu`, `footer`) |
| `faq_open` | Opened a question | `question` |
| `empty_state` | Visitor saw "no upcoming events" | `location` |
| `consent_update` | Analytics choice | `value`, `mode` |
| `web_vital` | Core Web Vitals (OTel only) | `metric` (LCP, INP, CLS, FCP, TTFB), `rating`, value |

Locations used: `home_next`, `home`, `home_venue`, `event`, `event_aside`, `action_bar`, `events`, `events_community`, `card`, `calendar`, `map`, `map_pin`, `map_list`, `map_popup`, `venue`, `venue_panel`, `performer`, `performers`, `community`, `contact`, `header`, `footer`.

## OpenTelemetry metrics (Application Insights `customMetrics`)

| Metric | Type | Dimensions |
| --- | --- | --- |
| `sdli.web.page_views` | Counter | `page_type`, `release` |
| `sdli.web.event_views` | Counter | `page_type`, `event_status`, `release` |
| `sdli.web.interactions` | Counter | `action`, `method`, `location`, `page_type` |
| `sdli.web.consent_updates` | Counter | `value`, `mode` |
| `sdli.web.vitals.lcp`, `.inp`, `.fcp`, `.ttfb` (ms), `.cls` (×1000) | Histogram | `page_type`, `rating` |
| `sdli.telemetry.rejected` | Counter | `reason` (`origin`, `too_large`, `bad_json`, `rate_limited`, …) |
| `sdli.cms.auth` | Counter | `result` (`started`, `success`, `state_mismatch`, `github_error`, `config_missing`, …) |

Custom events are also written to the `customEvents` table (via the OpenTelemetry logs API with `microsoft.custom_event.name`), including the page path and event slug.

## Example queries (Application Insights → Logs)

```kusto
// Most-used actions in the last 7 days
customEvents
| where timestamp > ago(7d) and name != "page_view"
| summarize count() by name, method = tostring(customDimensions.method)
| order by count_ desc

// Add-to-calendar by method
customEvents
| where timestamp > ago(30d) and name == "add_to_calendar"
| summarize count() by tostring(customDimensions.method)

// Most viewed upcoming events
customEvents
| where timestamp > ago(30d) and name == "view_event"
| summarize views = count() by event = tostring(customDimensions.event_slug)
| top 10 by views

// Core Web Vitals (75th percentile) by page type
customMetrics
| where timestamp > ago(7d) and name startswith "sdli.web.vitals."
| summarize p75 = percentile(value, 75) by name, page_type = tostring(customDimensions.page_type)

// Rejected telemetry (abuse or bugs)
customMetrics
| where timestamp > ago(1d) and name == "sdli.telemetry.rejected"
| summarize sum(valueSum) by tostring(customDimensions.reason)
```

## Setting up Google Analytics 4 and Clarity (manual)

1. **GA4:** create a property for `www.sdli.org` at <https://analytics.google.com>, add a Web data stream, copy the **Measurement ID** (`G-…`). In the property's Data Settings, keep Google signals **off**. Recommended: mark `add_to_calendar`, `share`, `get_directions`, `newsletter_click` and `click_hotline` as key events.
2. **Clarity:** create a project at <https://clarity.microsoft.com>, copy the **Project ID**. In Settings → Masking, choose **Strict**.
3. Add the IDs as GitHub Actions variables `PUBLIC_GA4_ID` and `PUBLIC_CLARITY_ID`, then re-run the deployment workflow. The CSP already allows these services.

## Privacy and cost

- Telemetry IP addresses are never stored: the function hashes them with a random per-instance salt only for rate limiting. Application Insights IP masking stays on.
- The Log Analytics workspace has a **0.1 GB/day ingestion cap** and 30-day retention, keeping cost at or near $0 for a small site.
- **Turn telemetry off:** remove the `APPLICATIONINSIGHTS_CONNECTION_STRING` app setting (the endpoint keeps returning 204 but records nothing), or set the GitHub variable `PUBLIC_TELEMETRY_ENDPOINT` to `off` and redeploy (the browser then sends nothing).
- **Turn GA4/Clarity off:** delete their GitHub variables and redeploy.
