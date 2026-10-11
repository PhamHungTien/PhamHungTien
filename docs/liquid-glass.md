# Shared Liquid Glass web design

References reviewed on 10 October 2026:
- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/videos/play/wwdc2025/219/

Apple describes a floating functional layer for controls/navigation, keeping content distinct. This site uses a CSS interpretation rather than native Apple rendering: translucent tinted controls, backdrop blur, edge highlights, layered shadows, pill buttons and restrained press/hover motion. Content cards use stable, mostly opaque surfaces for legibility.

`assets/liquid-glass.css` owns shared light/dark material tokens and adapters for the portfolio, standalone PHTV UI, donation dialog, legal pages and 404. Both React entry points import it; static pages link it after their base styles. Existing publication copies the complete root assets folder.

Blur is limited to navigation, grouped controls and dialogs, without per-frame JavaScript or SVG displacement filters. Unsupported browsers fall back to a solid surface. `prefers-reduced-transparency`, `prefers-contrast` and the shared `prefers-reduced-motion` rules adapt the experience. No app icon masks or new crops are applied.
