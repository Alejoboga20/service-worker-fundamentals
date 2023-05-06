self.addEventListener('install', (event) => {
	/* Download assets, create cache, etc */
	console.log('Installing service worker...');

	const install = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Install done');
			self.skipWaiting(); // use in development only
			resolve();
		}, 1);
	});

	event.waitUntil(install);
});

self.addEventListener('activate', (event) => {
	/* Deleted old caches */
	console.log('Activating service worker...');
});

/* Fetch: Handling HTTP Requests */
self.addEventListener('fetch', (event) => {
	/* Handle the cache */
	console.log(event.request.url);

	if (event.request.url.includes('reqres.in')) {
		const response = new Response(`{ok: false, message: 'Nope'}`);
		event.respondWith(response);
	}
});
