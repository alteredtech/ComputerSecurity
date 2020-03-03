var userFieldsGlobal = [];
var userReversedPassGlobal = "";

function main() {
    console.log('generating...');
    var array = []
    //separates combined fields into distint amounts, birth year, phone number, street address
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
    // for(let i = 0; i < streetArray.length; i++){
    //     array.push(streetArray[i])
    // }
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

    //the 30 dictionary word array and combines that to the user fields array to set the global array
    var wordArray = ["password","sunshine","princess","admin","welcome","football","monkey","charlie","donald","bailey","freedom","shadow","baseball","buster","daniel","hannah","thomas","summer","george","harley","jessica","ginger","solo","jordan","tiger","joshua","mustang","michael","master","superman"]
    //this is purely to keep the dictionary words from being next to the user fields within the array
    array.push(" ")
    if(array.length < 17) {
        //since the email may have either one or two fields, it will cause a problem if there is one less and
        //the logic thinks that there is a dictionary word when there actually isnt
        array.push(" ")
    }
    combinedArray = array.concat(wordArray)
    userFieldsGlobal = combinedArray.slice()

    let password = document.getElementById("passwordGenInput").value
    var generatedPassword = allFunctionsCreate(password)
    document.getElementById("outputPassword").innerHTML = generatedPassword
}
//reverses the password to then be analyized by the comparePassword
function passMain() {
    console.log("reversing")
    let userPassword = document.getElementById("passwordInput").value
    var reversedPassword = allReverseFunctions(userPassword)
    document.getElementById("output").innerHTML = reversedPassword

    userReversedPassGlobal = reversedPassword
    var comparedResult = comparePassword(userReversedPassGlobal,userFieldsGlobal)
    document.getElementById("isSecure").innerHTML = comparedResult
}

//this section taken in the password and userfields
//goes through to collected how many fields are the same from the array
//does a switch statement to get what those fields are
//then writes a message
function comparePassword(userReversedPass, submittedUserField) {
    console.log("comparing...")
    var text = []
    var foundUserFields = []
    //collects fields
    for(let i = 0; i < submittedUserField.length-1; i++) {
        if(userReversedPass.includes(submittedUserField[i])) {
            //if the user didnt enter anything
            if(submittedUserField[i] == ""){}
            else {
                foundUserFields.push(i)
            }
        }
    }
    console.log(foundUserFields)
    if(foundUserFields.length != 0) {
        //finds the field that number is
        for(let i = 0; i < foundUserFields.length; i++){
            switch(foundUserFields[i]) {
                case 0:
                case 1:
                    text.push("first or last name");
                    break;
                case 2:
                case 3:
                    text.push("part of your date of birth");
                    break;
                case 4:
                case 5:
                    text.push("part of your telephone number");
                case 6:
                case 7:
                case 8:
                    text.push("part of your street address");
                    break;
                case 9:
                    text.push("appartment number");
                    break;
                case 10:
                    text.push("city");
                    break;
                case 11:
                    text.push("state");
                    break;
                case 12:
                    text.push("zip");
                    break;
                case 13:
                case 14:
                    text.push("your email");
                    break;
                //I did just want it to be a case (# < i < array length but it never worked so I went the lazy route)
                default:
                    text.push("using dictionary word");
            }
        }
    }
    else {
        //this lazy push statement
        text.push("secure")
    }
    //writes the message
    if(text[0]=="secure") {
        return "your password is secure!"
    }
    else {
        console.log("making text")
        if(text.length == 1) {
            return "your password is not secure because it may contain " + text[0]
        }
        var outText = ""
        for(let i = 0; i < text.length; i++) {
            if(i==0){
                outText += text[i]
            }
            else {
                outText += " and " + text[i]
            }
        }
        return "your password is not secure because it may contain " + outText
    }
}