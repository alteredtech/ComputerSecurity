

function repeat(inputWord) {
    return inputWord+inputWord 
}

function spellBackwards(inputWord) {
    var newString = "";
    var char = ["!","@","$","#","%","&"]
    var num = ["1","2","3","4","5","6","7","8","9"]
    for (i = inputWord.length - 1; i >= 0; i--) {
        newString += inputWord[i]
    }
    inputWord = newString + num[getRandomInt(num.length-1)] + char[getRandomInt(char.length-1)]
    return inputWord
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function replace(inputWord) {
    inputWord = inputWord.charAt(0).toUpperCase() + inputWord.slice(1)
    inputWord = inputWord.replace('i','!').replace('b','8').replace('c','(').replace('o','0').replace('s','$').replace('e','3').replace('g','6').replace('t','+').replace('I','!').replace('B','8').replace('C','(').replace('O','0').replace('S','5').replace('E','3').replace('G','[').replace('T','7').replace('a','@').replace('A','@')
    return inputWord
}

function allFunctionsCreate(inputWord) {
    return replace(spellBackwards(repeat(inputWord)))
}
