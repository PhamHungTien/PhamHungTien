# Website languages

Home, other app pages, site privacy and the guide index use English. PHTV and LunarV
use Vietnamese by default, with language links scoped to those app and legal pages:

- PHTV: `/PHTV/` (Vietnamese), `/en/PHTV/` (English).
- LunarV: `/LunarV/` (Vietnamese), `/en/LunarV/` (English), `/zh/LunarV/`
  (Simplified Chinese). Each also has translated `privacy.html` and `terms.html`.

PHTV typing tutorials are Vietnamese; general guides remain English. A guide card labels
its language when the article differs from the surrounding app page. There is no automatic
language detection or global selector. Other historical locale URLs redirect to their
canonical destinations, retaining query parameters and fragments when JavaScript is enabled.
The sitemap and application-page hreflang links advertise the available translations.

Run `node scripts/test-language.mjs` after building to check the routes and languages.
