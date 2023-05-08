const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const MAX_ITEMS_CACHE = 5;

const cleanCache = (cacheName, sizeItems = MAX_ITEMS_CACHE) => {
	caches.open(cacheName).then((cache) => {
		cache.keys().then((keys) => {
			if (keys.length >= sizeItems) {
				cache.delete(keys[0]).then(() => cleanCache(cacheName, sizeItems));
			}
		});
	});
};

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
// self.addEventListener('fetch', (e) => {
// 	/* Network with cache fallback */

// 	const newResp = fetch(e.request)
// 		.then((response) => {
// 			if (!response) return caches.match(e.request);

// 			caches.open(DYNAMIC_CACHE).then((cache) => {
// 				cache.put(e.request, response);
// 				cleanCache(DYNAMIC_CACHE, MAX_ITEMS_CACHE);
// 			});

// 			return response.clone();
// 		})
// 		.catch((err) => {
// 			return caches.match(e.request);
// 		});

// 	e.respondWith(newResp);
// });
self.addEventListener('fetch', (e) => {
	/* Cache with network update */
	if (e.request.url.includes('bootstrap')) return e.respondWith(caches.match(e.request));

	const response = caches.open(STATIC_CACHE).then((cache) => {
		fetch(e.request).then((newResp) => cache.put(e.request, newResp));

		return cache.match(e.request);
	});

	e.respondWith(response);
});
