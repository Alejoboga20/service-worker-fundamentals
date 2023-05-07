self.addEventListener('fetch', (event) => {
	const offlineResponse =
		new Response(`Welcome to the offline page. You must be online to use the page
  `);

	const response = fetch(event.request).catch(() => offlineResponse);

	event.respondWith(response);
});
