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
});

/* Sync: When recover internet conection */
self.addEventListener('sync', (event) => {
	/* Send data to server */
	console.log('There is conection again');
	console.log(event);
	console.log(event.tag);
});

/* Push: Handle push notifications */
self.addEventListener('push', (event) => {
	/* Show notification */
	console.log('Notification received');
	console.log(event);
});
