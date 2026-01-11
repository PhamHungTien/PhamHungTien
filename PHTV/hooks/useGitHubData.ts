import { useState, useEffect } from 'react';

export interface GitHubData {
  downloadUrl: string;
  version: string;
  totalDownloads: string;
  loading: boolean;
}

const CACHE_KEY = 'phtv_releases_data_v4';
const CACHE_DURATION = 600000; // 10 minutes

export const useGitHubData = (): GitHubData => {
  const [data, setData] = useState<GitHubData>({
    downloadUrl: "https://github.com/PhamHungTien/PHTV/releases/latest",
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
          const dmgAsset = targetRelease.assets?.find((asset: any) => asset.name.endsWith('.dmg'));
          const url = dmgAsset ? dmgAsset.browser_download_url : targetRelease.html_url;

          const newData = {
            downloadUrl: url,
            version: latestVer,
            totalDownloads: formattedDownloads,
            loading: false,
          };

          setData(newData);

          localStorage.setItem(CACHE_KEY, JSON.stringify({
            url,
            version: latestVer,
            downloads: formattedDownloads,
            timestamp: now
          }));
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