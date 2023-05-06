self.addEventListener('fetch', (event) => {
	if (event.request.url.includes('style.css')) {
		const response = new Response(
			`body {
      background-color: red !important;
      color: yellow;
    }`,
			{
				headers: {
					'Content-Type': 'text/css',
				},
			}
		);

		event.respondWith(response);
	}
});
