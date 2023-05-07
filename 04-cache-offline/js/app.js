if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js');
}

if (window.caches) {
	/* Create, check if exists and delete cache */
	caches.open('test-1');
	caches.has('test-1').then((hasCache) => console.log({ hasCache }));
	caches.delete('test-1').then((hasCache) => console.log({ hasCache }));

	caches.open('cache-v1.1').then((cache) => {
		/* Add files to the cache */
		/* Delete files from the cache */
		/* Replace the files in cache */
		cache.addAll(['/index.html', 'css/style.css', 'img/main.jpg']).then(() => {
			cache.put('index.html', new Response('Hello World!'));
		});

		cache
			.match('/index.html')
			.then((resp) => resp.text())
			.then((html) => console.log(html));
	});

	/* Return array of all caches */
	caches.keys().then((keys) => console.log({ keys }));
}
