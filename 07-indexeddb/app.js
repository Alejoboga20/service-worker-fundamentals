// indexedDB
const DB_VERSION = 1;
const request = window.indexedDB.open('my-database', DB_VERSION);

/* It triggers when version is upgraded */
request.onupgradeneeded = (event) => {
	console.log('[IndexDB] - Update DB');

	const db = event.target.result;

	db.createObjectStore('heroes', { keyPath: 'id' });
};
