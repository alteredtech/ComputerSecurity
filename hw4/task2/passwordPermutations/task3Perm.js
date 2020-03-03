function main() {
    var wordArray = ["password","sunshine","princess","admin","welcome","football","monkey","charlie","donald","bailey","freedom","shadow","baseball","buster","daniel","hannah","thomas","summer","george","harley","jessica","ginger","solo","jordan","tiger","joshua","mustang","michael","master","superman"]
    console.log('generating...');
    var array = []
    var firstPermutation = wordArray[getRandomInt(wordArray.length)]
    var secondPermutation = wordArray[getRandomInt(wordArray.length)]
    var thirdPermutation = wordArray[getRandomInt(wordArray.length)]
    let firstName = document.getElementById("firstNameInput").value;
    array.push(firstName)
    let lastName = document.getElementById("lastNameInput").value;
    array.push(lastName)
    let dateOfBirth = document.getElementById("dateOfBirthInput").value;
    var firstFourYear = dateOfBirth.slice(0,4)
    var lastTwoYear = dateOfBirth.slice(2,4)
    array.push(firstFourYear)
    array.push(lastTwoYear)
    let phoneNumber = document.getElementById("phoneNumberInput").value;
    var str = phoneNumber.replace("-",'')
    var firstSix = str.slice(0,6)
    var lastFour = str.slice(7,11)
    array.push(firstSix)
    array.push(lastFour)
    let streetAddress = document.getElementById("streetAddressInput").value;
    var streetArray = streetAddress.split(" ")
    array.push(streetArray[0])
    array.push(streetArray[1])
    array.push(streetArray[2])
    let aptNumber = document.getElementById("aptNumberInput").value;
    array.push(aptNumber)
    let city = document.getElementById("cityInput").value;
    array.push(city)
    let state = document.getElementById("stateInput").value;
    array.push(state)
    let zipCode = document.getElementById("zipCodeInput").value;
    array.push(zipCode)
    let email = document.getElementById("emailInput").value;
    email = email.substring(0, email.indexOf('@'))
    var emailArray = email.split(/[^A-Za-z0-9]+/)
    if(emailArray.length == 2){
        array.push(emailArray[0])
        array.push(emailArray[1])
    }
    else {
        array.push(emailArray[0])
    }
    // firstPermutation.push(lastTwoYear)
    // firstPermutation.push(emailArray[0])
    firstPermutation = firstPermutation+lastTwoYear+emailArray[0]
    // secondPermutation.push(streetArray[1])
    // secondPermutation.push(lastFour)
    secondPermutation = secondPermutation+streetAddress[1]+lastFour
    // thirdPermutation.push(city)
    // thirdPermutation.push(aptNumber)
    thirdPermutation = thirdPermutation+city+aptNumber

    var allPermArray = []
    allPermArray.push(firstPermutation)
    allPermArray.push(secondPermutation)
    allPermArray.push(thirdPermutation)
    console.log("permutation array")
    console.log(allPermArray)
    console.log(allPermArray.length)

    var result = loop(allPermArray)
    document.getElementById("output").innerHTML = result
}

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
    for (let i = tempString.length - 1; i >= 0; i--) {
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
    for (let j = 0; j < tempString.length - 1; j++) {
        capitalized = tempString.charAt(0).toUpperCase() + tempString.slice(1)
        capitalized = capitalized.replace('i','!').replace('b','%').replace('c','(').replace('o','0').replace('s','$').replace('e','~').replace('g','6').replace('t','+').replace('I','!').replace('B','8').replace('C','(').replace('O','0').replace('S','5').replace('E','3').replace('G','[').replace('T','7').replace('a','@').replace('A','@').replace('B','8')
    }
    inputArray.push(capitalized)
    //console.log(inputArray)
    return inputArray
}

function loop(array) {
    var result = []
    for (let i = 0; i < array.length; i++) {
        //console.log(array[i])
        var temparray = replace(spellBackwards(repeat(array[i])))
        result.push(temparray.join())
        console.log("-----results-----")
        console.log(result)
    }
    return result
}
