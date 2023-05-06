self.addEventListener('fetch', (event) => {
	if (event.request.url.includes('main.jpg')) {
		const response = fetch('/img/main-turned.jpg');

		event.respondWith(response);
	}
});
