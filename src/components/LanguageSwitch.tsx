import type { Lang } from '../types';

interface LanguageSwitchProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

export function LanguageSwitch({ lang, onChange }: LanguageSwitchProps) {
  return (
    <div className="language-switch" aria-label="Language">
      <button
        type="button"
        className={lang === 'vi' ? 'is-active' : ''}
        onClick={() => onChange('vi')}
        aria-pressed={lang === 'vi'}
      >
        VI
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        onClick={() => onChange('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  );
}
