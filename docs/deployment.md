# Deployment

## Environments

| Environment | URL | Trigger |
| --- | --- | --- |
| Production | `https://sdli.mikerichter.app` (pre-launch custom domain; also `https://witty-smoke-095ea140f.2.azurestaticapps.net`; final: `https://www.sdli.org`) | Push to `main`, nightly at 05:15 New York time, or manual run |
| Pull-request previews | `https://witty-smoke-095ea140f-<PR number>.eastus2.2.azurestaticapps.net` (posted on the PR) | Every pull request to `main` (Free plan: 3 at a time) |
| Local | `http://localhost:4321` | `npm run dev` |

## Azure resources (resource group `rg-sdli-web`, East US 2)

| Resource | Name | SKU / cost |
| --- | --- | --- |
| Static Web App | `swa-sdli-web` | Free |
| Log Analytics workspace | `log-swa-sdli-web` | Pay-as-you-go, 30-day retention, **0.1 GB/day cap** |
| Application Insights | `appi-swa-sdli-web` | Workspace-based |

Tags: `project=sdli-website`, `owner=Swing Dance Long Island`, `managedBy=bicep`, `costCenter=volunteer`.

## Provisioning (repeatable)

Prerequisites: Azure CLI signed in (`az login`), GitHub CLI signed in as the repository owner (`gh auth login`), permission to create resource groups.

```powershell
./infra/deploy.ps1 -Repo michaelsrichter/sdli-website
```

The script is idempotent. It:

1. Creates `rg-sdli-web` and deploys `infra/main.bicep` with `infra/main.bicepparam`.
2. Pipes the Static Web Apps deployment token straight into the GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN` (never printed).
3. Sets GitHub Actions variables `SITE_URL` and `ALLOW_INDEXING`.
4. Sets Static Web App app settings `ALLOWED_HOSTS`, `APPLICATIONINSIGHTS_CONNECTION_STRING` and, if provided, the GitHub OAuth credentials.

Manual equivalent:

```bash
az group create -n rg-sdli-web -l eastus2
az deployment group create -g rg-sdli-web -f infra/main.bicep -p infra/main.bicepparam
az staticwebapp secrets list -n swa-sdli-web -g rg-sdli-web --query properties.apiKey -o tsv | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN --repo michaelsrichter/sdli-website
```

## GitHub configuration

| Kind | Name | Purpose |
| --- | --- | --- |
| Secret | `AZURE_STATIC_WEB_APPS_API_TOKEN` | Deploy to Static Web Apps |
| Variable | `SITE_URL` | Canonical origin (SWA hostname until cutover, then `https://www.sdli.org`) |
| Variable | `ALLOW_INDEXING` | `false` until cutover; `true` afterwards |
| Variable (optional) | `PUBLIC_GA4_ID` | Google Analytics 4 measurement ID (`G-XXXXXXX`) |
| Variable (optional) | `PUBLIC_CLARITY_ID` | Microsoft Clarity project ID |
| Variable (optional) | `PUBLIC_ANALYTICS_CONSENT_MODE` | `opt-in` (default) or `opt-out` |
| Environment | `production`, `preview` | Created by the workflow; add required reviewers to `production` if desired |

Least privilege: the deployment token can only upload to this Static Web App. Workflows use `permissions: contents: read` (plus `pull-requests: write` only for preview comments). No Azure credentials are stored in GitHub.

## Pipeline

1. **CI** (`.github/workflows/ci.yml`) on every PR and push: `astro check`, unit tests, API tests, build, internal link check, Playwright end-to-end + axe + 320 px tests, Lighthouse gates (Performance ≥ 0.90, Accessibility ≥ 0.95, Best Practices ≥ 0.95, SEO ≥ 0.95), and gitleaks secret scanning.
2. **CodeQL** (`codeql.yml`): security and quality analysis.
3. **Deploy** (`azure-static-web-apps.yml`): builds with production variables, uploads `dist/` and `api/` (the action builds the Functions), then runs `scripts/smoke.mjs` against the deployed URL.
4. **External links** (`links.yml`): weekly report of broken outbound links.
5. **Dependabot**: weekly grouped npm updates (site and API) and monthly GitHub Actions updates.

## Local development

```bash
nvm use            # Node 24 LTS (see .nvmrc)
npm ci             # also copies Decap into public/admin and builds the CMS config
npm --prefix api ci
npm run dev        # http://localhost:4321
npm run check && npm test && npm run build && npm run test:links && npm run test:e2e
```

Useful environment variables: `BUILD_NOW` (pretend "now" for repeatable builds), `SITE_URL`, `ALLOW_INDEXING`, `PUBLIC_GA4_ID`, `PUBLIC_CLARITY_ID`.

To try the API locally, use the Static Web Apps CLI: `npx @azure/static-web-apps-cli start dist --api-location api` (requires Azure Functions Core Tools).

## Smoke test any environment

```bash
node scripts/smoke.mjs https://witty-smoke-095ea140f.2.azurestaticapps.net
```

Checks the homepage, security headers, asset caching, legacy 301s and redirect pages, the 404 page, sitemap, robots.txt, llms.txt, calendar feeds, Event structured data, `/admin/`, the CMS sign-in endpoint and the telemetry endpoint.

## Free-plan limits to keep in mind

| Limit | Free plan | This site |
| --- | --- | --- |
| Storage per environment | 250 MB | ~25 MB |
| File count | 15,000 | ~3,400 (including 2,756 legacy redirect pages) |
| Preview environments | 3 | Close stale PRs |
| `staticwebapp.config.json` | 20 KB | ~4 KB (build fails above 20 KB) |
| Bandwidth | 100 GB/month | Far below |
| Custom domains | 2 | `www.sdli.org` and `sdli.org` |
