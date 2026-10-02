/** Groups upcoming events by where they happen, for the events map. Pure and unit tested. */

export interface MapEventInput {
  slug: string;
  host: 'sdli' | 'community';
  start: Date;
  venueId?: string | undefined;
  location: {
    name?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
  };
}

export interface MapPlace<E extends MapEventInput> {
  /** Stable id used in URLs (#place-<id>): the venue id, or a rounded coordinate pair. */
  id: string;
  name: string;
  address?: string | undefined;
  city?: string | undefined;
  lat: number;
  lng: number;
  /** "sdli" if any SDLI event happens here, so SDLI's own venues stand out on the map. */
  host: 'sdli' | 'community';
  venueId?: string | undefined;
  events: E[];
}

const valid = (n: number | undefined): n is number => typeof n === 'number' && Number.isFinite(n);

export function groupByPlace<E extends MapEventInput>(events: E[]): { places: MapPlace<E>[]; unplaced: E[] } {
  const byKey = new Map<string, MapPlace<E>>();
  const unplaced: E[] = [];
  for (const e of events) {
    const { latitude: lat, longitude: lng } = e.location;
    if (!valid(lat) || !valid(lng)) {
      unplaced.push(e);
      continue;
    }
    const id = e.venueId ?? `pt-${lat.toFixed(4)}-${lng.toFixed(4)}`.replace(/\./g, '_');
    let place = byKey.get(id);
    if (!place) {
      place = {
        id,
        name: e.location.name ?? e.location.city ?? 'Event location',
        address: e.location.address,
        city: e.location.city,
        lat,
        lng,
        host: e.host,
        venueId: e.venueId,
        events: [],
      };
      byKey.set(id, place);
    }
    if (e.host === 'sdli') place.host = 'sdli';
    place.events.push(e);
  }
  const places = [...byKey.values()];
  for (const p of places) p.events.sort((a, b) => a.start.getTime() - b.start.getTime());
  // SDLI's own venues first, then by the next event.
  places.sort((a, b) => Number(b.host === 'sdli') - Number(a.host === 'sdli') || a.events[0]!.start.getTime() - b.events[0]!.start.getTime());
  return { places, unplaced };
}
