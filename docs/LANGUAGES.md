# Website languages

The home page, seven app pages, guide library, website privacy policy, and app policies and terms are available in English, Vietnamese, Japanese, Spanish, and Simplified Chinese. The single language menu in the site header opens the equivalent page in the selected language. Each version has a canonical URL and reciprocal `hreflang` links.

| Page            | English       | Vietnamese     | Japanese, Spanish, Simplified Chinese |
| --------------- | ------------- | -------------- | ------------------------------------- |
| Home            | `/`           | `/vi/`         | `/<lang>/`                            |
| PHTV            | `/en/PHTV/`   | `/PHTV/`       | `/<lang>/PHTV/`                       |
| LunarV          | `/en/LunarV/` | `/LunarV/`     | `/<lang>/LunarV/`                     |
| Other apps      | `/<App>/`     | `/vi/<App>/`   | `/<lang>/<App>/`                      |
| Guide index     | `/guides/`    | `/huong-dan/`  | `/<lang>/guides/`                     |
| Website privacy | `/privacy/`   | `/vi/privacy/` | `/<lang>/privacy/`                    |

The additional language codes are `ja`, `es`, and `zh`. App source strings are in `src/data/apps/`. Additional app translations are in `src/i18n/app-copy/`. For each app, keep the translated facts, features, FAQs, and installation steps in source order. Localized store screenshots are used when available, with the English store artwork as a fallback.

Each app has a `privacy.html` and `terms.html` under its localized app paths. App and website legal pages are public and use `noindex, follow`. The sitemap lists the home, app, guide index, and guide pages.

## Guides

Write each translation as `src/content/guides/<slug>.<lang>.md`, with a localized title, description, and body. Use the same slug in all versions and set `lang` to match the file name. Run `npm run og` to generate each version's social card. Record an `updated` date when revising published content.

English guides generally use `/guides/<slug>/`, and Vietnamese guides use `/huong-dan/<slug>/`. Six original PHTV guides keep the Vietnamese articles at `/guides/<slug>/` and the English translations at `/en/guides/<slug>/`. Their older `/huong-dan/<slug>/` addresses redirect to the Vietnamese articles. Japanese, Spanish, and Simplified Chinese guides use `/<lang>/guides/<slug>/`.

Legacy routes use static redirect documents. With JavaScript available, redirects preserve the query string and fragment. Run `npm run verify` and `npm run test:language` after `npm run build` to verify coverage, canonical URLs, navigation, and redirects.
