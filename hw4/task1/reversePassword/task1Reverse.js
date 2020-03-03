
function finalWord(inputWord) {
    var inWordLength = inputWord.length;
    var finalWord = "";
        for(i = 0; i < (inWordLength-1)/2; i++){
            finalWord += inputWord[i]
        }
    return finalWord
}

function removeExtraChar(inputWord) {
    var char = ["!","@","$","#","%","&"]
    var num = ["1","2","3","4","5","6","7","8","9"]
    var tempword = "";
    var numberLength = inputWord.length-2
    while (tempword.length != numberLength) {
        for (j = 0; j < char.length - 1; j++) {
            if ((inputWord[inputWord.length-1] == char[j]) || (inputWord[inputWord.length-2] == char[j])) {
                tempword = inputWord.substring(0,inputWord.length-1)
                inputWord = tempword
            }
        }
        for (k = 0; k < num.length - 1; k++) {
            if ((inputWord[inputWord.length-1] == num[k]) || (inputWord[inputWord.lenth-2] == num[k])) {
                tempword = inputWord.substring(0,inputWord.length-1)
                inputWord = tempword
            }
        }
    }
    return tempword
}

function unReplace(inputWord) {
    console.log(inputWord)
    for (j = 0; j < inputWord.length - 1; j++) {
        inputWord = inputWord.replace('!','i').replace('%','b').replace('(','c').replace('0','o').replace('$','s').replace('~','e').replace('6','g').replace('+','t').replace('!','I').replace('8','B').replace('(','C').replace('0','O').replace('5','S').replace('3','E').replace('[','G').replace('7','T').replace('@','a').replace('@','A').replace('B','8').replace('E','3')
        inputWord = inputWord.charAt(0).toLowerCase() + inputWord.slice(1)
    }
    console.log(inputWord)
    return inputWord
}

function spellBackwards(inputWord) {
    var newString = "";
    for (i = inputWord.length - 1; i >= 0; i--) {
        newString += inputWord[i]
    }
    return newString
}

function main() {
    let dictionaryWord = document.getElementById("PasswordInput").value;
    var result = finalWord(spellBackwards(unReplace(removeExtraChar(dictionaryWord))))
    document.getElementById("output").innerHTML = result;
}