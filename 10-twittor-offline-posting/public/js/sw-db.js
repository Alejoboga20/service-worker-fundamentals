/* Utilities for DB */
const db = new PouchDB('messages');

const saveMessage = (message) => {
	message._id = new Date().toISOString();

	db.put(message).then(() => console.log('message saved'));
};
