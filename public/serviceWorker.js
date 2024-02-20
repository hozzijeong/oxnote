self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(assetCacheName).then((cache) => {
			cache.addAll(['/index.html', '/']);
		})
	);

	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== assetCacheName) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);

	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	if (!navigator.onLine) {
		event.respondWith(
			caches.match(event.request).then((result) => result && result)
		);
	}
});
