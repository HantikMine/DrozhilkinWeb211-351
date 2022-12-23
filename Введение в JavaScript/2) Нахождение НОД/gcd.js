function gcd(a, b) {
	let x = 0;
	while(a != b){
		if(a > b) {
			a = a - b;
		} else {
			b = b - a;
		}
	x = a;
	}
	return x;
}

const number_1 = +prompt("Введите первое число");
const number_2 = +prompt("Введите второе число");

alert("НОД: " + gcd(number_1, number_2));

