# Performance audit — 28 October 2026

## Changes

- Astro extracts larger stylesheets instead of duplicating all CSS inside each page. Hashed shared assets can be reused from browser cache between routes.
- Vietnamese bold font preload is limited to Vietnamese pages. Fonts needed by other text still load through CSS unicode ranges.
- Pointer tilt resets only active elements on scroll, rather than writing styles on every interactive card. Touch pointer entry does no geometry work.
- Removed invisible orbital path generation (seven paths × 121 projections per camera update) and decorative sphere rims. Kept the current projection, gestures and lighting.
- Removed backdrop blur from moving planet labels. Offscreen hero scroll events no longer queue geometry reads.
- Existing click-to-load YouTube, video preload=none, lazy gallery images and hidden discussion islands remain intact.

## Evidence

Local production output before/after, uncompressed HTML only:

| Route       |    Before |    After |
| ----------- | --------: | -------: |
| Home        | 115,253 B | 65,150 B |
| Pad Code AI | 118,321 B | 65,290 B |

These are HTML reductions (43% and 45%), not claims about total first-load bytes or user-perceived speed. External CSS still needs downloading on a cold cache. Local gzip estimates are 12,267 B and 14,973 B respectively; the deployment controls actual compression and caching.

Chrome checks: all seven app pages at 320/1440 px; lightbox open/close, FAQ, theme, no runtime errors or horizontal overflow. Home, PHTV, Pad Code AI and guides load their extracted CSS correctly; no Firebase/Firestore or YouTube network requests before interaction. The home orbit moves while visible and stops offscreen.

`npm run verify` now includes build-output budgets for home, all apps and guides: <=100 KB HTML, <=25 KB estimated gzip HTML, cacheable CSS, and no unnecessary Vietnamese font preload. This runs in the existing deployment workflow.

No production Core Web Vitals or Lighthouse score was measured; assess LCP, INP and CLS using deployed field data before making claims about real-user improvements.
