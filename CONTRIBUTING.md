# Contributing to the website

This repository contains the portfolio website and application landing pages. The native
PHTV application is maintained in [PhamHungTien/PHTV](https://github.com/PhamHungTien/PHTV).

## Development

Use Node.js 24 LTS (`nvm use`), then run `npm ci` at the repository root. npm workspaces
install both web applications using one lockfile.

- `npm run dev`: portfolio and six application landing pages.
- `npm run dev:phtv`: the PHTV website at `/PHTV/`.
- `npm run images`: regenerate responsive images without changing source artwork.
- `npm run og`: regenerate social previews and legal-page social metadata.
- `npm run format`: apply the shared source formatting rules.
- `npm run type-check:all`: check both applications with strict TypeScript.
- `npm run build:all`: build both applications and prerender public pages.
- `npm run verify:ui` and `npm run verify:social`: validate built output.

Run `npm run format:check`, type checking, builds and output verification before opening
a pull request. Firestore changes also require `npm run test:rules --workspace
@phamhungtien/phtv-web` (Java 21 is needed for the emulator).

## Project conventions

Shared React components belong in `src/components`; application data belongs in `src/data`.
Shared build settings belong in `config`. Both applications use `tsconfig.base.json`.
Navigation dimensions and material/color tokens belong in `assets/liquid-glass.css`.
Avoid adding page-specific overrides for shared control sizes.

The portfolio, non-PHTV applications and their legal pages use English only. PHTV
defaults to Vietnamese and supports English. Preserve existing translations and use the
shared language switch component when adding controls.

Use native links for navigation, accessible names for controls, explicit image dimensions,
and reduced-motion fallbacks. Keep original screenshots available for enlarged views.
Generated image files are committed so deployment does not need image processing.

## Security and licensing

Never put private keys, service-account credentials or email API secrets in browser code,
Vite `define`, committed environment files or logs. Use GitHub Secrets for notification
workflows. Firebase authorization is enforced by Firestore rules, not by hiding buttons.

Follow the repository's [GPL-3.0 license](LICENSE). Report defects with reproduction steps
and expected behavior; keep pull requests focused and explain their validation.
