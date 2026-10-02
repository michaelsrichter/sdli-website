# Contributing

Thank you for helping SDLI! There are two kinds of contributions.

## Content (most volunteers)

Use the content manager at `/admin/`. See [docs/editor-guide.md](docs/editor-guide.md). If you spot a mistake but cannot edit, open a **Content correction** issue.

## Code

1. Create a branch from `main` (`feature/short-description`).
2. `npm ci && npm --prefix api ci`
3. Make your change. Keep it small and focused.
4. Run the checks:

   ```bash
   npm run check && npm test && npm --prefix api test
   BUILD_NOW=2026-10-01T22:00:00-04:00 npm run build
   npm run test:links && npm run test:e2e
   ```

5. Open a pull request. CI runs everything again and a preview site is posted on the PR.
6. Fill in the pull request checklist. Check the preview on a phone.

### Ground rules

- Static first: every page must work without JavaScript. Use JavaScript only to enhance.
- Accessibility is not optional: semantic HTML, labels, visible focus, no color-only meaning, 44 px touch targets. axe must report no serious or critical issues.
- No inline `style="…"` attributes or inline scripts (the CSP blocks them; the build fails).
- Never parse event dates in the browser. Use `src/lib/time.ts` at build time.
- Do not invent facts in content. Mark unknowns in `editorialReview`.
- Never commit secrets, tokens or personal contact details. Secret scanning blocks pushes that contain them.
- Pin third-party GitHub Actions to a full commit SHA.
- Keep `public/staticwebapp.config.json` under 20 KB and free of duplicate routes.

### Commit messages

Imperative mood, describe the why: `Show postponed events in the month calendar`.
