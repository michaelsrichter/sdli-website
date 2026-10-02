/** Curated photos used in page sections, with attribution details for open-licensed images. */
import type { ImageMetadata } from 'astro';
import couple from '../assets/uploads/lindy-couple-hand-in-hand.jpg';
import purpleGreen from '../assets/uploads/lindy-dancers-purple-and-green.jpg';
import polkaDots from '../assets/uploads/lindy-dancer-red-hat-polka-dots.jpg';
import ballroom from '../assets/uploads/social-dance-floor-ballroom.jpg';
import jitterbug1938 from '../assets/uploads/jitterbug-dancers-1938.jpg';
import couple1945 from '../assets/uploads/young-couple-jitterbugging-1945.jpg';
import sdliFloor from '../assets/uploads/tuesday-dance-floor.jpg';
import sdliBand from '../assets/uploads/tuesday-band-singer-and-guitarist.jpg';
import sdliBigBand from '../assets/uploads/big-band-singer.jpg';
import sdliHorns from '../assets/uploads/big-band-horns.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
  /** Whether the photo was taken at an SDLI event. Illustrative photos must not be presented as SDLI events. */
  sdli: boolean;
  credit?: { author: string; license: string; licenseUrl?: string; sourceUrl: string };
}

export const photos = {
  heroCouple: {
    src: couple,
    alt: 'A smiling couple in vintage-style clothes swing dancing hand in hand.',
    sdli: false,
    credit: {
      author: 'Thomas Quine',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hand-in-hand_Lindy_Hop_dancers.jpg',
    },
  },
  dressedUp: {
    src: purpleGreen,
    alt: 'Two Lindy Hop dancers in a green dress and a purple shirt dancing together.',
    sdli: false,
    credit: {
      author: 'Thomas Quine',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lindy_Hop_dancers_in_purple_and_green.jpg',
    },
  },
  polkaDots: {
    src: polkaDots,
    alt: 'A dancer in a red polka-dot skirt swing dancing with a partner in a red hat.',
    sdli: false,
    credit: {
      author: 'Thomas Quine',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lindy_Hop_dancer_with_red_hat_and_red_belt.jpg',
    },
  },
  socialFloor: {
    src: ballroom,
    alt: 'Many couples in vintage-inspired outfits social dancing in a large ballroom.',
    sdli: false,
    credit: {
      author: 'Joe Mabel',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dancing_after_Masters_of_Lindy_Hop_and_Tap_2009_02.jpg',
    },
  },
  history1938: {
    src: jitterbug1938,
    alt: 'Black-and-white 1938 photo of a crowd watching couples jitterbug on a dance floor.',
    sdli: false,
    credit: {
      author: 'New York World-Telegram and the Sun, Library of Congress',
      license: 'Public domain',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jitterbug_dancers_NYWTS.jpg',
    },
  },
  history1945: {
    src: couple1945,
    alt: 'Black-and-white 1940s photo of a young couple jitterbugging outdoors.',
    sdli: false,
    credit: {
      author: 'Unknown photographer',
      license: 'Public domain',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Young_couple_jitterbugging_circa_1945.jpg',
    },
  },
  sdliFloor: { src: sdliFloor, alt: 'Dancers smiling and swing dancing on a busy floor at an SDLI dance.', sdli: true },
  sdliBand: { src: sdliBand, alt: 'A smiling singer and a guitarist performing at an SDLI dance.', sdli: true },
  sdliBigBand: { src: sdliBigBand, alt: 'A singer performing with a big band at an SDLI dance.', sdli: true },
  sdliHorns: { src: sdliHorns, alt: 'Big band musicians playing saxophones and other horns at an SDLI dance.', sdli: true },
} satisfies Record<string, Photo>;
