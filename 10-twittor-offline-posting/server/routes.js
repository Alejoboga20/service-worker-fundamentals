// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();

const messages = [
	{
		_id: '1',
		user: 'spiderman',
		message: "Hi, I'm spiderman",
	},
	{
		_id: '2',
		user: 'hulk',
		message: "Hi, I'm hulk",
	},
	{
		_id: '2',
		user: 'ironman',
		message: 'Because I am ironman',
	},
];

// GET messages
router.get('/', function (req, res) {
	res.json(messages);
});

//POST messages
router.post('/', (req, res) => {
	const message = req.body.message;
	const user = req.body.user;

	console.log(req.body);
	messages.push({ message, user });

	return res.json({ ok: true, message, user });
});

module.exports = router;
