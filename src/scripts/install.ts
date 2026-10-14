import { linksFromRelease, type ReleaseLinks } from '../lib/github';

const CACHE_KEY = 'release-links:v1';
const CACHE_MS = 10 * 60 * 1000;

/** Refresh build-time download links with the newest GitHub release. */
async function latest(repo: string): Promise<ReleaseLinks | null> {
  try {
    const cached = JSON.parse(localStorage.getItem(`${CACHE_KEY}:${repo}`) ?? 'null');
    if (cached && Date.now() - cached.at < CACHE_MS) return cached.links;
  } catch {}
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=20`);
    if (!response.ok) return null;
    const releases = await response.json();
    const release =
      releases.find((r: { draft: boolean; prerelease: boolean }) => !r.draft && !r.prerelease) ??
      releases[0];
    if (!release) return null;
    const links = linksFromRelease(release);
    try {
      localStorage.setItem(`${CACHE_KEY}:${repo}`, JSON.stringify({ at: Date.now(), links }));
    } catch {}
    return links;
  } catch {
    return null;
  }
}

function initCopy() {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
    const label = button.getAttribute('aria-label') ?? '';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? '');
        button.setAttribute('aria-label', button.dataset.copied ?? label);
        button.dataset.state = 'copied';
        setTimeout(() => {
          button.setAttribute('aria-label', label);
          delete button.dataset.state;
        }, 2000);
      } catch {
        // Clipboard access can be denied; the command stays visible to copy by hand.
      }
    });
  }
}

export function initInstall() {
  initCopy();
  const section = document.querySelector<HTMLElement>('[data-install]');
  const repo = section?.dataset.install;
  if (!section || !repo) return;

  // Defer the API call until the section is near the viewport.
  const observer = new IntersectionObserver(
    async (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      const links = await latest(repo);
      if (!links) return;
      const set = (arch: string, href: string | null) => {
        const anchor = section.querySelector<HTMLAnchorElement>(`[data-install-arch="${arch}"]`);
        if (anchor && href) anchor.href = href;
      };
      set('arm64', links.arm64 ?? links.universal ?? links.releaseUrl);
      set('intel', links.intel ?? links.universal ?? links.releaseUrl);
      const release = section.querySelector<HTMLAnchorElement>('[data-install-release]');
      if (release) release.href = links.releaseUrl;
      const version = section.querySelector<HTMLElement>('[data-install-version]');
      if (version && links.version) version.textContent = `· ${links.version}`;
    },
    { rootMargin: '400px' },
  );
  observer.observe(section);
}
