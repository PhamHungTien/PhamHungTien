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
  assets/apps/<slug>/     Screenshots and icons, processed at build time
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
  scripts/                Browser modules for header, filters, tabs, dialogs, installs
  styles/global.css       Tokens, reset and shared primitives
public/                   Copied as is: CNAME, robots.txt, icons, Open Graph cards, videos
firebase/                 Firestore security rules and their emulator tests
scripts/                  Build, verification and content tools (Node)
```

## Routes and languages

The public website is English, except Vietnamese-first PHTV and its tutorials.
Each destination has one canonical URL. See [LANGUAGES.md](LANGUAGES.md).

| URL                                        | Content                                       |
| ------------------------------------------ | --------------------------------------------- |
| `/`                                        | English home                                  |
| `/vTTS/`                                   | English app page                              |
| `/PHTV/`                                   | Vietnamese-first PHTV                         |
| `/<App>/privacy.html`, `/<App>/terms.html` | App legal documents                           |
| `/guides/`                                 | English guide index                           |
| `/guides/<slug>/`                          | English articles or Vietnamese PHTV tutorials |
| `/sitemap.xml`, `/404.html`                | Canonical sitemap and error page              |

Old locale-prefixed pages and `/huong-dan/` URLs are static redirect documents.
`LegacyRedirect.astro` retains search parameters and fragments when JavaScript is enabled.

## Adding or changing an app

1. Put images in `src/assets/apps/<slug>/`.
2. Create `src/data/apps/<slug>.ts` (copy an existing app) and add it to
   `src/data/apps/index.ts`. Add the slug to `AppSlug` in `src/data/types.ts`.
3. List its `platforms` (e.g. `['android', 'windows']`) and `links.stores`
   (`appStore`, `googlePlay`, `microsoftStore`, `flathub`, `snapcraft`, `web`). Download
   buttons, platform filters and structured data are derived from these.
4. Write `src/content/legal/<slug>/privacy.md` and `terms.md`.
5. Run `npm run og` for its social cards, then `npm run build`.

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
