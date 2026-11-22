import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { GUIDE_LANGS } from './i18n/locales';

/**
 * Privacy policies and terms of use, one Markdown file per document:
 *   src/content/legal/<app-slug>/<privacy|terms>[.<lang>].md
 */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.iso.date(),
    lang: z.enum(['en', 'vi', 'zh']),
  }),
});

/** YAML turns bare dates into Date objects; keep guides' dates as ISO `YYYY-MM-DD` strings. */
const isoDate = z
  .union([z.string(), z.date()])
  .transform((d) => (typeof d === 'string' ? d : d.toISOString().slice(0, 10)))
  .pipe(z.iso.date());

const guides = defineCollection({
  loader: glob({
    pattern: `*.{${GUIDE_LANGS.join(',')}}.md`,
    base: './src/content/guides',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    lang: z.enum(GUIDE_LANGS),
    title: z.string(),
    description: z.string().min(50).max(170),
    published: isoDate,
    updated: isoDate.optional(),
    /** App slug the guide is about; links the guide and the app page to each other. */
    app: z.string().optional(),
    youtubeId: z.string().optional(),
    /** Short label for cards, e.g. "PHTV" or "Kiến thức". */
    topic: z.string(),
  }),
});

/** Site-wide pages written in Markdown, e.g. the website privacy policy (privacy.en.md). */
const site = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/site',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.iso.date(),
    lang: z.enum(['en', 'vi']),
  }),
});

export const collections = { legal, guides, site };
