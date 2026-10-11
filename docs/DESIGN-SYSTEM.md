# Shared website interface

The portfolio, six App Store landing pages, PHTV and legal pages share material
and control geometry in `assets/liquid-glass.css`. Product identity comes from
the real application icon and screenshots, rather than extra decorative labels.

## Direction

Keep the existing collection layout and product imagery. Floating navigation is
a capsule, compact icon controls are circles, and content panels use a 24px radius.
Inset content uses 16px corners. Equal roles share equal dimensions; a textarea or
content panel does not need the same height as a button.

The existing light palette is page #f5f3ef, text #252723, muted #656860 and surface
#faf9f6; dark equivalents are #141614, #f0f0e9, #a6aaa0 and #1c1f1b. System sans
keeps Vietnamese and English legible. The established home headline treatment is
retained. Blur belongs to floating controls; long discussion text stays crisp.

```
Navigation: [ Home ]        page links        [ language ][ theme ][ menu ]
Mobile:     [ Home ]                         [ language ][ theme ][ menu ]
                                                       12px gap
                                            [ navigation panel          ]
```

`--control-size` is 46px; VI/EN selection cells are 36px circles with 4px insets.
Navbar padding is 8px. Mobile navigation shares a 12px gap below the bar across
the root/product pages and PHTV. Safe-area top spacing is respected.

## Interaction

Compound search controls show focus around the outer capsule. Menus support
Escape, outside-click dismissal, keyboard focus and close on desktop resize.
Hidden download links are inert. Keep labels explicit and use native links for
navigation. Small-screen search input text is 16px to avoid iOS focus zoom.
Theme-color follows the actual material palette rather than unrelated black/white.
Layout animation measures all cards before writing animations. Reduced-motion
and reduced-transparency fallbacks remain in place.

## Skills and references

- [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design): intentional identity, restraint, content-led design.
- [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines): focus, semantics, responsive controls and performance.
- [Impeccable](https://github.com/pbakaus/impeccable): additional design critique tooling considered; not needed for this scoped pass.

Two selected skills are installed locally for future turns; they are not website
dependencies. Treat skill advice as guidance and preserve explicit user decisions.

## Review coverage

Check root and all six product headers at 320px, PHTV navigation at 320px, legal
language controls, desktop navigation and light/dark presentation. Run the existing
type checks, production builds and `verify:ui` when changing shared components.
This is a focused consistency pass, not a full accessibility certification.

## Shared earth palette

All pages use the shared Liquid Glass color tokens. Light mode uses cream
`#f7f1e7`, dark brown text `#36271f`, and muted brown `#756354`. Dark mode
uses `#201914`, warm ivory text `#f5eadb`, and muted sand `#c7b39e`.
Ambient motion uses clay, copper and gold; product icons retain their original colors.
Focus rings use brown in light mode and gold in dark mode.

## Social previews

Run `npm run og` to regenerate the 22 PNG cards and legal-page metadata.
The generator uses real application icons, selectable source text in SVG, and
Sharp to export 1200 × 630 cards. Run `npm run build:all` followed by
`npm run verify:social` to validate generated metadata and image dimensions.
Increment the image URL version in the generator and SEO metadata when refreshing cards.
