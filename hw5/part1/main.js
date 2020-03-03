document.getElementById("bodyInput").value = "TEST INPUT"

let flagwords = ["now", "today", "immediately", "forthwith", "quickly", "directly", "instantly", "atonce", "emergency", 
				"24hours", "singles", "babes", "nearby", "extramoney", "ownboss", "getrich", "creditcard", "free", "offer",
				"fastcash", "pureprofit", "prize", "debt", "clickhere", "clickbelow", "subscribe", "spam", "junk",
				"viagra", "100%", "givingaway", "won", "win", "selected", "congratulations", "risk", "offer", "urgent"]
let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

function main() {
	let emailAddress = document.getElementById("emailInput").value;
	let emailBody = document.getElementById("bodyInput").value;
	determineScore(emailAddress, emailBody);
}

function writeOutput(rating, reasons) {
	document.getElementById("output").innerHTML =
		`
		<div class="rating">
			Secuirty Rating: ${rating}/10
		</div>
		<div class="reasons">
			Resons: ${reasons}
		</div>
	`
}

function determineScore(emailAddress, emailBody) {
	let rating = "10";
	let reasons = "";
	var flags = 0
	var words = emailBody.split(' ').length;
	emailBody = emailBody.toLowerCase();
	emailBody = emailBody.replace(/\s/g, '');
	for(var i = 0; i < flagwords.length; i++){
		if(emailBody.includes(flagwords[i])){
			flags++;
			reasons += "Flag word " + flagwords[i] + " found. ";
		}
	}
	let domain = getDomain(emailAddress);
	for(var i = 0; i < numbers.length; i++){
		if(domain.includes(numbers[i])){
			flags++;
			reasons += numbers[i] + " found in domain. "
		}
	}
	if(emailBody.includes(domain)){
		console.log("good email");
	}
	var count = occurrences(emailBody, domain, false);
	flags -= count;
	if(count > 0){
		reasons += "Domain name found in email. ";
	}
	console.log(flags);
	console.log(words);
	score = flags/words;
	score = score * 10;
	rating = score.toString();

	// DO WORK

	//

	writeOutput(rating, reasons);
}

function getDomain(emailAddress){
	var start = 0;
	var end = 0;
	for(var i = 0; i < emailAddress.length; i++){
		if(emailAddress[i] == '@'){
			start = i + 1;
		}
		if(emailAddress[i] == '.' && emailAddress[i+1] == 'c' && emailAddress[i+2] == 'o' && emailAddress[i+3] == 'm'){
			end = i;
		}
	}
	return(emailAddress.slice(start, end));
}

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}