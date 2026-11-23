/** Paint one shared thumb behind a single selected option. The controls own their ARIA state. */
export function initSlidingThumb(group: HTMLElement) {
  const selected =
    ':scope > :is([aria-pressed="true"], [aria-selected="true"], [aria-current="page"], [aria-current="location"])';
  const move = (option = group.querySelector<HTMLElement>(selected)) => {
    if (!option?.offsetWidth || !option.offsetHeight) {
      delete group.dataset.thumbActive;
      return;
    }

    group.style.setProperty('--thumb-x', `${option.offsetLeft}px`);
    group.style.setProperty('--thumb-y', `${option.offsetTop}px`);
    group.style.setProperty('--thumb-w', `${option.offsetWidth}px`);
    group.style.setProperty('--thumb-h', `${option.offsetHeight}px`);
    if (group.dataset.thumbActive === undefined) {
      group.dataset.thumbActive = '';
      requestAnimationFrame(() => (group.dataset.thumbReady = ''));
    }
  };

  new MutationObserver(() => move()).observe(group, {
    subtree: true,
    attributes: true,
    attributeFilter: ['aria-pressed', 'aria-selected', 'aria-current'],
  });

  // A locale, a loaded font or larger text can change the options without resizing the track.
  const resized = new ResizeObserver(() => move());
  resized.observe(group);
  for (const option of group.children) resized.observe(option);
  move();
  return move;
}
