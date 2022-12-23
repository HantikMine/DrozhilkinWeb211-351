let alpha = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
let bigalpha = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
function encode(str, shift)
{
    shift %= 33;
    let res = "";
    for (let i = 0; i < str.length; i++)
    {
        if (alpha.includes(str[i]))
        {
            let index = alpha.indexOf(str[i]);
            if (index + shift <= 32)
            {
                res += alpha[index + shift];
            }
            else {
                res += alpha[index + shift - 33];
            }
        }
        else if (bigalpha.includes(str[i])) 
        {
            let index = bigalpha.indexOf(str[i]);
            if (index + shift <= 32)
            {
                res += bigalpha[index + shift];
            }
            else {
                res += bigalpha[index + shift - 33];
            }
        }
        else {
            res += str[i];
        }
    }
    return res;
}

function decode(str, shift)
{
    let res = "";
    for (let i = 0; i < str.length; i++)
    {
        if (alpha.includes(str[i]))
        {
            let index = alpha.indexOf(str[i]);
            if (index - shift >= 0)
            {
                res += alpha[index - shift];
            }
            else {
                res += alpha[index - shift + 33];
            }
        }
        else if (bigalpha.includes(str[i])) 
        {
            let index = bigalpha.indexOf(str[i]);
            if (index - shift >= 0)
            {
                res += bigalpha[index - shift];
            }
            else {
                res += bigalpha[index - shift + 33];
            }
        }
        else {
            res += str[i];
        }
    }
    return res;
}


function cesar(str, shift, action)
{
    if (action == "encode") {
       return encode(str, shift);
    } else if (action == "decode") {
        return decode(str, shift);
    }
}

console.log(cesar("абв", 2, "decode"));
console.log(cesar("юяа", 2, "encode"));
console.log(cesar("эзтыхз фзъзъз", 8, "decode")); 
