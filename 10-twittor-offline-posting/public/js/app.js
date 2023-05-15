var url = window.location.href;
var swLocation = '/twittor/sw.js';

if (navigator.serviceWorker) {
	if (url.includes('localhost')) {
		swLocation = '/sw.js';
	}

	navigator.serviceWorker.register(swLocation);
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

// user, Id with Hero
var user;

// ===== Codigo de la aplicaciÃ³n

function createMessageInHTML(mensaje, personaje) {
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
		modalAvatar.attr('src', 'img/avatars/' + user + '.jpg');
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
	user = $(this).data('user');

	titulo.text('@' + user);

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
	var message = txtMensaje.val();
	if (message.length === 0) {
		cancelarBtn.click();
		return;
	}

	fetch('api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			message,
			user,
		}),
	})
		.then((res) => res.json())
		.then((res) => console.log('app.js', res))
		.catch((err) => console.log('app.json error', err));

	createMessageInHTML(message, user);
});

//Get Messages from server
function getMessages() {
	fetch('http://localhost:3000/api')
		.then((res) => res.json())
		.then((messages) => {
			messages.forEach((message) => createMessageInHTML(message.message, message.user));
		});
}

getMessages();
