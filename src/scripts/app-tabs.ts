/**
 * Keep the overview, Discussions board, and header selection in step with fragment
 * navigation and the section visible below the sticky header.
 */
const COMMUNITY_HASHES = new Set(['#community', '#qa', '#discussions']);

export function initAppTabs() {
  const overview = document.querySelector<HTMLElement>('[data-tab-panel="overview"]');
  const community = document.querySelector<HTMLElement>('[data-tab-panel="community"]');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!overview || !community || !header) return;

  const links = [
    ...header.querySelectorAll<HTMLAnchorElement>('[data-sliding-thumb] a[href^="#"]'),
  ];
  const hashes = new Set(links.map((link) => link.hash));
  // The reading order can differ from the order of the links in the navbar.
  const sections = [...overview.querySelectorAll<HTMLElement>('[id]')]
    .filter((section) => hashes.has(`#${section.id}`))
    .reverse();
  const targets = new Map(sections.map((section) => [`#${section.id}`, section]));
  targets.set('#overview', overview);
  targets.set('#community', community);

  let active = '';
  let frame = 0;
  let destination: { target: HTMLElement; until: number } | null = null;

  function mark(hash: string) {
    if (hash === active) return;
    active = hash;
    for (const link of links) {
      if (link.hash === hash) {
        link.setAttribute('aria-current', link.dataset.tab ? 'page' : 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }

  const headerOffset = () =>
    Math.max(
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0,
      header.getBoundingClientRect().bottom + 20,
    );

  function scrollPosition(target: HTMLElement, offset: number) {
    if (target === overview || target === community) return 0;
    const limit = document.documentElement.scrollHeight - innerHeight;
    return Math.max(0, Math.min(limit, target.getBoundingClientRect().top + scrollY - offset));
  }

  const readPosition = () => {
    frame = 0;
    if (overview.hidden) return;
    const offset = headerOffset();
    if (destination) {
      // Keep intermediate sections from stealing the selected pill during a smooth jump.
      const remaining = Math.abs(scrollY - scrollPosition(destination.target, offset));
      if (remaining > 3 && performance.now() < destination.until) return;
      destination = null;
    }
    const atBottom =
      scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
    const section = atBottom
      ? sections[0]
      : sections.find((element) => element.getBoundingClientRect().top <= offset + 5);
    mark(section ? `#${section.id}` : '#overview');
  };

  function queueRead() {
    if (!frame) frame = requestAnimationFrame(readPosition);
  }

  const sync = (hash: string, jump: boolean, focus = false) => {
    const showCommunity = COMMUNITY_HASHES.has(hash);
    const changed = community.hidden === showCommunity;
    overview.hidden = showCommunity;
    community.hidden = !showCommunity;

    const selected = showCommunity ? '#community' : hash || '#overview';
    const target = targets.get(selected);
    if (target) mark(selected);
    if (target && (jump || changed)) {
      const top = scrollPosition(target, headerOffset());
      destination = showCommunity ? null : { target, until: performance.now() + 1200 };
      window.scrollTo({ top, behavior: changed ? 'instant' : 'auto' });
      if (focus) {
        const heading = target.querySelector<HTMLElement>('h1, h2') ?? target;
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
    queueRead();
  };

  for (const link of links) {
    link.addEventListener('click', (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !targets.has(link.hash)
      )
        return;
      event.preventDefault();
      if (location.hash !== link.hash) history.pushState(history.state, '', link.hash);
      sync(link.hash, true, event.detail === 0);
    });
  }

  const release = () => {
    if (!destination) return;
    destination = null;
    queueRead();
  };
  window.addEventListener('scroll', queueRead, { passive: true });
  window.addEventListener('resize', queueRead);
  window.addEventListener('scrollend', release);
  window.addEventListener('wheel', release, { passive: true });
  window.addEventListener('pointerdown', release, { passive: true });
  window.addEventListener('hashchange', () => sync(location.hash, true));
  window.addEventListener('pageshow', () => sync(location.hash, false));
  sync(location.hash, targets.has(location.hash));
}
