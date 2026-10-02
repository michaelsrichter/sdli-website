# Rollback procedures

| Situation | Fastest fix | Time |
| --- | --- | --- |
| A content change went live by mistake | Revert the commit in GitHub | 3–5 min |
| A code change broke the site | Revert the commit, or redeploy a known-good commit | 5 min |
| Deployment pipeline is broken but the site is fine | Nothing; the last good deployment keeps serving | — |
| Bad nightly rebuild | Re-run the previous successful deployment run | 5 min |
| CMS sign-in broken | Edit files on GitHub directly (see editor guide) | — |
| Azure resources deleted or broken | Re-provision with `infra/deploy.ps1`, then redeploy | 15 min |
| New site has a serious problem right after DNS cutover | Point DNS back to the old host | minutes (TTL 300) |

## Revert a commit (content or code)

**On github.com:** open the repository → **Commits** → open the bad commit → **Revert** (or open the merged pull request → **Revert**). Merge the generated revert pull request. The deployment runs automatically.

**On the command line:**

```bash
git revert <sha>
git push origin main
```

Never use `git push --force` on `main`.

## Redeploy a known-good version

GitHub → **Actions → Azure Static Web Apps** → find a successful run of the good commit → **Re-run all jobs**. Or:

```bash
gh workflow run azure-static-web-apps.yml --repo michaelsrichter/sdli-website --ref <good-commit-sha-or-tag>
```

Tip: tag known-good releases (`git tag release-2026-10-02 && git push --tags`) so they are easy to find.

## Pause deployments

Disable the workflow (GitHub → Actions → Azure Static Web Apps → **⋯ → Disable workflow**). The site keeps serving the last deployment.

## Re-create Azure resources

```powershell
./infra/deploy.ps1 -Repo michaelsrichter/sdli-website
gh workflow run azure-static-web-apps.yml --repo michaelsrichter/sdli-website
```

If the Static Web App is recreated, its default hostname changes: update DNS and the GitHub OAuth App.

## Undo DNS cutover

At the DNS provider set `www` back to `CNAME sdli.org` and the apex A record back to `143.95.38.203` (the old host). Keep the old host running for 30 days after cutover so this stays possible.

## Data loss?

There is no database. All content and history are in Git; every clone of the repository is a full backup. Uploaded images are in `src/assets/uploads/` in the same repository.
