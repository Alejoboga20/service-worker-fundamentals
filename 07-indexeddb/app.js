// indexedDB
const DB_VERSION = 1;
const request = window.indexedDB.open('my-database', DB_VERSION);

/* It triggers when version is upgraded */
request.onupgradeneeded = (event) => {
	console.log('[IndexDB] - Update DB');
	const db = event.target.result;

	db.createObjectStore('heroes', { keyPath: 'id' });
};

/* handle errors */
request.onerror = (event) => {
	console.log('[IndexDB] - Error: ', event.target.error);
};

request.onsuccess = (event) => {
	console.log('[IndexDB] - Success: ', event.target.result);
	const db = event.target.result;

	const heroesData = [
		{
			id: 1,
			name: 'Spiderman',
			message: 'Testing index DB',
		},
		{
			id: 2,
			name: 'Ironman',
			message: 'I am ironman',
		},
	];

	const heroesTransaction = db.transaction('heroes', 'readwrite');

	heroesTransaction.onerror = (event) => console.log('Error in Transaction', event.target.error);
	heroesTransaction.oncomplete = (event) => console.log('Completed Transaction', event);

	const heroesStore = heroesTransaction.objectStore('heroes');

	for (const hero of heroesData) {
		heroesStore.add(hero);
	}

	heroesStore.onsuccess = (event) => console.log('[IndexDB] - Data added successfully');
};
