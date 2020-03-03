function decrypt() {
	let cipherText = document.getElementById('ciphertext').value
	cipherText = cipherText.split("$");
	let privateKey = getPrivateKey();
	pd = new BigNumber(privateKey.P_d.toString());
	m = new BigNumber(privateKey.m.toString());
	let plaintext = '';
	cipherText.forEach(char => {
		char = new BigNumber(char.toString());
		plaintext += String.fromCharCode(char.pow(pd).mod(m));
	})

	document.getElementById("output").innerHTML = `<div class="done">Plaintext: ${plaintext}</div>`
}

function getPrivateKey() {
	return JSON.parse(localStorage.getItem("privateKey"))
}