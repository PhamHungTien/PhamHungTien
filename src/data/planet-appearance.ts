import type { AppSlug } from './types';

/** Colors copied from each app's Icon Composer icon.json; independent of UI accents. */
export const planetAppearance = {
  phtv: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 0.81111 0.89934 0.69635)',
    glyphEnd: 'color(display-p3 0.96783 0.84574 0.00000)',
    artworkSize: 99,
    artOffsetX: 7.0,
    artOffsetY: 4.5,
    glow: 'rgba(230, 57, 70, 0.65)',
    track: '#e63946',
  },
  vtts: {
    base: 'color(display-p3 0.35866 0.10420 0.71316)',
    pole: 'color(display-p3 0.03904 0.02556 0.44247)',
    glyphStart: 'color(srgb 1 1 1)',
    glyphEnd: 'color(srgb 1 0.85 0.1)',
    artworkSize: 84,
    artOffsetX: -0.8,
    artOffsetY: 0.3,
    glow: 'rgba(138, 79, 255, 0.65)',
    track: '#8a4fff',
  },
  padcodeai: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 0.89407 0.89042 0.77225)',
    glyphEnd: 'color(display-p3 0.96783 0.88654 0.00187)',
    artworkSize: 60,
    artOffsetX: 0.2,
    artOffsetY: 0.3,
    glow: 'rgba(235, 94, 85, 0.65)',
    track: '#eb5e55',
  },
  padnotesai: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 1.00000 0.96818 0.99679)',
    glyphEnd: 'color(display-p3 0.96783 0.85642 0.22502)',
    artworkSize: 68,
    artOffsetX: -5.3,
    artOffsetY: 0.2,
    glow: 'rgba(247, 143, 179, 0.65)',
    track: '#f78fb3',
  },
  mynasmanager: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(srgb 0.99942 0.98555 0.00000)',
    glyphEnd: 'color(srgb 1.00000 1.00000 1.00000)',
    artworkSize: 63,
    artOffsetX: 0.2,
    artOffsetY: 3.4,
    glow: 'rgba(56, 173, 240, 0.65)',
    track: '#38adf0',
  },
  lunarv: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(srgb 1.00000 1.00000 1.00000)',
    glyphEnd: 'color(srgb 0.99942 0.98555 0.00000)',
    artworkSize: 61,
    artOffsetX: 0.8,
    artOffsetY: -0.5,
    glow: 'rgba(245, 176, 65, 0.65)',
    track: '#f5b041',
  },
  lunarblock: {
    base: 'color(display-p3 0.00000 0.00830 0.03938)',
    pole: 'color(display-p3 0.00803 0.00558 0.14449)',
    glyphStart: 'color(srgb 1 1 1)',
    glyphEnd: 'color(srgb 1 0.85 0.1)',
    artworkSize: 67,
    artOffsetX: -3.2,
    artOffsetY: 0,
    glow: 'rgba(84, 160, 255, 0.65)',
    track: '#54a0ff',
  },
} satisfies Record<
  AppSlug,
  {
    base: string;
    pole: string;
    glyphStart: string;
    glyphEnd: string;
    /**
     * Artwork box size in % of the planet, measured from each PNG's opaque pixels so every
     * glyph spans ~60% of the planet and stays inside a circular safe zone, like the glyph
     * on the app icon itself.
     */
    artworkSize: number;
    /** Optical-centre correction, in % of the artwork box (from the PNG's opaque bounds). */
    artOffsetX: number;
    artOffsetY: number;
    glow: string;
    track: string;
  }
>;
