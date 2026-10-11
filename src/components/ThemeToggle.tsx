import { Moon, Sun } from 'lucide-react';
import type { Lang } from '../types';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle({ lang, className = '' }: { lang: Lang; className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const label =
    theme === 'dark'
      ? lang === 'vi'
        ? 'Bật giao diện sáng'
        : 'Use light mode'
      : lang === 'vi'
        ? 'Bật giao diện tối'
        : 'Use dark mode';
  return (
    <button
      type="button"
      className={`icon-button shared-theme-toggle theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={label}
    >
      {theme === 'dark' ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
