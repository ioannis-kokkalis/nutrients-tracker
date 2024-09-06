const VERSION = 1; // increase by 1 on updates to automatically update clients on next navigation
// TODO probably do cache versions too and delete previous versions on activate
// that way the previous and new service worker operate with their own files

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

	self.skipWaiting(); // take control over previous service worker, force "activate" 
});

self.addEventListener('activate', async () => {
	const tabs = await self.clients.matchAll({ type: 'window' });
	tabs.forEach((tab) => tab.navigate(tab.url)); // refresh to apply the updated files
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
