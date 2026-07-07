import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Lang } from '../types';
import { translate } from '../i18n';

const STORAGE_KEY = 'preferred_lang';

function getInitialLanguage(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'vi' || stored === 'en') return stored;

  const browser = navigator.language || '';
  return browser.toLowerCase().startsWith('vi') ? 'vi' : 'en';
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }, [lang]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && (event.newValue === 'vi' || event.newValue === 'en')) {
        setLang(event.newValue);
      }
    };

    const handleLangChange = (event: Event) => {
      const nextLang = (event as CustomEvent).detail;
      if (nextLang === 'vi' || nextLang === 'en') setLang(nextLang);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('langchange', handleLangChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('langchange', handleLangChange);
    };
  }, []);

  const setLanguage = useCallback((nextLang: Lang) => {
    setLang(nextLang);
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  return useMemo(() => ({ lang, setLanguage, t }), [lang, setLanguage, t]);
}
