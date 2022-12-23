function minDigit(x)
{
    var min=9;

    while (x > 0)
    { 
    	if (x % 10 < min){ 
    		min = x % 10;
    	}

      x = Math.floor(x / 10);
    }

    return min
}

const num_1 = +prompt("Введите неотрицательное число");

alert("Наименьшая цифра: " + minDigit(num_1));