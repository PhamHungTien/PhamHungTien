import type { AppSlug } from './types';

/** Colors copied from each app's Icon Composer icon.json; independent of UI accents. */
export const planetAppearance = {
  phtv: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 0.81111 0.89934 0.69635)',
    glyphEnd: 'color(display-p3 0.96783 0.84574 0.00000)',
    artworkSize: 78,
  },
  vtts: {
    base: 'color(display-p3 0.35866 0.10420 0.71316)',
    pole: 'color(display-p3 0.03904 0.02556 0.44247)',
    glyphStart: 'color(srgb 1 1 1)',
    glyphEnd: 'color(srgb 1 0.85 0.1)',
    artworkSize: 64,
  },
  padcodeai: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 0.89407 0.89042 0.77225)',
    glyphEnd: 'color(display-p3 0.96783 0.88654 0.00187)',
    artworkSize: 54,
  },
  padnotesai: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(display-p3 1.00000 0.96818 0.99679)',
    glyphEnd: 'color(display-p3 0.96783 0.85642 0.22502)',
    artworkSize: 62,
  },
  mynasmanager: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(srgb 0.99942 0.98555 0.00000)',
    glyphEnd: 'color(srgb 1.00000 1.00000 1.00000)',
    artworkSize: 61,
  },
  lunarv: {
    base: 'color(display-p3 0.29754 0.00576 0.00852)',
    pole: 'color(display-p3 0.29754 0.00576 0.00852)',
    glyphStart: 'color(srgb 1.00000 1.00000 1.00000)',
    glyphEnd: 'color(srgb 0.99942 0.98555 0.00000)',
    artworkSize: 61,
  },
  lunarblock: {
    base: 'color(display-p3 0.00000 0.00830 0.03938)',
    pole: 'color(display-p3 0.00803 0.00558 0.14449)',
    glyphStart: 'color(srgb 1 1 1)',
    glyphEnd: 'color(srgb 1 0.85 0.1)',
    artworkSize: 70,
  },
} satisfies Record<
  AppSlug,
  { base: string; pole: string; glyphStart: string; glyphEnd: string; artworkSize: number }
>;
