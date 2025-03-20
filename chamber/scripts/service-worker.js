const CACHE_NAME = 'business-directory-cache-v1';
const CACHE_FILES = [
    '/',
    '/index.html',
    '/styles/base.css',
    '/scripts/base.js',
    '/data/members.json',
    '/images/placeholder-logo.webp',
    // Add any other assets you need to cache
];

// Install event: Cache the required assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching assets...');
                return cache.addAll(CACHE_FILES);
            })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve cached content or fetch from the network if not cached
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Return cached response
                    return cachedResponse;
                }

                // If not cached, fetch from the network
                return fetch(event.request).then(networkResponse => {
                    // Cache the new response for future requests
                    if (event.request.url.includes('/data/members.json')) {
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                    return networkResponse;
                });
            })
    );
});
