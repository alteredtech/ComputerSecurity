function hash() {
    let str = document.getElementById("inputText").value;
    document.getElementById("output").innerHTML = hashFunction(str);
}

function hashFunction(str)
{
    str = str.toString();
    let hash = 237845927;
    let i    = 0;

    for (i = 0; i < str.length; i++)
    {
        let value;
            if(i < str.length - 2) {
                value = str[i].charCodeAt() + str[i+1].charCodeAt();
            } else {
                value = str[i].charCodeAt() + hash;
            }

        hash ^= ((hash << 5) + value + (hash >> 2));
        hash = parseInt(hash.toString().split("").reverse().join(""));
    }

    return hash.toString(16);
}

