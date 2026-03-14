import { useState, useEffect } from 'react';

export interface GitHubData {
  downloadUrl: string;
  releaseUrl: string;
  arm64DownloadUrl: string | null;
  intelDownloadUrl: string | null;
  universalDownloadUrl: string | null;
  hasSplitDownloads: boolean;
  version: string;
  totalDownloads: string;
  loading: boolean;
}

const CACHE_KEY = 'phtv_releases_data_v5';
const CACHE_DURATION = 600000; // 10 minutes

export const useGitHubData = (): GitHubData => {
  const [data, setData] = useState<GitHubData>({
    downloadUrl: "https://github.com/PhamHungTien/PHTV/releases/latest",
    releaseUrl: "https://github.com/PhamHungTien/PHTV/releases/latest",
    arm64DownloadUrl: null,
    intelDownloadUrl: null,
    universalDownloadUrl: null,
    hasSplitDownloads: false,
    version: "v1.0.0",
    totalDownloads: "0",
    loading: true,
  });

  useEffect(() => {
    const fetchReleases = async () => {
      const now = Date.now();
      
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (now - parsed.timestamp < CACHE_DURATION) {
            setData({
              downloadUrl: parsed.url,
              releaseUrl: parsed.releaseUrl ?? parsed.url,
              arm64DownloadUrl: parsed.arm64DownloadUrl ?? null,
              intelDownloadUrl: parsed.intelDownloadUrl ?? null,
              universalDownloadUrl: parsed.universalDownloadUrl ?? null,
              hasSplitDownloads: parsed.hasSplitDownloads ?? false,
              version: parsed.version,
              totalDownloads: parsed.downloads,
              loading: false,
            });
            return;
          }
        }
      } catch (e) {
        localStorage.removeItem(CACHE_KEY);
      }

      try {
        const res = await fetch('https://api.github.com/repos/PhamHungTien/PHTV/releases?per_page=100');
        if (!res.ok) throw new Error('Network error');

        const releases = await res.json();
        
        if (Array.isArray(releases) && releases.length > 0) {
          // Calculate total downloads
          let dlCount = 0;
          releases.forEach((rel: any) => {
            if (rel.assets) {
              rel.assets.forEach((asset: any) => {
                dlCount += asset.download_count;
              });
            }
          });
          
          const formattedDownloads = new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
          }).format(dlCount);

          // Find the latest stable release
          let targetRelease = releases.find((r: any) => !r.prerelease && !r.draft);
          
          // Fallback to the absolute latest if no stable release found
          if (!targetRelease) {
            targetRelease = releases[0];
          }

          const latestVer = targetRelease.tag_name;
          const dmgAssets = targetRelease.assets?.filter((asset: any) => asset.name.endsWith('.dmg')) ?? [];
          const arm64Asset = dmgAssets.find((asset: any) => /-arm64\.dmg$/i.test(asset.name));
          const intelAsset = dmgAssets.find((asset: any) => /-(intel|x86_64)\.dmg$/i.test(asset.name));
          const universalAsset = dmgAssets.find((asset: any) => !/-(arm64|intel|x86_64)\.dmg$/i.test(asset.name));
          const hasSplitDownloads = Boolean(arm64Asset && intelAsset);
          const releaseUrl = targetRelease.html_url;
          const url = hasSplitDownloads
            ? releaseUrl
            : (universalAsset?.browser_download_url ?? releaseUrl);

          const newData = {
            downloadUrl: url,
            releaseUrl,
            arm64DownloadUrl: arm64Asset?.browser_download_url ?? null,
            intelDownloadUrl: intelAsset?.browser_download_url ?? null,
            universalDownloadUrl: universalAsset?.browser_download_url ?? null,
            hasSplitDownloads,
            version: latestVer,
            totalDownloads: formattedDownloads,
            loading: false,
          };

          setData(newData);

          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              url,
              releaseUrl,
              arm64DownloadUrl: arm64Asset?.browser_download_url ?? null,
              intelDownloadUrl: intelAsset?.browser_download_url ?? null,
              universalDownloadUrl: universalAsset?.browser_download_url ?? null,
              hasSplitDownloads,
              version: latestVer,
              downloads: formattedDownloads,
              timestamp: now
            }));
          } catch (e) {
            console.warn('Failed to save to localStorage:', e);
          }
        }
      } catch (err) {
        console.error("Failed to fetch GitHub data", err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchReleases();
  }, []);

  return data;
};
