// Service Worker for caching static assets
const CACHE_NAME = 'wallstreet-v31';
const STATIC_ASSETS = [
  '/',
  '/favicon.png',
  '/Hero/logo.png',
  '/Hero/hero.png',
  '/Hero/newbg.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // return from cache if available
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          // ✅ Only cache static assets (no API calls)
          if (
            event.request.destination === 'image' ||
            event.request.destination === 'script' ||
            event.request.destination === 'style' ||
            event.request.destination === 'font'
          ) {
            cache.put(event.request, responseToCache);
          }
        });

        return response;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});