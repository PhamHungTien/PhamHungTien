import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Privacy policies and terms of use, one Markdown file per document:
 *   src/content/legal/<app-slug>/<privacy|terms>.md          (English)
 *   src/content/legal/<app-slug>/<privacy|terms>.<lang>.md   (bilingual apps)
 */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string(),
    lang: z.enum(['en', 'vi']),
  }),
});

/**
 * Guides: English except PHTV tutorials, served at /guides/<slug>/.
 * Images live in src/assets/guides and are referenced with relative paths.
 */
/** YAML turns bare dates into Date objects; keep guides' dates as ISO `YYYY-MM-DD` strings. */
const isoDate = z
  .union([z.string(), z.date()])
  .transform((d) => (typeof d === 'string' ? d : d.toISOString().slice(0, 10)));

const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(50).max(170),
    titleEn: z.string().optional(),
    titleVi: z.string().optional(),
    descriptionEn: z.string().optional(),
    descriptionVi: z.string().optional(),
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
    updated: z.string(),
    lang: z.enum(['en', 'vi']),
  }),
});

export const collections = { legal, guides, site };
