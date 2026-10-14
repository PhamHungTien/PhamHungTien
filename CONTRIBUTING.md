# Contributing

This repository builds [phamhungtien.com](https://phamhungtien.com): the portfolio, the
landing page of every app, and their privacy policies and terms. The apps themselves
live in their own repositories (for example [PHTV](https://github.com/PhamHungTien/PHTV)).

## Getting started

Requirements: Node.js 24 (`nvm use`), npm 10+. Java 21 only for the Firestore rules tests.

```sh
npm ci
npm run dev        # http://localhost:4321
```

## Scripts

| Command                 | What it does                                                   |
| ----------------------- | -------------------------------------------------------------- |
| `npm run dev`           | Development server with hot reload                             |
| `npm run build`         | Production build to `dist/`, then CSP, legacy URLs and aliases |
| `npm run preview`       | Serve the production build locally                             |
| `npm run verify`        | Check SEO, links, images, hreflang and sitemap of `dist/`      |
| `npm run check`         | Type-check `.astro`, `.ts` and `.tsx` files                    |
| `npm run format`        | Format with Prettier (`format:check` in CI)                    |
| `npm run og`            | Regenerate the Open Graph cards in `public/og`                 |
| `npm run sync:appstore` | Refresh `src/data/appstore.json` from the App Store            |
| `npm run test:rules`    | Run the Firestore security rules tests in the emulator         |

Before opening a pull request run `npm run format:check`, `npm run check`,
`npm run build` and `npm run verify`.

## Where things live

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full layout. In short:

- **App content** (text, screenshots, platforms, store links): `src/data/apps/<slug>.ts`
- **Interface text** in both languages: `src/i18n/ui.ts`
- **Legal documents**: `src/content/legal/<slug>/*.md`
- **Design tokens**: top of `src/styles/global.css` ([design system](docs/DESIGN-SYSTEM.md))

## Conventions

- Every user-facing string is written in English and Vietnamese.
- Prefer HTML and CSS; add browser JavaScript only for real interaction, as a small module
  in `src/scripts`. Use React only for complex, data-driven islands.
- Use native elements (`<a>`, `<button>`, `<dialog>`, `<details>`), accessible names,
  explicit image dimensions and reduced-motion fallbacks.
- Structured data must describe facts visible on the page. Do not add ratings or prices
  that are not confirmed.
- Never commit secrets. Firebase web config is public by design; access is enforced by
  `firebase/firestore.rules`, which has its own tests.

## License

[GPL-3.0](LICENSE). Report bugs with steps to reproduce and the expected result; keep
pull requests focused and describe how you validated them.
