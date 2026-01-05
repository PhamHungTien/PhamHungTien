// PHTV Service Worker - Smart Cache Management & Performance Optimization
// v3 - Intelligent versioning, storage management, and request deduplication

const APP_VERSION = '1.0.0';
const CACHE_PREFIX = 'phtv';
const CACHE_VERSION = 'v3';
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

// Critical assets for immediate availability
const PRECACHE_ASSETS = [
  '/PHTV/',
  '/PHTV/index.html',
  '/PHTV/manifest.json',
  '/PHTV/index.css'
];

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
          return cache.addAll(PRECACHE_ASSETS)
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
  console.log('[SW] Activating service worker...');

  const activeStrategyKeys = Object.values(CACHE_STRATEGIES);

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Delete old versioned caches
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith(CACHE_PREFIX) && !activeStrategyKeys.includes(name))
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      // Manage cache sizes for all active caches
      .then(() => {
        return Promise.all(
          Object.values(CACHE_STRATEGIES).map((name) => manageCacheSize(name))
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

/**
 * Fetch event - intelligent routing with multiple strategies
 */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Strategy 1: GitHub API - Network-first with stale fallback
  if (url.origin === 'https://api.github.com') {
    event.respondWith(apiNetworkFirst(event.request));
    return;
  }

  // Strategy 2: External CDN (esm.sh, cdn.tailwindcss.com) - Cache-first
  if (url.origin === 'https://esm.sh' || 
      url.origin === 'https://cdn.tailwindcss.com' ||
      url.origin === 'https://cdn.jsdelivr.net') {
    event.respondWith(cdnCacheFirst(event.request));
    return;
  }

  // Strategy 3: Google Fonts - Cache-first (immutable)
  if (url.origin === 'https://fonts.googleapis.com' ||
      url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(fontsCacheFirst(event.request));
    return;
  }

  // Strategy 4: Local images - Cache-first with network fallback
  if (event.request.destination === 'image') {
    event.respondWith(imageCacheFirst(event.request));
    return;
  }

  // Skip other external origins
  if (url.origin !== location.origin) {
    return;
  }

  // Strategy 5: Local HTML/JS/CSS - Stale-while-revalidate
  event.respondWith(staleWhileRevalidate(event.request));
});

/**
 * API Network-First: Try fresh data, fall back to stale cache
 */
async function apiNetworkFirst(request) {
  try {
    const response = await fetchWithDedup(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_STRATEGIES.api);
      response.headers.set('sw-fetched-at', new Date().toISOString());
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] API offline, returning cache...');
    const cached = await caches.match(request);
    return cached || new Response(
      JSON.stringify({ error: 'Offline', cached: !!cached }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * CDN Cache-First: Use cached version if available and valid
 */
async function cdnCacheFirst(request) {
  const cache = await caches.open(CACHE_STRATEGIES.cdn);
  const cached = await cache.match(request);

  if (cached && isCacheValid(cached, CACHE_TTL.cdn)) {
    console.log(`[SW] CDN cache hit: ${request.url}`);
    return cached;
  }

  try {
    const response = await fetchWithDedup(request);
    if (response.ok) {
      response.headers.set('sw-fetched-at', new Date().toISOString());
      cache.put(request, response.clone());
      await manageCacheSize(CACHE_STRATEGIES.cdn);
    }
    return response;
  } catch (error) {
    return cached || new Response('CDN unavailable', { status: 503 });
  }
}

/**
 * Fonts Cache-First: Immutable, long-lived assets
 */
async function fontsCacheFirst(request) {
  const cache = await caches.open(CACHE_STRATEGIES.fonts);
  const cached = await cache.match(request);

  if (cached) {
    console.log(`[SW] Font cache hit: ${request.url}`);
    return cached;
  }

  try {
    const response = await fetchWithDedup(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Font unavailable', { status: 503 });
  }
}

/**
 * Images Cache-First: With network fallback
 */
async function imageCacheFirst(request) {
  const cache = await caches.open(CACHE_STRATEGIES.images);
  const cached = await cache.match(request);

  if (cached) {
    console.log(`[SW] Image cache hit: ${request.url}`);
    return cached;
  }

  try {
    const response = await fetchWithDedup(request);
    if (response.ok) {
      response.headers.set('sw-fetched-at', new Date().toISOString());
      cache.put(request, response.clone());
      await manageCacheSize(CACHE_STRATEGIES.images);
    }
    return response;
  } catch (error) {
    return new Response('Image not available', { status: 503 });
  }
}

/**
 * Stale-While-Revalidate: Return cache immediately, update in background
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_STRATEGIES.runtime);
  const cached = await cache.match(request);

  // Return cached response immediately
  const fetchPromise = fetchWithDedup(request)
    .then((response) => {
      if (response.ok) {
        response.headers.set('sw-fetched-at', new Date().toISOString());
        cache.put(request, response.clone());
        manageCacheSize(CACHE_STRATEGIES.runtime).catch(console.error);
      }
      return response;
    })
    .catch((error) => {
      console.log('[SW] Network failed:', error);
      if (request.mode === 'navigate') {
        return caches.match(OFFLINE_URL) || new Response('Offline', { status: 503 });
      }
      return cached || new Response('Offline', { status: 503 });
    });

  return cached || fetchPromise;
}

/**
 * Handle messages from clients
 */
self.addEventListener('message', (event) => {
  const { type, data } = event.data || {};

  if (type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting');
    self.skipWaiting();
  } else if (type === 'CLEAR_CACHE') {
    console.log('[SW] Clearing cache:', data.cacheName);
    caches.delete(data.cacheName).then(() => {
      event.ports[0]?.postMessage({ success: true });
    });
  } else if (type === 'GET_CACHE_SIZE') {
    calculateTotalCacheSize().then((size) => {
      event.ports[0]?.postMessage({ size });
    });
  }
});

/**
 * Calculate total cache size
 */
async function calculateTotalCacheSize() {
  let total = 0;
  const cacheNames = await caches.keys();

  for (const name of cacheNames) {
    if (!name.startsWith(CACHE_PREFIX)) continue;
    
    const cache = await caches.open(name);
    const keys = await cache.keys();

    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const size = parseInt(response.headers.get('content-length'), 10) || 0;
        total += size;
      }
    }
  }

  return total;
}

console.log(`[SW] Service Worker v${CACHE_VERSION} loaded - App v${APP_VERSION}`);

