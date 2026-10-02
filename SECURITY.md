# Security policy

## Reporting a vulnerability

Please **do not** open a public issue. Use GitHub's private reporting: **Security → Report a vulnerability** on this repository, or email info@sdli.org with "Security" in the subject. We will acknowledge within 7 days. SDLI is run by volunteers, so please allow reasonable time for a fix.

## Scope

- The website code in this repository and its Azure Static Web Apps deployment
- The Azure Functions in `api/` (Decap CMS OAuth bridge and telemetry)

Out of scope: third-party services (GitHub, Azure, Mailchimp, Google Analytics, Microsoft Clarity) and the old `sdli.org` host.

## How the site is protected

| Area | Measure |
| --- | --- |
| Secrets | None in Git. OAuth client secret and Application Insights connection string are Azure app settings; the deployment token is a GitHub Actions secret. gitleaks scans full history in CI; GitHub secret scanning with push protection is on. |
| Headers | Strict Content-Security-Policy (no `unsafe-inline` scripts or styles on the public site), `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, HSTS. A separate CSP applies only to `/admin/`. |
| CMS sign-in | GitHub OAuth with a random `state` stored in an `HttpOnly; Secure; SameSite=Lax` cookie and compared in constant time; redirect hosts allow-listed (`ALLOWED_HOSTS`); least-privilege scope (`public_repo`); token handed to the opener window only on the same origin; tokens never logged. |
| Public write endpoint (`/api/telemetry`) | Same-origin check, 8 KB limit, schema and value allow-lists, max 25 items, per-client rate limit (120 items/min) using salted, never-stored IP hashes. |
| Dependencies | Dependabot updates and alerts; CodeQL code scanning; Actions pinned to commit SHAs; workflows use least-privilege `permissions`. |
| Privacy | No advertising trackers. GA4 and Clarity load only after consent; Global Privacy Control honored. |
| Content | Inline Markdown in FAQs is HTML-escaped; JSON-LD is escaped before embedding. |
