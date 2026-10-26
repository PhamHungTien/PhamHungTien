# Website languages

The website uses one canonical language per destination:

- Home, other app pages, website privacy, guide index and general guides: **English**.
- PHTV, its legal pages and its typing tutorials: **Vietnamese first**, retaining English
  product names and technical terms such as Telex, Clipboard, Picker and Mac App Store.

There is no language selector or automatic browser-language detection. Stored language
preferences and `?lang=` parameters do not change the page language. The website's
source translations remain available for maintenance but are not separate public pages.

Historical `/vi/`, `/fr/`, `/ja/`, `/en/PHTV/`, translated app/legal URLs and
`/huong-dan/` routes redirect to their canonical destinations. JavaScript redirects
retain query parameters and fragments; meta refresh and a visible link provide fallbacks.
The guide index is `/guides/`; existing guide slugs are retained.

PHTV guide cards use English summaries on English pages, with a “Tiếng Việt” label.
The articles themselves remain Vietnamese. The sitemap lists only canonical content,
and pages do not advertise alternate language URLs.

Verify after building:

```sh
node scripts/test-language.mjs
```
