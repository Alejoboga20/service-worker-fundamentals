self.addEventListener('install', (event) => {
	/* Download assets, create cache, etc */
	//self.skipWaiting(); use in development only
	console.log('Installing service worker...');
});

self.addEventListener('activate', (event) => {
	/* Deleted old caches */
	console.log('Activating service worker...');
});
