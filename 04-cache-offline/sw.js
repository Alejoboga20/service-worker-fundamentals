self.addEventListener('fetch', (event) => {
	const offlineResponse = new Response(`<h1>Oops! You're offline!</h1>`, {
		headers: {
			'Content-Type': 'text/html',
		},
	});

	const response = fetch(event.request).catch(() => offlineResponse);

	event.respondWith(response);
});
