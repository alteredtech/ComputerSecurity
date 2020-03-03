
function onEncryptPressed() {
	let plaintext = document.getElementById("plaintextInput").value;
	let key = document.getElementById("plaintextKeyInput").value;
	let result = encrypt(plaintext, key);
	document.getElementById("encryptResult").innerHTML = result;
}

function onDecryptPressed() {
	let ciphertext = document.getElementById("ciphertextInput").value;
	let key = document.getElementById("ciphertextKeyInput").value;
	let result = decrypt(ciphertext, key);
	document.getElementById("decryptResult").innerHTML = result;
}