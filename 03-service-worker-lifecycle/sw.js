self.addEventListener('install', (event) => {
	/* Download assets, create cache, etc */
	console.log('Installing service worker...');

	const install = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Install done');
			self.skipWaiting(); // use in development only
			resolve();
		}, 1000);
	});

	event.waitUntil(install);
});

self.addEventListener('activate', (event) => {
	/* Deleted old caches */
	console.log('Activating service worker...');
});
