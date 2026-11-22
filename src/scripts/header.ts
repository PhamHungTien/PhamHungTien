/** Theme toggle and the mobile menu. Imported once by Header.astro. */

const root = document.documentElement;

function applyThemeLabels() {
  const dark = root.dataset.theme === 'dark';
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
    button.setAttribute(
      'aria-label',
      (dark ? button.dataset.labelLight : button.dataset.labelDark) ?? '',
    );
  }
}

/** Browser chrome (address bar, overscroll) matches the page background. */
const THEME_COLOR = { light: '#f3f5f8', dark: '#000000' } as const;

function applyTheme(theme: 'light' | 'dark') {
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  applyThemeLabels();
}

function setTheme(theme: 'light' | 'dark') {
  applyTheme(theme);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies to this page.
  }
}

/** Switches theme; where supported, the new theme grows as a circle out of the toggle. */
function switchTheme(origin: HTMLElement) {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  if (
    !document.startViewTransition ||
    root.dataset.motion === 'off' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    setTheme(next);
    return;
  }
  const { left, top, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  root.style.setProperty('--vt-x', `${x}px`);
  root.style.setProperty('--vt-y', `${y}px`);
  root.style.setProperty(
    '--vt-r',
    `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`,
  );
  root.classList.add('theme-switching');
  const transition = document.startViewTransition(() => setTheme(next));
  transition.finished.finally(() => root.classList.remove('theme-switching'));
}

function initTheme() {
  applyThemeLabels();
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
    button.addEventListener('click', () => switchTheme(button));
  }

  // Dark is the default; a saved choice wins and stays in sync across open tabs.
  window.addEventListener('storage', (event) => {
    if (event.key === 'theme' && (event.newValue === 'light' || event.newValue === 'dark')) {
      applyTheme(event.newValue);
    }
  });
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-nav]');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!toggle || !menu || !header) return;
  const languageMenu = header.querySelector<HTMLDetailsElement>('[data-language-switcher]');

  const setOpen = (open: boolean, restoreFocus = false) => {
    if (open && languageMenu) languageMenu.open = false;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '',
    );
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    if (!open && restoreFocus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false, true);
  });
  document.addEventListener('pointerdown', (event) => {
    if (menu.classList.contains('is-open') && !header.contains(event.target as Node))
      setOpen(false);
  });
  languageMenu?.addEventListener('toggle', () => {
    if (languageMenu.open) setOpen(false);
  });
  window.addEventListener('resize', () => {
    if (menu.classList.contains('is-open') && !toggle.getClientRects().length) setOpen(false);
  });
}

function initLanguageMenu() {
  const menu = document.querySelector<HTMLDetailsElement>('[data-language-switcher]');
  if (!menu) return;

  menu.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !menu.open) return;
    event.stopPropagation();
    menu.open = false;
    menu.querySelector('summary')?.focus({ preventScroll: true });
  });
  document.addEventListener('pointerdown', (event) => {
    if (!menu.contains(event.target as Node)) menu.open = false;
  });
}

export function initHeader() {
  initTheme();
  initMenu();
  initLanguageMenu();
}
