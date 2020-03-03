function main() {
    let inputpass = document.getElementById("passwordInput").value;
    let inputid = document.getElementById("idInput").value;

    let password = localStorage.getItem(inputid + "password");
    let salt = localStorage.getItem(inputid + "salt");
    inputpass = hashFunction(inputpass + salt);

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (localStorage.getItem(inputid + "lock") == null) {
        localStorage.setItem(inputid + "lock", time);
    }

    if (time >= localStorage.getItem(inputid + "lock")) {
        console.log("safe");
        console.log(password.toString().trim() == inputpass.toString().trim())
        if (password.toString().trim() == inputpass.toString().trim()) {
            console.log("Same");

            localStorage.setItem(inputid, 0);
            console.log(localStorage.getItem(inputid));
        }
        else {
            console.log("Different");
            document.getElementById("output").innerHTML = "Wrong password";
            var x = localStorage.getItem(inputid);
            x++;
            localStorage.setItem(inputid, x);
            if (x % 3 == 0 && x > 0) {
                lockouttime = Math.pow(2, ((x / 3) - 1));
                newtime = today.getHours() + ":" + (today.getMinutes() + lockouttime) + ":" + today.getSeconds();
                localStorage.setItem(inputid + "lock", newtime);
                console.log(lockouttime);
            }

        }
    }
    else {
        document.getElementById("output").innerHTML = "Account Locked, please wait until " + localStorage.getItem(inputid + "lock");
    }
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