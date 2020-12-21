// switch: sizes
// Сделайте задание Comparison: sizes из предыдущего ДЗ используя switch
    var sizeRussia = +prompt("Введите размеж женского белья для России.")
    switch (sizeRussia) {
        case 42: alert("Данный размер соответсвует размеру \"XXS\" в США.") 
            break;
        case 44: alert("Данный размер соответсвует размеру \"XS\" в США.") 
            break;
        case 46: alert("Данный размер соответсвует размеру \"S\" в США.") 
            break;
        case 48: alert("Данный размер соответсвует размеру \"M\" в США.") 
            break;
        case 50: alert("Данный размер соответсвует размеру \"L\" в США.") 
            break;
        case 52: alert("Данный размер соответсвует размеру \"XL\" в США.") 
            break;
        case 54: alert("Данный размер соответсвует размеру \"XXL\" в США.") 
            break;
        case 56: alert("Данный размер соответсвует размеру \"XXXL\" в США.") 
            break;
        default: alert("Соответвующее значение в таблице не найдено.")
    }


// switch: if
// Перепишите пример ниже, используя if.
// let color = prompt("Введите цвет","");
// switch (color){
//     case "red": document.write("<div style='background-color: red;'>красный</div>");
//     case "black": document.write("<div style='background-color: black; color: white;'>черный</div>");
//                 break;
//     case "blue": document.write("<div style='background-color: blue;'>синий</div>");
//     case "green": document.write("<div style='background-color: green;'>зеленый</div>");
//                 break;
//     default: document.write("<div style='background-color: gray;'>Я не понял</div>");
// }
    let color = prompt("Введите цвет","");
    if (color == "red") {
        document.write("<div style='background-color: red;'>Красный</div>");
        document.write("<div style='background-color: black; color: white;'>Чёрный</div>");
    }
    else if (color == "black") {
        document.write("<div style='background-color: black; color: white;'>Чёрный</div>");
    }
    else if (color == "blue") {
        document.write("<div style='background-color: blue;'>Синий</div>");
        document.write("<div style='background-color: green;'>Зелёный</div>");
    }
    else if (color == "green") {
        document.write("<div style='background-color: green;'>Зелёный</div>");
    }
    else  {
        document.write("<div style='background-color: gray;'>Я не понял</div>");
    }

// prompt: or
// Для задания Number: age используя ИЛИ || вывести сообщение об ошибке (alert) если пользователь не введет возраст или нажмет отмену (т. е. prompt выдаст пустую строку или null, интерпретируемую как false).
    var userAge = +prompt("Сколько Вам лет?")
    if (userAge || alert("Некоректно введённый возраст!")) {
        var currentDate = new Date
        var userBirthYear = currentDate.getFullYear() - userAge
        alert(`Вы родились в ${userBirthYear} году.`)
    }


// confirm: or this days
// C помощью этого же трюка сделайте капризного робота, который в confirm спрашивает "шопинг?", а в случае отказа - выводить alert "ты - бяка".
    confirm("Шопинг?") || alert("Ты - бяка...")


// confirm: if this days
// Сделать тоже самое с помощью if.
    if (!(confirm("Шопинг?"))) alert("Ты - бяка...")

// triple prompt
// Трижды вызывать prompt, сохранить в переменные фамилию, имя и отчество. Вывести ФИО c помощью alert.
    var person = {
        name: prompt("Введите имя."),
        surname: prompt("Введите фамилию."),
        fathersname: prompt("Введите отчество."),
    }
    alert(person.surname + " " + person.name + " " + person.fathersname)


// default: or
// Используя ИЛИ || добавьте имена по умолчанию, которые будут сохраняться во внутренних переменных если пользователь ввел пустую строку или нажал "Отмена". Например, если вы на шаге ввода Фамилии нажмете Escape, фамилия будет "Иванов"
    var person = {
        name: prompt("Введите имя.") || "Денис",
        surname: prompt("Введите фамилию.") || "Денисенко",
        fathersname: prompt("Введите отчество.") || "Денисович",
    }
    alert(person.surname + " " + person.name + " " + person.fathersname)

// default: if
// Сделайте тоже самое с помощью if и else
    var person = {
        name: prompt("Введите имя."),
        surname: prompt("Введите фамилию."),
        fathersname: prompt("Введите отчество."),
    }

    if (!person.name) person.name = "Денис";
    if (!person.surname) person.surname = "Денисенко";
    if (!person.fathersname) person.fathersname = "Денисович"

    alert(person.surname + " " + person.name + " " + person.fathersname)


//login and password
// Напишите код, который спрашивает логин, проверяет его на верность, в случае если логин верен, просит ввести пароль и проверяет его. В случае несовпадения логина или пароля выводить alert с текстом ошибки. В случае успешного логина - alert с поздравлением. Правильные логин: admin и пароль: qwerty. Используйте вложенные if и else.
    var login = prompt("Введите логин.")
    var password = prompt("Введите пароль.")
    if (login == "admin" ) {
        if (password == "qwerty") {
            alert("Вы успешно вошли в кабинет.")
        }
        else {
            alert("Ошибка: неверный пароль.")
        }
    }
    else {
        if (password == "qwerty") {
            alert("Ошибка: неверный логин.")
        }
        else {
            alert("Ошибка: неверные логин и пароль.")
        }
    }


// currency calc
// Калькулятор обмена валют. Первый prompt спрашивает валюту: "usd" или "eur". С помощью switch установите обменный курс для валюты, выбранной пользователем, после чего спросите величину и переведите её из гривны в выбранную на первом prompt валюту. Выведите результат в alert()
    var currency = prompt("Введите валюту.")
    var quantity = +prompt("Введите сумму в гривнах.")
    var exchangeRate
    switch (currency) {
        case "usd": exchangeRate = 28.06
            break;
        case "eur": exchangeRate = 34
            break;
    }
    alert(`На сумму ${quantity} UAH. по курсу ${exchangeRate} можно приобрести ${(quantity/exchangeRate).toFixed(2)} ${currency}.`)


// currency calc: improved
// Улучшить предыдущее задание: сделать возможность ввода валюты любыми буквами (usd, uSd, USD), используйте str.toLowerCase().
    // С Вашего позволения я заменю str.toLowerCase() на str.toUpperCase() т.к. лучше будет смотреться в результате...
    var currency = prompt("Введите валюту.").toUpperCase()
    var quantity = +prompt("Введите сумму в гривнах.")
    var exchangeRate

    switch (currency) {
        case "USD": exchangeRate = 28.06
            break;
        case "EUR": exchangeRate = 34
            break;
    }

    alert(`На сумму ${quantity} UAH. по курсу ${exchangeRate} можно приобрести ${(quantity/exchangeRate).toFixed(2)} ${currency}.`)


// currency calc: two rates
// Добавить к возможность выбора обменного курса на продажу и покупку. Используйте confirm для ввода пользователя и тернарный оператор для величины курса.
    var isToBuy = confirm("Желаете приобрести валюту?")
    var currency = prompt("Введите валюту.").toUpperCase()
    var quantity = +prompt("Введите сумму в гривнах.")
    var exchangeRate

    var usd = {
        name: "USD",
        buy: 28.0786,
        sale: 28.3109,
    }

    var eur = {
        name: "EUR",
        buy: 33.8615,
        sale: 34.3215,
    }

    switch (currency) {
        case usd.name: isToBuy ? exchangeRate = usd.buy : exchangeRate = usd.sale
            break;
        case eur.name: isToBuy ? exchangeRate = eur.buy : exchangeRate = eur.sale
            break;
    }

    alert(`На сумму ${quantity} UAH. по курсу ${exchangeRate} можно ${isToBuy ? "приобрести" : "продать"} ${(quantity/exchangeRate).toFixed(2)} ${currency}.`)

// currency calc: if
// Сделать тоже самое на if
    var isToBuy = confirm("Желаете приобрести валюту?")
    var currency = prompt("Введите валюту.").toLocaleLowerCase()
    var quantity = +prompt("Введите сумму в гривнах.")
    var exchangeRate
    var exchangeArray = {
        usd: {
            name: "USD",
            buy: 28.0786,
            sale: 28.3109,
        },
        eur: {
            name: "EUR",
            buy: 33.8615,
            sale: 34.3215,
        }
    }

    exchangeRate = exchangeArray[currency][isToBuy ? "buy" : "sale"]
    alert(`На сумму ${quantity} UAH. по курсу ${exchangeRate} можно ${isToBuy ? "приобрести" : "продать"} ${(quantity/exchangeRate).toFixed(2)} ${currency}.`)

    // Ох же код и корявый... но не успеваю

// scissors
// Сделайте игру "камень-ножницы-бумага". Пользователь вводит свой вариант через prompt, программа генерирует свой вариант через Math.random() и выводит через alert. Следующий alert выводит имя победителя или "ничья"
    var userAct = (+prompt("Введите: 0 - камень, 1 - ножницы 2 - бумага.")).toFixed(0)

    function toGenerateAct() {
        var computerAct = Math.random()
        if (computerAct < 1/3) {
            return 0; // Камень
        }
        else if (computerAct < 2/3){
            return 1; // Ножницы
        }
        else {
            return 2; // Бумага
        }
    }

    function toPlay (userAct, computerAct) {
        if (userAct == computerAct) { // Одинаковые значения
            alert("Ничья.")
        }
        else if (
            (userAct == 0 && computerAct == 1) || 
            (userAct == 1 && computerAct == 2) || 
            (userAct == 2 && computerAct == 0)
            ) {
            alert("Вы выиграли.")
        }
        else {
             alert("Компьютер выиграл.")
        }
    }

    if (isNaN(userAct)) {
        alert("ОШИБКА: введено неверное значение, нужно вводить только значения 0, 1 ли 2.")
    }
    else {
        toPlay(userAct, toGenerateAct())
    }

// Задание на синий пояс
// Сделать задания обмена валют используя ассоциативный массив (объект) подобной структуры. Добавьте дополнительные поля при надобности. Для обращения к нужному полю используйте [].
// let ratios = {
//     usd: 25.6,
//     eur: 29
// }
// real data
// Иcпользуя заготовку ниже реализуйте перевод валют с реальными данными.
// fetch('https://api.exchangeratesapi.io/latest')
//     .then(res => res.json())
//     .then(d => {
//         console.log(d) // тут у нас есть данные
//         //и ниже с ними можно работать
//         //нигде кроме этой функции (этих фигурных скобок) переменной d нет
//     })
    var isToBuy = confirm("Желаете приобрести валюту?")

    if (isToBuy) {
        var currencyBuy = prompt("Введите валюту, которую желаете купить.").toUpperCase()
        var quantityBuy = +prompt("Введите сумму которую вы желаете купить.")
        var currencySale = prompt("Введите валюту, которую желаете продать.").toUpperCase()
    }
    else {
        var currencySale = prompt("Введите валюту, которую желаете продать.").toUpperCase()
        var quantitySale = +prompt("Введите сумму которую вы желаете продать.")
        var currencyBuy = prompt("Введите валюту, которую желаете купить.").toUpperCase()
    }

    var exchangeRateBuy
    var exchangeRateSale

    fetch('https://api.exchangeratesapi.io/latest')
        .then(res => res.json())
        .then(d => {
            console.log(d) 
            exchangeRateBuy = d.rates[currencyBuy]
            exchangeRateSale = d.rates[currencySale]
            if (isToBuy) {
                quantitySale= (quantityBuy * +(exchangeRateSale / exchangeRateBuy).toFixed(6)).toFixed(2)
                alert(`Cумму в ${quantityBuy} ${currencyBuy} по курсу ${(exchangeRateSale / exchangeRateBuy).toFixed(6)} можно купить за ${quantitySale} ${currencySale}.`)
            }
            else {
                quantityBuy = (quantitySale * +(exchangeRateBuy / exchangeRateSale).toFixed(6)).toFixed(2)
                alert(`Cумму в ${quantitySale} ${currencySale} по курсу ${(exchangeRateBuy / exchangeRateSale).toFixed(6)} можно продать за ${quantityBuy} ${currencyBuy}.`)
            }
        }
    )


// Задание на черный пояс
// Сделайте игру "камень-ножницы-бумага", как описано выше, пользуясь логическими операциями (&&, ||, !), не используя if и switch. Задание должно быть решено одним выражением
// Надеюсь, считается.
var compAct = Math.random()
var result = ((userAct= +(+prompt("Введите: 1 - камень, 2 - ножницы 3 - бумага.")).toFixed(0)) == (compAct = Math.random() < 1/3 && 1 || (compAct < 2/3 && 2 || 3))) && !(alert("Ничья.")) || ( ( (userAct == 1 && (compAct < 1/3 && 1 || (compAct < 2/3 && 2 || 3)) == 2) || (userAct == 2 && (compAct < 1/3 && 1 || (compAct < 2/3 && 2 || 3)) == 3) || (userAct == 3 && (compAct < 1/3 && 1 || (compAct < 2/3 && 2 || 3)) == 1)) && !(alert("Вы выиграли.")) || !(alert("Компьютер выиграл.")))