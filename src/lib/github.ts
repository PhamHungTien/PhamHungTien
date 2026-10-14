/**
 * Latest release download links, resolved at build time so the download buttons work
 * without JavaScript. The page refreshes them in the browser (scripts/install.ts),
 * so a release published after the last deploy is still picked up.
 */
export interface ReleaseLinks {
  version: string | null;
  releaseUrl: string;
  arm64: string | null;
  intel: string | null;
  universal: string | null;
}

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
  assets?: GitHubAsset[];
}

/** Shared with the browser script so both sides read release assets the same way. */
export function linksFromRelease(release: GitHubRelease): ReleaseLinks {
  const dmgs = (release.assets ?? []).filter((asset) => asset.name.endsWith('.dmg'));
  const find = (pattern: RegExp) =>
    dmgs.find((asset) => pattern.test(asset.name))?.browser_download_url ?? null;
  return {
    version: release.tag_name,
    releaseUrl: release.html_url,
    arm64: find(/-arm64\.dmg$/i),
    intel: find(/-(intel|x86_64)\.dmg$/i),
    universal: find(/^(?!.*-(arm64|intel|x86_64)\.dmg$).*\.dmg$/i),
  };
}

export const fallbackLinks = (repo: string): ReleaseLinks => ({
  version: null,
  releaseUrl: `https://github.com/${repo}/releases/latest`,
  arm64: null,
  intel: null,
  universal: null,
});

const cache = new Map<string, Promise<ReleaseLinks>>();

export function getReleaseLinks(repo: string): Promise<ReleaseLinks> {
  if (!cache.has(repo)) cache.set(repo, fetchReleaseLinks(repo));
  return cache.get(repo)!;
}

async function fetchReleaseLinks(repo: string): Promise<ReleaseLinks> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=20`, {
      headers,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const releases = (await response.json()) as GitHubRelease[];
    const latest = releases.find((release) => !release.draft && !release.prerelease) ?? releases[0];
    return latest ? linksFromRelease(latest) : fallbackLinks(repo);
  } catch (error) {
    console.warn(`[github] using fallback download links for ${repo}: ${(error as Error).message}`);
    return fallbackLinks(repo);
  }
}
