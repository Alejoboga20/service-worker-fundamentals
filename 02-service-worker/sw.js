self.addEventListener('fetch', (event) => {
	const response = fetch(event.request).then((resp) => (resp.ok ? resp : fetch('/img/main.jpg')));

	event.respondWith(response);
});
