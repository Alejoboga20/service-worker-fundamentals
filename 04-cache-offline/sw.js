self.addEventListener('install', (e) => {
	console.log('[Service Worker] - Installing...');

	const cachePromise = caches.open('cache-1').then((cache) => {
		/* Save app shell in cache */
		return cache.addAll([
			'index.html',
			'css/style.css',
			'img/main.jpg',
			'js/app.js',
			'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
		]);
	});

	e.waitUntil(cachePromise);
});
