/**
 * Device tabs and row paging for StoreGallery.astro. The markup works without this
 * script (all rows visible, native horizontal scrolling); this adds the tab pattern
 * (arrow keys, roving tabindex) and previous/next buttons for pointer devices.
 */
export function initStoreGallery(): void {
  for (const root of document.querySelectorAll<HTMLElement>('[data-store-gallery]')) {
    const tablist = root.querySelector<HTMLElement>('[data-gallery-tabs]');
    const tabs = [...(tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')!)!);

    // Previous / next paging, only where hovering is possible (touch scrolls natively).
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    function updateNav(scope: Element) {
      const row = scope.querySelector<HTMLElement>('[data-shots]');
      const prev = scope.querySelector<HTMLButtonElement>('[data-shots-prev]');
      const next = scope.querySelector<HTMLButtonElement>('[data-shots-next]');
      if (!row || !prev || !next) return;
      const overflow = row.scrollWidth - row.clientWidth > 4;
      prev.hidden = next.hidden = !(fine.matches && overflow);
      prev.disabled = row.scrollLeft < 4;
      next.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
    }

    if (tablist && tabs.length > 1) {
      root.dataset.enhanced = '';
      tablist.hidden = false;
      panels.forEach((panel, index) => {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tabs[index].id);
      });
      const select = (index: number, focus = false) => {
        tabs.forEach((tab, i) => {
          const active = i === index;
          tab.setAttribute('aria-selected', String(active));
          tab.tabIndex = active ? 0 : -1;
          panels[i].hidden = !active;
        });
        if (focus) tabs[index].focus();
        updateNav(panels[index]);
      };
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => select(index));
        tab.addEventListener('keydown', (event) => {
          const last = tabs.length - 1;
          const next =
            event.key === 'ArrowRight'
              ? index === last
                ? 0
                : index + 1
              : event.key === 'ArrowLeft'
                ? index === 0
                  ? last
                  : index - 1
                : event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? last
                    : -1;
          if (next < 0) return;
          event.preventDefault();
          select(next, true);
        });
      });
      select(0);
    }

    for (const panel of root.querySelectorAll<HTMLElement>('.store-gallery__panel')) {
      const row = panel.querySelector<HTMLElement>('[data-shots]');
      if (!row) continue;
      const page = (direction: number) =>
        row.scrollBy({ left: direction * row.clientWidth * 0.85, behavior: 'smooth' });
      panel.querySelector('[data-shots-prev]')?.addEventListener('click', () => page(-1));
      panel.querySelector('[data-shots-next]')?.addEventListener('click', () => page(1));
      let queued = false;
      row.addEventListener(
        'scroll',
        () => {
          if (queued) return;
          queued = true;
          requestAnimationFrame(() => {
            queued = false;
            updateNav(panel);
          });
        },
        { passive: true },
      );
      new ResizeObserver(() => updateNav(panel)).observe(row);
    }
    fine.addEventListener('change', () =>
      root.querySelectorAll('.store-gallery__panel').forEach(updateNav),
    );
  }
}
