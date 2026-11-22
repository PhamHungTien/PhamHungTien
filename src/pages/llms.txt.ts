import type { APIRoute } from 'astro';
import { apps } from '../data/apps';
import { LANGS } from '../data/types';
import { GUIDE_LANGS, LANGUAGE_NAMES } from '../i18n/locales';
import { SITE } from '../data/site';
import { platformList } from '../data/platforms';
import { appPath, homePath, legalPath } from '../lib/routes';
import { absolute } from '../lib/seo';
import { getGuides, guidesPath, guideUrl } from '../lib/guides';
import { t } from '../lib/i18n';
import { sitePrivacyPath } from '../lib/sitePages';

export const GET: APIRoute = async () => {
  const sections = await Promise.all(
    LANGS.map(async (lang) => {
      const guides = await getGuides(lang);
      const vi = lang === 'vi';
      return [
        `## ${LANGUAGE_NAMES[lang]}`,
        '',
        `- [${vi ? 'Trang chủ' : 'Home'}](${absolute(homePath(lang))})`,
        ...apps.map((app) => {
          const platforms = app.requirements ?? platformList(app.platforms).join(', ');
          return `- [${app.name}](${absolute(appPath(app, lang))}): ${app.description[lang]} (${platforms})`;
        }),
        '',
        `### ${vi ? 'Hướng dẫn' : 'Guides'}`,
        '',
        ...guides.map(
          (guide) =>
            `- [${guide.data.title}](${absolute(guideUrl(guide))}): ${guide.data.description}`,
        ),
        '',
        `### ${vi ? 'Quyền riêng tư' : 'Privacy'}`,
        '',
        `- [${vi ? 'Chính sách quyền riêng tư của website' : 'Website Privacy Policy'}](${absolute(sitePrivacyPath(lang))})`,
        ...apps.map((app) => `- [${app.name}](${absolute(legalPath(app, 'privacy', lang))})`),
        '',
      ];
    }),
  );
  const additionalGuides = await Promise.all(
    GUIDE_LANGS.filter((lang) => lang !== 'en' && lang !== 'vi').map(async (lang) => [
      `## ${LANGUAGE_NAMES[lang]}`,
      '',
      `- [${t(lang, 'nav.guides')}](${absolute(guidesPath(lang))})`,
      ...(await getGuides(lang)).map(
        (guide) =>
          `- [${guide.data.title}](${absolute(guideUrl(guide))}): ${guide.data.description}`,
      ),
      '',
    ]),
  );
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} (${SITE.asciiName}) builds apps for Apple devices and Android, with an emphasis on offline features and on-device processing.`,
    '',
    `Contact: ${SITE.email}`,
    '',
    ...sections.flat(),
    ...additionalGuides.flat(),
    '## 简体中文',
    '',
    `- [LunarV](${absolute('/zh/LunarV/')})`,
    '',
    '## Profiles',
    '',
    `- [GitHub](${SITE.github})`,
    `- [YouTube](${SITE.youtube})`,
    `- [LinkedIn](${SITE.linkedin})`,
    `- [Facebook](${SITE.facebook})`,
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
