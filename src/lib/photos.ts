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
import sdliCouple from '../assets/uploads/sdli-couple-dancing-red-dress.jpg';
import sdliHalloween from '../assets/uploads/sdli-halloween-dance-floor.jpg';
import sdliDrums from '../assets/uploads/sdli-big-band-drums.jpg';
import sdliTuxedos from '../assets/uploads/sdli-dancers-in-tuxedos.jpg';
import sdliGroup from '../assets/uploads/sdli-formal-group-photo.jpg';
import tealTop from '../assets/uploads/lindy-dancer-teal-top-at-the-dance-hop.jpg';
import danceFun from '../assets/uploads/lindy-couple-dance-fun.jpg';
import soloJazz from '../assets/uploads/solo-jazz-dancer-hop-and-a-skip.jpg';
import blackDress from '../assets/uploads/lindy-dancer-black-dress.jpg';
import blackYellow from '../assets/uploads/lindy-couple-black-and-yellow.jpg';
import sameSex from '../assets/uploads/lindy-same-sex-couple.jpg';
import greenJumpsuit from '../assets/uploads/lindy-dancer-green-jumpsuit-skip-hop.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
  /** Whether the photo was taken at an SDLI event. Illustrative photos must not be presented as SDLI events. */
  sdli: boolean;
  /** Point to keep in frame when the photo is cropped, as "x% y%" (see ResponsiveImage). */
  focus?: string;
  credit?: { author: string; license: string; licenseUrl?: string; sourceUrl: string };
}

const quine = (sourceUrl: string) => ({
  author: 'Thomas Quine',
  license: 'CC BY 2.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  sourceUrl,
});

export const photos = {
  heroCouple: {
    src: couple,
    alt: 'A smiling couple in vintage-style clothes swing dancing hand in hand.',
    sdli: false,
    focus: '55% 30%',
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
    focus: '50% 33%',
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
    focus: '50% 38%',
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
  sdliFloor: { src: sdliFloor, alt: 'Dancers smiling and swing dancing on a busy floor at an SDLI dance.', sdli: true, focus: '52% 40%' },
  sdliBand: { src: sdliBand, alt: 'A smiling singer and a guitarist performing at an SDLI dance.', sdli: true, focus: '35% 40%' },
  sdliBigBand: { src: sdliBigBand, alt: 'A singer performing with a big band at an SDLI dance.', sdli: true, focus: '62% 40%' },
  sdliHorns: { src: sdliHorns, alt: 'Big band musicians playing saxophones and other horns at an SDLI dance.', sdli: true, focus: '48% 50%' },
  sdliCouple: { src: sdliCouple, alt: 'A couple swing dancing at an SDLI dance, one partner in a red dress.', sdli: true, focus: '48% 40%' },
  sdliHalloween: { src: sdliHalloween, alt: 'Dancers in Halloween costumes on the dance floor at an SDLI theme night.', sdli: true, focus: '45% 40%' },
  sdliDrums: { src: sdliDrums, alt: "A big band's drummer and horn section playing at an SDLI dance.", sdli: true, focus: '50% 45%' },
  sdliTuxedos: { src: sdliTuxedos, alt: 'Five smiling SDLI dancers dressed up in tuxedos and bow ties.', sdli: true, focus: '50% 40%' },
  sdliGroup: { src: sdliGroup, alt: 'A large group of SDLI dancers in formal and holiday outfits posing together.', sdli: true, focus: '50% 40%' },
  tealTop: {
    src: tealTop,
    alt: 'A smiling dancer in a teal top and navy skirt swing dancing at a busy dance.',
    sdli: false,
    focus: '45% 30%',
    credit: quine('https://commons.wikimedia.org/wiki/File:At_the_dance_hop_(46265907185).jpg'),
  },
  danceFun: {
    src: danceFun,
    alt: 'A couple laughing as they swing out together in front of a crowd.',
    sdli: false,
    focus: '50% 32%',
    credit: quine('https://commons.wikimedia.org/wiki/File:Dance_fun.jpg'),
  },
  soloJazz: {
    src: soloJazz,
    alt: 'A dancer in a floral blouse and high-waisted trousers doing solo jazz steps on a stage.',
    sdli: false,
    focus: '50% 40%',
    credit: quine('https://commons.wikimedia.org/wiki/File:Hop_and_a_skip_(52876191506).jpg'),
  },
  blackDress: {
    src: blackDress,
    alt: 'A dancer in a black dress spinning with her partner during a swing dance.',
    sdli: false,
    focus: '45% 30%',
    credit: quine('https://commons.wikimedia.org/wiki/File:Lindy_Hop_dancer_in_black_dress.jpg'),
  },
  blackYellow: {
    src: blackYellow,
    alt: 'A couple in black and yellow outfits smiling as they Lindy Hop together.',
    sdli: false,
    focus: '55% 30%',
    credit: quine('https://commons.wikimedia.org/wiki/File:Lindy_Hop_dancers_in_black_and_yellow.jpg'),
  },
  sameSex: {
    src: sameSex,
    alt: 'Two men in a cap and a jacket swing dancing together. Anyone can lead or follow.',
    sdli: false,
    focus: '50% 30%',
    credit: quine('https://commons.wikimedia.org/wiki/File:Same-sex_dancers.jpg'),
  },
  greenJumpsuit: {
    src: greenJumpsuit,
    alt: 'A dancer in a green jumpsuit doing a joyful kick step on the dance floor.',
    sdli: false,
    focus: '62% 40%',
    credit: quine('https://commons.wikimedia.org/wiki/File:Skip_hop_(52961550362).jpg'),
  },
} satisfies Record<string, Photo>;
