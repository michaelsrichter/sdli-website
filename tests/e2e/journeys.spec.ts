import { test, expect } from './fixtures';

test.describe('visitor journeys', () => {
  test('1–3. find the next dance on the homepage, open it and read lesson, price and venue', async ({ pinned: page }) => {
    await page.goto('/');
    const card = page.locator('[data-featured-candidate]:not([hidden]) .featured');
    await expect(card).toBeVisible();
    await expect(card.getByText('Next SDLI dance')).toBeVisible();
    await expect(card.locator('[data-when]')).toHaveText(/This Tuesday · in 5 days!|Tonight!|Tomorrow night|in \d+ days/);
    await expect(card.locator('.featured__when')).toHaveText(/\w+day, \w+ \d{1,2}, \d{4}/);
    await expect(card.getByText(/Lesson:/)).toBeVisible();
    await expect(card.getByText(/Open dancing:/)).toBeVisible();
    await expect(card.locator('li', { hasText: 'Where:' })).toContainText('Greenlawn');
    await expect(card.locator('li', { hasText: 'Admission:' })).toContainText('$');
    await expect(card.getByText('Beginners welcome')).toBeVisible();
    await expect(card.getByText('No partner needed')).toBeVisible();
    const title = (await card.locator('.featured__title').textContent())!.trim();

    await card.getByRole('link', { name: 'View event details' }).click();
    await expect(page).toHaveURL(/\/events\/\d{4}-\d{2}-\d{2}-[a-z0-9-]+\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    const glance = page.locator('section[aria-labelledby="glance"]');
    await expect(glance.getByText(/^Lesson:/)).toBeVisible();
    await expect(glance.locator('.price-table')).toContainText('$');
    await expect(glance.getByRole('link', { name: 'Huntington Moose Lodge' })).toBeVisible();
  });

  test('4. add the event to a calendar (.ics, Google and Outlook)', async ({ pinned: page, request }) => {
    await page.goto('/');
    const href = await page.locator('[data-featured-candidate]:not([hidden]) .featured__title a').getAttribute('href');
    await page.goto(href!);
    const ics = page.locator('#add-to-calendar a[download]');
    const icsHref = await ics.getAttribute('href');
    const res = await request.get(icsHref!);
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain('BEGIN:VCALENDAR');
    expect(body).toMatch(/DTSTART:\d{8}T\d{6}Z/);
    expect(body).toContain(`URL:`);
    const google = await page.locator('#add-to-calendar a[data-track-method="google"]').getAttribute('href');
    expect(new URL(google!).searchParams.get('dates')).toMatch(/^\d{8}T\d{6}Z\/\d{8}T\d{6}Z$/);
    await expect(page.locator('#add-to-calendar a[data-track-method="outlook"]')).toHaveAttribute('href', /outlook\.live\.com/);
  });

  test('5. copy and share the event', async ({ pinned: page }) => {
    // Capture clipboard writes in the page (the OS clipboard is shared between parallel test workers).
    await page.addInitScript(() => {
      (window as any).__copied = [];
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (t: string) => void (window as any).__copied.push(t) },
      });
    });
    const copied = () => page.evaluate(() => (window as any).__copied.at(-1) as string);
    await page.goto('/events/');
    await page.locator('[data-upcoming-list] .event-card__title a').first().click();
    await page.waitForURL(/\/events\/\d{4}-\d{2}-\d{2}-[a-z0-9-]+\/$/);
    await page.waitForLoadState('load');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    const share = page.locator('#share');
    await share.getByRole('button', { name: 'Copy link' }).click();
    await expect(page.locator('[data-toast]')).toHaveText('Link copied.');
    expect(await copied()).toBe(canonical);
    await share.getByRole('button', { name: 'Copy event details' }).click();
    const details = await copied();
    expect(details).toContain(canonical!);
    expect(details).toMatch(/📍 .*Greenlawn/);
    await expect(share.getByRole('link', { name: /Facebook/ })).toHaveAttribute('href', /facebook\.com\/sharer/);
    await expect(share.getByRole('link', { name: 'Email' })).toHaveAttribute('href', /^mailto:/);
    await expect(share.getByRole('link', { name: 'Text message' })).toHaveAttribute('href', /^sms:/);
  });

  test('5b. the Share button opens an accessible dialog when native sharing is unavailable', async ({ pinned: page }) => {
    await page.addInitScript(() => {
      // Force the fallback path.
      Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
    });
    await page.goto('/');
    const btn = page.locator('[data-featured-candidate]:not([hidden]) [data-share-open]');
    await btn.click();
    const dialog = page.getByRole('dialog', { name: 'Share this event' });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(btn).toBeFocused();
  });

  test('6. open directions', async ({ pinned: page }) => {
    await page.goto('/');
    const link = page.locator('[data-featured-candidate]:not([hidden]) a[data-track="get_directions"]');
    await expect(link).toHaveAttribute('href', /google\.com\/maps\/dir\/\?api=1&destination=/);
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('7. find beginner information', async ({ pinned: page, isMobile }) => {
    await page.goto('/');
    if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'New to Swing?' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('New to swing');
    const q = page.locator('details[data-faq="do-i-need-a-partner"]');
    await q.locator('summary').click();
    await expect(q.getByText(/Most people come on their own/)).toBeVisible();
  });

  test('10. an event that has ended is never shown as upcoming', async ({ page }) => {
    await page.goto('/');
    const firstEnd = Number(await page.locator('[data-featured-candidate]').first().getAttribute('data-end'));
    const firstTitle = await page.locator('[data-featured-candidate]').first().locator('.featured__title').textContent();
    // Pretend the page is viewed one minute after the first event ended (before the nightly rebuild).
    await page.clock.setFixedTime(new Date(firstEnd + 60_000));
    await page.reload();
    const visible = page.locator('[data-featured-candidate]:not([hidden])');
    await expect(visible).toHaveCount(1);
    const firstSlug = (await page.locator('[data-featured-candidate]').first().locator('.featured__title a').getAttribute('href'))!;
    await expect(visible.locator('.featured__title a')).not.toHaveAttribute('href', firstSlug);
    await page.goto('/events/');
    await expect(page.locator(`[data-upcoming-list] a[href="${firstSlug}"]`).locator('xpath=ancestor::li[1]')).toBeHidden();
    expect(firstTitle).toBeTruthy();
  });

  test('11. a cancelled event stays visible and is clearly marked', async ({ pinned: page }) => {
    await page.goto('/events/past/2026/');
    const card = page.locator('.event-card--cancelled').first();
    await expect(card).toBeVisible();
    await expect(card.locator('.status')).toHaveText(/Cancelled/i);
    await card.locator('.event-card__title a').click();
    await expect(page.locator('.alert--bad')).toContainText('This event is cancelled.');
    await expect(page.locator('.event-hero .status')).toHaveText(/Cancelled/i);
  });
});

test.describe('SDLI events first, community events clearly marked', () => {
  test('the homepage hero is the next SDLI dance even when a community event is sooner', async ({ pinned: page }) => {
    await page.goto('/');
    const card = page.locator('[data-featured-candidate]:not([hidden]) .featured');
    await expect(card.locator('.featured__title')).toHaveText('Tuesday Pizza Night');
    const coming = page.locator('[data-upcoming-list="home"] .event-card');
    expect(await coming.count()).toBeGreaterThan(2);
    for (const host of await coming.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.host))) expect(host).toBe('sdli');
    const community = page.locator('[data-upcoming-list="home_community"] .event-card');
    await expect(community.first()).toBeVisible();
    await expect(community.first().locator('.host--community')).toHaveText(/Community event/);
  });

  test('the events page lists SDLI dances before community events, and can show only one kind', async ({ pinned: page }) => {
    await page.goto('/events/');
    await expect(page.locator('[data-featured-candidate] .featured__label')).toContainText('Next SDLI dance');
    const sections = await page.locator('[data-host-section]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.hostSection));
    expect(sections).toEqual(['sdli', 'community']);
    await expect(page.locator('.host-legend')).toContainText('Run by another group');
    await page.locator('label.chip', { hasText: 'Community events' }).click();
    await expect(page.locator('[data-host-section="sdli"]')).toBeHidden();
    await expect(page).toHaveURL(/host=community/);
    const visibleHosts = await page.locator('[data-upcoming-list] .event-card:visible').evaluateAll((els) => [...new Set(els.map((e) => (e as HTMLElement).dataset.host))]);
    expect(visibleHosts).toEqual(['community']);
    await page.locator('label.chip', { hasText: 'SDLI events' }).click();
    await expect(page.locator('[data-host-section="community"]')).toBeHidden();
  });

  test('a community event page shows who runs it, how to reach them, the source and the next SDLI dance', async ({ pinned: page }) => {
    await page.goto('/events/2026-10-23-dancxchange-club-night/');
    await expect(page.locator('.event-hero .host--community')).toBeVisible();
    await expect(page.locator('.alert--community')).toContainText('not run by SDLI');
    await expect(page.locator('[data-ended-notice]')).toBeHidden();
    const glance = page.locator('section[aria-labelledby="glance"]');
    await expect(glance.getByRole('link', { name: "Donna DeSimone's DancXchange", exact: true })).toHaveAttribute('href', '/community/#dancxchange');
    await expect(glance.locator('a[href^="tel:"]').first()).toHaveAttribute('href', 'tel:+15163758498');
    await expect(glance.getByText(/Listed in/)).toContainText('The Dance Calendar, October 2026');
    await expect(glance.locator('.style-tag').first()).toBeVisible();
    await expect(page.locator('.next-sdli a')).toHaveText('Tuesday Pizza Night');
  });

  test('teachers and bands link to their own websites wherever they are mentioned', async ({ pinned: page }) => {
    await page.goto('/events/2026-10-27-tuesday-night-swing/');
    const lineup = page.locator('.lineup');
    await expect(lineup.getByRole('link', { name: 'Carol Fraser', exact: true })).toHaveAttribute('href', '/performers/carol-fraser/');
    await expect(lineup.locator('a.ext-link[href="https://triplestepswing.com/"]')).toBeVisible();
    await page.goto('/events/');
    const ext = page.locator('.event-card a.person-ext[href="https://triplestepswing.com/"]').first();
    await expect(ext).toBeVisible();
    await expect(ext).toHaveAttribute('target', '_blank');
    await page.goto('/performers/carol-fraser/');
    await expect(page.getByRole('link', { name: /^Website/ })).toHaveAttribute('href', 'https://triplestepswing.com/');
    await expect(page.getByRole('link', { name: /^Swing calendar/ })).toHaveAttribute('href', 'https://triplestepswing.com/calendar');
  });

  test('the Moose Lodge page links to Google photos and reviews and shows parking', async ({ pinned: page }) => {
    await page.goto('/venues/huntington-moose-lodge/');
    await expect(page.getByRole('link', { name: /Photos & reviews/ })).toHaveAttribute('href', /google\.com\/maps\?cid=6872930918112154437/);
    await expect(page.locator('#venue-info').locator('xpath=..')).toContainText('Free parking');
  });

  test('the community page lists groups with contacts and classes', async ({ pinned: page }) => {
    await page.goto('/community/');
    await expect(page.locator('#triple-step-swing')).toContainText('hello@triplestepswing.com');
    await expect(page.locator('#classes')).toContainText('Lindy Hop');
    await expect(page.locator('#sources')).toContainText('The Dance Calendar');
  });
});

test.describe('event discovery', () => {
  test('filters narrow the list and can be cleared', async ({ pinned: page }) => {
    await page.goto('/events/');
    const count = page.locator('[data-result-count]');
    const total = Number((await count.textContent())!.match(/\d+/)![0]);
    await page.locator('label.chip', { hasText: 'Next 7 days' }).click();
    await expect(count).not.toHaveText(`${total} events shown`);
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(count).toHaveText(`${total} events shown`);
  });

  test('month calendar shows a grid on desktop and an agenda list on phones', async ({ pinned: page, isMobile }) => {
    await page.goto('/events/calendar/');
    if (isMobile) {
      await expect(page.locator('table.cal')).toBeHidden();
      await expect(page.locator('.cal-agenda .event-card').first()).toBeVisible();
    } else {
      await expect(page.locator('table.cal')).toBeVisible();
      await expect(page.locator('table.cal .cal__event').first()).toBeVisible();
    }
    await page.locator('.cal-nav a').last().click();
    await expect(page).toHaveURL(/\/events\/calendar\/\d{4}-\d{2}\/$/);
  });

  test('the event list works without JavaScript', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/events/');
    await expect(page.locator('[data-event-filters]')).toBeHidden();
    expect(await page.locator('[data-upcoming-list] .event-card').count()).toBeGreaterThan(3);
    await page.locator('[data-upcoming-list] .event-card__title a').first().click();
    await expect(page.locator('#add-to-calendar a[download]')).toBeVisible();
    await ctx.close();
  });
});

test.describe('legacy URLs and errors', () => {
  test('old sdli.org event URLs land on the new event page', async ({ page }) => {
    await page.goto('/index.php/sdli/events_archive/gail_storm_band5/');
    await expect(page).toHaveURL(/\/events\/2026-08-18-gail-storm-band\/$/);
  });
  test('old venue and membership pages land on their new homes', async ({ page }) => {
    await page.goto('/index.php/sdli/venues/coopers_beach/');
    await expect(page).toHaveURL(/\/venues\/#past-venues$/);
    await page.goto('/index.php/sdli/events_archive/2015/06/');
    await expect(page).toHaveURL(/\/events\/past\/#history-2015$/);
  });
  test('unknown pages show a helpful 404', async ({ page }) => {
    const res = await page.goto('/this-page-does-not-exist/');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Oops, we missed a step');
    await expect(page.getByRole('link', { name: 'See upcoming dances' })).toBeVisible();
  });
});
