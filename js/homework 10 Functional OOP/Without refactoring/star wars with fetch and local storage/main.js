// Остаточная форма со всеми функциями, но без рефакторинга.
// Планирую отделить данные (тупая привычка мешать с формой)
// Переписать функцию "drawForm" в конструкторе "Form" - задвоилась для массивов и без
// Подумаю над уходом от любимых "ifов"
// Надо больше тренироватсья с ООП...
  
execute('https://swapi.dev/api/people/1/',document.body.getElementsByClassName("Star Wars Data Base")[0])

async function execute(url, parent) {

    // Check local storage for data

    // My first variant
    // // If there is data in local storage - load from it
    // if (localStorage.getItem(url) !== null) {
    //     createForm(JSON.parse(localStorage.getItem(url)), parent)
    // }
    // // If there is no data in local storage - load by URL
    // else {
    //     await fetch(url)
    //     .then(res => res.json())
    //     .then(data => createForm(data, parent))
    // }

    // Cached Promise
    // Оберните fetch или myfetch в функцию, которая:
    // Если данные найдены в localStorage - резолвится сразу, результатом промиса будет объект из localStorage (гляньте на Promise.resolve)
    // Если данные не найдены в localStorage - ведет себя как обычный fetch/myfetch

    loadData()

    function loadData() {
        let p = new Promise(function(resolve, reject){

            // Load data from localStorage
            if (localStorage.getItem(url) !== null) {
                resolve(JSON.parse(localStorage.getItem(url)))
            } else {
                reject()
            }

        })
        .then(
            d => createForm(d, parent), 
            
            () => {myfetch(url).then(data => createForm(data, parent))}
        )
    }

    // Из ДЗ № 11
    function myfetch(url){
        return new Promise(function (resolve, reject){
            const xhr = new XMLHttpRequest()
            
            xhr.open('GET', url, true)
            xhr.responseType = "json" 
    
            xhr.onload = function() {
    
                if (xhr.status != 200) {
                    return reject()
                }
    
                resolve(xhr.response)
    
            };
    
            xhr.onerror = function() {
                return reject()
            };
    
            xhr.send()
        })
    }

    function createForm(data, parent) {

        // Create form
        // function in file "main hw 10.js"
        let form = new Form(parent,
            data,
            () => console.log('ok'),
            () => form.reloadInputsToDefault()
        )
    
        // Set validators
        form.validators.mass = (value, key, data, input) => value <= 0 ? 'Wrong name.' : true
        form.validators.test_string_array = (value, key, data, input) => value.length < 1 ? 'Wrong test string.' : true
        form.validators.height = (value, key, data, input) => value <= 0 ? 'Wrong name.' : true
    
        // Button callback
        form.okCallback = () => {

            logOk = {
                lastEdditElement: form.lastEdditElement,
                allData: form.data
            }
            console.log(logOk)

            // Starwars localStorage
            // По в ok сохранять поредактированный объект localStorage. При дальнейшей работе выводить не объект с бэка, а объект из localStorage. В качестве ключей используйте ссылки из swapi.
            //  localStorage - это глобальный объект в браузере, значения которого переживают перезагрузку вкладки/браузера/компьютера
            // localStorage.userName ? alert(`Your name is ${localStorage.userName}`) : localStorage.userName = prompt('What is your name?') 
            // попробуйте это и нажмите f5

            // Check for changing
            if (JSON.stringify(form.data) != JSON.stringify(form.getDefaultData())) {

                // If is changed - settin new date of edititon
                form.data.edited = new Date()

            }

            // Save in local storage
            localStorage.setItem(url, JSON.stringify(form.data))

            // Save in default data
            form.setDefaultData(form.data)

        }
    }
}

// Form
function Form(el, data, okCallback, cancelCallback){

    // DEFAULT VALUES
    this.okCallback     = okCallback
    this.cancelCallback = cancelCallback
    this.data           = data
    this.validators     = {}
    this.lastEdditElement

    // CREATE ELEMENTS
    let formBody = document.createElement('div')
    formBody.className = "formWrapper"

    let formTable = document.createElement("table")
    formTable.style.border = "1px solid black"

    let okButton = document.createElement('button')
    okButton.innerHTML = 'OK'

    let cancelButton = document.createElement('button')
    cancelButton.innerHTML = 'Cancel'

    // VARIABLES
    let defaultData = JSON.parse(JSON.stringify(this.data))

    // Many Inputs
    // Сделайте в конструкторе объект, который позволит создавать разные инпуты в зависимости от типа данных/класса объекта. Учтите, что не всем типам данных достаточно одного input с placeholder, некоторые из них требуют дополнительной верстки:
    let inputCreators = {

        string(key, value, oninput){
            let input = document.createElement('input')

            // Password
            // Если в значении того или иного поля редактируемого объекта находятся одни * (в любом количестве), то данный инпут должен быть для пароля(<input type='text'/>), и с пустым текстом. Добавьте проверку в метод string объекта inputCreators.
            let passwordRegExp = /\**/g
            if (passwordRegExp.exec(value)[0] === value) {
                input.type = 'password'
                input.placeholder = ""
            }
            else {
                input.type = 'text'
                input.placeholder = key
            }

            input.value = value
            input.oninput = oninput
            return input
        },

        boolean(key, value, oninput){
            let input = document.createElement('input')
            input.type = 'checkbox'
            input.checked = value
            input.oninput = oninput
            return input
        },

        number(key, value, oninput){
            let input = document.createElement('input')
            input.type = 'number'
            input.placeholder = key
            input.value = value
            input.oninput = oninput
            return input
        },

        date(key, value, oninput){
            
            let input = document.createElement('input')
            input.type = 'date'
            input.value = convertDate(value)
            input.oninput = oninput
            return input
        },

        link(key, value, oninput){
            let input = document.createElement('button')
            
            // Get first key
            getFirstKeyByURL(value).then(firstKey => input.innerHTML = firstKey)

            input.oninput = oninput
            input.onclick = (event) => {

            // fetch improved
            // Расширить функцию отображения:
            // Если одно из полей строка или массив.
            // Если строки или строка содержат в себе https://swapi.dev/api/
            // То выводить вместо текста строки кнопку, при нажатии на которую:
            // делается fetch данных по этой ссылке
            // функция отображения запускает сама себя(рекурсивно) для отображения новых данных в том же элементе.
            ////////////////////////////////////////
            let parent = event.path[1]
            parent.innerHTML = ""
            let newForm = new Form(execute(value, parent)) // Value of link is URL (Captain Obvious)
            ////////////////////////////////////////
            }
            return input
        },

        text_area(key, value, oninput){
            let input = document.createElement('textarea')
            input.placeholder = key
            input.innerHTML = value
            input.oninput = oninput
            return input
        }

    }

    // FUNCTIONS

    // Get text to button
    async function getFirstKeyByURL(url) {

        return await fetch(url)
            .then(res => res.json())
            .then(data => data[Object.keys(data)[0]])

    }

    // Convertation of data type
    let convertDate = (dateToConvert) => {
        // If date is string - create new date.
        if (typeof(dateToConvert) === "string") dateToConvert = new Date(dateToConvert) 
        // Convert into "yyyy-mm-dd".
        return `${dateToConvert.getUTCFullYear()}-${dateToConvert.getUTCMonth()+1 < 10 ? "0"+(dateToConvert.getUTCMonth()+1) : dateToConvert.getUTCMonth()+1}-${dateToConvert.getUTCDate()+1 < 10 ? "0"+(dateToConvert.getUTCDate()+1) : dateToConvert.getUTCDate()+1}`
    }

    let getDataType =(value) => {

        //Regular expressions
        const link_HTTP_S_RegExp = /https:\/\/swapi\.dev\/api\/.*/g
        const link_HTTP_RegExp = /http:\/\/swapi\.dev\/api\/.*/g
        const numberRegExp = /^[0-9]*$/g
        const dataregExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]*Z/g

        let result = {
            isArray: "",
            dataType: ""
        }
        
        // If is array
        if (Array.isArray(value))
        {
            result.isArray = true
            result.dataType = getDataType(value[0]).dataType
            return result
        }

        // If is link
        else if (link_HTTP_S_RegExp.exec(value) !== null ||
                 link_HTTP_RegExp.exec(value) !== null) 
        {
            result.isArray = false
            result.dataType = "link"
            return result
        }

        // If is date
        else if ((typeof(value) === "object" && 
                typeof value.getMonth === 'function') || 
                dataregExp.exec(value) !== null)
        {
            result.isArray = false
            result.dataType = "date"
            return result
        }

        // If is boolean
        else if (typeof(value) === "boolean") {
            result.isArray = false
            result.dataType = "boolean"
            return result
        }

        // If is number
        else if (numberRegExp.exec(value) !== null) {
            result.isArray = false
            result.dataType = "number"
            return result
        }

        // If is empty
        else if (value === undefined) {
            result.isArray = false
            result.dataType = "string"
            return result
        }

        // If is long string
        else if (value.length >= 40) {
            result.isArray = false
            result.dataType = "text_area"
            return result
        }
        
        // Just string
        else {
            result.isArray = false
            result.dataType = "string"
            return result
        }

    }

    // CancelButton
    // Должна сбрасывать поля ввода в состояние на момент создания объекта (let form = new Form...)
    this.reloadInputsToDefault = () =>{

        // Transform data from object into array
        let dataArray = []
        for (let key in defaultData) {
            dataArray.push(defaultData[key])
            dataArray = dataArray.flat()
        }

        // Get cells
        let rowArray = [...formTable.children]
        let tdArray = []
        for (let row of rowArray) {
            tdArray.push(row.children)
        }

        // Get inputs
        let inputsArray = []
        for (let item of tdArray) {

            // If only one element (because of rowspan)
            if (item.length === 1) {
                inputsArray.push(item[0].children[0])
            }
            else {
                inputsArray.push(item[1].children[0])
            }
            
        }
        
        // Set data to inputs
        for (let item of dataArray) {

            let dataType = getDataType(item).dataType
            if (dataType === "string") {
                inputsArray[dataArray.indexOf(item)].value = item
                inputsArray[dataArray.indexOf(item)].oninput()
            }
            else if (dataType === "number") {
                inputsArray[dataArray.indexOf(item)].value = item
                inputsArray[dataArray.indexOf(item)].oninput()
            }

            else if (dataType === "link") {

            let button = document.createElement("button")
            button.onclick = (event) => {

            // fetch improved
            // Расширить функцию отображения:
            // Если одно из полей строка или массив.
            // Если строки или строка содержат в себе https://swapi.dev/api/
            // То выводить вместо текста строки кнопку, при нажатии на которую:
            // делается fetch данных по этой ссылке
            // функция отображения запускает сама себя(рекурсивно) для отображения новых данных в том же элементе.

            let parent = event.path[1]
            parent.innerHTML = ""
            let newForm = new Form(execute(item, parent)) // Item of link is URL (Captain Obvious)

            }

            // Take first field by fethc as a caption to replase link (https://swapi.dev/api/ => "Luke Skywalker")
            getFirstKeyByURL(item).then(firstKey => button.innerHTML = firstKey)

            // Add button
            let parent = inputsArray[dataArray.indexOf(item)].parentElement
            parent.innerHTML = ""
            parent.appendChild(button)

            // No input events and differrent logic
            // inputsArray[dataArray.indexOf(item)].oninput()
            }

            else if (dataType === "boolean") {
                inputsArray[dataArray.indexOf(item)].checked = item
                inputsArray[dataArray.indexOf(item)].oninput()
            }
            else if (dataType === "text_area") {
                inputsArray[dataArray.indexOf(item)].innerHTML = item
                inputsArray[dataArray.indexOf(item)].oninput()
            }
            else if (dataType === "date") {
                inputsArray[dataArray.indexOf(item)].value = convertDate(item)
                inputsArray[dataArray.indexOf(item)].oninput()
            }
            else {
                console.log("Error! Data type not defined!")
            }

        }

        // Save changes to data from default data
        this.data = JSON.parse(JSON.stringify(defaultData))

    }

    // Отображение
    // Проитерируйте объект data и создайте для каждой пары ключ-значение input, который будет позволять отредактировать значение.
    this.drawForm = () => {

        Object.entries(this.data).map(item => {

            // Create input
            // let formInput

            let itemKey = item[0]
            let itemFirstLetterOfKey = item[0][0]

            let itemValue = item[1]
            let itemFirstLetterOfValue = item[1][0]

            // If value of data item is array
            if (getDataType(itemValue).isArray === true) {

                // Rename variable
                let arrayValue = itemValue
                
                // If array is empty
                if (itemFirstLetterOfValue === undefined) {
                    arrayValue =""
                }
                else {
                    
                    // For all items of value array
                    for (let valueItem of arrayValue) {
                        
                        let indexValue = arrayValue.indexOf(valueItem)

                        // Create row
                        let row = document.createElement("tr")

                        // Create cell with key name only one time
                        if (arrayValue.indexOf(valueItem) === 0) {
                            let tdKey = document.createElement("td")
                            
                            // Fill cell with value
                            if (itemFirstLetterOfKey === "*") {

                                // Highlight sign "*""
                                let spanRequiredField = document.createElement("span")
                                spanRequiredField.style.color = "rgb(255,0,0)"
                                spanRequiredField.innerHTML = "*"
                                tdKey.innerHTML = spanRequiredField.outerHTML + itemKey.slice(1)
                            }
                            else {
                                tdKey.innerHTML = itemKey
                            }

                            tdKey.style.border = "1px solid black"
                            tdKey.rowSpan = arrayValue.length
                            
                            row.appendChild(tdKey)
                        }
                        
                        // Create cell with input value
                        let tdValue  = document.createElement("td")

                        // Create cell with error messsage
                        let spanErrorMessage = document.createElement("span")

                        let formInput = inputCreators[getDataType(valueItem).dataType](
                            itemKey,
                            valueItem,
                            () => {

                                // Save data
                                this.data[itemKey][indexValue]  = formInput.value

                                // Save last eddit element
                                this.lastEdditElement = formInput

                                // Mandatory
                                // Если имя поля начинается с *, то:
                                // поле обязательное
                                // при отображении * должна быть красной и визуально отделена от имени поля
                                // если поле пустое, то подсветить поле ввода

                                if (itemFirstLetterOfKey === "*") {
                                    if (formInput.value.length < 1) {
                                        formInput.style.backgroundColor = "rgb(255,0,0)"
            
                                        okButton.disabled = "true"
                                        
                                        spanErrorMessage.style.color = "rgb(255,0,0)"
                                        spanErrorMessage.innerHTML = "Обязательное поле."
                                    }
                                    else {
                                        formInput.style.backgroundColor = "rgb(255,255,255)"
                                        
                                        if (okButton.attributes.disabled !== undefined) okButton.attributes.removeNamedItem("disabled")

                                        spanErrorMessage.innerHTML = ""
                                    }
                                }

                                // Validators
                                // Если в объекте this.validators есть ключ, совпадающий с ключем текущего инпута, запустите его, передав все 4 параметра. Если результат:
                                // true - считаем поле введенным правильно
                                // непустая строка - считаем поле введенным неверно, выводим эту непустую строку где-то рядом с инпутом (это будет сообщение об ошибке), красим input в красный цвeт
                                if (this.validators !== undefined) {
                                    for (validatorKey in this.validators) {
                                        if (validatorKey === itemKey) {
                                            
                                            let isValid = this.validators[validatorKey](
                                                formInput.value, // value
                                                formInput.placeholder, // key
                                                this.data, // data
                                                formInput //input
                                            ) 
            
                                            if (isValid !== true) {
                                                formInput.style.backgroundColor = "rgb(255,0,0)"
            
                                                okButton.disabled = "true"
    
                                                // Validators messages
                                                // Измените верстку вашей формы так, что бы возле каждого поля появился элемент для возможного текста ошибки. Выводите там ошибку если валидатор этого поля возвращает строку (текст ошибки), а не true
                                                spanErrorMessage.innerHTML = isValid
                                                spanErrorMessage.style.color = "rgb(255,0,0)"
                                                spanErrorMessage.style.marginLeft = "10px"
                                            } else {
                                                formInput.style.backgroundColor = "rgb(255,255,255)"
            
                                                if (okButton.attributes.disabled !== undefined) okButton.attributes.removeNamedItem("disabled")
    
                                                spanErrorMessage.innerHTML = ""
                                            }
                                        }
                                    }
                                }
                            }
                        )
                        tdValue.appendChild(formInput)
                        row.appendChild(tdValue)
                        tdValue.appendChild(spanErrorMessage)
                        formTable.appendChild(row)
                    }
                }
            }

            // If value of data item is not array
            else {

                // Create row
                let row = document.createElement("tr")

                // Create cell with key name
                let tdKey = document.createElement("td")
                tdKey.innerText = itemKey
                tdKey.style.border = "1px solid black"

                // Fill cell with value
                if (itemFirstLetterOfKey === "*") {

                    // Highlight sign "*""
                    let spanRequiredField = document.createElement("span")
                    spanRequiredField.style.color = "rgb(255,0,0)"
                    spanRequiredField.innerHTML = "*"
                    tdKey.innerHTML = spanRequiredField.outerHTML + itemKey.slice(1)

                }
                else {
                    tdKey.innerHTML = itemKey
                }

                // Create cell with value
                let tdValue = document.createElement("td")

                // Create cell with error messsage
                let spanErrorMessage = document.createElement("span")

                // Create input
                let formInput = inputCreators[getDataType(itemValue).dataType](
                    itemKey,
                    itemValue,
                    () => {

                        // Save data
                        this.data[itemKey]  = formInput.value

                        // Save last eddit element
                        this.lastEdditElement = formInput
                        
                        // Mandatory
                        // Если имя поля начинается с *, то:
                        // поле обязательное
                        // при отображении * должна быть красной и визуально отделена от имени поля
                        // если поле пустое, то подсветить поле ввода
                        if (itemFirstLetterOfKey === "*") {
                            if (formInput.value.length < 1) {
                                formInput.style.backgroundColor = "rgb(255,0,0)"
    
                                okButton.disabled = "true"

                                spanErrorMessage.style.color = "rgb(255,0,0)"
                                spanErrorMessage.innerHTML = "Обязательное поле."
                            }
                            else {
                                formInput.style.backgroundColor = "rgb(255,255,255)"
    
                                if (okButton.attributes.disabled !== undefined) okButton.attributes.removeNamedItem("disabled")

                                spanErrorMessage.innerHTML = ""
                            }
                        }
    
                        // Validators
                        // Если в объекте this.validators есть ключ, совпадающий с ключем текущего инпута, запустите его, передав все 4 параметра. Если результат:
                        // true - считаем поле введенным правильно
                        // непустая строка - считаем поле введенным неверно, выводим эту непустую строку где-то рядом с инпутом (это будет сообщение об ошибке), красим input в красный цвeт
                        if (this.validators !== undefined) {
                            for (validatorKey in this.validators) {
                                if (validatorKey === itemKey) {
                                    
                                    let isValid = this.validators[validatorKey](
                                        formInput.value, // value
                                        formInput.placeholder, // key
                                        this.data, // data
                                        formInput //input
                                    ) 
    
                                    if (isValid !== true) {
                                        formInput.style.backgroundColor = "rgb(255,0,0)"
    
                                        okButton.disabled = "true"

                                        // Validators messages
                                        // Измените верстку вашей формы так, что бы возле каждого поля появился элемент для возможного текста ошибки. Выводите там ошибку если валидатор этого поля возвращает строку (текст ошибки), а не true
                                        spanErrorMessage.innerHTML = isValid
                                        spanErrorMessage.style.color = "rgb(255,0,0)"
                                        spanErrorMessage.style.marginLeft = "10px"
                                    } else {
                                        formInput.style.backgroundColor = "rgb(255,255,255)"
    
                                        if (okButton.attributes.disabled !== undefined) okButton.attributes.removeNamedItem("disabled")

                                        spanErrorMessage.innerHTML = ""
                                    }
                                }
                            }
                        }
                    }
                )

                tdValue.appendChild(formInput)
                row.appendChild(tdKey)
                row.appendChild(tdValue)
                tdValue.appendChild(spanErrorMessage)
                formTable.appendChild(row)
            }
        })

        formBody.appendChild(formTable)

        // Create OK button
        if (typeof okCallback === 'function'){
            formBody.appendChild(okButton);

            okButton.onclick = (e) => {
                this.okCallback(e)
            }
        }

        // Create CANCEL button
        if (typeof cancelCallback === 'function'){
            formBody.appendChild(cancelButton);
            cancelButton.onclick = cancelCallback
        }
        
    }

    // SET VALUES
    this.setDefaultData = (newData) => defaultData = JSON.parse(JSON.stringify(newData))

    // GET VALUES
    this.getDefaultData = () => defaultData

    //  EVENTS
    
    el.appendChild(formBody)

    this.drawForm()

}


