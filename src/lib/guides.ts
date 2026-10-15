import { getCollection, type CollectionEntry } from 'astro:content';

export type Guide = CollectionEntry<'guides'>;

export const GUIDES_PATH = '/huong-dan/';
export const guidePath = (slug: string) => `${GUIDES_PATH}${slug}/`;

/** Newest first; on the same day, guides with a video lead. */
export async function getGuides(): Promise<Guide[]> {
  const all = await getCollection('guides');
  return all.sort(
    (a, b) =>
      b.data.published.localeCompare(a.data.published) ||
      Number(Boolean(b.data.youtubeId)) - Number(Boolean(a.data.youtubeId)),
  );
}

/** About 200 words a minute, the usual pace for reading Vietnamese on screen. */
export function readingMinutes(guide: Guide): number {
  const words = (guide.body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

/** "2026-10-15" → "15/10/2026". */
export const formatDate = (iso: string) => iso.split('-').reverse().join('/');
