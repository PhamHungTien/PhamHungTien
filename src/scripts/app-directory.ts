/** Platform filter and search for the app list on the home page. Works on server-rendered rows. */
export function initAppDirectory() {
  const root = document.querySelector<HTMLElement>('[data-app-directory]');
  if (!root) return;

  const rows = [...root.querySelectorAll<HTMLElement>('[data-app]')];
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-platform]')];
  const search = root.querySelector<HTMLInputElement>('[data-app-search]');
  const count = root.querySelector<HTMLElement>('[data-app-count]');
  const empty = root.querySelector<HTMLElement>('[data-app-empty]');
  const clear = root.querySelector<HTMLButtonElement>('[data-app-clear]');
  const reset = root.querySelector<HTMLButtonElement>('[data-app-reset]');
  const tools = root.querySelector<HTMLElement>('[data-app-tools]');
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .toLowerCase();
  const searchable = new Map(rows.map((row) => [row, normalize(row.dataset.search ?? '')]));
  const params = new URL(window.location.href).searchParams;
  let platform = params.get('platform') ?? '';
  if (!buttons.some((button) => button.dataset.platform === platform)) platform = '';
  if (search) search.value = params.get('q') ?? '';
  tools?.removeAttribute('data-pending');

  const apply = () => {
    const query = normalize(search?.value ?? '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const shown: HTMLElement[] = [];
    for (const row of rows) {
      const match =
        (!platform || (row.dataset.platforms ?? '').split(' ').includes(platform)) &&
        query.every((term) => searchable.get(row)!.includes(term));
      row.hidden = !match;
      if (match) shown.push(row);
    }
    const visible = shown.length;
    // The last cards of an uneven row span it (see AppDirectory.astro), whatever the filter.
    for (const row of rows) {
      delete row.dataset.wide;
      delete row.dataset.half;
      delete row.dataset.odd;
    }
    if (visible > 1) {
      if (visible % 3 === 1) shown[visible - 1].dataset.wide = '';
      if (visible % 3 === 2) shown.slice(-2).forEach((row) => (row.dataset.half = ''));
      if (visible % 2 === 1) shown[visible - 1].dataset.odd = '';
    }
    for (const button of buttons)
      button.setAttribute('aria-pressed', String(button.dataset.platform === platform));
    if (empty) empty.hidden = visible > 0;
    if (reset) reset.hidden = !platform && !search?.value;
    const url = new URL(window.location.href);
    if (platform) url.searchParams.set('platform', platform);
    else url.searchParams.delete('platform');
    const term = search?.value.trim() ?? '';
    if (term) url.searchParams.set('q', term);
    else url.searchParams.delete('q');
    if (url.href !== window.location.href)
      window.history.replaceState(window.history.state, '', url);
    if (count)
      count.textContent = `${visible} ${visible === 1 ? count.dataset.one : count.dataset.other}`;
  };

  // Sliding thumb behind the pressed platform button.
  const segmented = root.querySelector<HTMLElement>('.segmented');
  const moveThumb = () => {
    const pressed = buttons.find((button) => button.dataset.platform === platform);
    if (!segmented || !pressed) return;
    segmented.style.setProperty('--thumb-x', `${pressed.offsetLeft}px`);
    segmented.style.setProperty('--thumb-w', `${pressed.offsetWidth}px`);
  };
  // On narrow screens the options scroll sideways; mark which edges have more to show.
  const markOverflow = () => {
    if (!segmented) return;
    const end = segmented.scrollWidth - segmented.clientWidth - segmented.scrollLeft > 4;
    const start = segmented.scrollLeft > 4;
    if (start || end) segmented.dataset.more = start && end ? 'both' : start ? 'start' : 'end';
    else delete segmented.dataset.more;
  };
  if (segmented) {
    segmented.addEventListener('scroll', markOverflow, { passive: true });
    new ResizeObserver(markOverflow).observe(segmented);
    segmented.classList.add('has-thumb');
    moveThumb();
    requestAnimationFrame(() => segmented.classList.add('is-ready'));
    new ResizeObserver(moveThumb).observe(segmented);
    document.fonts?.ready.then(moveThumb);
  }

  // Filter changes animate as a view transition where supported: rows glide into place.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => {
    if (
      !document.startViewTransition ||
      reduce.matches ||
      document.documentElement.dataset.motion === 'off'
    ) {
      apply();
      moveThumb();
      return;
    }
    rows.forEach((row, index) => {
      row.style.viewTransitionName = `app-row-${index}`;
      row.style.setProperty('view-transition-class', 'app-row-vt');
    });
    moveThumb();
    const transition = document.startViewTransition(apply);
    transition.finished.finally(() => {
      for (const row of rows) {
        row.style.viewTransitionName = '';
        row.style.removeProperty('view-transition-class');
      }
    });
  };

  for (const button of buttons) {
    button.addEventListener('click', () => {
      platform = button.dataset.platform ?? '';
      update();
      button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }
  // Typing filters instantly: a transition per keystroke would feel sluggish.
  search?.addEventListener('input', apply);
  const clearFilters = () => {
    platform = '';
    if (search) search.value = '';
    update();
    search?.focus({ preventScroll: true });
  };
  clear?.addEventListener('click', clearFilters);
  reset?.addEventListener('click', clearFilters);
  apply();
}
