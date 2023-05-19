class Camara {
	constructor(videoNode) {
		console.log('[Camera Class] - Constructor');
		this.videoNode = videoNode;
	}

	encender() {
		navigator.mediaDevices
			.getUserMedia({ video: { width: 300, height: 300 }, audio: false })
			.then((stream) => {
				this.stream = stream;
				this.videoNode.srcObject = stream;
			});
	}

	apagar() {
		this.videoNode.pause();

		if (this.stream) {
			this.stream.getTracks()[0].stop();
		}
	}

	tomarFoto() {
		// Crear un elemento canvas para renderizar ahí la foto
		let canvas = document.createElement('canvas');

		// Colocar las dimensiones igual al elemento del video
		canvas.setAttribute('width', 300);
		canvas.setAttribute('height', 300);

		// Obtener el contexto del canvas
		let context = canvas.getContext('2d'); // una simple imagen

		// Dibujar la imagen dentro del canvas
		context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

		this.foto = context.canvas.toDataURL();

		// Limpiar video
		canvas = null;
		context = null;

		return this.foto;
	}
}
