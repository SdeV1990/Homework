// 3 persons
// Сделать три ассоциативных массива a, b, c, в каждом из которых должны быть поля name и surname.
    var a = {
        name: "",
        surname: ""
    }

    var b = {...a}
    var c = {...a}


// different fields
// Добавьте некоторые другие поля (например age, fathername, sex (пол)) так, что бы набор полей отличался у разных объектов
    a["age"] = 18
    b["fatherName"] = "Дарт Вейдер"
    c["sex"] = "мужик"


// fields check
// Проверьте наличие необязательных полей у каждого из этих массивов. Если поле найдено, выведите его с помощью alert. Проверку делайте по typeof или in в if.
    var arrObjToCheck = [a, b, c]
    var arrKeysToCheck = ["age", "fatherName", "sex",   "rex", "pex", "fex"]
    arrObjToCheck.map(
        (x) => {
            var match = false
            for (var key in x) {
                arrKeysToCheck.map(y => { 
                        if (key === y) {
                            match = true
                        }
                    }
                )
            }
            if (match) {
                alert(`Поле \"${key}\" найдено!`)
            }
        }
    )


// array of persons
// Добавьте несколько ассоциативных массивов с персонами в обычный массив persons, например a,b,c. Так же добавьте персону литерально ({...}). Получится обычный массив с элементами-ассоциативными массивами с персонами.
    var persons = [...arrObjToCheck]
    persons.push({
        name: "Денис",
        surname: "Денисенко",
        fatherName: "Денисович"
    })


// loop of persons
// Сделайте цикл, который выводит весь массив persons в форме объектов console.log(persons[i])
    persons.map(item => console.log(item))


// loop of name and surname
// Сделайте цикл, который выводит весь массив persons, но только Имя и Фамилию каждой персоны.
    persons[0]["name"] = "Борис"
    persons[1]["name"] = "Люк"
    persons[2]["name"] = "Хан"
    persons[0]["surname"] = "Борисенко"
    persons[1]["surname"] = "Скайуокер"
    persons[2]["surname"] = "Соло"

    var arrKeysToCheck = ["name", "surname"]
    persons.map(
        objPerson => {
            var string = ""
            for (let key of arrKeysToCheck) {
                string += objPerson[key] + " "
            }
            return string.slice(0, -1);
        }
    )


// loop of loop of values
// Сделайте цикл, который выводит весь массив persons, но только значения всех полей из объектов. Используйте вложенный цикл
    persons.map(objPerson => Object.values(objPerson))
    

// fullName
// Сделайте цикл, которых добавляет поле fullName в каждый объект, содержащий ФИО. Учтите, что поле fathername не является обязательным.
    persons.map(
        objPerson => {
            if ("name" in objPerson && "surname" in objPerson) {
                objPerson["fullName"] = `${objPerson["name"]} ${objPerson["surname"]}${"fatherName" in objPerson ? " " + objPerson["fatherName"] : ""}`
            }
        }
    )
    persons
    // Да, с Дартом Вейдером не вяжется.

// serialize
// Создайте JSON-строку из persons
    stringJSON = JSON.stringify(persons)


// deserialize
// Создайте ассоциативный массив с одной персоной из JSON-строки. Добавьте её в persons
     persons.push(JSON.parse('{"name":"Гадя","surname":"Хренова","fatherName":"Петрович","status":"Потерялася"}'))


//  HTML
//  Сделайте цикл, который выводит весь массив persons, в форме HTML-таблицы. Имя и Фамилия - колонки.
    // Я использую уже имеющийся код...
    
    var arrKeysToCheck = ["name", "surname"]
    var cuttedPersons = persons.map(
        objPerson => {
            var tempArray = []
            for (let key of arrKeysToCheck) {
                tempArray.push(objPerson[key])
            }
            return tempArray;
        }
    )
    var arrHead = ["Имя", "Фамилия"]
    cuttedPersons.unshift(arrHead)
    
    var htmlCode = "<table border='1'>\n"
    for (var i=0; i<cuttedPersons.length; i++) {
        htmlCode += `    <tr>\n`
        for (var j=0; j<cuttedPersons[i].length; j++) {
            htmlCode += `        <td>`
            htmlCode += cuttedPersons[i][j]
            htmlCode += `</td>\n`
        }
        htmlCode += `    </tr>\n`
    }
    htmlCode += "</table>"
    console.log(htmlCode)
    document.write(htmlCode)

// HTML optional fields
// Сделайте цикл, который выводит весь массив persons, в форме HTML-таблицы. Имя и Фамилия, а так же другие поля при наличии. Колонки: поля, строки таблицы - персоны.
    var allValuesPersons = persons.map(objPerson => Object.values(objPerson))
    var htmlCode = "<table border='1'>\n"
    for (var i=0; i<allValuesPersons.length; i++) {
        htmlCode += `    <tr>\n`
        for (var j=0; j<allValuesPersons[i].length; j++) {
            htmlCode += `        <td>`
            htmlCode += allValuesPersons[i][j]
            htmlCode += `</td>\n`
        }
        htmlCode += `    </tr>\n`
    }
    htmlCode += "</table>"
    console.log(htmlCode)
    document.write(htmlCode)


// HTML tr color
// Добавьте к предыдущему примеру раскраску через строчку используя другой стиль тэга tr.
    var allValuesPersons = persons.map(objPerson => Object.values(objPerson))
    var htmlCode = "<table border='1'>\n"
    for (var i=0; i<allValuesPersons.length; i++) {

        // Меняем цвет
        var backGroundColor = ["#f0f8ff","#c0d6e4"][i%2] // Влюбился в эту строку...
        htmlCode += `    <tr bgcolor='${backGroundColor}'>\n`

        for (var j=0; j<allValuesPersons[i].length; j++) {
            htmlCode += `        <td>`
            htmlCode += allValuesPersons[i][j]
            htmlCode += `</td>\n`
        }
        htmlCode += `    </tr>\n`
    }
    htmlCode += "</table>"
    console.log(htmlCode)
    document.write(htmlCode)


// HTML th optional
// Переработайте вывод persons в HTML с поиском всех возможных колонок во всех записях, выводом названий колонок в заголовок HTML-таблицы. Для решения этой задачи вначале узнайте множество полей (ключей) во всех записях (они не совпадают), выведите HTML-заголовок используя тэги <th>, а потом выводите все записи. Ниже выведите все персоны построчно. Следите за корректностью колонок. Для этого вам нужно итерировать общий набор колонок, а не каждую персону, колонки из которой могут отличаться от предыдущей.
    var arrHead = Array.from(new Set(persons.map(objPerson => Object.keys(objPerson)).flat()))  // ОРГАЗМ!
    // Array.from(new Set(                                                  убрать дубликаты
    //     persons.map(                                                     перечисление
    //         objPerson => Object.keys(objPerson)                          взять ключи объекта
    //         ).flat()                                                     сделать массив одномерным
    // ))
    // https://webformyself.com/kak-proizvesti-udalenie-dublej-massiva-v-es6/ - способы убрать дубликаты
    
    var cuttedPersons = persons.map(
        objPerson => {
            var tempArray = []
            for (let key of arrHead) {
                tempArray.push(objPerson[key])
            }
            return tempArray;
        }
    )
    cuttedPersons
    
    var htmlCode = "<table border='1'>\n"
    for (var i=0; i<cuttedPersons.length; i++) {

        var backGroundColor

        //Write cap
        if (i == 0) {
            backGroundColor = "#b2f0e5"
            htmlCode += `    <tr bgcolor='${backGroundColor}'>\n`
    
            for (var j=0; j<arrHead.length; j++) {
                htmlCode += `        <th>`
                if (arrHead[j] !== undefined) {
                    htmlCode += arrHead[j]
                }
                htmlCode += `</th>\n`
            }
            htmlCode += `    </tr>\n`
        }

        // Write body
        backGroundColor = ["#f0f8ff","#c0d6e4"][i%2] 
        htmlCode += `    <tr bgcolor='${backGroundColor}'>\n`

        for (var j=0; j<cuttedPersons[i].length; j++) {
            htmlCode += `        <td>`
            if (cuttedPersons[i][j] !== undefined) {
                htmlCode += cuttedPersons[i][j]
            }
            htmlCode += `</td>\n`
        }
        htmlCode += `    </tr>\n`

    }
    htmlCode += "</table>"
    console.log(htmlCode)
    document.write(htmlCode)


// Задание на синий пояс.
// Сделать HTML-конструктор из деревянной структуры, которая была на прошлом занятии:
// Для начала сделайте конструктор для верхнего уровня (в примере - table). Потом с помощью копипасты сделайте то же самое с вложенным уровнем nestedTags (tr). Аналогично для уровня td.
// Конструктор должен поддерживать вложенность до 3его уровня (как в примере). В результате работы конструктора из примера выше должен получиться следующий HTML(в строке str):
// Переносы строк и отступы в результате не принципиальны, главное - структура HTML Проверьте ваш код на других структурах.


    // Думаю, отделыный ключ с текстом лучше не делать, а сделать текст частью массива subTags и проверять его на то, является ли он стрингом при обработке.
    // Одиночные теги можно скинуть в один массив и по нему сверять (убирая - если единичный - проверку вложенных элементов и убирая запись закрывания тега).
    var exampleForTest = {
        tagName: "body",
        attrs: {},
        subTags: [
            {
                tagName: "div",
                attrs: {},
                subTags: [
                    {
                        tagName: "span",
                        attrs: {},
                        subTags: ["Enter a data please:"]
                    },
                    {
                        tagName: "br",
                        attrs: {},
                        subTags: []
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: 'text',
                            id: 'name'
                        },
                        subTags: []
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: 'text',
                            id: 'surname'
                        },
                        subTags: []
                    }
                ]
            },
            {
                tagName: "div",
                attrs: {},
                subTags: [
                    {
                        tagName: "button",
                        attrs: {
                            id: 'ok'
                        },
                        subTags: ["OK"]
                    },
                    {
                        tagName: "button",
                        attrs: {
                            id: 'cancel'
                        },
                        subTags: ["Cancel"]
                    }
                ]
            }
        ]
    }

    function constructorHTML(objectHTML) {
        var htmlCode = ""

        // Open first tag.
        htmlCode += `<${objectHTML.tagName}`

            // Write attributes.
            for (var key in objectHTML.attrs) {
                htmlCode += ` ${key} = \'${objectHTML.attrs[key]}\'`
            }

        // Close first tag.
        htmlCode += `>`
            
            // Write children.
            for (var index = 0; index <= objectHTML.subTags.length-1; index++) {

                // If child is object (another tag).
                if (typeof objectHTML.subTags[index] == "object") {
                    htmlCode += constructorHTML(objectHTML.subTags[index]) // Recursion.

                // Else convert in string.
                } else { 
                    htmlCode += String(objectHTML.subTags[index])
                }

            }

        // Second tad.
        htmlCode += `</${objectHTML.tagName}>`

        return htmlCode;
    }

    // Вроде норм кушает вложенности.
    console.log(constructorHTML(exampleForTest))


// destruct array
// напишите код, который используя деструктуризацию положит:
// четные числа в переменные even1, even2,
// нечетные в odd1, odd2, odd3,
// буквы в отдельный массив
let arr = [1,2,3,4,5, "a", "b", "c"]
    var [odd1, even1, odd2, even2, odd3, ...arrSign] = arr


// destruct string
// напишите код, который используя деструктуризацию положит:
// число в переменную number
// букву a в переменную s1
// букву b в переменную s2
// букву c в переменную s3
let arr = [1, "abc"]

    var [number, [a, b, c]] = arr


// destruct 2
// извлеките используя деструктуризацию имена детей в переменные name1 и name2
let obj = {name: 'Ivan',
    surname: 'Petrov',
    children: [
        {name: 'Maria'}, 
        {name: 'Nikolay'}
    ]}

    var {children: [name1, name2]} = obj

// destruct 3
// извлеките используя деструктуризацию объектов два первых элемента и длину массива в переменные a, b и length
let arr = [1,2,3,4, 5,6,7,10]

    var [length,a,b] = [arr.length, arr.splice(0,3), arr]


// Задание на черный пояс
// Сделать предыдущее задание на черный пояс в упрощенном виде: не использовать четырехмерный массив для хранения истории, а использовать ассоциативный массив: Например, если пользователь ввел 1212 за последние четыре хода, то мы ищем то, что было введено последний раз после такой последовательности:
var predictArray = {}
var predictValue 
var historyValue = "1010"
var matchCounter = 0
var quantityOfTries = 0
var userValue

do {

    // Get predict value from history.
    predictValue = predictArray[historyValue]

    // If predict value isn't confirm - get random value.
    if (predictValue == undefined) {
        predictValue = (Math.random()).toFixed(0)
    }

    // Get user value.
    userValue = prompt("Print 1 or 0.")

    // Break the cicle on cancel.
    if (userValue === null) {
        alert(`Попыток - ${quantityOfTries}, совпадений - ${matchCounter}. Приходите ещё.`)
        break;
    }
    userValue = +userValue

    // Compare predict and user values.
    console.log(predictValue)
    console.log(userValue)

    if (predictValue == userValue) {
        alert(`СОВПАДЕНИЕ!\nВведённое Вами значение \"${userValue}\" совпадает с предугаданным гадалкой! Гоните бабки!`)
        matchCounter++
    }
    else {
        alert(`НЕСОВПАДЕНИЕ!\nВведённое Вами значение \"${userValue}\" несовпадает с предугаданным гадалкой - \"${predictValue}\"! В следующий раз вводите правильно.`)
    }

    // Memorize uzer value.
    predictArray[historyValue] = userValue

    // Change history.
    historyValue = historyValue.slice(1)
    historyValue += userValue
    quantityOfTries ++

} while (userValue == 0 || userValue == 1)