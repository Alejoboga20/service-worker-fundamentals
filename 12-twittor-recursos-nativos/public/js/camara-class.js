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

	apagar() {}
}
