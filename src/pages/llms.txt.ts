import type { APIRoute } from 'astro';
import { apps } from '../data/apps';
import { LANGS } from '../data/types';
import { LANGUAGE_NAMES } from '../i18n/locales';
import { SITE } from '../data/site';
import { platformList } from '../data/platforms';
import { appPath, homePath, legalPath } from '../lib/routes';
import { absolute } from '../lib/seo';
import { getGuides, guideUrl } from '../lib/guides';
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
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} (${SITE.asciiName}) builds apps for Apple devices and Android, with an emphasis on offline features and on-device processing.`,
    '',
    `Contact: ${SITE.email}`,
    '',
    ...sections.flat(),
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
