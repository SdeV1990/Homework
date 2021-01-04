// ES6
    // Я поридингаю сие за это время https://github.com/metagrover/ES6-for-humans и возрадуюсь новым возможностям, не смотря на то, что не тр...ся по-старому.


//sort
// Сделайте обобщенную функцию сортировки массива
// sort(persons, "age"); //сортирует по возрасту по возрастанию
// sort(persons, "name", false); //сортирует по имени по убыванию
// Функция позволяет отсортировать любой набор данных по имени поля (второй параметр). Третьим параметром идет необязательный Boolean, который в случае true делает сортировку по возрастанию, в случае false - по убыванию. По умолчанию (без третьего параметра) происходит сортировка по возрастанию.
    var persons = [
        {name: "Иван", age: 17},
        {name: "Мария", age: 35},
        {name: "Алексей", age: 73},
        {name: "Яков", age: 12},
    ]

    function sortGeneralized(array, key, sortAscending = true) {
        if (sortAscending) {
            return array.sort((first, second) => first[key] > second[key] ? 1 : -1)
        } else {
            return array.sort((first, second) => first[key] < second[key] ? 1 : -1)
        }
    }

    console.log("-------------sort-------------")
    console.log("Начальный объект.")
    console.log(persons)
    console.log("Объект после сортировки по возрасту, по возрастанию (по-умолчанию).")
    console.log(sortGeneralized(persons, "age"))
    console.log("Объект после сортировки по возрасту, по убыванию.")
    console.log(sortGeneralized(persons, "name", false))


// array map
// Используя Array.map приведите все строки в массиве к числу. Элементы других типов оставьте как есть:
// ["1", {}, null, undefined, "500", 700]
// должно превратиться в
// [1, {}, null, undefined, 500, 700]
    console.log("-------------array map-------------")
    console.log(["1", {}, null, undefined, "500", 700].map(item => typeof item === "string" ? +item : item))


// array reduce
// Получите произведение всех чисел в массиве, используя Array.reduce. Не обрабатывайте типы данных, не являющиеся числом.
// ["0", 5, 3, "string", null]
// результат должен быть 15
    console.log("-------------array reduce-------------")
    console.log(
        ["0", 5, 3, "string", null].reduce(
            (accumulator, currentValue) => {
                if (typeof currentValue === "number") {
                    return accumulator * currentValue
                } else {
                    return accumulator
                }
            }, 
            1 // Сэт инитиал валуэ.
        )
    )


// object filter
// Напишите свою реализацию Array.filter для объектов:
// var phone = {
//     brand: "meizu",
//     model: "m2",
//     ram: 2,
//     color: "black",
// };

// filter(phone,(key,value) => key == "color" || value == 2);
// должно вернуть
// {
//     ram: 2,
//     color: "black",
// }
// Для удаления пары ключ-значение используйте delete. Или сделайте копию объекта.
    console.log("-------------object filter-------------")

    var phone = {
        brand: "meizu",
        model: "m2",
        ram: 2,
        color: "black",
    };

    function filter(object, validator) {
        for (let item of Object.entries(object)) {
            if (validator(item[0], item[1]) == false) {
                delete object[item[0]]
            }
        }
        return object
    }

    console.log(filter(phone,(key, value) => key == "color" || value == 2))

// bject map
// Напишите свою реализацию Array.map для объектов:
// map({name: "Иван", age: 17},function(key,value){
//     var result = {};
//     result[key+"_"] = value + "$";
//     return result;
// }) //должен вернуть {name_: "Иван$", age_: "17$"}
    console.log("-------------object filter-------------")
    map({name: "Иван", age: 17}, function(key,value) {
        var result = {};
        result[key + "_"] = value + "$";
        return result;
    })

    function map(object, callBackFunction) {
        let result = {}
        for (let item of Object.entries(object)) {
            result = {...result, ...callBackFunction(item[0], item[1])}
        }
        return result
    }

    console.log(
        map({name: "Иван", age: 17},function(key,value){
            var result = {};
            result[key+"_"] = value + "$";
            return result;
        })
    )


// Рекурсия
// Sum
// Напишите функцию, который будет считать сумму арифметической прогрессии рекурсивно.
console.log("-------------Рекурсия-------------")
    console.log("-------------Sum-------------")
    function sum(array) {
        let result = 0
        for (let item of array) {
            if (Array.isArray(item)) {
                result = result + sum(item)
            } else {
                result = result + item
            }
        }
        return result
    }
    console.log("sum([[1,2],[3,4]]) = " + sum([[1,2],[3,4]]))


    // Уже сделал из интереса в домашнем задании 05 в упражнении на синий пояс - http://gitlab.a-level.com.ua/sapemiaen/homework/src/master/js/homework%2005/hw05.js
    // Заношу сюда
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

    // Write in HTML.
    console.log(constructorHTML(exampleForTest))
    let exampleElementForTest = document.createElement("div")
    exampleElementForTest.innerHTML = constructorHTML(exampleForTest)
    document.getElementsByClassName("wrapper")[0].prepend(exampleElementForTest)
    