
function finalWord(inputWord) {
    console.log("final word")
    var inWordLength = inputWord.length;
    var finalWord = "";
        for(i = 0; i < (inWordLength-1)/2; i++){
            finalWord += inputWord[i]
        }
    return finalWord
}

function spellNormal(inputWord) {
    console.log("spell Normal")
    var newString = "";
    for (i = inputWord.length - 1; i >= 0; i--) {
        newString += inputWord[i]
    }
    return newString
}

function unReplace(inputWord) {
    console.log("unreplace")
    for( let i = 0; i < inputWord.length -1; i++) {
        inputWord = inputWord.replace('!','i').replace('%','b').replace('(','c').replace('0','o').replace('$','s').replace('~','e').replace('6','g').replace('+','t').replace('!','I').replace('8','B').replace('(','C').replace('0','O').replace('5','S').replace('3','E').replace('[','G').replace('7','T').replace('@','a').replace('@','A').replace('B','8').replace('E','3')
        inputWord = inputWord.charAt(0).toLowerCase() + inputWord.slice(1)
    }
    return inputWord
}

function removeExtraChar(inputWord) {
    console.log("removeChar")
    var char = ["!","@","$","#","%","&"]
    var num = ["1","2","3","4","5","6","7","8","9"]
    var tempWord = "";
    var numberLength = inputWord.length-2;
    
    while ((tempWord.length != numberLength)) {
        for (let j = 0; j < char.length - 1; j++) {
            if ((inputWord[inputWord.length-1] == char[j]) || (inputWord[inputWord.length-2] == char[j])) {
                tempWord = inputWord.substring(0,inputWord.length-1)
                inputWord = tempWord
            }
        }
        for (let k = 0; k < num.length - 1; k++) {
            if ((inputWord[inputWord.length-1] == num[k]) || (inputWord[inputWord.lenth-2] == num[k])) {
                tempWord = inputWord.substring(0,inputWord.length-1)
                inputWord = tempWord
            }
        }
    }
    return inputWord
}

function allReverseFunctions(inputWord) {
    return finalWord(spellNormal(unReplace(removeExtraChar(inputWord))))
}