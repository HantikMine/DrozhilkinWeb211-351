function pow(x, n) {
	if(n === 0) return 1;
	if(x === 0) return 0;
	if(x === 1) return 1;
	if(n % 1 !== 0 || n < 0) return "Число должно быть натуральным";
    
	let result = 1;
	while(n !== 0) {
		n -= 1;
		result = result * x;
	}

	return result;
}

const number = +prompt("Введите число");
const degree = +prompt("Введите степень");

alert("Результат: " + pow(number, degree));
