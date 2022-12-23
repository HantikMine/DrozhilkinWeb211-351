function getSortedArray(mas, key) {

    let k = mas.length;
    for (let i = 0; i < k; i++)
    {
        for (let j = 0; j < (k - i - 1); j++)
        {
            
            if (mas[j][key] > mas[j + 1][key])
            {
                
                let s = {}; // новый пустой объект
                for (let k in mas) {
                    s[k] = mas[k];
                }
                s = mas[j];
                mas[j] = mas[j + 1];
                mas[j + 1] = s;
            }
        }

    }
    return mas;
}


let array = [{name: 'Ярослава', age: 19}, {name: 'Аслан', age: 18}, {name: 'Наталья', age: 50}, {name: 'Игорь', age: 46}, {name: 'Виктория', age: 27}];
//array = getSortedArray(array, 'age')
 // [{name: 'Аслан', age: 18}, {name: 'Ярослава', age: 19}, {name: 'Виктория', age: 27}, {name: 'Игорь', age: 46}, {name: 'Наталья', age: 50}];
array = getSortedArray(array, 'age');
console.log(array);