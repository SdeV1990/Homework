// html tree
// <body>
//     <div>
//         <span>Enter a data please:</span><br/>
//         <input type='text' id='name'>
//         <input type='text' id='surname'>
//     </div>
//     <div>
//         <button id='ok'>OK</button>
//         <button id='cancel'>Cancel</button>
//     </div>
// </body>
// Сделайте декларативную JSON-структуру для тэгов выше, в которой:
// каждый тэг будет объектом
// имя тэга будет полем tagName
// вложенные тэги будут в поле subTags
// текст в тэге будет в поле text
// набор аттрибутов тэга будет в поле attrs.

// Выведите значения текста во второй кнопке, используя . и [].
// Выведите значение атрибута id во втором input, используя . и [].
    var body = {
        tagName: "body",
        attrs: {},
        text: "",
        subTags: [
            {
                tagName: "div",
                attrs: {},
                text: "",
                subTags: [
                    {
                        tagName: "span",
                        attrs: {},
                        text: "Enter a data please:",
                        subTags: []
                    },
                    {
                        tagName: "br/",
                        attrs: {},
                        text: "",
                        subTags: []
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: 'text',
                            id: 'name'
                        },
                        text: "",
                        subTags: []
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: 'text',
                            id: 'surname'
                        },
                        text: "",
                        subTags: []
                    }
                ]
            },
            {
                tagName: "div",
                attrs: {},
                text: "",
                subTags: [
                    {
                        tagName: "button",
                        attrs: {
                            id: 'ok'
                        },
                        text: "OK",
                        subTags: []
                    },
                    {
                        tagName: "button",
                        attrs: {
                            id: 'cancel'
                        },
                        text: "Cancel",
                        subTags: []
                    }
                ]
            }
        ]
    }

    body.subTags[1].subTags[1].text
    body.subTags[0].subTags[3].attrs.id


// declarative fields
// Как известно, элемент массива и объекта может быть любого типа данных JS, т. е. в коде может быть любое выражение, которое вычисляется в то или иное значение типа данных. А значит, мы можем применять функции для ввода данных типа confirm или prompt:
// var text = "Enter a number";
// var arr3 = [+prompt(text), +prompt(text), +prompt(text)]; //вводим числа.
// Организуйте таким способом заполнение полей в объектах:
// var notebook = {
//     brand: "HP",
//     type:  "440 G4",
//     model: "Y7Z75EA",
//     ram: 4,
//     size: "14",
//     weight: 1.8,
//     resolution: {
//         width: 1920,
//         height: 1080,
//     },
// };

// var phone = {
//     brand: "meizu",
//     model: "m2",
//     ram: 2,
//     color: "black",
// };

// var person = {
//     name: "Donald",
//     surname: "Trump",
//     married: true,
// }
// Например:
// var person = {
//     name: prompt("Enter a name"),
//     surname: prompt("Enter a surname"),
// }
// Используйте приведение к числу, prompt и confirm в зависимости от типов данных.
    var person = {
        name: "Donald",
        surname: "Trump",
        married: true,
        // electorat: [
        //     {
        //         name: "", 
        //         surname: ""
        //     },
        //     {
        //         name: "", 
        //         surname: ""
        //     },
        // ]
    }

    var notebook = {
        brand: "HP",
        type:  "440 G4",
        model: "Y7Z75EA",
        ram: 4,
        size: "14",
        weight: 1.8,
        resolution: {
            width: 1920,
            height: 1080,
        },
    };

    var phone = {
        brand: "meizu",
        model: "m2",
        ram: 2,
        color: "black",
    };

    
    function fillValuesOfObject(object){
        var temp // Temporary value to filter
        for (key in object) {

            if (typeof object[key] == "boolean") {

                object[key] = confirm(`Confirm is ${key}?`)

            }
            else if (typeof object[key] == "number") {

                do {
                    
                    temp = prompt(`Enter a ${key} as number`)

                    if (temp === null) break;

                    if (isNaN(temp)) {
                        alert(`Error! ${temp} is not a number!`)
                    }
                    else {
                        object[key] = +temp

                    }

                } while (isNaN(temp) === true)

            }
            else if (typeof object[key] == "string") {

                temp = prompt(`Enter a ${key}.`)

                if (temp !== null) {
                    object[key] = temp
                }

            }
            else if (typeof object[key] == "object") { 

                fillValuesOfObject(object[key]) // Рекурсюшечка!

            }
        }
    }

    fillValuesOfObject(phone)


// object links
// Добавьте персоне гаджеты, используя новые поля smartphone и laptop в объекте персоны
// Добавьте владельца в гаджеты, используя новое поле owner в объектах телефона и ноутбука.
// обратите внимание на цикличность ссылок в объектах, если вы все сделали правильно, то
// person.smartphone.owner.laptop.owner.smartphone == person.smartphone

    var person = {
        name: "Donald",
        surname: "Trump",
        married: true,
    }

    var notebook = {
        brand: "HP",
        type:  "440 G4",
        model: "Y7Z75EA",
        ram: 4,
        size: "14",
        weight: 1.8,
        resolution: {
            width: 1920,
            height: 1080,
        },
    };

    var phone = {
        brand: "meizu",
        model: "m2",
        ram: 2,
        color: "black",
    };

    person["smartphone"] = phone
    person["laptop"] = notebook
    notebook["owner"] = person
    phone["owner"] = person

    person.smartphone.owner.laptop.owner.smartphone == person.smartphone


// imperative array fill 3
// Создайте пустой массив и добавьте в него три элемента, введенные пользователем (prompt), используя императивный подход (несколько операторов подряд)
    [
        prompt("Enter first value."),
        prompt("Enter second value."),
        prompt("Enter third value.")    
    ]


// while confirm
// Сделайте цикл с confirm, который продолжается по Отмена и заканчивается по ОК.
    do {} while (!(confirm("?")))


// array fill
// Создайте пустой массив и добавляйте в него элементы, пока пользователь не нажмет Отмена в очередном prompt. Используйте push для удобства: push
    var array = []
    do {
        temp = prompt()
        if (temp === null) break;
        array.push(temp)
    } while(true)


// array fill nopush
// Сделайте предыдущее задание, не используя push, а обращаясь к элементам по индексу.
    var array = []
    do {
        temp = prompt()
        if (temp === null) break;
        array[(array.length)] = temp
    } while(true)


// infinite probability
// Создайте бесконечный цикл, который прерывается с помощью конструкции break, когда Math.random() > 0.9. Код должен подсчитывать количество итераций и вывести это число с помощью alert.
    var randomValue
    var quantityOfIterations = 0
    do {
        randomValue = Math.random()
        quantityOfIterations +=1
    } while (randomValue <= 0.9)
    alert(`Quantity of iterations - ${quantityOfIterations}. Last random value - ${randomValue}.`)

    // or

    var randomValue = 0
    for (var i = 1; randomValue <= 0.9; ) {
        randomValue = Math.random()
    }
    alert(`Quantity of iterations - ${quantityOfIterations}. Last random value - ${randomValue}.`)


// empty loop
// Сделайте цикл с prompt, который прерывается по нажатию OK и продолжается по нажатию "Отмена" c пустым телом цикла.
    while(prompt() !== null) {}


// progression sum
// Подсчитать сумму арифметической прогрессии от 1 до N c шагом 3 (1,4,7....) используя цикл for.
    var quantityOfTerms = +prompt("Enter quantity of terms of arifmetical progresion.")
    for (var i = 1, summ = 0, term = 1; i <= quantityOfTerms; i++, term += 3) {
        summ += term
    }
    alert(`Summ of arifmetical progression - ${summ}.`)


// chess one line
// Сформировать строку " # # # # # " с помощью цикла for. Длина строки может быть четной и нечетной, и указывается в одном месте в коде.
    var length = +prompt("Enter length of string.")
    var string = ""
    for (var i=1; i<=length; i++) {
        string += " #"[i%2]
    }
    console.log(string)


// numbers
// Сформировать строку c помощью вложенных циклов. Для перевода строки используйте \n.
    var string = ""
    for (var i=0; i<=9; i++) {
        for (var j=0; j<=9; j++) {
            string += j
        }
        string += "\n"
    }


// chess
// Сформируйте строку с шахматной доской из вложенных циклов. Для перевода строки используйте \n. Код должен поддерживать легкое изменение размеров доски.
    var string = ""
    var quantityOfRows = +prompt("Enter quantity of rows.")
    var quantityOfColumns = +prompt("Enter quantity of columns.")
    for (var i=0; i<=quantityOfColumns; i++) {
        for (var j=0; j<=quantityOfRows; j++) {
            string += ".#."[ (j + i % 2 ) %2 ] // Смещение на нечётных рядах на 1 символ вправо.
        }
        string += "\n"
    }
    alert(string)


// cubes
// Сформируйте массив из N элементов, содержащий в себе кубы индексов, т. е:
// [0,1,8,27,64...]
    var quantityOfTerms = +prompt("Enter quantity of terms.")
    var cubeArray = []
    for (var i = 0; i <= quantityOfTerms; i++) {
        cubeArray.push(Math.pow(i,3))
    }
    alert(cubeArray)


// multiply table
// C помощью вложенного цикла сформируйте массив массивов "таблица умножения". Для инициализации вложенных массивов используйте
// arr[i] = [] //в i-тый элемент массива заносится новый пустой массив
// arr[5][6] должен быть равен, соответственно, 30, arr[7][2] == 14 и так далее.
    var arr = []
    for (var i=0; i<=9; i++) {
        arr[i] = []
        for (var j=0; j<=9; j++) {
            arr[i][j] = (i+1) * (j+1)
        }
    }


// matrix to html table
// Сделайте вложенный цикл, который формирует HTML-таблицу в переменной строкового типа из любого двумерного массива. Т. е. если в нём использовать результат работы предыдущего задания, то получится таблица умножения в HTML (Таблица Пифагора)
    var htmlCode = "<table>\n"
    // var arr = [[1,2,3], [2,4,6], [3,6,9]]
    for (var i=0; i<arr.length; i++) {
        htmlCode += `    <tr>\n`
        for (var j=0; j<arr[i].length; j++) {
            htmlCode += `        <td>`
            htmlCode += arr[i][j]
            htmlCode += `</td>\n`
        }
        htmlCode += `    </tr>\n`
    }
    htmlCode += "</table>"
    alert(htmlCode)

// Задание на синий пояс: Треугольник
// Сформировать следующую строку - треугольник:
// .....#.....
// ....###....
// ...#####...
// ..#######..
// .#########.
// ###########
    var lengthOfString = +prompt("Enter size of area.")
    lengthOfString = lengthOfString + ((lengthOfString +1) % 2) // Only for even numbers.
    var string = ""
    for (var i = 1; i <= (lengthOfString + 1) / 2; i++) {

        var quanttyOfOctothorpe = 1 + (i-1) * 2 // Arithmetic progression.
        var quantityOfDots = (lengthOfString - quanttyOfOctothorpe)/2
        
        string += writeSign(".", quantityOfDots)
        string += writeSign("#", quanttyOfOctothorpe)
        string += writeSign(".", quantityOfDots)
        string += "\n"
    }

    function writeSign (sign, quantityOfSign) {
        var signString = ""
        for (var j=1; j <=quantityOfSign; j++) {
            signString += sign
        }
        return signString
    }

    alert(string)

// Задание на черный пояс: Электронная гадалка
// Пользователь вводит 0 или 1. Гадалка пытается угадать, что введет пользователь (естественно перед его вводом), но не показывает пользователю, что бы пользователь не выбрал противоположный вариант, а выводит предполагаемый вариант в консоль, скрытую от пользователя.
    var predictArray = [ [ [ [ -1, -1 ], [ -1, -1 ] ], [ [ -1, -1 ], [ -1, -1 ] ] ], [ [ [ -1, -1 ], [ -1, -1 ] ], [ [ -1, -1 ], [ -1, -1 ] ] ] ]
    var predictValue 
    var historyValue = [1,0,1,0]
    var matchCounter = 0
    var quantityOfTries = 0
    var userValue

    do {

        // Get predict value from history.
        predictValue = predictArray[historyValue[0]][historyValue[1]][historyValue[2]][historyValue[3]]

        // If predict value isn't confirm - get random value.
        if (predictValue === -1) {
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
        if (predictValue === userValue) {
            alert(`СОВПАДЕНИЕ! Введённое Вами значение \"${userValue}\" совпадает с предугаданным гадалкой! Гоните бабки!`)
            matchCounter++
        }
        else {
            alert(`НЕСОВПАДЕНИЕ! Введённое Вами значение \"${userValue}\" несовпадает с предугаданным гадалкой - \"${predictValue}\"! В следующий раз вводите правильно.`)
        }

        // Memorize uzer value.
        predictArray[historyValue[0]][historyValue[1]][historyValue[2]][historyValue[3]] = userValue

        // Change history.
        historyValue.shift(0)
        historyValue.push(userValue)
        quantityOfTries ++

    } while (userValue == 0 || userValue == 1)