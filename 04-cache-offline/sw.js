const CACHE_NAME = 'cache-1';

self.addEventListener('install', (e) => {
	console.log('[Service Worker] - Installing...');

	const cachePromise = caches.open(CACHE_NAME).then((cache) => {
		/* Save app shell in cache */
		return cache.addAll([
			'/',
			'index.html',
			'css/style.css',
			'img/main.jpg',
			'js/app.js',
			'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
		]);
	});

	e.waitUntil(cachePromise);
});

/* Cache strategies */
self.addEventListener('fetch', (e) => {
	/* Cache only: the entire app is served from the cache */
	//e.respondWith(caches.match(e.request));

	/* Cache with network fallback: try first cache and then network */
	const response = caches.match(e.request).then((resp) => {
		if (resp) return resp;

		return fetch(e.request).then((newResp) => {
			/* Save new response in the cache */
			caches.open(CACHE_NAME).then((cache) => cache.put(e.request, newResp));

			return newResp.clone();
		});
	});

	e.respondWith(response);
});
