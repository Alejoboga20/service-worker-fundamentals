var url = window.location.href;
var swLocation = '/twittor/sw.js';

let swReg;

if (navigator.serviceWorker) {
	if (url.includes('localhost')) {
		swLocation = '/sw.js';
	}

	window.addEventListener('load', function () {
		navigator.serviceWorker.register(swLocation).then(function (reg) {
			swReg = reg;
			swReg.pushManager.getSubscription().then(verifySubscription);
		});
	});
}

// Referencias de jQuery

var titulo = $('#titulo');
var nuevoBtn = $('#nuevo-btn');
var salirBtn = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn = $('#post-btn');
var avatarSel = $('#seleccion');
var timeline = $('#timeline');

var modal = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns = $('.seleccion-avatar');
var txtMensaje = $('#txtMensaje');

var btnActivadas = $('.btn-noti-activadas');
var btnDesactivadas = $('.btn-noti-desactivadas');

// El usuario, contiene el ID del hÃ©roe seleccionado
var usuario;

// ===== Codigo de la aplicación

function crearMensajeHTML(mensaje, personaje) {
	var content = `
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${personaje}.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${personaje}</h3>
                <br/>
                ${mensaje}
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

	timeline.prepend(content);
	cancelarBtn.click();
}

// Globals
function logIn(ingreso) {
	if (ingreso) {
		nuevoBtn.removeClass('oculto');
		salirBtn.removeClass('oculto');
		timeline.removeClass('oculto');
		avatarSel.addClass('oculto');
		modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
	} else {
		nuevoBtn.addClass('oculto');
		salirBtn.addClass('oculto');
		timeline.addClass('oculto');
		avatarSel.removeClass('oculto');

		titulo.text('Seleccione Personaje');
	}
}

// Seleccion de personaje
avatarBtns.on('click', function () {
	usuario = $(this).data('user');

	titulo.text('@' + usuario);

	logIn(true);
});

// Boton de salir
salirBtn.on('click', function () {
	logIn(false);
});

// Boton de nuevo mensaje
nuevoBtn.on('click', function () {
	modal.removeClass('oculto');
	modal.animate(
		{
			marginTop: '-=1000px',
			opacity: 1,
		},
		200
	);
});

// Boton de cancelar mensaje
cancelarBtn.on('click', function () {
	if (!modal.hasClass('oculto')) {
		modal.animate(
			{
				marginTop: '+=1000px',
				opacity: 0,
			},
			200,
			function () {
				modal.addClass('oculto');
				txtMensaje.val('');
			}
		);
	}
});

// Boton de enviar mensaje
postBtn.on('click', function () {
	var mensaje = txtMensaje.val();
	if (mensaje.length === 0) {
		cancelarBtn.click();
		return;
	}

	var data = {
		mensaje: mensaje,
		user: usuario,
	};

	fetch('api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((res) => console.log('app.js', res))
		.catch((err) => console.log('app.js error:', err));

	crearMensajeHTML(mensaje, usuario);
});

// Obtener mensajes del servidor
function getMensajes() {
	fetch('api')
		.then((res) => res.json())
		.then((posts) => {
			console.log(posts);
			posts.forEach((post) => crearMensajeHTML(post.mensaje, post.user));
		});
}

getMensajes();

// Detectar cambios de conexión
function isOnline() {
	if (navigator.onLine) {
		// tenemos conexión
		// console.log('online');
		$.mdtoast('Online', {
			interaction: true,
			interactionTimeout: 1000,
			actionText: 'OK!',
		});
	} else {
		// No tenemos conexión
		$.mdtoast('Offline', {
			interaction: true,
			actionText: 'OK',
			type: 'warning',
		});
	}
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline();

/* Notifications */
function verifySubscription(active) {
	if (active) {
		btnActivadas.removeClass('oculto');
		btnDesactivadas.addClass('oculto');
	} else {
		btnActivadas.addClass('oculto');
		btnDesactivadas.removeClass('oculto');
	}
}

function sentNotification() {
	const notificationOptions = { body: 'This is the body', icon: '../img/icons/icon-72x72.png' };
	const newNotification = new Notification('Hello', notificationOptions);

	newNotification.onclick = () => console.log('notification clicked');
}

function notificate() {
	if (!window.Notification) return console.log('This browser does not support notifications');

	if (Notification.permission === 'granted') {
		sentNotification();
	} else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
		Notification.requestPermission(function (permission) {
			console.log({ permission });
			if (permission === 'granted') {
				sentNotification();
			}
		});
	}
}

// GET Public Key
function getPublicKey() {
	return fetch('api/key')
		.then((res) => res.arrayBuffer())
		.then((key) => new Uint8Array(key));
}

btnDesactivadas.on('click', () => {
	if (!swReg) return console.log('Service Worker is not registered');

	getPublicKey().then((key) => {
		swReg.pushManager
			.subscribe({
				userVisibleOnly: true,
				applicationServerKey: key,
			})
			.then((res) => res.toJSON())
			.then((subscription) => {
				/* Post Subscription */
				fetch('api/subscribe', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(subscription),
				})
					.then(verifySubscription)
					.catch(console.log);
			});
	});
});

/* Cancle Subscription */
function cancelSubscription() {
	swReg.pushManager.getSubscription().then((subscription) => {
		subscription.unsubscribe().then(() => verifySubscription(false));
	});
}

btnActivadas.on('click', () => cancelSubscription());
