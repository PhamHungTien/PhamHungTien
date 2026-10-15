# Design system

A cool, precise "workbench": neutral blue-grey paper and navy ink, so the real app icons
carry the colour. The only brand colours are the maroon and gold that recur across the
icons themselves. The one expressive element is the home-page dock that shelves every
app icon; everything around it stays quiet.

## Brand mark

`src/assets/brand/logo.svg`: a white "T" for Tiến crowned by the gold circumflex of "ế",
on a maroon app-icon squircle. It is distinct from every app icon (PHTV's is a gold "P"),
reads at 16 px and works on light and dark backgrounds. `npm run brand` regenerates the
favicons and manifest icons in `public/` and the full brand kit in `brand/` (SVG and PNG
marks, lockups with the outlined wordmark, social images; see `brand/README.md`);
`npm run og` uses it on the social cards; `src/components/ui/Logo.astro` renders it
inline in the header.

## Tokens

Defined once at the top of `src/styles/global.css`.

| Token         | Light     | Dark      | Use                           |
| ------------- | --------- | --------- | ----------------------------- |
| `--paper`     | `#f3f5f8` | `#0d1118` | Page background               |
| `--surface`   | `#ffffff` | `#151b26` | Cards, controls               |
| `--surface-2` | `#e9edf2` | `#1c2431` | Media frames, subtle fills    |
| `--ink`       | `#131a27` | `#eceff4` | Text                          |
| `--muted`     | `#566074` | `#9aa4b6` | Secondary text                |
| `--line`      | `#d9dee6` | `#262f3e` | Borders                       |
| `--brand`     | `#7a1424` | `#f0c04e` | Primary buttons, focus, links |

Radii: controls 12 px, cards 20 px, media 28 px, app icons 22.5 %. Container 1200 px,
gutter `clamp(16px, 4vw, 48px)`, section spacing `clamp(72px, 10vw, 128px)`.

## Type

Be Vietnam Pro (400, 600, 700), drawn for Vietnamese so the stacked diacritics in
"Phạm Hùng Tiến" stay clean at display sizes. A metric-matched fallback face prevents
layout shift while it loads; the Latin 400/700 and Vietnamese 700 files are preloaded.
Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## Components

Each component owns its styles in a scoped `<style>` block. Shared primitives live in
`global.css`: `.container`, `.section`, `.section-head`, `.button` (`--primary`,
`--secondary`), `.link-button`, `.text-link`, `.icon-button`, `.app-icon`, `.sr-only`.
The discussion boards are React, so they use plain `board-*` classes from
`src/components/community/board.css` on the same tokens.

## Motion and accessibility

- One orchestrated moment: the dock icons rise in on load.
- Cross-document view transitions cross-fade pages and move an app icon from the list
  into the app page header (`view-transition-name: app-<slug>`).
- Everything respects `prefers-reduced-motion`; dialogs are native `<dialog>` elements
  with focus return; menus close on Escape and outside clicks.
- Off-screen sections use `content-visibility: auto` (`.defer-render`).
- Every control has a visible focus ring and an accessible name; touch targets are at
  least 40 px; the theme follows the system until the visitor picks one.
