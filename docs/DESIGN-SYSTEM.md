# Design system

A cool, precise "workbench": neutral blue-grey paper and navy ink, so the real app icons
carry the colour. The only brand colours are the maroon and gold that recur across the
icons themselves. One bold element, the orbiting home hero, carries depth and movement;
everything else is quiet. Navigation and controls float above the content on Liquid Glass.

## Brand mark

`src/assets/brand/logo.svg`: a white "T" for Tiến wearing a gold nón lá, the conical hat
of the Mekong Delta (the author's home, Bến Tre), which doubles as the circumflex of "ế";
on a maroon app-icon tile. Hat and letter share soft, rounded corners. It is distinct from
every app icon (PHTV's is a gold "P"), reads at 16 px and works on light and dark
backgrounds. `npm run brand` regenerates the favicons and manifest icons in `public/` and
the full brand kit in `brand/` (SVG and PNG marks, lockups with the outlined wordmark,
social images; see `brand/README.md`); `npm run og` uses it on the social cards;
`src/components/ui/Logo.astro` renders it inline in the header.

## Tokens

Defined once at the top of `src/styles/global.css`.

| Token         | Light     | Dark      | Use                                   |
| ------------- | --------- | --------- | ------------------------------------- |
| `--paper`     | `#f3f5f8` | `#000000` | Page background (dark is the space)   |
| `--surface`   | `#ffffff` | `#0e1117` | Cards, controls (L1)                  |
| `--surface-2` | `#e9edf2` | `#161b24` | Media frames, subtle fills (L2)       |
| `--ink`       | `#131a27` | `#eef1f6` | Text                                  |
| `--muted`     | `#566074` | `#9ba4b4` | Secondary text                        |
| `--line`      | `#dfe3ea` | `#222a36` | Hairline borders, the first depth cue |
| `--brand`     | `#7a1424` | `#f0c04e` | Primary buttons, links, focus         |

Container 1200 px, gutter `clamp(16px, 4vw, 48px)`, section spacing
`clamp(36px, 7vw, 96px)` (tight on phones so more of each page fits). Content depth comes
from a 1 px border first; shadows stay soft (`--shadow-card`, alpha under 0.08 in light
mode; a faint top highlight in dark mode).

## Corner radii

| Token         | Value  | Use                                                     |
| ------------- | ------ | ------------------------------------------------------- |
| `--r-pill`    | 999 px | Anything you press: buttons, segmented controls, header |
| `--r-sheet`   | 28 px  | Dialogs, menus, the app header art on wide screens      |
| `--r-card`    | 22 px  | Cards and panels                                        |
| `--r-media`   | 18 px  | Screenshots, videos, images                             |
| `--r-panel`   | 16 px  | Small tiles, code blocks, contact links                 |
| `--r-control` | 12 px  | Inputs, icon tiles, small boxes                         |
| `--r-xs`      | 6 px   | Inline code, keyboard keys                              |
| `--r-icon`    | 22.5 % | App icons and the brand mark                            |

App Store and Google Play badges use the original, localized SVG artwork at the same height.
Artwork is 44 px tall by default and 40 px on windows narrower than 360 px, with 44 px touch
targets. The row wraps as space requires, with App Store first and clear space between badges.
`StoreDownloads.astro` renders the badges on app pages and in guide download cards.
[Apple badge guidelines](https://developer.apple.com/app-store/marketing/guidelines/) · [Google Play badge guidelines](https://partnermarketinghub.withgoogle.com/brands/google-play/google-play/lockups-icons-badges/)

Nested shapes are **concentric**, as in Apple's design language: an inner radius is the
outer radius minus the inset between the two edges, so corners never look pinched or
flared. Examples: the 64 px header capsule (radius 32) holds 40 px controls 12 px in
(radius 20, also capsules); the menu sheet (28) holds rows 8 px in (20); segmented thumbs
sit 4 px inside their capsule; the Homebrew command capsule holds its copy button 8 px in.
Where an element sits far from its container's edge (an icon inside a large card) it keeps
its own shape.

## Liquid Glass

The floating controls use Liquid Glass from the header, menus and segmented controls to
the search field, gallery arrows, video play button and dialogs.
App tiles, guide cards, fact panels, download choices and discussions all use a translucent
tint over a blurred backdrop. Support panels, menus and dialogs use a denser tint for longer
labels and actions. Articles sit directly on the page.

The shared material lives in `global.css`:

- `.glass`, `.segmented` and `.button--secondary` layer `--glass-tint` over a blurred,
  saturated backdrop. `.glass-panel` chooses the denser tint for standalone panels;
- `.glass-card` blurs the page behind the card and adds a translucent tint, a soft edge
  highlight and the card shadow;
- a hairline edge and inner edge light (inset shadows), plus a specular rim: a 1 px
  gradient border, bright at the top left where light catches the edge and faint at the
  bottom right;
- a soft lift (`--glass-shadow`);
- selected options are a brighter glass thumb (`--glass-thumb`), not a solid inverse fill.

Refraction: Apple's glass bends what is behind it at its curved edge. On the web that takes
an SVG displacement map inside `backdrop-filter`, which only Chromium renders (Firefox
accepts the value and draws nothing; Safari ignores it). `src/scripts/liquid-glass.ts`
therefore enables it for Chromium alone. Cards and `[data-lens]` controls near the viewport
get a size-matched map with a curved edge. The backdrop is softened before refraction so
the rim can bend visible detail. The reflection on the rim follows a mouse when motion and
transparency preferences allow it. Other browsers keep the blur, tint and responsive rim.

Rules:

- Secondary controls in glass panels use a light tint over the panel's blurred surface.
  Dialogs share sheet geometry, edge lighting and a dimmed backdrop.
- The header's glass layer sits behind its controls, so the language and mobile menus
  can blur the page through their own sheets. Discussion filters use the denser tint and
  preserve native select controls.
- Platform filters, screenshot device tabs and the app navigation share the sliding
  selection indicator. Each control keeps its own keyboard behavior and selected state.
  On app pages the selected section follows fragment links and manual scrolling below
  the sticky header.
- Text on glass should meet WCAG AA contrast in both themes.
- Reduced transparency, increased contrast and forced colors replace the glass with solid
  surfaces and a clear edge, and switch refraction off; without `backdrop-filter` the tint
  is denser.
- Primary buttons are solid tints with a specular edge, so their contrast never depends on
  what is behind them.

## Type

Be Vietnam Pro (400, 500, 600, never heavier), drawn for Vietnamese so the stacked
diacritics in "Phạm Hùng Tiến" stay clean at display sizes. Hierarchy comes from size:
`--text-display` (28–48 px), `--text-h2` (24–36 px), `--text-h3` (17–20 px), body 16 px,
secondary 14–15 px, meta 13 px. A metric-matched fallback face prevents layout shift while
it loads; the Latin 600 file (and Vietnamese 600 on Vietnamese pages) is preloaded.
Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.
Reading paragraphs align to both margins and the final line starts at the leading edge.
Text columns narrower than 16 rem use start alignment to keep word spacing even.

## Section headings

A section heading is a short accent bar (the app colour on app pages), an optional
kicker (one sentence-case line of context in the accent colour), then the `h2` and an
optional lead. Kickers are plain phrases ("The collection"), never all caps or monospace,
and are left out when they would only repeat the heading.

Numbers and counters appear only for real sequences (installation steps, tutorials).
Feature lists are unnumbered; the first feature spans the row and an odd last one does
too. On the home page an odd last app card spans the row with its preview beside the text.

## Components

Each component owns its styles in a scoped `<style>` block. Shared primitives live in
`global.css`: `.container`, `.section`, `.section-head`, `.button` (`--primary`,
`--secondary`), `.link-button`, `.text-link`, `.icon-button`, `.segmented`, `.glass`,
`.app-icon`, `.sr-only`. The discussion boards are React, so they use plain `board-*`
classes from `src/components/community/board.css` on the same tokens.

## Home orbit

`src/components/home/OrbitScene.astro` and `src/scripts/planet-system.ts` arrange seven
rounded-square app icons around the brand mark. They use the same Icon Composer renders
as the app pages. A perspective camera scales the icon links by depth.

- **Layout solver.** For each screen the engine searches camera pitch and roll, the orbit
  size and the brand planet's size, and keeps the largest system in which no planet and
  no name touches the brand planet or a neighbour, at rest or halfway through a turn.
  Wide screens keep a slight in-screen tilt; portrait screens may tilt the plane
  diagonally to use a phone's long diagonal. Narrow screens show only the caption of the
  app in front instead of every name.
- **Carousel.** One app stays in front with its name, category and downloads below it.
  A critically damped spring makes every turn and stop smooth. Dragging spins it with
  inertia and settles on the nearest app; focusing a planet with the
  keyboard turns it to the front, and arrow keys move between planets. Selecting an icon
  brings its download shortcuts forward. The active icon and its name open the app page.
  The PHTV shortcuts share the architecture-specific release links used by its install
  section. Pointer movement
  tilts the camera (parallax); on phones that expose it without a permission prompt,
  device orientation does the same.
- **Intro.** The brand planet grows in and the app icons unfurl from
  behind it while the system swings into place. The caption is part of the page's first
  paint and glides to its place under the first app, so the hero has content immediately.
- **Performance.** Only transforms and opacity change per frame, every DOM write is cached,
  and the loop sleeps whenever nothing moves. It stops
  off-screen and in hidden tabs. The scene initialises after the first paint.
- **Background.** On the home hero, a soft highlight follows a mouse and the two star
  layers move slightly at different speeds. The highlight fades when the mouse leaves.
  Twinkling and occasional meteors play while the hero is visible. Reading pages use a
  still star field.
- **Reduced motion.** The OS preference uses the same still composition automatically.
  Without JavaScript the icons
  appear around the brand mark in a flat arrangement.

## App imagery and pages

- **One source of imagery.** Every app image is its App Store artwork (see
  [ARCHITECTURE.md](ARCHITECTURE.md#app-store-media)): search results art on home cards,
  product page header art at the top of app pages, screenshots and App Previews in the
  gallery. The site and the store always look the same.
- **App cards** (`AppDirectory.astro`) show store artwork, icon, name, category and
  platforms in the compact layout. The grid uses one column below 360 px, two through
  1099 px and three at wider widths. Large cards can also show the description and store.
- **App hero** (`AppHero.astro`) keeps store artwork at its native aspect ratio. Where
  artwork is available, it sits beside the app description and download actions from
  840 px. Narrower layouts stack them below the breadcrumb.
- **Gallery** (`StoreGallery.astro`): device tabs (iPhone, iPad, Mac, Apple Vision Pro) over
  App Store-style rows of equal height; the App Preview comes first and loads only when
  played. Phones scroll a row edge to edge with the next shot peeking in; pointer devices
  get glass previous/next buttons. Without JavaScript every device row is shown.
- Cards and buttons have no tilt, lift or cursor spotlight, and sections appear at once
  instead of fading in. Hover deepens a border and, on fine pointers, scales art by 2 %.

## Motion and accessibility

- Motion tokens: 150–200 ms ease-out on transform and opacity for interface feedback; a
  gentle spring (`--spring`) for things that move into place. No infinite decorative loops
  outside the home scene, which pauses off-screen.
- Cross-document view transitions cross-fade pages and move an app icon from the list or
  the orbit into the app page header (`view-transition-name: app-<slug>`); switching theme
  grows the new theme out of the toggle.
- Everything respects `prefers-reduced-motion`; dialogs are native `<dialog>` elements
  with focus return; menus close on Escape and outside clicks.
- Off-screen sections use `content-visibility: auto` (`.defer-render`).
- Every control has a visible focus ring that follows its shape and an accessible name;
  touch targets are at least 40 px; the site is dark by default and keeps a theme the
  visitor picks (the `theme-color` meta follows it).

## Guides on wide screens

Guide cards use one column below 360 px, two from 360 px and three from 860 px.
Titles stay visible in full and descriptions use a shorter preview on phones.
Apps with one guide share a row in the guide index when the viewport has room.

At 1180 px and wider, a guide's table of contents becomes a sticky column beside the
article and marks the section being read (`src/scripts/toc.ts`); below that it stays an
inline box before the article.
