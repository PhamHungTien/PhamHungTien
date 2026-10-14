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

export const collections = { legal };
