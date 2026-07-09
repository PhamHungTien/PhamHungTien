import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Lang } from '../types';
import { translate } from '../i18n';

const STORAGE_KEY = 'preferred_lang';

/**
 * The language the prerenderer emits. The first client render must match it or
 * hydration mismatches; the real preference is applied in an effect afterwards.
 */
export const SSR_LANG: Lang = 'vi';

export function detectLanguage(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'vi' || stored === 'en') return stored;

  return navigator.language?.toLowerCase().startsWith('vi') ? 'vi' : 'en';
}

export function useLanguage(initialLang: Lang = SSR_LANG) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    setLang(detectLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
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
    localStorage.setItem(STORAGE_KEY, nextLang);
    setLang(nextLang);
    window.dispatchEvent(new CustomEvent('langchange', { detail: nextLang }));
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  return useMemo(() => ({ lang, setLanguage, t }), [lang, setLanguage, t]);
}
