# Design system

A cool, precise "workbench": neutral blue-grey paper and navy ink, so the real app icons
carry the colour. The only brand colours are the maroon and gold that recur across the
icons themselves. The orbital home hero establishes depth and movement; product previews, local
spotlights and restrained interaction states carry that language through the site.

## Brand mark

`src/assets/brand/logo.svg`: a white "T" for Tiến wearing a gold nón lá, the conical hat
of the Mekong Delta (the author's home, Bến Tre), which doubles as the circumflex of "ế";
on a maroon app-icon tile. Hat and letter share soft, rounded corners. It is distinct from every app icon (PHTV's is a gold "P"),
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

- The orbital hero and dock introduce the apps; content sections reveal as they enter view.
- Cross-document view transitions cross-fade pages and move an app icon from the list
  into the app page header (`view-transition-name: app-<slug>`).
- Everything respects `prefers-reduced-motion`; dialogs are native `<dialog>` elements
  with focus return; menus close on Escape and outside clicks.
- Off-screen sections use `content-visibility: auto` (`.defer-render`).
- Every control has a visible focus ring and an accessible name; touch targets are at
  least 40 px; the theme follows the system until the visitor picks one.

## Spatial motion update (October 2026)

The home hero is now a product universe: a CSS 3D brand sphere, orbital rings and
floating real app icons. Product cards show the actual interface before navigation.
App heroes, guide cards and recommendations respond to fine pointers; feature cards
use a local spotlight. Reading progress follows the native CSS scroll timeline.

- `src/scripts/motion.ts` owns the system motion preference and reveals. Effects default to on; legacy stored opt-outs are ignored.
- `src/scripts/tilt.ts` batches pointer events, caches bounds until scroll/resize and
  removes all listeners and styles when motion is disabled. No perpetual JS loop.
- `src/styles/motion.css` owns shared effects and reduced-motion overrides.
- The linked planets pause offscreen, in hidden tabs, on hover and on keyboard focus. All content is rendered and readable without JavaScript.
- The header has no motion button. System Reduce Motion still selects the static accessible layout.
- CSS 3D preserves a lightweight static fallback without a WebGL runtime or model downloads.

Research used for implementation:

- [web.dev: high-performance animations](https://web.dev/articles/animations-guide):
  prefer transform and opacity; avoid animating layout.
- [WebKit: scroll-driven animations](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/):
  native scroll timelines with feature detection.
- [Chrome: cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document):
  retain native multi-page navigation and unique shared icon names.
- [W3C: animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions):
  honor the system reduced-motion preference.

### Open orbital hero

The hero is centered and borderless, up to 1080 px wide, with no backdrop panel or
introductory copy. The single h1 remains available to assistive technology. The
seven planets are real links, replacing the duplicate icon dock. A single requestAnimationFrame
loop projects circular orbits into screen coordinates, sharing geometry with the SVG tracks.
Perspective scale and depth ordering carry planets in front of and behind the central sphere.
The loop stops offscreen, in hidden tabs, during hover/focus and when motion is disabled.
Reduced motion and no JavaScript show seven separated, reachable app links.

Artwork comes directly from each application's Icon Composer `.icon/Assets` source in Documents.
The original transparent PNG layers are retained in `src/assets/planet-artwork`; Astro emits
320 px WebP assets for the hero. Monochrome layers use CSS masks with a gold highlight;
vTTS and LunarBlock retain their original colors. No square app-icon backgrounds are added.
The sphere shading, atmosphere and arrival are CSS; no WebGL runtime is downloaded.

Planet colors and glyph gradients are stored in `src/data/planet-appearance.ts`, copied from
the source Icon Composer fills rather than the website UI accent. Five app spheres share
their original burgundy; vTTS retains blue/violet and LunarBlock retains midnight blue.
Artwork scales are optically balanced per source canvas, with a consistent 10% planet size
and a slightly larger PHTV. Lighting uses the same direction and restrained highlights.

Horizontal pointer drags rotate all planets together, with capped velocity and exponential
inertia decay. The scene uses `pan-y pinch-zoom` so vertical scrolling and pinch zoom stay
native. A directional threshold preserves taps, and drag completion suppresses accidental
link activation. Touch does not set sticky hover or keyboard focus pauses. Inner artwork
is 20% smaller to leave breathing room within the spherical surface.

The home hero fills the first small viewport below the 68 px header. Orbit width is
limited by both the container and remaining viewport height, reserving space for actions.
Portrait phones use a square scene; desktop and short landscape screens use 3:2. Short
landscape screens keep actions in one row and omit the decorative hint to avoid collisions.
The app directory starts below the initial viewport. `svh` avoids browser-toolbar resize jumps.

### Collection and product pages

The directory separates its title from the full-width filter/search toolbar. App cards
share preview proportions, readable descriptions and an aligned Explore app footer.
Resource cards align their reading metadata and fit narrow screens without a 300 px minimum.
Shared section kickers connect the collection, guides, features, gallery and FAQ visually.

Product heroes show supported platforms from app data, balance heading line breaks and
label the image enlargement action. Facts use a single rounded panel; the first feature
gets more visual emphasis. FAQ uses a two-column editorial layout on desktop and stacks
on mobile. The gallery explains scrolling/enlargement. Decorative hero rings are omitted
on stacked layouts to keep text clear. These components serve all seven apps, preserving
Vietnamese PHTV content and English on other product pages.

### Independent orbital planes

Each app has a distinct radius, inclination and roll. Perspective projection uses the same
geometry for the link and its SVG orbit; near and far half-paths sit on opposite sides of
the central sphere. Near planets scale up and distant planets recede. A continuous angular
speed curve (`1.2 - 0.7 sin(angle)`) lets apps linger in front and move faster behind the
center; this is presentation timing, not a simulation of orbital physics. Swipe rotation
adds to the same angle and retains exponentially decaying inertia. The decorative tagline
is removed. Paths are calculated only on resize; the single visible-scene animation loop
updates planet transforms, opacity and depth order.

References: [Three.js perspective cameras](https://threejs.org/manual/pages/cameras.html)
and [web.dev animation performance](https://web.dev/articles/animations-guide).

### Cosmic background and clean planetary silhouettes

A shared fixed backdrop now gives every page a dark space canvas, soft blue/violet nebulae
and 110 deterministic SVG stars. Dark is the default; an explicitly saved light preference
is retained with a subdued light version. Cards keep solid surfaces for text legibility.
Star groups twinkle using opacity only, pause in hidden tabs and respect reduced motion.
No full-screen image or canvas loop is required.

The central corona and all visible orbital paths have been removed (superseding the
previous split SVG path treatment). The seven independent orbital planes and speed curves
remain. Each planet's artwork has a distinct 9–25 second drift period, phase and alternating
direction; modest translation and rotation preserve recognizable artwork and stable links.

Dark mode uses a pure black (#000000) space background and neutral stars. Colored nebula
overlays are disabled in dark mode; the light theme retains its subdued nebula treatment.

### Motion interaction refinements

Reduced-motion visitors use the separated static constellation, including after changing
the system setting while the page is open. A horizontal drag keeps the direction from its
initial contact point, even when crossing the centre; vertical scroll remains native.
Camera parallax stops retargeting while a planet is hovered or keyboard-focused. When
supported, a selected planet shares its transition name with the destination app icon;
other app icons temporarily release that name and are restored on history navigation.
Reveal distance, stagger and product-card tilt are restrained to make content easier to
scan. Active meteors are cancelled when the page is hidden or reduced motion is enabled.

### Earth-toned central planet

The central body uses ochre, clay and brown shading, a quiet mineral texture and a soft
directional highlight rather than a star corona. Its responsive diameter is larger but
limited by available space; app links retain their own paths and keyboard focus.

### Home navigation and app visibility

The home header is fixed and hidden at the top, revealing after scrolling 12 px or when
keyboard focus enters it. Other pages retain the sticky header; without JavaScript it
remains available. The home hero fills the viewport freed by the header.

On initial layout, the engine chooses an opening rotation by evaluating app clearance
from the central planet and other app bodies for the current viewport. When a moving app
would overlap the center in projection, it draws in front so it remains visible and
clickable. This is a presentation choice; near/far scale and shading are retained.
