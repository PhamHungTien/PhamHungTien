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
  let platform = '';

  const apply = () => {
    const query = (search?.value ?? '').trim().toLocaleLowerCase();
    let visible = 0;
    for (const row of rows) {
      const match =
        (!platform || (row.dataset.platforms ?? '').split(' ').includes(platform)) &&
        (!query || (row.dataset.search ?? '').includes(query));
      row.hidden = !match;
      if (match) visible++;
    }
    for (const button of buttons)
      button.setAttribute('aria-pressed', String(button.dataset.platform === platform));
    if (empty) empty.hidden = visible > 0;
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
  if (segmented) {
    segmented.classList.add('has-thumb');
    moveThumb();
    requestAnimationFrame(() => segmented.classList.add('is-ready'));
    new ResizeObserver(moveThumb).observe(segmented);
    document.fonts?.ready.then(moveThumb);
  }

  // Filter changes animate as a view transition where supported: rows glide into place.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => {
    if (!document.startViewTransition || reduce.matches) {
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
    });
  }
  // Typing filters instantly: a transition per keystroke would feel sluggish.
  search?.addEventListener('input', apply);
  clear?.addEventListener('click', () => {
    platform = '';
    if (search) search.value = '';
    update();
  });
}
