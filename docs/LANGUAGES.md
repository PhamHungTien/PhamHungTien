# Website languages

The home page, seven app pages, site privacy policy and guide collection have English and Vietnamese versions. LunarV also has a Simplified Chinese app page and Simplified Chinese legal documents. The language switcher links to translations of the page being read. Each version has a canonical URL and reciprocal `hreflang` links.

| Page            | English       | Vietnamese     | Simplified Chinese |
| --------------- | ------------- | -------------- | ------------------ |
| Home            | `/`           | `/vi/`         |                    |
| PHTV            | `/en/PHTV/`   | `/PHTV/`       |                    |
| LunarV          | `/en/LunarV/` | `/LunarV/`     | `/zh/LunarV/`      |
| Other apps      | `/<App>/`     | `/vi/<App>/`   |                    |
| Guide index     | `/guides/`    | `/huong-dan/`  |                    |
| Website privacy | `/privacy/`   | `/vi/privacy/` |                    |

Each app has a `privacy.html` and a `terms.html` under its localized app paths. The English and Vietnamese versions share the same coverage, including for apps with a Vietnamese-first URL. App and website legal pages remain publicly accessible and ask search engines to leave them out of search results.

## Guides

Write the English and Vietnamese versions as `src/content/guides/<slug>.en.md` and `src/content/guides/<slug>.vi.md`. Use the same slug in both files, give each version a localized title, description and body, and set its `lang` to match the file name. Run `npm run og` to generate each version's social card. Record an `updated` date when revising the published article's content.

Pad Code AI and vTTS guides can also carry `.ja.md` and `.es.md` versions. These articles are listed at `/ja/guides/` and `/es/guides/`. Article language links and sitemap alternates come from the published files. The Japanese and Spanish collections cover those two apps and link to the full English and Vietnamese collections.

New guides use `/guides/<slug>/` for English and `/huong-dan/<slug>/` for Vietnamese. Six original PHTV guides keep their Vietnamese articles at `/guides/<slug>/`. Their English versions use `/en/guides/<slug>/`. The older `/huong-dan/<slug>/` addresses for those PHTV guides still redirect to the Vietnamese articles.

Legacy routes use static redirect documents. The redirect script preserves the query string and fragment when JavaScript is available. `npm run test:language` checks the built routes, language switcher and redirects after `npm run build`.
