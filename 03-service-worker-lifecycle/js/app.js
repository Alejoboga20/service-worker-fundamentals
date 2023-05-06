// Check if service worker is available in this browser
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then((reg) => {
		/* setTimeout(() => {
			reg.sync.register('post-data');
			console.log('Sync registered');
		}, 3000); */

		Notification.requestPermission().then((result) => {
			console.log({ result });
			reg.showNotification('Hello world');
		});
	});
}
