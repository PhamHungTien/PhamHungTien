# Performance

Budgets are enforced by `npm run verify` (`scripts/verify-performance.mjs`): every home,
app and guide page stays under 100 KB of HTML and 25 KB estimated gzip, keeps CSS
cacheable and preloads the Vietnamese font only on Vietnamese pages.

Rules that keep pages fast:

- Animate `transform` and `opacity` only. A requestAnimationFrame loop writes the transform
  every frame and every other style only when its value changes.
- Never move a positioned element with `left`/`top` after first paint; use `translate`, so
  load-time adjustments cannot cause layout shift.
- Start optional engines after the first paint (`requestAnimationFrame` + `setTimeout`).
- Third-party content waits for intent: YouTube posters are local images and the player
  loads on click; Firebase and React load only when Discussions opens.

## Audit — 20 November 2026

Lighthouse 13 (simulated Moto G Power for mobile, desktop preset), production build served
locally on an Apple Silicon Mac, two runs each.

| Page         | Before (mobile / desktop) | After (mobile / desktop) |
| ------------ | ------------------------: | -----------------------: |
| Home         |                   63 / 78 |                100 / 100 |
| Pad Code AI  |                  99 / 100 |                100 / 100 |
| PHTV         |                   97 / 99 |                 98 / 100 |
| Guides index |                 100 / 100 |                100 / 100 |

Home before: Total Blocking Time 5.8 s and CLS 0.125 on mobile, CLS 0.62 on desktop.
A Chrome trace showed the orbit loop saturating the main thread with style recalculation
(3.6 s), layout (1.2 s) and paint (1.2 s) per 8 s, because each frame changed custom
properties that resized every planet's curved name and repainted its shadow. The sun, halo
and belt were also re-positioned with `left`/`top` once the engine measured the scene.

Changes:

- Perspective scale moved into each planet's transform; light, shade, depth order, opacity
  and label fade are written only when they change. Per-frame layout went from one per
  frame to none, and main-thread time on the home page dropped about threefold.
- The sun, halo and belt follow the engine with `translate` inside a size container
  (`50cqw`/`48cqh` before measuring), which removed the load-time layout shift.
- The engine starts after first paint, with a coarser camera search (40 samples, 0.04 rad).
- YouTube posters are stored locally (`npm run sync:youtube`) and served as responsive
  WebP: no request to Google before play, and no letterboxing.

These are lab results. Judge real-user LCP, INP and CLS from field data after deployment.

## Audit — 28 October 2026

- Astro extracts larger stylesheets instead of duplicating all CSS inside each page, so
  hashed shared assets are reused from cache between routes. Home HTML went from 115 KB to
  65 KB and Pad Code AI from 118 KB to 65 KB (uncompressed).
- Vietnamese bold font preload is limited to Vietnamese pages.
- Pointer tilt resets only active elements on scroll; touch entry does no geometry work.
- Removed invisible orbital path generation and decorative sphere rims, and backdrop blur
  from moving planet labels.
- Click-to-load YouTube, `preload="none"` video, lazy gallery images and hidden discussion
  islands remain in place.
