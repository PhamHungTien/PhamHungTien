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

  for (const button of buttons) {
    button.addEventListener('click', () => {
      platform = button.dataset.platform ?? '';
      apply();
    });
  }
  search?.addEventListener('input', apply);
  clear?.addEventListener('click', () => {
    platform = '';
    if (search) search.value = '';
    apply();
  });
}
