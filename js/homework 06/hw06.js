// ДЗ: Функции и области видимости

// a
// Напишите функцию a, которая просто является коротким именем для alert. Смотрите пример с d(), которая является коротким именем для debugger из материала лекции
    function a(string) {
        alert(string);
    }
    // a("Привет!"); // вызывает alert("Привет!")


// cube
// Напишите функцию cube, которая возвращает число в третьей степени:
    function cube(number){
        return number*number*number;
    }
    // cube(3)


// avg2
// Напишите функцию avg2, которая рассчитывает среднюю для двух чисел:
// формула для подсчета среднего: (a + b) / 2
    function avg2(a,b) {
        return (a+b)/2;
    }
    // avg2(1,2); // возвращает 1.5
    // avg2(10,5); // возвращает 7.5


// sum3
// Напишите функцию sum3 для суммирования 3 чисел:
// Обратите внимание, что sum3 от двух параметров тоже работает корректно.
    function sum3(a,b,c=0) {
        return a+b+c;
    }
    // sum3(1,2,3) // => 6
    // sum3(5,10,100500) // => 100515
    // sum3(5,10) // => 15


// intRandom
// Напишите функцию intRandom, которая принимает два параметра: нижнюю и верхнюю границу, и возвращает целое случайное число из этого диапазона включительно:
// Обратите внимание, что если передан один параметр (intRandom(10) в примере выше), то функция работает как будто первый параметр равен 0, а переданный параметр становится вторым параметром (intRandom(0,10))
// Используйте умножение для расширения значения встроенной функции Math.random c диапозона 1, сложениe для смещения результата на первый параметр, и Math.round для округления результата
    function intRandom(a,b) {
        if (b === undefined) {
            b=a
            a=0
        } 
        return +(a+(b-a)* Math.random(1,2)).toFixed(0);
    }
    // intRandom(2,15) // возвращает целое случайное число от 2 до 15 (включительно)
    // intRandom(-1,-1) // вернет -1
    // intRandom(0,1) // вернет 0 или 1
    // intRandom(10) // вернет 0 до 10 включительно


// greetAll
// Сделайтей функцию, которая приветствует всех, кто передан в качестве параметров.
// Вам поможет arguments и for
    function greetAll() {
        var string = "Hello";
        for (let item of arguments) {
            if (item === arguments[0]) {
                string += " " + item
            } 
            else {
                string += ", " + item
            }
        }
        return string + ".";
    }
    // greetAll("Superman") // выводит alert "Hello Superman"
    // greetAll("Superman", "SpiderMan") // выводит alert "Hello Superman, SpiderMan"
    // greetAll("Superman", "SpiderMan", "Captain Obvious") // выводит alert "Hello Superman, SpiderMan, Captain Obvious"


// sum
// Напишите функцию sum, которая сумирует любое количество параметров: Используйте псевдомассив arguments для получения всех параметров, и for для итерирования по нему
    function sum() {
        let result = 0
        for (let item of arguments) {
            result += item
        }
        return result;
    }
    // sum(1) // => 1
    // sum(2) // => 2
    // sum(10,20,40,100) // => 170


// Union
// Всё предыдущие функции и примеры с ними объедините в функции, которые вызывайте в switch по имени задания:
    // switch (prompt("Введите название функции.")) {
    //     case "a": a("Хай!")
    //         break;
    //     case "cube": alert(cube(3))
    //         break;
    //     case "avg2": alert(avg2(5,15))
    //         break;
    //     case "sum3": alert(sum3(1,2,3))
    //         break;
    //     case "intRandom": alert(intRandom(15))
    //         break;
    //     case "greetAll": alert(greetAll("Tanos", "Ultron", "Loki"))
    //         break;
    //     case "sum": alert(sum(1,2,3,4,5))
    //         break;
    //     default:
    //     alert('Функция не найдена.');
    // }


// Union declarative
// Используйте ассоциативный массив вместо switchs
    var functions = new Map([
        ["a", a("Хай!")],
        ["cube", cube(3)],
        ["avg2", avg2(5,15)],
        ["sum3", sum3(1,2,3)],
        ["intRandom", intRandom(15)],
        ["greetAll", greetAll("Tanos", "Ultron", "Loki")],
        ["sum", sum(1,2,3,4,5)]
    ]);
    functions.get(prompt("Введите название функции."))