# Architecture

phamhungtien.com is **one [Astro](https://astro.build) project** that builds every page
of the site: the portfolio, each app's landing page, their privacy policies and terms,
and the 404 page. All pages share one layout, one design system, one set of interface
strings and one Firebase module, so a change made once applies everywhere.

## Stack

| Concern       | Choice                                                        |
| ------------- | ------------------------------------------------------------- |
| Framework     | Astro 7, static output (`output: 'static'`)                   |
| Interactivity | Small TypeScript modules; React 19 only for discussion boards |
| Styling       | Plain CSS with design tokens; component styles are scoped     |
| Content       | Typed TypeScript data (apps) and Markdown (legal documents)   |
| Images        | `astro:assets` (AVIF + WebP, responsive `srcset`)             |
| Fonts         | Be Vietnam Pro, self-hosted via Fontsource                    |
| Backend       | Firebase Auth + Firestore (discussions only)                  |
| Hosting       | GitHub Pages behind Cloudflare, deployed by GitHub Actions    |

Pages ship as HTML and CSS. A typical page loads about 3 KB of JavaScript (theme
toggle, menu, filters). React and the Firebase SDK are downloaded only when a
visitor opens **Discussions**, because the boards are islands with `client:visible`
inside a panel that stays hidden until then.

## Repository layout

```
src/
  assets/apps/<slug>/     app-icon, and store/<lang>/ with the App Store header and search
                          art, screenshots and App Previews (npm run sync:media)
  assets/brand/logo.svg   The brand mark (source for favicons and social cards)
  components/
    layout/               Header, footer, contact block
    home/                 Home page sections
    app/                  App page sections (hero, install, features, gallery…)
    legal/                Privacy/terms template
    community/            Discussion boards (React islands) and their styles
    ui/                   Shared widgets: logo, donate dialog, lightbox, brand icons
  content/legal/<slug>/   privacy.md, terms.md (or privacy.<lang>.md when translated)
  data/
    apps/<slug>.ts        One file per app: everything its page shows
    apps/index.ts         Display order and lookups
    platforms.ts          Platform and store names (iOS, Android, Windows, Google Play…)
    site.ts, socials.ts   Identity and public contact channels
    appstore.json         App Store snapshot (npm run sync:appstore)
  i18n/ui.ts              Interface strings in English and Vietnamese
  layouts/BaseLayout.astro  The one HTML document shell
  lib/                    Routing, SEO/JSON-LD, Firebase, GitHub releases, legal loader
  pages/                  Routes (see below)
  assets/youtube/         Local posters for embedded YouTube videos (npm run sync:youtube)
  scripts/                Browser modules: header, orbit engine, Liquid Glass refraction,
                          filters, tabs, dialogs, installs, guide contents
  styles/global.css       Tokens (colour, radii, glass), reset and shared primitives
public/                   Copied as is: CNAME, robots.txt, icons, Open Graph cards
firebase/                 Firestore security rules and their emulator tests
scripts/                  Build, verification and content tools (Node)
```

## Routes and languages

The public website is English; PHTV and LunarV default to Vietnamese and provide translated app pages. PHTV tutorials are Vietnamese.
Each language version has its own canonical URL. See [LANGUAGES.md](LANGUAGES.md).

| URL                                        | Content                                       |
| ------------------------------------------ | --------------------------------------------- |
| `/`                                        | English home                                  |
| `/vTTS/`                                   | English app page                              |
| `/PHTV/`, `/LunarV/`                       | Vietnamese app pages                          |
| `/en/PHTV/`, `/en/LunarV/`                 | English app pages                             |
| `/zh/LunarV/`                              | Simplified Chinese LunarV page                |
| `/<App>/privacy.html`, `/<App>/terms.html` | App legal documents                           |
| `/guides/`                                 | English guide index                           |
| `/guides/<slug>/`                          | English articles or Vietnamese PHTV tutorials |
| `/sitemap.xml`, `/404.html`                | Canonical sitemap and error page              |

Other legacy locale-prefixed pages and `/huong-dan/` URLs are static redirect documents.
`LegacyRedirect.astro` retains search parameters and fragments when JavaScript is enabled.

## Adding or changing an app

1. Add the app's Icon Composer document to `SOURCES` in `scripts/tools/app-icons.mjs` and
   run `npm run icons` (see [App icons](#app-icons)). Add the bundle id to `APPS` in
   `scripts/sync-appstore-media.mjs` and run `npm run sync:media` for its store media.
2. Create `src/data/apps/<slug>.ts` (copy an existing app) and add it to
   `src/data/apps/index.ts`. Add the slug to `AppSlug` in `src/data/types.ts`.
3. List its `platforms` (e.g. `['android', 'windows']`) and `links.stores`
   (`appStore`, `googlePlay`, `microsoftStore`, `flathub`, `snapcraft`, `web`). Download
   buttons, platform filters and structured data are derived from these.
4. Write `src/content/legal/<slug>/privacy.md` and `terms.md`.
5. Run `npm run og` for its social cards, then `npm run build`.
6. If the app page embeds a video (`tutorial.youtubeId`), run `npm run sync:youtube`.

A new platform or store only needs a name in `src/data/platforms.ts` and its id in the
`Platform` or `Store` type.

## Build pipeline

`npm run build` runs `astro build` and then `scripts/postbuild.mjs`, which:

- injects a Content-Security-Policy `<meta>` with hashes of each page's inline scripts
  (GitHub Pages cannot send headers);
- copies app icons to legacy URLs that external pages link to;
- writes lowercase redirect pages (`/vtts/` → `/vTTS/`) when the disk is case
  sensitive. CI builds on Linux, so the deployed site always has them; on macOS they are
  skipped, and `scripts/deploy-local.sh` adds them on a case-sensitive volume.

`npm run verify` then checks every built page: one title and `<h1>`, description
length, canonical, reciprocal hreflang, Open Graph image, valid JSON-LD, CSP, internal
links and images, and that the sitemap lists exactly the indexable pages.

## App Store media

Every image of an app on the site is the one on its App Store listing.
`npm run sync:media` signs in to the App Store Connect API (key outside the repository),
takes the newest version of each platform, including one still in review, and downloads per
page language: screenshots for iPhone, iPad, Mac and Apple Vision Pro, the first App Preview
of each device (re-encoded to H.264 with ffmpeg), and the product page header and search
results art from the app's asset library. `scripts/tools/import-store-media.mjs` turns them
into WebP in `src/assets/apps/<slug>/store/<en|vi|zh>/`, and `src/lib/store-media.ts` reads
them, falling back to English. `docs/provenance/appstore-media.json` records which store
version and art each sync used.

| Where                  | Uses                                                        |
| ---------------------- | ----------------------------------------------------------- |
| Home app cards         | Search results art (3:2)                                    |
| App page hero          | Product page header art (a 2.33:1 band; whole on phones)    |
| App page "Screenshots" | Screenshots and App Previews, one row per device            |
| Structured data        | First eight screenshots as `SoftwareApplication.screenshot` |

## App icons

`npm run icons` (`scripts/tools/app-icons.mjs`, on a Mac with Xcode 26) renders each app's
Icon Composer document with Apple's `ictool`, so the site shows the same Liquid Glass icon
as the store build: 1024 px, saved at 512 px as `src/assets/apps/<slug>/app-icon.png`. It
also cuts the document's layers into the transparent artwork of the home orbit planets
(`src/assets/planet-artwork/<slug>.png`) and prints the planet colours for
`src/data/planet-appearance.ts`. With `--from <dir>` it works from renders made elsewhere.
After an icon changes, run `npm run og` and bump `OG_VERSION` in `src/lib/seo.ts` so social
networks fetch the new cards.

## Continuous integration

`.github/workflows/deploy.yml` runs on every push and pull request with a read-only token:
formatting, types, Firestore rules tests, build, `verify` and `test:language`. Optimised
images are cached between runs (`node_modules/.astro`). Only a
push to `main` starts the separate publish job, which has write access and force-pushes
`dist/` to `gh-pages`. Dependabot proposes grouped monthly updates for npm packages and
actions; each one goes through the same checks.

## SEO

- Real HTML for every page and language; no client-side rendering of content.
- `Person`, `WebSite`, `ProfilePage`, `SoftwareApplication`, `BreadcrumbList` and
  `FAQPage` structured data, built only from facts that are visible on the page or in
  the App Store snapshot. Never add unverified ratings or prices.
- Sitemap with canonical pages and App Store release dates as `lastmod`.
- Speculation rules prerender a same-site page when a visitor shows intent to open it,
  and cross-document view transitions animate app icons between pages.

## Discussions

Two boards share `src/lib/firebase.ts` and `src/components/community/board.css`:

- `PhtvBoard.tsx` reads `questions` and `notifications` (labels, likes, pinning,
  locking, notifications).
- `AppBoard.tsx` reads `appDiscussions/{app}/posts` and their `replies`.

Their data models differ for historical reasons and are protected by
`firebase/firestore.rules`; changing either requires a rules update, the emulator tests
(`npm run test:rules`) and a data migration. See [DISCUSSION-EMAIL.md](DISCUSSION-EMAIL.md)
for the email digest and [SECURITY-DEPLOYMENT.md](SECURITY-DEPLOYMENT.md) for headers and
Firebase rollout.
