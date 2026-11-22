import type { App, AppSlug } from '../data/types';
import type { Locale } from '../i18n/locales';
import es from '../i18n/app-copy/es.json';
import ja from '../i18n/app-copy/ja.json';
import zh from '../i18n/app-copy/zh.json';

interface AppCopy {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  support: string;
  facts: { label: string; value: string }[];
  features: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  installSteps?: string[];
  tutorial?: { title: string; description: string; credit?: string };
}

const translations = { es, ja, zh } satisfies Record<
  Exclude<Locale, 'en' | 'vi'>,
  Record<AppSlug, AppCopy>
>;

export function getAppCopy(app: App, lang: Locale): AppCopy {
  if (lang === 'en' || lang === 'vi') {
    return {
      category: app.category[lang],
      title: app.title[lang],
      subtitle: app.subtitle[lang],
      description: app.description[lang],
      support: app.support[lang],
      facts: app.facts.map(({ label, value }) => ({ label: label[lang], value: value[lang] })),
      features: app.features.map(({ title, description }) => ({
        title: title[lang],
        description: description[lang],
      })),
      faq: (app.faq ?? []).map(({ question, answer }) => ({
        question: question[lang],
        answer: answer[lang],
      })),
      installSteps: app.install?.steps.map((step) => step[lang]),
      tutorial: app.tutorial && {
        title: app.tutorial.title[lang],
        description: app.tutorial.description[lang],
        credit: app.tutorial.credit?.[lang],
      },
    };
  }

  const copy: AppCopy = translations[lang][app.slug];
  if (
    copy.facts.length !== app.facts.length ||
    copy.features.length !== app.features.length ||
    copy.faq.length !== (app.faq?.length ?? 0) ||
    copy.installSteps?.length !== app.install?.steps.length ||
    Boolean(copy.tutorial) !== Boolean(app.tutorial) ||
    Boolean(copy.tutorial?.credit) !== Boolean(app.tutorial?.credit)
  ) {
    throw new Error(`${app.slug} [${lang}]: translated app copy does not match the source fields`);
  }
  return copy;
}
