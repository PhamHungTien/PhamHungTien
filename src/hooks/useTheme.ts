import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle('dark', theme === 'dark');
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', getComputedStyle(root).getPropertyValue('--glass-page').trim());
}

/** Shared SSR-safe theme behavior for the portfolio and PHTV. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const initial = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    applyTheme(initial);
    setTheme(initial);
    const sync = (event: StorageEvent) => {
      if (event.key !== 'theme' || (event.newValue !== 'light' && event.newValue !== 'dark'))
        return;
      applyTheme(event.newValue);
      setTheme(event.newValue);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Continue to work when the browser blocks persistent storage.
    }
  }, []);

  return { theme, toggleTheme };
}
