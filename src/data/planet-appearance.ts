import type { AppSlug } from './types';

/**
 * Colors from each app's Icon Composer icon.json (background gradient start = lit pole, end =
 * body; glyph fill), printed by `npm run icons` (scripts/tools/app-icons.mjs). Independent of
 * UI accents.
 */
export const planetAppearance = {
  phtv: {
    base: 'color(display-p3 0.27 0.008 0.015)',
    pole: 'color(display-p3 0.56 0.05 0.07)',
    glyphStart: 'color(display-p3 1 0.93 0.6)',
    glyphEnd: 'color(display-p3 1 0.83 0.2)',
    artworkSize: 65,
    artOffsetX: 0,
    artOffsetY: 0,
    glow: 'rgba(230, 57, 70, 0.65)',
    track: '#e63946',
  },
  vtts: {
    base: 'color(display-p3 0.35866 0.10420 0.71316)',
    pole: 'color(display-p3 0.03904 0.02556 0.44247)',
    glyphStart: 'color(srgb 1 1 1)',
    glyphEnd: 'color(srgb 1 0.85 0.1)',
    artworkSize: 60,
    artOffsetX: 0,
    artOffsetY: 0,
    glow: 'rgba(138, 79, 255, 0.65)',
    track: '#8a4fff',
  },
  padcodeai: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 1 0.94 0.62)',
    glyphEnd: 'color(display-p3 1 0.84 0.22)',
    artworkSize: 69,
    artOffsetX: 0,
    artOffsetY: 0,
    glow: 'rgba(235, 94, 85, 0.65)',
    track: '#eb5e55',
  },
  padnotesai: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 1 1 1)',
    glyphEnd: 'color(display-p3 1 0.975 0.93)',
    artworkSize: 58,
    artOffsetX: 0,
    artOffsetY: 0,
    glow: 'rgba(247, 143, 179, 0.65)',
    track: '#f78fb3',
  },
  mynasmanager: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 1 0.93 0.6)',
    glyphEnd: 'color(display-p3 1 0.82 0.22)',
    artworkSize: 64,
    artOffsetX: 0,
    artOffsetY: 0,
    glow: 'rgba(56, 173, 240, 0.65)',
    track: '#38adf0',
  },
  lunarv: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 1 0.95 0.72)',
    glyphEnd: 'color(display-p3 1 0.86 0.42)',
    artworkSize: 59,
    artOffsetX: 0,
    artOffsetY: 0,
    glow: 'rgba(245, 176, 65, 0.65)',
    track: '#f5b041',
  },
  lunarblock: {
    base: 'color(display-p3 0 0.0083 0.03938)',
    pole: 'color(display-p3 0.028 0.026 0.22)',
    glyphStart: 'color(srgb 1 1 1)',
    glyphEnd: 'color(srgb 1 0.85 0.1)',
    artworkSize: 67,
    artOffsetX: 0,
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
     * Artwork box size in % of the planet. The artwork is cropped to its glyph and centred
     * on a square (scripts/tools/app-icons.mjs); long or tall glyphs get a slightly
     * bigger box so every glyph reads at the same weight and stays inside the circle.
     */
    artworkSize: number;
    /** Optical-centre correction, in % of the artwork box. */
    artOffsetX: number;
    artOffsetY: number;
    glow: string;
    track: string;
  }
>;
