import { useCallback, useEffect } from 'react';
import { translate } from '../i18n';

/** The portfolio and non-PHTV applications are published in English. */
export const SSR_LANG = 'en' as const;

export function useLanguage() {
  useEffect(() => {
    document.documentElement.lang = SSR_LANG;
  }, []);
  const t = useCallback((key: string) => translate(SSR_LANG, key), []);
  return { lang: SSR_LANG, t };
}
