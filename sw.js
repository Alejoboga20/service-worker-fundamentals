self.addEventListener('fetch', (event) => {
	/* if (event.request.url.includes('style.css')) {
		event.respondWith(null);
    this is a way to block a request
	} */
	event.respondWith(fetch(event.request));
});
