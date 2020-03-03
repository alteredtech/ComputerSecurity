function main() {
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;
    let salt = Math.floor(Math.random() * 10000) + 1;
    let hashedPass = hashFunction(password + salt);

    localStorage.setItem(email + "password", hashedPass);
    localStorage.setItem(email + "salt", salt);
}

function hashFunction(str) {
    str = str.toString();
    let hash = 237845927;
    let i = 0;

    for (i = 0; i < str.length; i++) {
        let value;
        if (i < str.length - 2) {
            value = str[i].charCodeAt() + str[i + 1].charCodeAt();
        } else {
            value = str[i].charCodeAt() + hash;
        }

        hash ^= ((hash << 5) + value + (hash >> 2));
        hash = parseInt(hash.toString().split("").reverse().join(""));
    }

    return hash.toString(16);
}