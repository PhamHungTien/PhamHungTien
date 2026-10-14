/**
 * App pages have two views: the overview (everything server-rendered) and the
 * Discussions board. The URL hash decides which one is shown, so #community links
 * keep working and the browser back button moves between them.
 */
const COMMUNITY_HASHES = new Set(['#community', '#qa', '#discussions']);

export function initAppTabs() {
  const overview = document.querySelector<HTMLElement>('[data-tab-panel="overview"]');
  const community = document.querySelector<HTMLElement>('[data-tab-panel="community"]');
  if (!overview || !community) return;

  const sync = () => {
    const hash = location.hash;
    const showCommunity = COMMUNITY_HASHES.has(hash);
    const changed = community.hidden === showCommunity;
    overview.hidden = showCommunity;
    community.hidden = !showCommunity;

    for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-tab]')) {
      const active = link.dataset.tab === (showCommunity ? 'community' : 'overview');
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }

    if (changed) {
      if (showCommunity || hash === '#overview' || hash === '') window.scrollTo({ top: 0 });
      else document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  };

  sync();
  window.addEventListener('hashchange', sync);
}
