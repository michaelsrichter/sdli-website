# Editor guide

This guide is for SDLI volunteers who update the website. You do not need to know how to code.

## How publishing works (in one minute)

1. You make a change in the **content manager** at `https://<the site>/admin/` (after DNS cutover: `https://www.sdli.org/admin/`).
2. Your change is saved as a **draft**. Nothing on the public site changes yet.
3. When you click **Publish → Ready for review**, the system builds a **preview website** with your change and runs automatic checks (dates, links, accessibility).
4. A reviewer (or you, if you have permission) clicks **Publish now**. A few minutes later the change is live.

Every change is recorded with your name and can be undone.

## First-time setup

1. Create a free GitHub account at <https://github.com/signup> (use your personal email).
2. Ask the site administrator to add you as a collaborator on `michaelsrichter/sdli-website` with **Write** access. Accept the email invitation.
3. Go to `/admin/` and click **Login with GitHub**. Approve the "SDLI Website CMS" request the first time.

> If you see "CMS sign-in is not configured", the administrator still needs to finish [CMS sign-in setup](#cms-sign-in-setup-administrator).

## Everyday tasks

### See what is coming up

Open **Events**. Use **View filters** (Cancelled, Postponed, Drafts, by year) and **Group by** (Year, Status).

### Post a band night, pizza night or guest teacher (changing one Tuesday)

Tuesdays are created automatically from the **Tuesday Night Swing** series. To change one date:

1. **Events → New Event**.
2. **Title:** for example `Band Night: Playing Favorites`.
3. **Weekly series:** choose *Tuesday Night Swing*.
4. **Series date being changed:** pick the Tuesday.
5. Fill in only what is different: **Live band**, **Teachers**, prices (band nights: members 15, students 10, non-members 20), **Short summary**, a **Description**, **Type of event** (add *Live band night*).
6. Leave everything else empty. Empty fields use the series settings (venue, times, prices).
7. **Save**, then **Publish → Ready for review**.

The event's web address stays the same as before (for example `/events/2026-10-13-tuesday-night-swing/`), so links people already shared keep working.

### Cancel a dance (weather, venue problem, holiday)

1. If the date already has an entry under **Events**, open it. If not, create one as above (choose the series and date).
2. **Status:** *Cancelled*.
3. **Cancellation message:** for example `Cancelled because of the snowstorm. Stay safe and see you next week!`
4. Publish. The event stays on the site with a red **Cancelled** badge and your message. It is removed from "next dance" automatically, and calendar subscribers see the cancellation.

Also update the hotline message and send the email list notice as usual.

### Postpone a dance

Set **Status** to *Postponed*, explain in the message, create the new date as its own event, and paste its web address into **Rescheduled event web address**.

### Add a one-time event (workshop, holiday party, special dance)

**Events → New Event**. Leave **Weekly series** empty. Fill in **Title**, **Starts (date and time)**, **Ends**, **Venue**, prices and a description. If you do not know the time yet, pick only the date; the site will say "Time to be announced".

### Duplicate an event

Open an existing event, click the **⋯** menu, choose **Duplicate**, then change the date and details.

### Archive

Past events move to **Past events** automatically. You never need to delete them. To hide an event completely, turn off **Show on website**.

### Photos

- Use only photos SDLI has permission to use, and add the photographer in **Photo credit**.
- **Photo description (alt text) is required.** Describe what is in the photo, for example "Couples swing dancing under string lights at the Moose Lodge."
- Do not use images that contain important text (like a flyer). Type the information instead.

### Edit pages, membership, contact details and prices

- **Pages**: Homepage introduction, New to Swing, Lessons, Membership, About, Contact, Gallery intro, Privacy.
- **Site settings**: hotline, email, mailing address, email-list link, membership fee and year, **standard door prices** (used on the Membership page and homepage).
- **Venues**: add parking and accessibility details.
- **Teachers** and **Bands and DJs**: short bios, photos and links.
- **Questions and answers**: the FAQ page. You can add links like `[Membership](/membership/)`.
- **Announcements**: the banner at the top of every page. Set **Show from** and **Show until** dates so it disappears on its own.

### Notes for editors

Many entries have a **Notes for editors** box listing facts that still need checking (for example parking details). These notes are never shown on the website. Delete a note once it is resolved.

## Checking your change before it goes live

After **Ready for review**, open the pull request link (or the **Workflow** tab in the CMS). Within a few minutes a bot comments with a **preview website** link. Check it on your phone. If the automated checks fail, the reviewer will see what to fix (for example "Use the date format YYYY-MM-DD").

> The free hosting plan allows **3 preview websites at once**. Publish or close old drafts so new ones get previews.

## Undoing a change (rollback)

Ask the administrator, or see [rollback.md](rollback.md). Every published change is a commit in GitHub and can be reverted with one click.

## CMS sign-in setup (administrator)

Decap CMS needs a GitHub OAuth App so editors can sign in. This is a one-time step.

1. Sign in to GitHub as the account that owns the repository. Go to **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. **Application name:** `SDLI Website CMS`
3. **Homepage URL:** the site address (for example `https://witty-smoke-095ea140f.2.azurestaticapps.net`, later `https://www.sdli.org`)
4. **Authorization callback URL:** `<site address>/api/callback`
5. Click **Register application**, then **Generate a new client secret**. Copy the Client ID and secret (do not share or commit them).
6. Store them in Azure (values are never shown again):

   ```powershell
   ./infra/deploy.ps1 -Repo michaelsrichter/sdli-website -OAuthClientId <client id> -OAuthClientSecret (Read-Host -AsSecureString)
   ```

   or in the Azure portal: **Static Web App → Environment variables**, add `GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET`.
7. Visit `/admin/` and click **Login with GitHub**.

After DNS cutover, change the OAuth App's Homepage and callback URLs to `https://www.sdli.org` and add `www.sdli.org` to the `ALLOWED_HOSTS` app setting.

**Limitation:** GitHub allows one callback host per OAuth App, so sign-in works on the production address only, not on preview websites. Editors always edit at the production `/admin/`; previews are for checking changes.

### Alternative if sign-in ever breaks

Content is just files in GitHub, so editing never depends on the CMS:

- **GitHub website:** open the file in `src/content/…`, click the pencil icon, edit, and choose **Create a new branch and start a pull request**. The same checks and previews run.
- **Local CMS** (for technical volunteers): `npm run cms:local` in one terminal and `npm run dev` in another, then open `http://localhost:4321/admin/`. Changes are saved to your local files.
- **Hosted OAuth alternative:** a service such as DecapBridge can replace the Azure function without changing content or workflows.

## Recovering from mistakes

| Problem | Fix |
| --- | --- |
| "Something went wrong" when saving | Copy your text, reload `/admin/`, try again. Your draft is usually still in the Workflow tab. |
| Automatic checks failed | Open the pull request, read the first red error. It names the file and field. |
| A change went live by mistake | Revert the commit in GitHub (see [rollback.md](rollback.md)). |
| An image is too large | The limit is 8 MB. Resize it on your phone or computer first. |
