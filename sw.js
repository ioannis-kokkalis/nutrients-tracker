self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('nutriens_proof_of_concept').then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './assets/icons/logo.svg',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
