import { getCollection, type CollectionEntry } from 'astro:content';
import type { App, Lang } from '../data/types';
import { apps, defaultLangOf, legalLangsOf } from '../data/apps';
import type { LegalKind } from './routes';

export interface LegalDocument {
  app: App;
  kind: LegalKind;
  lang: Lang;
  entry: CollectionEntry<'legal'>;
}

/** "src/content/legal/phtv/privacy.vi.md" -> { slug: "phtv", kind: "privacy" } */
function parsePath(filePath: string) {
  const [slug, file] = filePath.split('/').slice(-2);
  return { slug, kind: file.split('.')[0] };
}

/**
 * Every legal document. Fails the build when a document is missing, or when the
 * languages on disk disagree with the app's `legalLangs`.
 */
export async function getLegalDocuments(): Promise<LegalDocument[]> {
  const entries = await getCollection('legal');
  const documents: LegalDocument[] = [];
  for (const app of apps) {
    for (const kind of ['privacy', 'terms'] as const) {
      const variants = entries.filter((entry) => {
        const parsed = parsePath(entry.filePath ?? '');
        return parsed.slug === app.slug && parsed.kind === kind;
      });
      const found = variants.map((entry) => entry.data.lang).sort();
      const expected = [...legalLangsOf(app)].sort();
      if (found.join() !== expected.join())
        throw new Error(
          `${app.slug}/${kind}: found languages [${found}] but expected [${expected}]`,
        );
      for (const entry of variants) documents.push({ app, kind, lang: entry.data.lang, entry });
    }
  }
  return documents;
}

export const isDefaultLegal = (doc: LegalDocument) => doc.lang === defaultLangOf(doc.app);
