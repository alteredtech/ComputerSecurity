document.getElementById("queryInput").value = "UNION SELECT * FROM dbo.CreditCards"

function main() {
	let query = document.getElementById("queryInput").value;
	determineScore(query);
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

function determineScore(query) {
	console.log(query)
	query = query.replace( /[\r\n]+/gm, " " )
	console.log(query)
	let rating = "10";
	let reasons = "NOT DONE YET..."

	let pointsAgainst = 0
	var keywords = ['convert','sysobjects','SHUTDOWN','UNION SELECT','DROP TABLE','CREATE PROCEDURE','ASCII','exec','1=1','1=0',';', '1=1 --', '1=0 --']
	var reasonsArray = []
	for(let i = 0; i < keywords.length; i++) {
		if(query.includes(keywords[i])) {
			pointsAgainst++
			reasonsArray.push(keywords[i])
		}
	}
	if(pointsAgainst > 10) {
		rating = "0"
	}
	else {
		rating = (10-(pointsAgainst%10)).toString()
	}
	let outputReasons = []
	let otherKeyword = false;
	if(reasonsArray.length != 0){
		for(let i = 0; i < reasonsArray.length; i++) {
			console.log(reasonsArray)
			switch(reasonsArray[i]) {
				case "convert":
					outputReasons.push("Illegal/logically Incorrect")
					break;
				case "SHUTDOWN":
				case "CREATE PROCEDURE":
					outputReasons.push("Stored Procedures");
					break;
				case "UNION SELECT":
					outputReasons.push("Union");
					break;
				case "ASCII":
					outputReasons.push("Inference Timing")
					break;
				case "exec":
					outputReasons.push("Alternate Encoding");
					break;
				case "1=1":
					outputReasons.push("Tautologies");
					break;
				case "1=0 --":
				case "1=1 --":
					outputReasons.push("Inference Blind");
					break;
				case ";":
				case "--":
					outputReasons.push("Piggy-backed");
					break;
				default:
					otherKeyword = true;
			}
		}
		console.log(outputReasons)
	}
	if(otherKeyword){
		outputReasons.push("Malicious keywords used")
	}
	if(outputReasons.length == 1) {
		reasons = outputReasons[0]
	}
	var outText = ""
	for(let i = 0; i < outputReasons.length; i++) {
		if(i==0){
			outText += outputReasons[i]
		}
		else {
			outText += " and " + outputReasons[i]
		}
	}
	reasons = outText


	writeOutput(rating, reasons);
}