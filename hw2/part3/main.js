
function onEncryptPressed() {
	let plaintext = document.getElementById("plaintextInput").value;
	let ciphertext = document.getElementById("ciphertextInput").value;
	let keyLength = document.getElementById("keyLengthInput").value;
	let result = getKey(plaintext, ciphertext, keyLength);
	document.getElementById("Result").innerHTML = result;
}

function getKey(plaintext, ciphertext, keyLength){
	plaintext = plaintext.replace(/\s/g,'');
	let myArray = [];
	for(i = 0; i < keyLength; i++){
		myArray.push([]);
	}
	let index = 0;
	for(i = 0; i < plaintext.length; i++){
		myArray[index].push(plaintext[i]);
		index++;
		if(index >= myArray.length){
			index = 0;
		}
	}
	let outputNumber = 1;
	let resultArray = Array(keyLength)
	for(i = 0; i < myArray.length; i++){
		let found = false;
		index = 0;
		while(!found){
			let compareString = myArray[index].toString();
			compareString = compareString.replace(/,/g, '');
			if(ciphertext.slice(0, myArray[index].length) == compareString){
				found = true;
				ciphertext = ciphertext.slice(myArray[index].length);
				myArray[index] = ['.'];
				resultArray[index] = outputNumber;
				outputNumber++;
			}
			else{
				index++;
			}
		}
	}
	let result = resultArray.toString();
	result = result.replace(/,/g, '');
	return(result);
}