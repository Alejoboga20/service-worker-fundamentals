// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();

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

// GET /messages
router.get('/', function (req, res) {
	res.json(messages);
});

module.exports = router;
