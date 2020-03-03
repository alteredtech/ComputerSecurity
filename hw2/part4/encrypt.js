function encrypt() {
	let plaintext = document.getElementById("plaintext").value;
	let plaintextArr = stringToBits(plaintext);
	let publicKey = getPublicKey();
	let pe = new BigNumber(publicKey.P_e).toString();
	let m = new BigNumber(publicKey.m.toString())
	let cipherText = "";
	plaintextArr.forEach(char => {
		char = new BigNumber(char.toString());
		cipherText += char.pow(pe).mod(m).toString();
		cipherText += "$";
	});
	cipherText = cipherText.slice(0, cipherText.length -1);
	document.getElementById("output").innerHTML = `<div class="done">${cipherText}</div>`
}

function getPublicKey() {
	return JSON.parse(localStorage.getItem("publicKey"))
}

function stringToBits(message){
	let arr = []
	for(let i = 0; i < message.length; i++) {
		arr.push(message[i].charCodeAt(0));
	}
	return arr;
}