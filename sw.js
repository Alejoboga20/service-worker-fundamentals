self.addEventListener('fetch', (event) => {
	if (event.request.url.includes('main.jpg')) {
		event.respondWith(fetch('/img/main-turned.jpg'));
	}
});
