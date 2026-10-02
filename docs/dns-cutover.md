# DNS cutover plan

> **This is a manual step.** Nothing in this project changes the live `sdli.org` DNS records. Do this only after SDLI's board approves the new site.

Current state (October 2026): `www.sdli.org` is a CNAME to `sdli.org`, which points to `143.95.38.203` (the old ExpressionEngine host). The old site's HTTPS certificate has **expired**.

Target: `https://www.sdli.org` is the main address. `https://sdli.org` redirects to it.

## Before cutover (about one week ahead)

1. **Decide where the Azure resources should live.** The site currently runs in the default subscription of the person who built it (a Microsoft-internal "MCAPS" sandbox). Move it to an SDLI-owned Azure subscription before going live: create a subscription for SDLI, run `./infra/deploy.ps1` there, and update the GitHub secret (see [deployment.md](deployment.md)). Free plan: no cost.
2. **Lower the DNS TTL** for `www` and the apex record to 300 seconds at the DNS provider, 24–48 hours ahead.
3. **Finish the content review** items in [legacy-site-migration.md §5](legacy-site-migration.md#5-what-still-needs-a-volunteer-to-confirm).
4. **Set up CMS sign-in** for `www.sdli.org` (see [editor-guide.md](editor-guide.md#cms-sign-in-setup-administrator)).
5. **Optional analytics:** create the GA4 property and Clarity project; add the IDs as GitHub variables.
6. Note the old site's DNS values so you can roll back.

## Cutover steps

### 1. Add `www.sdli.org` to the Static Web App

```bash
az staticwebapp hostname set -n swa-sdli-web -g rg-sdli-web --hostname www.sdli.org --no-wait
```

The portal (or `az staticwebapp hostname show`) then shows the **CNAME** to create.

### 2. Create the DNS record at the DNS provider

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| CNAME | `www` | `witty-smoke-095ea140f.2.azurestaticapps.net` | 300 |

Wait until `az staticwebapp hostname show -n swa-sdli-web -g rg-sdli-web --hostname www.sdli.org` reports `Ready`. Azure issues the HTTPS certificate automatically (usually within an hour).

### 3. Apex domain `sdli.org`

Choose one:

- **Recommended:** at the DNS provider, use URL forwarding (301) from `sdli.org` to `https://www.sdli.org`.
- **Or** add `sdli.org` as a second custom domain in Static Web Apps (TXT validation, then an ALIAS/ANAME record, or Azure DNS). Then set `www.sdli.org` as the default domain in the portal so `sdli.org` redirects.

### 4. Switch the site's canonical address and allow search engines

```bash
gh variable set SITE_URL --repo michaelsrichter/sdli-website --body https://www.sdli.org
gh variable set ALLOW_INDEXING --repo michaelsrichter/sdli-website --body true
az staticwebapp appsettings set -n swa-sdli-web -g rg-sdli-web --setting-names "ALLOWED_HOSTS=www.sdli.org,sdli.org,witty-smoke-095ea140f.2.azurestaticapps.net"
gh workflow run azure-static-web-apps.yml --repo michaelsrichter/sdli-website
```

Update the GitHub OAuth App's Homepage URL and callback (`https://www.sdli.org/api/callback`).

### 5. Verify

```bash
node scripts/smoke.mjs https://www.sdli.org
curl -I http://www.sdli.org/index.php/sdli/news/membership/   # 301 -> /membership/
curl -I https://sdli.org/                                      # 301 -> https://www.sdli.org/
```

- Open the site on a phone over cellular data.
- Check `/robots.txt` now allows crawling and lists the sitemap.
- In **Google Search Console**, verify the domain, submit `https://www.sdli.org/sitemap-index.xml`, and inspect a few old URLs.
- Update links in Facebook, Mailchimp templates and printed materials over time (old links keep working).

### 6. After a week

Raise TTLs back to 3600. Keep the old hosting account for 30 days (read-only) in case anything was missed, then cancel it.

## Rolling back the cutover

Point the `www` CNAME back to `sdli.org` (and the apex A record back to `143.95.38.203`). With a 300-second TTL, most visitors switch back within minutes. See [rollback.md](rollback.md).
