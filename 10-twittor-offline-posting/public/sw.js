// imports
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js');

importScripts('js/sw-db.js');
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
	'/',
	'index.html',
	'css/style.css',
	'img/favicon.ico',
	'img/avatars/hulk.jpg',
	'img/avatars/ironman.jpg',
	'img/avatars/spiderman.jpg',
	'img/avatars/thor.jpg',
	'img/avatars/wolverine.jpg',
	'js/app.js',
	'js/sw-utils.js',
];

const APP_SHELL_INMUTABLE = [
	'https://fonts.googleapis.com/css?family=Quicksand:300,400',
	'https://fonts.googleapis.com/css?family=Lato:400,300',
	'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css',
	'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
	'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js',
];

self.addEventListener('install', (e) => {
	const cacheStatic = caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL));

	const cacheInmutable = caches
		.open(INMUTABLE_CACHE)
		.then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

	e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener('activate', (e) => {
	const respuesta = caches.keys().then((keys) => {
		keys.forEach((key) => {
			if (key !== STATIC_CACHE && key.includes('static')) {
				return caches.delete(key);
			}

			if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
				return caches.delete(key);
			}
		});
	});

	e.waitUntil(respuesta);
});

self.addEventListener('fetch', (e) => {
	let response;

	if (e.request.url.includes('/api')) {
		response = handleApiMessages(DYNAMIC_CACHE, e.request);
	} else {
		response = caches.match(e.request).then((res) => {
			if (res) {
				actualizaCacheStatico(STATIC_CACHE, e.request, APP_SHELL_INMUTABLE);
				return res;
			} else {
				return fetch(e.request).then((newRes) => {
					return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
				});
			}
		});
	}

	e.respondWith(response);
});

/* Async Tasks */
self.addEventListener('sync', (e) => {
	console.log('[Service Worker] - Sync event fired');

	if (e.tag === 'new post') {
		// Post messages to API
		const response = postMessages();
		e.waitUntil(response);
	}
});
