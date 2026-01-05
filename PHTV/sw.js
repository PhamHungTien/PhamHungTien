// PHTV Service Worker - PWA Support with Performance Optimization
const CACHE_NAME = 'phtv-cache-v2';
const RUNTIME_CACHE = 'phtv-runtime-v2';
const IMAGE_CACHE = 'phtv-images-v2';
const FONT_CACHE = 'phtv-fonts-v2';
const OFFLINE_URL = '/PHTV/';

// Cache durations (in milliseconds)
const CACHE_DURATION = {
  images: 30 * 24 * 60 * 60 * 1000, // 30 days
  fonts: 365 * 24 * 60 * 60 * 1000, // 1 year
  runtime: 7 * 24 * 60 * 60 * 1000  // 7 days
};

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/PHTV/',
  '/PHTV/index.html',
  '/PHTV/manifest.json',
  '/PHTV/index.css',
  '/PHTV/Resources/icon.png',
  '/PHTV/Resources/icons/favicon-32x32.webp',
  '/PHTV/Resources/icons/favicon-16x16.webp'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching assets...');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('[SW] Pre-cache complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Pre-cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, FONT_CACHE];

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => !currentCaches.includes(name))
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const requestURL = new URL(event.request.url);

  // Strategy 1: Cache-first for fonts (immutable)
  if (requestURL.origin === 'https://fonts.googleapis.com' ||
      requestURL.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;

          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Strategy 2: Network-first for GitHub API (fresh data)
  if (requestURL.origin === 'https://api.github.com') {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches.open(RUNTIME_CACHE)
              .then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Skip other external requests
  if (requestURL.origin !== location.origin) {
    return;
  }

  // Strategy 3: Cache-first for images (with lazy loading)
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;

          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse || new Response('Image not available'));
        });
      })
    );
    return;
  }

  // Strategy 4: Stale-while-revalidate for local resources
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              const cacheName = event.request.destination === 'document' ? CACHE_NAME : RUNTIME_CACHE;
              caches.open(cacheName)
                .then((cache) => cache.put(event.request, networkResponse.clone()));
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed, return offline page for navigation
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return new Response('Offline', { status: 503 });
          });

        // Return cached response immediately, or wait for network
        return cachedResponse || fetchPromise;
      })
  );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting requested');
    self.skipWaiting();
  }
});

// Background sync for form submissions (future enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-feedback') {
    console.log('[SW] Syncing feedback...');
  }
});

console.log('[SW] Service Worker loaded');
