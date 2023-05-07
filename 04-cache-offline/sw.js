const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

self.addEventListener('install', (e) => {
	console.log('[Service Worker] - Installing...');

	const staticCachePromise = caches.open(STATIC_CACHE).then((cache) => {
		/* Save app shell in cache */
		return cache.addAll(['/', 'index.html', 'css/style.css', 'img/main.jpg', 'js/app.js']);
	});

	const inmutableCachePromise = caches
		.open(INMUTABLE_CACHE)
		.then((cache) =>
			cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css')
		);

	e.waitUntil(Promise.all([staticCachePromise, inmutableCachePromise]));
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
			caches.open(DYNAMIC_CACHE).then((cache) => cache.put(e.request, newResp));

			return newResp.clone();
		});
	});

	e.respondWith(response);
});
