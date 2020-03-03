var MAX = 100
var MIN = 20

function generatePublicPrivateKeyCombination() {
	let primes = [getLargePrimeNumber(), getLargePrimeNumber()];
	let m = primes[0] * primes[1];
	let fn = (primes[0] - 1) * (primes[1] - 1);
	let relativePrimes = getAllRelativePrmeNumbers(fn);
	let chosenRelativePrimeIndex = Math.round(Math.random() * relativePrimes.length);

	let pe = relativePrimes[chosenRelativePrimeIndex]
	setPublicKey({
		P_e: pe,
		m: m
	});

	setPrivateKey({
		P_d: getPrivateDecryptionExponent(pe, fn),
		m: m
	})
	document.getElementById("output").innerHTML = `<div class="done">Done!</div>`
}

function setPublicKey(value) {
	localStorage.setItem("publicKey", JSON.stringify(value))
}

function setPrivateKey(value) {
	localStorage.setItem("privateKey", JSON.stringify(value))
}

function isPrime(num) {
	if (num <= 1) {
		return true
	} else if (num <= 3) {
		return true
	} else if (num % 2 === 0 || num % 3 === 0) {
		return false
	}

	let i = 5
	while (i * i <= num) {
		if (num % i === 0 || num % (i + 2) === 0) {
			return false
		}
		i += 6
	}
	return true
}

function getLargePrimeNumber() {
	let x = Math.round((Math.random() * MAX) + MIN);
	if (x % 2 == 0) {
		x--;
	}
	while (!isPrime(x)) {
		x -= 2;
	}
	return x;
}

function getAllRelativePrmeNumbers(x) {
	let results = [];
	for (let i = 2; i < x; i++) {
		if (gcd(i, x) == 1) {
			results.push(i);
		}
	}
	return results;
}

function gcd(a, b) {
	if (a == 0 || b == 0) return false;
	if (a == b) return a;
	if (a > b) return gcd(a - b, b);
	return gcd(a, b - a);
}

function getPrivateDecryptionExponent(P_e, fn) {
	P_e = P_e % fn;
	for (let x = 1; x <= fn; x++) {
		if ((P_e * x) % fn == 1) {
			return x;
		}
	}
	throw ("pie");
}