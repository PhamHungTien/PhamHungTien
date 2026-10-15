# Brand kit: Phạm Hùng Tiến

![Preview](preview.png)

The mark is a **T** for _Tiến_ wearing a **nón lá**, the conical hat of the Mekong Delta
and of Bến Tre, the author's home. The hat has two readings: it is also the circumflex of
**ế** in Tiến. Hat and letter share the same soft, rounded corners, and the mark sits on
an app-icon tile, a nod to the apps it signs.

Everything in this folder except this README is generated from the geometry in
`src/assets/brand/logo.svg` by `npm run brand`. Change the source and re-run the
command; don't edit the generated files by hand.

## Files

| Folder     | What                                                                       | Use it for                          |
| ---------- | -------------------------------------------------------------------------- | ----------------------------------- |
| `svg/`     | `logo-mark` (squircle), `logo-mark-square` (full bleed), `logo-glyph`      | Web, print, any size                |
|            | `logo-mono-black` / `logo-mono-white`: single colour, glyph cut out        | Stamps, engraving, one-colour print |
|            | `lockup-horizontal(-dark)`, `lockup-stacked(-dark)`: mark plus name        | Headers, slides, documents          |
|            | `avatar`, `banner-1500x500`                                                | Profile pictures and cover images   |
| `png/`     | `logo-mark-{16…1024}`, mono marks at 512, lockups at 12×                   | Where SVG is not accepted           |
| `favicon/` | The exact icons the website ships, plus `site.webmanifest`                 | Websites                            |
| `social/`  | `avatar-1024`, `banner-1500x500` (LinkedIn, X, GitHub), `og-home-1200x630` | Social profiles and link previews   |
| `youtube/` | Channel avatar, banner, watermark and thumbnail base and example           | The YouTube channel (see below)     |

The wordmark in the lockups is **Be Vietnam Pro Bold**, converted to outlines, so the
SVGs open correctly without the font installed.

## YouTube

| File                             | Upload in YouTube Studio                         |
| -------------------------------- | ------------------------------------------------ |
| `avatar-800.png`                 | Customisation › Branding › Picture               |
| `banner-2560x1440.png`           | Customisation › Branding › Banner image          |
| `watermark-150.png`              | Customisation › Branding › Video watermark       |
| `thumbnail-base-1280x720.png`    | Background to design each video thumbnail on     |
| `thumbnail-example-1280x720.png` | The thumbnail layout, filled in for a real video |

The banner keeps the name and tagline inside the 1546 × 423 centre that phones, desktops
and TVs all show; the glow and hats around it only appear on larger screens. Thumbnails
put the logo and name top left, the title large on the left (a key word in gold) and a
screenshot or app icon on the right.

## Colours

| Name   | Hex       | Role                                      |
| ------ | --------- | ----------------------------------------- |
| Maroon | `#7A1424` | Tile, primary brand colour                |
| Gold   | `#F0C04E` | The nón lá, accent (brand colour on dark) |
| White  | `#FFFFFF` | The T, text on dark                       |
| Ink    | `#131A27` | Text on light                             |
| Night  | `#0D1118` | Dark backgrounds                          |

## Rules

- **Clear space:** keep at least a quarter of the mark's width empty on every side.
- **Minimum size:** 16 px for the mark, 120 px wide for the horizontal lockup.
- Use the `-dark` lockups on dark backgrounds and the plain ones on light backgrounds.
- Don't recolour, stretch, rotate, outline or add shadows to the mark.
- Don't separate the hat from the T, and don't set the name in another typeface.
- The mark identifies the developer, not an app. Don't use it as an app icon.

## Licence

The logo and name identify Phạm Hùng Tiến. The website's source code is open source,
but the brand assets are not covered by its licence. Ask before using them for anything
other than referring to the author or his apps.
