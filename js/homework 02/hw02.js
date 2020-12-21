// assign: evaluation
    var a = (5); // Число является выражением.
    var b, c;

    ( (b) = ( (a) * (5) ) ); 
    ( b = ( c = ( (b) / (2) ) ) );
    // Переменная так же является выражением. 
    // Результат умножения или деления двух значений - математических операций (и не только) - являются выражением.
    // Операция присвоения (но не при объявлении переменной) является выражением.


// semicolon: error
// Сделайте несколько примеров кода, отсутствие ; в которых приводит к синтаксической ошибке
    // Example 0 - с занятия
        var a = 1; b = 2

    // Issues with "skobo4ki".
    // Example 1 - "("
        var b = 1; c = 2; d = 3, e = 4;
        a = b + c //;
        (d + e) == 6

    // Example 10 - "["
        prompt("Неудачненько.") //;
        [1,2].map(x => x*x)

    // Example 11 - "/"
    a = "Check me completely. You are the 1!" //;
    /\d/i.exec(a)
    // Do You use "RegExp"?

    // Example 100 - "+" and "-"... Hm...
    // I just hope I'll not take drugs.

    // Источники: 
    // https://learn.javascript.ru/coding-style - маленький ввод.
    // https://learn.javascript.ru/structure#semicolon - немного больше.
    // https://habr.com/ru/post/111563/ - нямка. Плюс "ограниченное порождение" (ещё переваривается мною) - для постфиксных операторов ++ и --, операторы continue, break (типа два с опциональным идентификатором передачи управления)и return. Есть и про операторы continue и throw. Перечитаю...
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp - просто позырить на RegExp".
    // Этого пока достаточно или есть ещё нюансы?

// semicolon: mistake
// Сделайте несколько примеров кода, наличиe или отсутствие ; в которых приводит к логической ошибке (т. е. код выполняется без синтаксических ошибок, но делает не то, что задумано)
    // Example 0 - учения мать
    var popka
    var memory
    var isDissociativeIdentityDisorder
    isDissociativeIdentityDisorder = false
    
    zaloop: for(var i = 1; i <= 6; i++) {
        popka = "Molodets"
        memory = popka
        for (var j = 1; j <= 2; j++) {
            if (!(popka == "durak")) {
                console.log(`Popka - ${popka}!!!`)
            }
            else; { //
                console.log(`Popka - ne ${popka}, a polnuy durak!!!`);
                popka = "durak"
                break // 
                zaloop
            }
        }
        if (memory != popka) {
            isDissociativeIdentityDisorder = true
        }
    }
    // При изучении нового языка всякий в первую очередь стремится научиться на нём ругаться.
    // Обязуюсь не писать в подобном стиле в коммерческом коде.

    // Example 1


// Number: age
// С помощью prompt спросить у пользователя его возраст и подсчитать год рождения. Год рождения вывести с помощью alert.
    var userAge = +prompt("Сколько Вам лет?")
    var currentDate = new Date
    var userBirthYear = currentDate.getFullYear() - userAge
    alert(`Вы родились в ${userBirthYear} году.`)


// Number: temperature
// С помощью prompt спросить у пользователя температуру в градусах Цельсия и перевести их в Фаренгейты и/или наоборот.
    var degreesCelsius = +prompt("Введите значение температуры в градусах Цельсия.")
    var degreesFahrenheit = Math.round(degreesCelsius * 1.8 + 32)
    alert(`Температура в ${degreesCelsius} градусов Цельсия соответствует приблизительно ${degreesFahrenheit} градусам Фаренгейта.`)


// Number: divide
// Сделайте калькулятор для расчета деления нацело двух чисел. Используйте Math.floor или альтернативы.
    var dividend = +prompt("Введите делимое.")
    var divider = +prompt("Введите делитель.")
    var quotient
    // 0 <= remainder < divider
    if (divider > 0) {
        quotient = (Math.floor(dividend / divider)).toFixed(10)
    }
    else {
        quotient = (Math.ceil(dividend / divider)).toFixed(10)
    }
    var remainder = dividend - (divider * quotient).toFixed(10)
    alert (`Остаток от деления числа ${dividend} на число ${divider} составляет ${remainder} .`)


// Number: odd
// С помощью prompt узнайте число, введенное пользователем. С помощью if проверьте что число корректно преобразовано из строки. В случае ошибки выведите сообщение Выведите четное число или нет, используя if.
    var number = prompt("Введите число.")
    if (isNaN(number)) {
        alert("Введены некорректные данные. Введите, пожалуйста, число.")
    }
    else if ((number % 2) == 0) {
        alert("Введено чётное число.")
    }
    else {
        alert("Введено нечётное число.")
    }
    

// String: greeting
// Спросите у пользователя имя, и поприветствуйте его с помощью alert.
    var userName = prompt("Как вас зовут?")
    alert(`Приветствую, ${userName}!`)


// String: lexics
// Спросите у пользователя текст, и проверьте его на наличие некорректного слова или нескольких некорректных слов. Используйте метод indexOf (или includes) строки:
    var text = prompt("Введите текст.")
    var badWordsMassive = [
        "пизд",
        "хуй",
        "хуе",
        "хуё",
        "ёбан",
        "ебан",
        "ёбат",
        "ебат",
        "ёбн",
        "ебн",
        "ёбу",
        "ебу", // просто "еба" не получится, потому что будет какой-то электронный базар или бар
    ]
    var detectedBadWordMassive = (badWordsMassive.map((badWord) => text.indexOf(badWord)))
    var isBadWordDetected = false
    detectedBadWordMassive.map( (x) => x != -1 ? isBadWordDetected = true : x )
    if (isBadWordDetected) {
        alert("Обнаружено плохое слово!")
    }
    else {
        alert("Плохих слов не обнаружено.")
    }

    // Через filter: badWordsMassive.filter(badWord => text.indexOf(badWord) != -1).length > 0 ? alert("Обнаружено плохое слово!") : alert("Плохих слов не обнаружено.")
    // Через find: badWordsMassive.find(badWord => text.includes(badWord)) != undefined ? alert("Обнаружено плохое слово!") : alert("Плохих слов не обнаружено.")
    // Через some: badWordsMassive.some(badWord => text.includes(badWord)) == true ? alert("Обнаружено плохое слово!") : alert("Плохих слов не обнаружено.")


// confirm
// Поэкспериментируйте с confirm, определите тип данных, который он возвращает, и конкретные значения этого типа данных.
// Возвращает булев тип имеющий только два значения: "true" и "false".

// Boolean
// Напишите код, который спрашивает те или иные вопросы с ответом "да"/"нет" с помощью confirm, и сохраняет ответы в переменных.
var doMashaHitchhike = confirm("Маша добиралась автостопом?") // true
var isMashaHaveMoney = confirm("А у Маши есть деньги?") // false
var howMashaPaid = confirm("А как Маша расплачивалась?") // true
// Source: https://www.youtube.com/watch?v=eHA8unxX7uY


// Boolean: if
// Расширьте предыдущее задание условиями по полученным переменным условиями (if else). Например, если вы спрашиваете пол пользователя с помощью confirm, то по условию сделайте alert("Вы женщина") и alert("Вы мужчина") 
if (confirm("Вы мужчина?")) {
    alert("Вы - мужчина.")
}
else if (confirm("Вы женщина?")) {
    alert("Вы - женщина.")
}
else {
    alert("Вы - гендерфлюидный вертосексуал.")
}


// Array: real
// Понаходите в вашей жизни вещи, которые похожи на массивы, и другие вещи, которые можно смоделировать с помощью массивов.
    // Сложнее найти то, что нельзя смоделировать... Любой набор однотипных объектов. Всё на компе - массив единичек и нулей. 
    // Клавиши на клавиатуре, телефонный справочник, любые списки на работе - заказов, работников, операций, параметров к ним, допустимых значений к параметрам...
    // Химические элементы, песчинки в море, звёзды на небе (https://ru.wikipedia.org/wiki/Спектральные_классы_звёзд). Это массивы объектов с параметрами.


// Array: booleans
// Создайте массив с переменными из заданий Boolean и Boolean if.
// Эмм...
    var encodedSex = [howMashaPaid, isMale, isFemale, isHenderfluidHelicopterosexual]


// Array: plus
// Напишите код, который складывает первые два элемента массива и заносит это в элемент с индексом 2. Исследуйте полученный массив.
var massive = [1, 2]
massive.push(massive[0] + massive[1])

// Array: plus string
// Что будет, если в предыдущий примере использовать строки вместо чисел? Сделайте версию для сложения 3х значений. Подумайте, зачем нужна эта возможность в наших примерах.
    // Если использовать строки - будет конкатенация.
    // Возможность нужна для рекурсии, циклов. Позволяет создавать накопительный эффект, прогрессии.
    var numbersFibonacci = [0, 1]
    for (var i = 0; i < 10; i++) {
        numbersFibonacci.push(numbersFibonacci[i] + numbersFibonacci[i+1])
    }

    // А так сильно опасно?
    var numbersFibonacci = [0, 1]
    for (var i = 0; i < 10;) {
        numbersFibonacci.push(numbersFibonacci[i] + numbersFibonacci[i++])
    }


// Object: real
// Найдите те или иные реальные объекты и найдите их свойства. Например у маркера это цвет, толщина, уровень зарядки (количество краски), у автомобиля - бренд, модель, мощность двигателя, цвет и так далее. Создайте объекты с помощью {}. В качестве образца посмотрите объект персоны из материала предыдущего занятия
var palette = {
    quantityOfLevels: 10,
    quantityOfPacks: 150,
    quantityOfBooks: 1500,
    heightOfPalette: 0.2,
    heightOfPalleteWitProduct: 1.2,
    weightOfPallette: 16,
    weightNetto: 500,
    weightBrutto: 450,
    isWoodCap: true,
}

// Object: change
// Поменяйте значения свойств в ваших объектах, используя [] и . и присвоения.
    var palette = {
        quantityOfLevels: 10,
        quantityOfPacks: 150,
        quantityOfBooks: 1500,
        heightOfPalette: 0.2,
        heightOfPalleteWitProduct: 1.2,
        weightOfPallette: 16,
        weightNetto: 500,
        weightBrutto: 450,
        isWoodCap: true,
    }

    palette["isWoodCap"] = false
    palette["quantityOfLevels"] = 9
    palette["quantityOfPacks"] = 135
    palette.quantityOfBooks = 1350
    palette.weightNetto = 455
    palette.weightBrutto = 405

// Comparison if
// Разберите пример
// Добавьте условие отрицательного возраста в пример выше. Расставьте недостающие (но синтаксически необязательные) фигурные скобки. Выкиньте лишнее из текущего кода
    var age = +prompt("Сколько вам лет?");
    if (isNaN(age)) {
        alert("ОШИБКА: введено нечисловое значение! Введите число.")
    }
    else if (age <= 0) {
        alert("Всё спланировали?")
    }
    else if (age < 18) {
        alert("Школьник.")
    }
    else if (age < 30) {
        alert("Молодежь.")
    }
    else if (age < 45) {
        alert("Зрелость.")
    }
    else if (age < 60) {
        alert("Закат.")
    }
    else if (age < 124) {
        alert("Как пенсия?")
    }
    else {
        alert("Киборг.")
    }


// Comparison: sizes
// Сделайте перевод перевод из нашей системы размеров в американскую или любую на выбор. Используйте prompt, условия сравнения и alert.
    var sizeRussia = prompt("Введите размеж женского белья для России.")
    if (sizeRussia < 42) {
        alert("Данный размер соответсвует размеру \"XXS\" в США.")
    }
    else if (sizeRussia < 44) {
        alert("Данный размер соответсвует размеру \"XS\" в США.")
    }
    else if (sizeRussia < 46) {
        alert("Данный размер соответсвует размеру \"S\" в США.")
    }
    else if (sizeRussia < 48) {
        alert("Данный размер соответсвует размеру \"M\" в США.")
    }
    else if (sizeRussia < 50) {
        alert("Данный размер соответсвует размеру \"L\" в США.")
    }
    else if (sizeRussia < 52) {
        alert("Данный размер соответсвует размеру \"XL\" в США.")
    }
    else if (sizeRussia < 54) {
        alert("Данный размер соответсвует размеру \"XXL\" в США.")
    }
    else if (sizeRussia < 56) {
        alert("Данный размер соответсвует размеру \"XXXL\" в США.")
    }
    else {
        alert("Соответвующее значение в таблице не найдено.")
    }


// Comparison: object
// Подумайте о том, как можно применить объекты к предыдущем заданию.
// Что-то похожее на это
    var sizeRussia = prompt("Введите размеж женского белья для России.")
    var womenSize = {
        russianSize: [42, 44, 46, 48, 50, 52, 54, 56,],
        usaSize: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL",],
    }
    alert(`Данный размер соответсвует размеру \"${womenSize.usaSize[(womenSize.russianSize).indexOf(+sizeRussia)]}\" в США.`)


// Ternary
// Спросите у пользователя пол (confirm). Выведите с помощью alert "Вы мужчина" или "Вы женщина". Сделайте это оператором alert. Используйте тернарный оператор.
    confirm("Вы мужчина?") ? alert("Вы - мужчина.") : alert("Вы - женщина.")


// Синий пояс Number: flats
// Сделайте калькулятор, который позволит вам исходя из информации о количества этажей в доме и количества квартир на этаже находить подъезд и этаж определенной квартиры по её номеру. Например для 9этажного дома по 4 квартиры на этаж 81 квартира находится на 3м этаже третьего подъезда.
    var house = {
        floorsQuantity: 5,
        flatsOnFloorQuantity: 3,
        findEntranceFlorFlatByNumber(flatNumber) {
            flatNumber--
            // var entranceNumber = Math.floor(flatNumber / (house.floorsQuantity * house.flatsOnFloorQuantity))
            // var floorNumber = Math.floor((flatNumber - entranceNumber * house.floorsQuantity * house.flatsOnFloorQuantity) / (house.flatsOnFloorQuantity))
            // var flatOnFloorNumber = Math.floor(flatNumber - entranceNumber * house.floorsQuantity * house.flatsOnFloorQuantity - floorNumber * house.flatsOnFloorQuantity)

            var flatOnFloorNumber = (flatNumber % house.flatsOnFloorQuantity).toFixed(0)
            var floorNumber = Math.floor((flatNumber / house.flatsOnFloorQuantity) % house.floorsQuantity)
            var entranceNumber = Math.floor(flatNumber / (house.flatsOnFloorQuantity * house.floorsQuantity))

            alert(`Квартира № ${++flatNumber} располагается в подъезде № ${++entranceNumber} на этаже № ${++floorNumber}, ${++flatOnFloorNumber}-я на этаже.`)
        }
    }
    house.floorsQuantity = +prompt("Введите количество этажей в доме.")
    house.flatsOnFloorQuantity = +prompt("Введите количество квартир на этаже.")
    house.findEntranceFlorFlatByNumber(+prompt("Введите номер квартиры в доме."))