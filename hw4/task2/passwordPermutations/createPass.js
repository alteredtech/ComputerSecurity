

function repeat(inputWord) {
    var outputArray = [inputWord]
    outputArray.push(inputWord+inputWord)
    return outputArray
}

function spellBackwards(inputArray) {
    var newString = "";
    var tempString
    var char = ["!","@","$","#","%","&"]
    var num = ["1","2","3","4","5","6","7","8","9"]
    tempString = inputArray[inputArray.length-1]
    for (i = tempString.length - 1; i >= 0; i--) {
        newString += tempString[i]
    }
    inputArray.push(newString + num[getRandomInt(num.length-1)] + char[getRandomInt(char.length-1)])
    return inputArray
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function replace(inputArray) {
    var tempString
    var capitalized
    tempString = inputArray[inputArray.length-1]
    for (j = 0; j < tempString.length - 1; j++) {
        capitalized = tempString.charAt(0).toUpperCase() + tempString.slice(1)
        capitalized = capitalized.replace('i','!').replace('b','8').replace('c','(').replace('o','0').replace('s','$').replace('e','3').replace('g','6').replace('t','+').replace('I','!').replace('B','8').replace('C','(').replace('O','0').replace('S','5').replace('E','3').replace('G','[').replace('T','7').replace('a','@').replace('A','@')
    }
    inputArray.push(capitalized)
    //console.log(inputArray)
    return inputArray
}

function loop(array) {
    var result = []
    for (let i = 0; i < array.length; i++) {
        console.log(array[i])
        var temparray = replace(spellBackwards(repeat(array[i])))
        result.push(temparray)
    }
    return result
}

function allFunctions(inputWord) {
    return replace(spellBackwards(repeat(inputWord)))
}

function main() {
    let dictionaryWord = document.getElementById("DictionaryInput").value;
    var wordArray = ["password","sunshine","princess","admin","welcome","football","monkey","charlie","donald","bailey","freedom","shadow","baseball","buster","daniel","hannah","thomas","summer","george","harley","jessica","ginger","solo","jordan","tiger","joshua","mustang","michael","master","superman"]
    //var result = []
    // result = loop(wordArray);
    var result = allFunctions(dictionaryWord)
    document.getElementById("output").innerHTML = result;
}