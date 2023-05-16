// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push = require('./push');

const mensajes = [
	{
		_id: 'XXX',
		user: 'spiderman',
		mensaje: 'Hola Mundo',
	},
];

// Get mensajes
router.get('/', function (req, res) {
	// res.json('Obteniendo mensajes');
	res.json(mensajes);
});

// Post mensaje
router.post('/', function (req, res) {
	const mensaje = {
		mensaje: req.body.mensaje,
		user: req.body.user,
	};

	mensajes.push(mensaje);

	console.log(mensajes);

	res.json({
		ok: true,
		mensaje,
	});
});

/* Save subscription */
router.post('/subscribe', (req, res) => {
	res.json('subscribe');
});

/* Get public key */
router.get('/key', (req, res) => {
	const key = push.getKey();
	res.send(key);
});

/* Send push notifications */
router.get('/push', (req, res) => {
	res.json('push');
});

module.exports = router;
