// Check if service worker is available in this browser
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js');
}
