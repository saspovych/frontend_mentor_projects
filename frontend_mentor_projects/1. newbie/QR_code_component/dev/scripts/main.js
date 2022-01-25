var qrcode = new QRCode(document.getElementById("qrcode"), {
	text: "https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H",
	width: 200,
	height: 200,
	colorDark : "#FFFFFF",
	colorLight : "#0B7FAB",
	correctLevel : QRCode.CorrectLevel.H
});