# App Store content and shared motion

Apple Lookup API (US storefront) was checked on 10 October 2026. The six app IDs and original release notes are retained in `src/data/appstore.json`; PHTV remains a separate open-source macOS app.

Run `npm run sync:appstore` to refresh the snapshot, then `npm run build:all` and `npm run verify:ui`. The refresh fails without replacing existing data if any app is missing. It does not run in visitors' browsers. Editorial Vietnamese/English feature highlights in `src/data/products.ts` should be reviewed when a new version is released.

`assets/experience.css` supplies motion timing, keyboard focus, hover, reduced-motion handling, and progressive scroll reveal. It is imported by the portfolio, the standalone PHTV app, legal pages, and 404 styles. Browser support for scroll timelines is optional; unsupported browsers show content normally. Core typography, light/dark palettes and responsive layouts remain in each app's existing stylesheets.

The snapshot retains original release notes for editorial reference. The public interface and structured data omit version numbers and release dates for long-term use. Prices and rating counts are deliberately omitted because they vary by region and time.

This change updates local source and build outputs. Publication to the existing domain uses the repository's established deployment workflow.

On 10 October 2026, 39 current public App Store image assets were downloaded for the six apps. `docs/appstore-artwork.json` records original Apple CDN URLs, device groups, and dimensions. The vTTS hero uses its public product-page header (`uber.artwork` in Apple's serialized page data); other heroes use iPad screenshots. Galleries include current iPad, iPhone, and available Mac screenshots. Images retain their composition with `object-fit: contain`. The public US storefront supplies English artwork for both language views. PHTV is not distributed through the App Store and retains its existing artwork.
