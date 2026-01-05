// PHTV Service Worker - Smart Cache Management & Performance Optimization
// v6 - Force cache cleanup on every update + LocalStorage cleanup

const APP_VERSION = '1.0.3';
const CACHE_PREFIX = 'phtv';
const CACHE_VERSION = 'v6';
const CACHE_STRATEGIES = {
  precache: `${CACHE_PREFIX}-precache-${CACHE_VERSION}`,
  runtime: `${CACHE_PREFIX}-runtime-${CACHE_VERSION}`,
  images: `${CACHE_PREFIX}-images-${CACHE_VERSION}`,
  fonts: `${CACHE_PREFIX}-fonts-${CACHE_VERSION}`,
  api: `${CACHE_PREFIX}-api-${CACHE_VERSION}`,
  cdn: `${CACHE_PREFIX}-cdn-${CACHE_VERSION}`
};

const OFFLINE_URL = '/PHTV/';
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB max
const CACHE_TTL = {
  api: 1 * 60 * 60 * 1000,        // 1 hour for API
  cdn: 7 * 24 * 60 * 60 * 1000,   // 7 days for CDN (esm.sh, cdn.tailwindcss.com)
  images: 30 * 24 * 60 * 60 * 1000, // 30 days for images
  fonts: 365 * 24 * 60 * 60 * 1000   // 1 year for fonts
};

// Request deduplication map
const pendingRequests = new Map();

/**
 * Fetch with deduplication - prevents duplicate network requests
 */
function fetchWithDedup(request) {
  const key = request.url;
  
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }
  
  const fetchPromise = fetch(request).finally(() => {
    pendingRequests.delete(key);
  });
  
  pendingRequests.set(key, fetchPromise);
  return fetchPromise;
}

/**
 * Calculate cache size and clean up if necessary
 */
async function manageCacheSize(cacheName) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  let totalSize = 0;

  for (const request of keys) {
    const response = await cache.match(request);
    if (response) {
      const size = parseInt(response.headers.get('content-length'), 10) || 0;
      totalSize += size;
    }
  }

  // If exceeds max size, remove oldest entries
  if (totalSize > MAX_CACHE_SIZE) {
    console.log(`[SW] Cache exceeds ${MAX_CACHE_SIZE} bytes, cleaning up...`);
    
    // Remove oldest 20% of entries
    const toRemove = Math.ceil(keys.length * 0.2);
    for (let i = 0; i < toRemove; i++) {
      await cache.delete(keys[i]);
      console.log(`[SW] Removed: ${keys[i].url}`);
    }
  }
}

/**
 * Check if cached response is still valid (TTL check)
 */
function isCacheValid(response, ttl) {
  const cacheDate = new Date(response.headers.get('date')).getTime();
  const now = Date.now();
  return (now - cacheDate) < ttl;
}

/**
 * Install event - pre-cache critical assets
 */
self.addEventListener('install', (event) => {
  console.log(`[SW v${CACHE_VERSION}] Installing service worker...`);

  event.waitUntil(
    Promise.all([
      // Pre-cache critical assets
      caches.open(CACHE_STRATEGIES.precache)
        .then((cache) => {
          console.log('[SW] Pre-caching critical assets...');
          return cache.addAll(['/PHTV/'])
            .then(() => console.log('[SW] Pre-cache complete'))
            .catch((err) => console.error('[SW] Pre-cache error:', err));
        })
    ]).then(() => self.skipWaiting())
  );
});

/**
 * Activate event - clean up old caches and manage storage
 */
self.addEventListener('activate', (event) => {
  console.log(`[SW v${CACHE_VERSION}] Activating service worker...`);

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys()
        .then((cacheNames) => {
          console.log('[SW] Found caches:', cacheNames);
          return Promise.all(
            cacheNames
              .filter((name) => name.startsWith(CACHE_PREFIX) && !name.includes(CACHE_VERSION))
              .map((name) => {
                console.log(`[SW] Deleting old cache: ${name}`);
                return caches.delete(name);
              })
          );
        })
        .then(() => {
          console.log(`[SW v${CACHE_VERSION}] Old caches cleaned up.`);
        }),
      
      // Clean up old localStorage cache keys
      new Promise((resolve) => {
        try {
          const oldCacheKeys = ['phtv_releases_data_v1', 'phtv_releases_data_v2'];
          oldCacheKeys.forEach(key => {
            if (localStorage.getItem(key)) {
              localStorage.removeItem(key);
              console.log(`[SW] Removed old localStorage key: ${key}`);
            }
          });
          resolve();
        } catch (e) {
          console.warn('[SW] Cannot access localStorage:', e);
          resolve();
        }
      })
    ])
      .then(() => {
        console.log(`[SW v${CACHE_VERSION}] Activation complete. Claiming clients...`);
        return self.clients.claim();
      })
      .then(() => {
        return self.clients.matchAll();
      })
      .then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SW_UPDATED',
            version: CACHE_VERSION,
            message: 'New version of PHTV is ready! Refreshing...'
          });
        });
      })
  );
});

/**
 * Message event - handle client messages
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * Fetch event - intelligent routing with multiple strategies
 */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const { request } = event;
  const url = new URL(request.url);

  // Strategy 1: HTML pages - network first, fallback to cache, never cache
  if (url.pathname.endsWith('.html') || url.pathname === '/PHTV/') {
    event.respondWith(
      fetchWithDedup(request)
        .then((response) => {
          // Don't cache HTML
          if (response.ok) return response.clone();
          throw new Error('Network failed');
        })
        .catch(() => {
          return caches.match(request)
            .then((cached) => cached || caches.match(new Request(OFFLINE_URL)));
        })
    );
    return;
  }

  // Strategy 2: JS/CSS with hash - cache first, long term
  if (url.pathname.match(/\.(js|css)$/) && url.pathname.includes('-')) {
    event.respondWith(
      caches.match(request)
        .then((cached) => {
          if (cached) return cached;
          return fetchWithDedup(request)
            .then((response) => {
              if (response.ok) {
                const cache = caches.open(CACHE_STRATEGIES.runtime);
                cache.then((c) => c.put(request, response.clone()));
              }
              return response;
            })
            .catch(() => new Response('Resource not found', { status: 404 }));
        })
    );
    return;
  }

  // Strategy 3: Images - cache first with TTL
  if (url.pathname.match(/\.(webp|png|jpg|jpeg|gif|svg)$/i)) {
    event.respondWith(
      caches.open(CACHE_STRATEGIES.images)
        .then((cache) => {
          return cache.match(request)
            .then((cached) => {
              if (cached) {
                if (isCacheValid(cached, CACHE_TTL.images)) {
                  return cached;
                }
                cache.delete(request);
              }
              return fetchWithDedup(request)
                .then((response) => {
                  if (response.ok) {
                    cache.put(request, response.clone());
                  }
                  return response;
                })
                .catch(() => new Response('Image not found', { status: 404 }));
            });
        })
    );
    return;
  }

  // Strategy 4: Fonts - cache first, very long TTL
  if (url.pathname.match(/\.(woff2|woff|ttf|otf)$/i)) {
    event.respondWith(
      caches.open(CACHE_STRATEGIES.fonts)
        .then((cache) => {
          return cache.match(request)
            .then((cached) => {
              if (cached) return cached;
              return fetchWithDedup(request)
                .then((response) => {
                  if (response.ok) {
                    cache.put(request, response.clone());
                  }
                  return response;
                })
                .catch(() => new Response('Font not found', { status: 404 }));
            });
        })
    );
    return;
  }

  // Strategy 5: API calls - network first with 1 hour cache
  if (url.host !== location.host || url.pathname.includes('/api')) {
    event.respondWith(
      fetchWithDedup(request)
        .then((response) => {
          if (response.ok) {
            caches.open(CACHE_STRATEGIES.api)
              .then((cache) => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .catch(() => new Response('Network unavailable', { status: 503 }));
        })
    );
    return;
  }

  // Default: network first
  event.respondWith(
    fetchWithDedup(request)
      .then((response) => response || caches.match(request))
      .catch(() => caches.match(request))
  );
});
