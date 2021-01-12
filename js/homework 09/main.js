// makeProfileTimer
// Напишите функцию makeProfileTimer, которая служит для замера времени выполнения другого кода и работает следующим образом:
//    var timer = makeProfileTimer()
//    alert('Замеряем время работы этого alert');  //некий код, время выполнения которого мы хотим измерить с высокой точностью
//    alert(timer()); //alert должен вывести время в микросекундах от выполнения makeProfileTimer до момента вызова timer(), 
//                    // т. е. измерить время выполнения alert
// Используйте performance.now()
    function makeProfileTimer(measuringFunction) {
        let startTime = performance.now()
        measuringFunction()
        let endTime = performance.now()
        return endTime - startTime;
    }

    // function myFunction() {
    //     for (let i = 1; i < 3000000000; i++) {}
    // }
    // 
    // let timer = makeProfileTimer(myFunction)
    // alert(`Время выполнения функции составляет ${timer.toFixed(3)} милисекунд.`)


// makeSaver
// Напишите функцию makeSaver, которая:
    // var saver = makeSaver(Math.random) //создает функцию-хранилище результата переданной в качестве параметра функции (Math.random 
    //                                     // в примере). На этом этапе Math.random НЕ вызывается
    // var value1 = saver()              //saver вызывает переданную в makeSaver функцию, запоминает результат и возвращает его
    // var value2 = saver()              //saver в дальнейшем просто хранит результат функции, и более НЕ вызывает переданную 
    //                                     //в makeSaver функцию;
    // value1 === value2                 // всегда true

    // var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random()*6)])
    // var value3 = saver2()
    // var value4 = saver2()

    // value3 === value4 // тоже должно быть true
// Таким образом makeSaver решает две задачи:
// Навсегда сохраняет результат функции. Это актуально, например, для Math.random.
// Действует лениво, то есть вызывает Math.random только тогда, когда результат действительно нужен. Если же по каким-то причинам значение не понадобится, то Math.random даже не будет вызван
    function makeSaver(calledFunction) {
        let result
        let isRunned = false
        if (isRunned == false) {
            isRunned = true
            result = calledFunction()
            return result
        }
    }

    var saver = makeSaver(Math.random)  //создает функцию-хранилище результата переданной в качестве параметра функции (Math.random в примере). На этом этапе Math.random НЕ вызывается
    var value1 = saver                  //saver вызывает переданную в makeSaver функцию, запоминает результат и возвращает его
    var value2 = saver                  //saver в дальнейшем просто хранит результат функции, и более НЕ вызывает переданную в makeSaver функцию;
    console.log(value1 === value2)      // всегда true

    var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random()*6)])
    var value3 = saver2
    var value4 = saver2
    console.log(value3 === value4) // тоже должно быть true


// Final Countdown
// Напишите код, который будет делать обратный ежесекундный отсчёт в консоли, используя console.log. Используйте Self Invoked Function для создания замыкания и setTimeout для задержки вывода. Результатом должно быть:
//     5 //пауза 1 секунда
//     4 //пауза 1 секунда
//     3 //пауза 1 секунда
//     2 //пауза 1 секунда
//     1 //пауза 1 секунда
//     "поехали!"
    function finalCountdown() {
        let i = 5
        setTimeout(function countdown() {
            if (i>0) {
                console.log(i)
                setTimeout(countdown, 1000)
            } else {
                console.log("Поехали!")
            }
            i--
        }, 
        1000)
    }

    finalCountdown()

// myBind
// Изучите встроенную функцию bind, и сделайте свою версию, которая позволит определить "значение по умолчанию" не только для первых параметров, но для любых других, например для степени в Math.pow:
// Массив, который идет третьим параметром определяет, какие поля должны подменяться значением по умолчанию, а какие - задаваться в последствии (undefined).
    function myBind(inputFunction, inputObject, defaultArrayOfParameters) {

        function wrapperFunction() {
            
            function mergeArrays() {
                let resultArray = []
                let indexResult = 0 
                let indexArguments = 0 
                let tempArguments = [...arguments]
                defaultArrayOfParameters.map((parameter)=>{
                    
                    if (typeof parameter === 'undefined') {
                        resultArray[indexResult] = tempArguments[indexArguments]
                        indexArguments++
                    } else {
                        resultArray[indexResult] = parameter
                    } 
                    indexResult++
                })
                return resultArray
            }

            let parameters = mergeArrays(...arguments)
            return inputFunction.call(inputObject,  ...parameters)
        }

        return wrapperFunction
    }

// var pow5 = myBind(Math.pow, Math, [undefined, 5]) // первый параметр - функция для биндинга значений по умолчанию, 
//                                                   // второй - this для этой функции, третий - массив, в котором undefined означает
//                                                   // параметры, которые должны передаваться при вызове,
//                                                   // а другие значения являются значениями по умолчанию:
// var cube = myBind(Math.pow, Math, [undefined, 3]) // cube возводит число в куб

// console.log(pow5(2)) // => 32, вызывает Math.pow(2,5), соотнесите с [undefined, 5]
// console.log(cube(3)) // => 27

// var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5,undefined, 8,undefined, 9])
// console.log(chessMin(-1,-5,3,15)) // вызывает Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5

// var zeroPrompt = myBind(prompt, window, [undefined, "0"]) // аналогично, только теперь задается "0" как текст по умолчанию в prompt, 
//                                                           // а текст приглашения пользователя задается при вызове zeroPrompt
// var someNumber = zeroPrompt("Введите число")              // вызывает prompt("Введите число","0")

// console.log(myBind((...params) => params.join(''), null, [undefined, 'b', undefined, undefined, 'e', 'f'])('a','c','d') === 'abcdef')