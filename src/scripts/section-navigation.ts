/**
 * Keep the header selection in step with the section visible below the sticky header.
 * App pages also switch between the overview and Discussions when the fragment changes.
 */
const COMMUNITY_HASHES = new Set(['#community', '#qa', '#discussions']);
const SCROLL_KEYS = new Set([' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End']);
const DESTINATION_WINDOW = 1200;

export function initSectionNavigation() {
  const overview = document.querySelector<HTMLElement>('[data-tab-panel="overview"]');
  const community = document.querySelector<HTMLElement>('[data-tab-panel="community"]');
  const content = overview ?? document.querySelector('main');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!content || !header) return;

  const links = [
    ...header.querySelectorAll<HTMLAnchorElement>('[data-sliding-thumb] a[href^="#"]'),
  ];
  const hashes = new Set(links.map((link) => link.hash));
  // The reading order can differ from the order of the links in the navbar.
  const sections = [...content.querySelectorAll<HTMLElement>('[id]')]
    .filter((section) => hashes.has(`#${section.id}`))
    .reverse();
  const targets = new Map(sections.map((section) => [`#${section.id}`, section]));
  if (overview) targets.set('#overview', overview);
  if (community) targets.set('#community', community);
  const start = overview ? '#overview' : '';

  let active = '';
  let frame = 0;
  let destination: { target: HTMLElement; until: number } | null = null;
  let stopInitialAlignment: (() => void) | undefined;

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
    if (overview?.hidden) return;
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
    mark(section ? `#${section.id}` : start);
  };

  function queueRead() {
    if (!frame) frame = requestAnimationFrame(readPosition);
  }

  const sync = (hash: string, behavior?: ScrollBehavior, focus = false) => {
    const showCommunity = !!community && COMMUNITY_HASHES.has(hash);
    const changed = community?.hidden === showCommunity;
    if (overview && community) {
      overview.hidden = showCommunity;
      community.hidden = !showCommunity;
    }

    const selected = showCommunity ? '#community' : hash || start;
    const target = targets.get(selected);
    if (target) mark(selected);
    if (target && (behavior || changed)) {
      const top = scrollPosition(target, headerOffset());
      destination = showCommunity
        ? null
        : { target, until: performance.now() + DESTINATION_WINDOW };
      window.scrollTo({ top, behavior: changed ? 'instant' : behavior });
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
      stopInitialAlignment?.();
      if (location.hash !== link.hash) history.pushState(history.state, '', link.hash);
      sync(link.hash, 'auto', event.detail === 0);
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
  window.addEventListener(
    'wheel',
    () => {
      stopInitialAlignment?.();
      release();
    },
    { passive: true },
  );
  window.addEventListener(
    'pointerdown',
    (event) => {
      stopInitialAlignment?.();
      if (event.target instanceof Node && !header.contains(event.target)) release();
    },
    { passive: true },
  );
  window.addEventListener('keydown', (event) => {
    if (!event.defaultPrevented && SCROLL_KEYS.has(event.key)) stopInitialAlignment?.();
  });
  window.addEventListener('hashchange', () => {
    stopInitialAlignment?.();
    sync(location.hash, 'auto');
  });
  window.addEventListener('pageshow', () => sync(location.hash));

  const initialHash = location.hash;
  const initialTarget = targets.get(initialHash);
  sync(initialHash, initialTarget ? 'instant' : undefined);

  if (initialTarget && initialTarget !== overview && initialTarget !== community) {
    // Fonts and deferred sections above a deep link can move it after the first scroll.
    const observer = new ResizeObserver(() => {
      if (Math.abs(scrollY - scrollPosition(initialTarget, headerOffset())) > 3)
        sync(initialHash, 'instant');
    });
    const timeout = window.setTimeout(() => stopInitialAlignment?.(), DESTINATION_WINDOW);
    stopInitialAlignment = () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      stopInitialAlignment = undefined;
    };
    observer.observe(content);
  }
}
