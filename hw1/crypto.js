let polySquare = [
	["E", "2", "R", "F", "Z", "M"],
	["Y", "H", "3", "0", "B", "7"],
	["O", "Q", "A", "N", "U", "K"],
	["P", "X", "J", "4", "V", "W"],
	["D", "1", "8", "G", "C", "6"],
	["9", "I", "S", "5", "T", "L"]
]

function listSort(a, b) {
	return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0
}

function getDecimalValueFromSquare(val) {
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 6; j++) {
			if (polySquare[i][j] == val) {
				return `${i}${j}`;
			}
		}
	}
}

function getBinaryFromDecimal(dec) {
	let res = (dec >>> 0).toString(2);
	while (res.length < 6) {
		res = "0" + res;
	}
	return res;
}

function xor(input, key) {
	let result = "";
	for (let i = 0; i < 6; i++) {
		result += input[i] == key[i] ? "0" : "1"
	}
	return result;
}

function getColumnarTransportWord(polySquareKey) {
	let polySquareOutput = '';
	for (let i = 0; i < polySquareKey.length; i += 2) {
		polySquareOutput += polySquare[polySquareKey[i]][polySquareKey[i + 1]];
	}
	return polySquareOutput;
}

function encrypt(plaintext, key) {
	// Remove whitespace from plaintext and key with Regex
	plaintext = plaintext.replace(/\s/g,'');
	key = key.replace(/\s/g,'');

	let polySquareKey = key.slice(0, key.length - 2);
	let oneTimePadKey = getBinaryFromDecimal(key.slice(key.length - 2));
	let polySquareOutput = getColumnarTransportWord(polySquareKey);

	let cList = [];
	for (let i = 0; i < polySquareOutput.length; i++) {
		cList.push([polySquareOutput[i]]);
	}

	let currList = 0;
	for (let i = 0; i < plaintext.length; i++) {
		cList[currList].push(plaintext[i]);
		currList++;
		if (currList >= cList.length) {
			currList = 0;
		}
	}
	cList = cList.sort(listSort);


	let cipher1 = '';
	for (let i = 0; i < cList.length; i++) {
		cList[i].shift();
		for (let j = 0; j < cList[i].length; j++) {
			cipher1 += cList[i][j];
		}
	}

	let binaryCipher1 = [];
	for (let i = 0; i < cipher1.length; i++) {
		binaryCipher1.push(getBinaryFromDecimal(getDecimalValueFromSquare(cipher1[i])));
	}

	let cipherText = '';
	for (let i = 0; i < binaryCipher1.length; i++) {
		let res = parseInt(xor(binaryCipher1[i], oneTimePadKey), 2);
		cipherText += res.toString().length == 2 ? res.toString() : "0" + res.toString();
	}

	return cipherText
}

function decrypt(ciphertext, key) {
	// Remove whitespace from ciphertext and key with Regex
	ciphertext = ciphertext.replace(/\s/g,'');
	key = key.replace(/\s/g,'');

	let polySquareKey = key.slice(0, key.length - 2);
	let oneTimePadKey = getBinaryFromDecimal(key.slice(key.length - 2));
	let polySquareOutput = getColumnarTransportWord(polySquareKey);

	let bar = '';
	for (let i = 0; i < ciphertext.length; i += 2) {
		let res = (parseInt(xor(getBinaryFromDecimal(` ${ciphertext[i]}${ciphertext[i + 1]}`), oneTimePadKey), 2)).toString();
		let foo = res.length == 2 ? res : "0" + res;
		bar += polySquare[foo[0]][foo[1]];
	}

	let currValue = 0;
	let cTransport = [];
	for (let i = 0; i < polySquareOutput.length; i++) {
		cTransport.push([`${polySquareOutput[i]}`]);
	}
	for (let i = 0; i < bar.length; i++) {
		cTransport[currValue].push(".");
		currValue++;
		if (currValue >= polySquareOutput.length) {
			currValue = 0;
		}
	}
	cTransport = cTransport.sort(listSort);

	currValue = 0;
	for (let i = 0; i < cTransport.length; i++) {
		for (let j = 1; j < cTransport[i].length; j++) {
			cTransport[i][j] = bar[currValue];
			currValue++;
		}
	}

	let resultArray = [];
	for (let i = 0; i < polySquareOutput.length; i++) {
		let currLetter = polySquareOutput[i];
		let j = 0;
		let found = false;
		while (!found) {
			if (cTransport[j][0] == currLetter) {
				resultArray.push(cTransport[j]);
				cTransport = cTransport.filter(x => x !== cTransport[j]);
				found = true;
			} else {
				j++;
			}
		}
	}

	let plaintext = '';
	let j = 0;
	let k = 1;

	for (let i = 0; i < bar.length; i++) {
		plaintext += resultArray[j][k];
		j++;
		if (j >= resultArray.length) {
			j = 0;
			k++;
		}
	}

	return plaintext;
}