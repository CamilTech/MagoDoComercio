const CACHE_NAME = 'akindo-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/css/pages/index/index.css',
    '/assets/css/global/style.css',
    '/assets/js/pages/index.js',
    '/assets/componentes/img/favicon/favicon.png',
    '/assets/componentes/img/logo/logo-akindo.png',
    '/assets/componentes/img/icons/index-account.png',
    '/assets/componentes/img/icons/index-cart.png',
    '/assets/componentes/img/carousel-img/Mikako.png',
    '/assets/componentes/img/carousel-img/risa.png',
    '/assets/componentes/img/carousel-img/yuusuke-tsutomu.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(name => {
                if (name !== CACHE_NAME) {
                    return caches.delete(name);
                }
            })
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request)
                    .then(networkResponse => {
                        return caches.open(CACHE_NAME).then(cache => {
                            if (event.request.method === 'GET' && networkResponse.ok) {
                                cache.put(event.request, networkResponse.clone());
                            }
                            return networkResponse;
                        });
                    });
            })
            .catch(() => caches.match('/index.html'))
    );
});
