import type { APIRoute } from 'astro';
import { calendarEventOf, getEventGroups } from '../../lib/content';
import { buildIcs } from '../../lib/calendar';

/** Subscribable feed: upcoming events plus the last 30 days. */
export const GET: APIRoute = async ({ site }) => {
  const { all, now } = await getEventGroups();
  const cutoff = now.getTime() - 30 * 86400000;
  const events = all.filter((e) => e.end.getTime() >= cutoff).map((e) => calendarEventOf(e, site!));
  return new Response(buildIcs(events, { name: 'Swing Dance Long Island', now }), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
