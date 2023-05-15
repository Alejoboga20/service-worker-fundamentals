importScripts('./js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
	'./',
	'./index.html',
	'./style/base.css',
	'./style/bg.png',
	'./js/app.js',
	'./js/base.js',
	'./js/sw-utils.js',
];

const APP_SHELL_INMUTABLE = ['//cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js'];

self.addEventListener('install', (e) => {
	console.log('[Service Worker] - Installed');

	const staticCache = caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL));

	const inmutableCache = caches
		.open(INMUTABLE_CACHE)
		.then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

	e.waitUntil(Promise.all([staticCache, inmutableCache]));
});

self.addEventListener('activate', (e) => {
	console.log('[Service Worker] - Activated');

	const response = caches.keys().then((keys) => {
		keys.forEach((key) => {
			if (key != STATIC_CACHE && key.includes('static')) {
				return caches.delete(key);
			}
		});
	});

	e.waitUntil(response);
});

self.addEventListener('fetch', (e) => {
	const response = caches.match(e.request).then((resp) => {
		if (resp) return resp;

		return fetch(e.request).then((newResp) =>
			updateDynamicCache(DYNAMIC_CACHE, e.request, newResp)
		);
	});

	e.respondWith(response);
});
