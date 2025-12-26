// PHTV Service Worker - PWA Support
const CACHE_NAME = 'phtv-cache-v1';
const OFFLINE_URL = '/PHTV/';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/PHTV/',
  '/PHTV/index.html',
  '/PHTV/style.css',
  '/PHTV/script.js',
  '/PHTV/manifest.json',
  '/PHTV/Resources/icon.png',
  '/PHTV/Resources/icons/favicon-32x32.png',
  '/PHTV/Resources/icons/favicon-16x16.png',
  '/PHTV/Resources/icons/apple-touch-icon.png',
  '/PHTV/Resources/icons/android-chrome-192x192.png',
  '/PHTV/Resources/icons/android-chrome-512x512.png'
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

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
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

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests (GitHub API, fonts, etc.)
  const requestURL = new URL(event.request.url);
  if (requestURL.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached response and update cache in background
          event.waitUntil(
            fetch(event.request)
              .then((networkResponse) => {
                if (networkResponse.ok) {
                  caches.open(CACHE_NAME)
                    .then((cache) => cache.put(event.request, networkResponse));
                }
              })
              .catch(() => {})
          );
          return cachedResponse;
        }

        // No cache, fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache successful responses
            if (networkResponse.ok) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseToCache));
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed, return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return new Response('Offline', { status: 503 });
          });
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
