/* Utilities for DB */
const db = new PouchDB('messages');

const saveMessage = (message) => {
	message._id = new Date().toISOString();

	return db.put(message).then(() => {
		self.registration.sync.register('new post');

		const newResponse = { ok: true, offline: true };
		return new Response(JSON.stringify(newResponse));
	});
};

const postMessages = () => {
	const posts = [];

	const promiseDocs = db.allDocs({ include_docs: true }).then((docs) => {
		docs.rows.forEach((row) => {
			const doc = row.doc;

			const fetchPromise = fetch('api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(doc),
			}).then(() => {
				return db.remove(doc);
			});

			posts.push(fetchPromise);
		});

		return Promise.all(posts);
	});

	return promiseDocs;
};
