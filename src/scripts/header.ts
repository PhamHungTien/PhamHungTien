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

function setTheme(theme: 'light' | 'dark') {
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies to this page.
  }
  applyThemeLabels();
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

  // Follow the system until the visitor makes a choice, and keep open tabs in sync.
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {}
    if (!stored) {
      root.dataset.theme = event.matches ? 'dark' : 'light';
      applyThemeLabels();
    }
  });
  window.addEventListener('storage', (event) => {
    if (event.key === 'theme' && (event.newValue === 'light' || event.newValue === 'dark')) {
      root.dataset.theme = event.newValue;
      applyThemeLabels();
    }
  });
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-nav]');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!toggle || !menu || !header) return;

  const setOpen = (open: boolean, restoreFocus = false) => {
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
  matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

function initHomeHeader() {
  if (root.dataset.home !== 'true') return;
  const update = () => {
    root.dataset.homeHeader = window.scrollY > 12 ? 'visible' : 'hidden';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('pageshow', update);
  update();
}

export function initHeader() {
  initHomeHeader();
  initTheme();
  initMenu();
}
