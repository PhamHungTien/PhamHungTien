/**
 * Marks the table-of-contents link for the section being read. Headings report through an
 * IntersectionObserver; a frame-throttled scroll check covers long jumps between them.
 * Links stay plain anchors without JavaScript.
 */
export function initToc(): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map((link) => [decodeURIComponent(link.hash.slice(1)), link]));
  const headings = [...byId.keys()]
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el);
  const visible = new Set<HTMLElement>();
  let current: HTMLAnchorElement | undefined;

  const mark = (link: HTMLAnchorElement | undefined) => {
    if (link === current) return;
    current?.removeAttribute('aria-current');
    link?.setAttribute('aria-current', 'true');
    current = link;
  };

  const update = () => {
    // The first heading on screen wins; between headings, the last one scrolled past.
    const onScreen = headings.find((heading) => visible.has(heading));
    const passed = headings.filter((heading) => heading.getBoundingClientRect().top < 120).pop();
    const active = onScreen ?? passed;
    mark(active ? byId.get(active.id) : undefined);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(el);
        else visible.delete(el);
      }
      update();
    },
    { rootMargin: '-80px 0px -55% 0px' },
  );
  headings.forEach((heading) => observer.observe(heading));

  let queued = false;
  addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    },
    { passive: true },
  );
}
