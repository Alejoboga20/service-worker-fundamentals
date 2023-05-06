// Check if service worker is available in this browser
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js');
}

fetch('https://reqres.in/api/users')
	.then((response) => response.text())
	.then((data) => console.log({ data }));
