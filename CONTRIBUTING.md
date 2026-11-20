# Contributing

This repository builds [phamhungtien.com](https://phamhungtien.com): the portfolio, the
landing page of every app, and their privacy policies and terms. The apps themselves
live in their own repositories (for example [PHTV](https://github.com/PhamHungTien/PHTV)).

## Getting started

Requirements: Node.js 24 (`nvm use` reads `.nvmrc`; 22.12+ works), npm 10+. Java 21 only
for the Firestore rules tests.

```sh
npm ci
npm run dev        # http://localhost:4321
```

## Scripts

| Command                 | What it does                                                    |
| ----------------------- | --------------------------------------------------------------- |
| `npm run dev`           | Development server with hot reload                              |
| `npm run build`         | Production build to `dist/`, then CSP, legacy URLs and aliases  |
| `npm run preview`       | Serve the production build locally                              |
| `npm run verify`        | Check SEO, links, images, hreflang, sitemap and page budgets    |
| `npm run test:language` | Check canonical languages and legacy redirects of `dist/`       |
| `npm run check`         | Type-check `.astro`, `.ts` and `.tsx` files                     |
| `npm run format`        | Format with Prettier (`format:check` in CI)                     |
| `npm run og`            | Regenerate the Open Graph cards in `public/og`                  |
| `npm run brand`         | Regenerate favicons, manifest icons and the `brand/` kit        |
| `npm run icons`         | Render app icons and orbit planets from Icon Composer (macOS)   |
| `npm run sync:appstore` | Refresh `src/data/appstore.json` from the App Store             |
| `npm run sync:media`    | Pull screenshots, previews and store art from App Store Connect |
| `npm run sync:youtube`  | Save posters for newly embedded YouTube videos                  |
| `npm run test:rules`    | Run the Firestore security rules tests in the emulator          |

Before opening a pull request run `npm run format:check`, `npm run check`,
`npm run build`, `npm run verify` and `npm run test:language`. CI runs the same
checks (plus the rules tests) on every pull request; only `main` is published.

## Where things live

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full layout. In short:

- **App content** (text, platforms, store links): `src/data/apps/<slug>.ts`
- **App media** (store header and search art, screenshots, App Previews):
  `src/assets/apps/<slug>/store/<lang>/`, filled by `npm run sync:media`
- **Interface text** in both languages: `src/i18n/ui.ts`
- **Legal documents**: `src/content/legal/<slug>/*.md`
- **Design tokens**: top of `src/styles/global.css` ([design system](docs/DESIGN-SYSTEM.md))

## Conventions

- Interface strings live in `src/i18n/ui.ts` in English and Vietnamese (plus Simplified
  Chinese for LunarV). See [docs/LANGUAGES.md](docs/LANGUAGES.md) for which pages use which.
- Prefer HTML and CSS; add browser JavaScript only for real interaction, as a small module
  in `src/scripts`. Use React only for complex, data-driven islands.
- Use native elements (`<a>`, `<button>`, `<dialog>`, `<details>`), accessible names,
  explicit image dimensions and reduced-motion fallbacks.
- Animate with `transform` and `opacity` only, and write styles from animation loops only
  when a value changes (see [docs/PERFORMANCE.md](docs/PERFORMANCE.md)).
- Commit messages say what changed for visitors or maintainers, in the imperative
  ("Add…", "Fix…"), with a body when the reason is not obvious.
- Structured data must describe facts visible on the page. Do not add ratings or prices
  that are not confirmed.
- Never commit secrets. Firebase web config is public by design; access is enforced by
  `firebase/firestore.rules`, which has its own tests.

## License

[GPL-3.0](LICENSE). Report bugs with steps to reproduce and the expected result; keep
pull requests focused and describe how you validated them.
