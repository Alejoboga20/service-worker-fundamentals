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
		user: 'superman',
		message: "Hi, I'm superman",
	},
	{
		_id: '2',
		user: 'Batman',
		message: 'Because I am Batman',
	},
];

// GET /messages
router.get('/', function (req, res) {
	res.json(messages);
});

module.exports = router;
