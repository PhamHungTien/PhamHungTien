# Website languages

The home page and shared navigation support English, Vietnamese, French and Japanese.
`src/i18n/locales.ts` lists their names and codes. French/Japanese home interface text
and app previews are in `src/i18n/home-translations.ts`.

App detail pages and legal documents have independently scoped English/Vietnamese
translations (`Lang` and `Localized` in `src/data/types.ts`). French/Japanese home
pages explicitly label app detail links as English. On a page without a translation,
the picker offers the corresponding language's home page and labels that destination.
Do not add hreflang links for untranslated content.

On the unprefixed home URL `/`, a saved manual selection takes priority over the
browser's ordered language preferences. Regional codes such as `fr-CA` match the
supported base language. No match defaults to English. Explicit language paths and
app/legal deep links are never automatically redirected.

Manual choices are saved in localStorage. A `lang` query parameter on picker links
also prevents automatic detection from overriding an explicit English choice when
storage is blocked. Language switching retains query parameters and section anchors
when the same page is translated; a home-page fallback starts at the home page.

Validation:

```sh
npm run check
npm run build
npm run verify
node scripts/test-language.mjs
npm run format:check
```
