import type { APIRoute } from 'astro';
import { apps } from '../data/apps';
import { SITE } from '../data/site';
import { platformList } from '../data/platforms';
import { appPath, legalPath } from '../lib/routes';
import { absolute } from '../lib/seo';
import { getGuides, guidePath } from '../lib/guides';

/**
 * /llms.txt (https://llmstxt.org): a short Markdown map of the site for AI assistants and
 * AI search, generated from the same data as the pages so it never goes stale.
 */
export const GET: APIRoute = async () => {
  const guides = await getGuides();
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} (${SITE.asciiName}) is an independent developer from Vietnam who builds private, offline-first apps for iPhone, iPad and Mac.`,
    '',
    `Contact: ${SITE.email}.`,
    '',
    '## Apps',
    '',
    ...apps.map((app) => {
      const platforms = app.requirements ?? platformList(app.platforms).join(', ');
      return `- [${app.name}](${absolute(appPath(app))}): ${app.description.en} (${platforms})`;
    }),
    '',
    '## Guides',
    '',
    ...guides.map(
      (g) => `- [${g.data.title}](${absolute(guidePath(g.id))}): ${g.data.description}`,
    ),
    '',
    '## Profiles',
    '',
    `- [GitHub](${SITE.github})`,
    `- [YouTube](${SITE.youtube})`,
    `- [LinkedIn](${SITE.linkedin})`,
    `- [Facebook](${SITE.facebook})`,
    '',
    '## Optional',
    '',
    ...apps.map((app) => `- [${app.name} privacy policy](${absolute(legalPath(app, 'privacy'))})`),
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
