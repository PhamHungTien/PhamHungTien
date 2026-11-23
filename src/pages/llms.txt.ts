import type { APIRoute } from 'astro';
import { apps } from '../data/apps';
import { LOCALES, LANGUAGE_NAMES } from '../i18n/locales';
import { SITE } from '../data/site';
import { socialProfiles } from '../data/socials';
import { platformList } from '../data/platforms';
import { appPath, homePath, legalPath } from '../lib/routes';
import { absolute } from '../lib/seo';
import { getGuides, guidesPath, guideUrl } from '../lib/guides';
import { t } from '../lib/i18n';
import { getAppCopy } from '../lib/app-copy';
import { sitePrivacyPath } from '../lib/sitePages';

export const GET: APIRoute = async () => {
  const sections = await Promise.all(
    LOCALES.map(async (lang) => {
      const guides = await getGuides(lang);
      return [
        `## ${LANGUAGE_NAMES[lang]}`,
        '',
        `- [${t(lang, 'nav.home')}](${absolute(homePath(lang))})`,
        ...apps.map((app) => {
          const platforms = app.requirements ?? platformList(app.platforms).join(', ');
          return `- [${app.name}](${absolute(appPath(app, lang))}): ${getAppCopy(app, lang).description} (${platforms})`;
        }),
        '',
        `### ${t(lang, 'nav.guides')}`,
        '',
        `- [${t(lang, 'guides.all')}](${absolute(guidesPath(lang))})`,
        ...guides.map(
          (guide) =>
            `- [${guide.data.title}](${absolute(guideUrl(guide))}): ${guide.data.description}`,
        ),
        '',
        `### ${t(lang, 'legal.privacy')}`,
        '',
        `- [${t(lang, 'footer.privacy')}](${absolute(sitePrivacyPath(lang))})`,
        ...apps.map((app) => `- [${app.name}](${absolute(legalPath(app, 'privacy', lang))})`),
        '',
      ];
    }),
  );
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} (${SITE.asciiName}) builds apps for Apple devices and Android, with an emphasis on offline features and on-device processing.`,
    '',
    `Contact: ${SITE.email}`,
    '',
    ...sections.flat(),
    '## Profiles',
    '',
    ...socialProfiles
      .filter(({ id }) => id !== 'email')
      .map(({ label, href }) => `- [${label}](${href})`),
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
