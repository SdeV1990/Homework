// Password
// Напишите функцию конструктор Password, которая будет в родительском элементе создавать поле ввода для пароля и кнопку/иконку/чекбокс, который будет переключать режим просмотра пароля в поле ввода.
// Параметры:
// parent - родительский элемент
// open - стартовое состояние
// Методы:
// setValue/getValue - задают/читают значения
// setOpen/getOpen - задают/читают открытость текста в поле ввода
// Колбэки (функции обратного вызова, данные изнутри объекта):
// onChange - запускается по событию oninput в поле ввода, передает текст наружу
// onOpenChange - запускается по изменению состояния открытости пароля

    function Password(parent, open = false){

        // CREATE ELEMENTS

        // Text password input
        let objInputPassword = document.createElement("input")
        objInputPassword.placeholder = "Пароль"
        parent.appendChild(objInputPassword)

        // Caption isOpen label
        let objCaptionIdOpenLabel = document.createElement("label")
        objCaptionIdOpenLabel.innerText = "Показать пароль"
        parent.appendChild(objCaptionIdOpenLabel)

        // Checkbox isOpen input
        let objCheckBox = document.createElement("input")
        objCheckBox.type = "checkbox"
        objCaptionIdOpenLabel.appendChild(objCheckBox)

        // FUNCTIONS
        this.onChange = data => {
            console.log(data)
        }
        
        this.onOpenChange = open => {
            if (open === true) objInputPassword.type = "text"
            else objInputPassword.type = "password"

            console.log(open)
        }
        
        // SET VALUES
        this.setValue = value => {
            objInputPassword.value = value
            this.onChange(value)
        }

        this.setOpen = value => {
            objCheckBox.checked = value
            this.onOpenChange(value)
        }

        // GET VALUES
        this.getValue = () => objInputPassword.value
        this.getOpen = () => objCheckBox.checked
        this.getObjInputPassword = () => objInputPassword
        this.getObjCaptionIdOpenLabel = () => objCaptionIdOpenLabel 
        this.getObjCheckBox = () => objCheckBox

        //  EVENTS
        objInputPassword.oninput = () => this.onChange(this.getValue())
        objCheckBox.onchange = () => this.onOpenChange(this.getOpen())
    
        // DEFAULT VALUES
        this.setOpen(open)

    }

    // let p = new Password(document.body.getElementsByClassName("wrapper")[0], true)

    // p.onChange("Test 1.")
    // p.onOpenChange(true)

    // p.setValue('qwerty')
    // console.log(p.getValue())

    // p.setOpen(false)
    // console.log(p.getOpen())




















// LoginForm
// С помощью предыдущего кода Password сделайте форму логина, кнопка в которой будет активна только если и login и пароль не пусты
    function Login(parent, value="") {

        // CREATE ELEMENTS
        let objLoginInput = document.createElement("input")
        objLoginInput.type = "text"
        objLoginInput.placeholder = "Логин"
        parent.appendChild(objLoginInput)

        // FUNCTIONS
        this.onChange = data => {
            console.log(data)
        }

        // SET VALUES
        this.setValue = value => {
            objLoginInput.value = value
            this.onChange(value)
        }

        // GET VALUES
        this.getValue = () => objLoginInput.value
        this.getObjLoginInput = () => objLoginInput

        //  EVENTS
        objLoginInput.oninput = () => this.onChange(this.getValue())
    
        // DEFAULT VALUES
        this.setValue(value)

    }

    function SubmitButton(parent, value="Подтвердить", isDisabled = true) {

        // CREATE ELEMENTS
        let objSubmitButton = document.createElement("button")
        parent.appendChild(objSubmitButton)

        // FUNCTIONS

        // SET VALUES
        this.setValue = value => {
            objSubmitButton.innerHTML = value
        }

        this.setIsDisabled = value => {
            objSubmitButton.disabled = value
        }

        // GET VALUES
        this.getValue = () => objSubmitButton.innerHTML
        this.getIsDisabled = () => objSubmitButton.disabled
        this.getObjSubmitButton = () => objSubmitButton

        //  EVENTS
    
        // DEFAULT VALUES
        this.setValue(value)
        this.setIsDisabled(isDisabled)

    }

    function LoginForm(parent) {

        // CREATE ELEMENTS

        // Form wrapper
        let objLoginForm = document.createElement("div")
        objLoginForm.className = "formWrapper"
        parent.appendChild(objLoginForm)

        // Login input
        let login = new Login(objLoginForm)

        // Password input
        let password = new Password(objLoginForm)

        // Submit button
        let submitButton = new SubmitButton(objLoginForm)

        // FUNCTIONS
        this.validateSubmitButtonDisabling = () => {

            // Submit button disabled validation
            if (login.getValue() !== "" && password.getValue() !== "") {
                submitButton.setIsDisabled(false)
            } else {
                submitButton.setIsDisabled(true)
            }
        }

        // SET VALUES

        // GET VALUES

        //  EVENTS

        login.getObjLoginInput().addEventListener("input", this.validateSubmitButtonDisabling)
        password.getObjInputPassword().addEventListener("input", this.validateSubmitButtonDisabling)

        submitButton.getObjSubmitButton().onclick = () => {
            let data = {
                login: login.getValue(),
                password: password.getValue()
            }
            console.log(data)
        }

        // DEFAULT VALUES
    
        }

    let loginForm = new LoginForm(document.body.getElementsByClassName("firstForm")[0])


// LoginForm Constructor
// оформите предыдущую задачу как функцию-конструктор. Продумайте и предусмотрите геттеры, сеттеры и колбэки.
    // Эмм...











//     Password Verify
// С помощью Password сделайте пару инпутов, которые проверяют введеный пароль (в двух полях ввода) на совпадение. Кнопка должна активизироваться при совпадающих паролях. При открытом пароле второе поле вводы должно пропадать с экрана Таким образом:
// Когда Password в скрытом режиме - появляется второй инпут (<input type='password'>) с паролем в скрытом режиме
// Когда Password в открытом режиме - второй инпут пропадат
    function PasswordVerifyForm(parent) {

        // CREATE ELEMENTS

        // Form wrapper
        let objLoginForm = document.createElement("div")
        objLoginForm.className = "formWrapper"
        parent.appendChild(objLoginForm)

        // First password input
        let firstPassword = new Password(objLoginForm)

        // Second password input
        let secondPassword = new Password(objLoginForm)

        // Submit button
        let submitButton = new SubmitButton(objLoginForm)

        // FUNCTIONS
        this.validateSubmitButtonDisabling = () => {
            if (firstPassword.getValue() ===  secondPassword.getValue()) {
                submitButton.setIsDisabled(false)
            } else {
                submitButton.setIsDisabled(true)
            }
        }
        
        this.validateSecondPasswordDisplaing = () => {
            secondPassword.getObjInputPassword().style.display = firstPassword.getOpen() ? "none" : ""
        }

        // SET VALUES

        // GET VALUES

        //  EVENTS

        firstPassword.getObjInputPassword().addEventListener("input", this.validateSubmitButtonDisabling)
        secondPassword.getObjInputPassword().addEventListener("input", this.validateSubmitButtonDisabling)
        firstPassword.getObjCheckBox().addEventListener("click",this.validateSecondPasswordDisplaing)
        
        submitButton.getObjSubmitButton().onclick = () => {
            let data = {
                password: firstPassword.getValue()
            }
            console.log(data)
        }

        // DEFAULT VALUES
        secondPassword.getObjCaptionIdOpenLabel().remove() // Опасный мув.
    
        }

        let passwordVerify = new PasswordVerifyForm(document.body.getElementsByClassName("secondForm")[0])

























// Form

    // Описание здоровущее!
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
                let input = document.createElement('a')
                input.href = value
                input.setAttribute("url", value)
                input.setAttribute("target", "_blank")
                input.innerHTML = value
                input.oninput = oninput
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
        this.getDefaultData = () => defaultData

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
                    inputsArray[dataArray.indexOf(item)].innerHTML = item
                    
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

        // GET VALUES

        //  EVENTS
        
        el.appendChild(formBody)

        this.drawForm()

    }





    // Create third form
    let form = new Form(
        document.body.getElementsByClassName("thirdForm")[0], 
        {
            "title": "A New Hope", 
            "episode_id": 4, 
            "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....", 
            "director": "George Lucas", 
            "producer": "Gary Kurtz, Rick McCallum", 
            "release_date": "1977-05-25", 
            "characters": [
                "http://swapi.dev/api/people/1/", 
                "http://swapi.dev/api/people/2/", 
                "http://swapi.dev/api/people/3/", 
                "http://swapi.dev/api/people/4/", 
                "http://swapi.dev/api/people/5/", 
                "http://swapi.dev/api/people/6/", 
                "http://swapi.dev/api/people/7/", 
                "http://swapi.dev/api/people/8/", 
                "http://swapi.dev/api/people/9/", 
                "http://swapi.dev/api/people/10/", 
                "http://swapi.dev/api/people/12/", 
                "http://swapi.dev/api/people/13/", 
                "http://swapi.dev/api/people/14/", 
                "http://swapi.dev/api/people/15/", 
                "http://swapi.dev/api/people/16/", 
                "http://swapi.dev/api/people/18/", 
                "http://swapi.dev/api/people/19/", 
                "http://swapi.dev/api/people/81/"
            ], 
            "planets": [
                "http://swapi.dev/api/planets/1/", 
                "http://swapi.dev/api/planets/2/", 
                "http://swapi.dev/api/planets/3/"
            ], 
            "starships": [
                "http://swapi.dev/api/starships/2/", 
                "http://swapi.dev/api/starships/3/", 
                "http://swapi.dev/api/starships/5/", 
                "http://swapi.dev/api/starships/9/", 
                "http://swapi.dev/api/starships/10/", 
                "http://swapi.dev/api/starships/11/", 
                "http://swapi.dev/api/starships/12/", 
                "http://swapi.dev/api/starships/13/"
            ], 
            "vehicles": [
                "http://swapi.dev/api/vehicles/4/", 
                "http://swapi.dev/api/vehicles/6/", 
                "http://swapi.dev/api/vehicles/7/", 
                "http://swapi.dev/api/vehicles/8/"
            ], 
            "species": [
                "http://swapi.dev/api/species/1/", 
                "http://swapi.dev/api/species/2/", 
                "http://swapi.dev/api/species/3/", 
                "http://swapi.dev/api/species/4/", 
                "http://swapi.dev/api/species/5/"
            ], 
            "created": "2014-12-10T14:23:31.880000Z", 
            "edited": "2014-12-20T19:49:45.256000Z", 
            "url": "http://swapi.dev/api/films/1/"
        }, 
        () => console.log('ok'),
        () => form.reloadInputsToDefault()
        
    )

    // Validators
    // form.validators["*name"] = (value, key, data, input) => value.length > 2 && 
    //                                                     value[0].toUpperCase() == value[0] &&
    //                                                     !value.includes(' ') ? true : 'Wrong name.'

    // form.validators["*surname"] = (value, key, data, input) => value.length > 2 && 
    //                                                     value[0].toUpperCase() == value[0] &&
    //                                                     !value.includes(' ') ? true : 'Wrong name.'

    form.validators.height = (value, key, data, input) => value <= 0 ? 'Wrong name.' : true

    form.validators.mass = (value, key, data, input) => value <= 0 ? 'Wrong name.' : true
    form.validators.test_string_array = (value, key, data, input) => value.length < 1 ? 'Wrong test string.' : true

    // Call backs
    // OkButton
    // Должна:
    // отдавать текущий поредактированный объект первым параметром в okCallback
    // работать только когда:
    // все обязательные поля не пусты
    // всем валидаторам все понравилось

    form.okCallback = () => {
        logOk = {
            lastEdditElement: form.lastEdditElement,
            allData: form.data
        }
        console.log(logOk)
    } 

    // form.cancelCallback = () => form.reloadInputsToDefault()





    // Power of closures
    // Убедится в независимой работе нескольких форм одновременно на одной странице. Если не работает - чинить области видимости пока не заработает.
    // Працюе вроде

    // Create fourth form
    let form2 = new Form(
        document.body.getElementsByClassName("fourthForm")[0], 
        {
            "name": "Luke", 
            "surname": "Skywalker", 
            "height": "172", 
            "mass": "77", 
            "hair_color": "blond", 
            "skin_color": "fair", 
            "eye_color": "blue", 
            "birth_year": "19BBY", 
            "gender": "male", 
            "married": true,
            "homeworld": "http://swapi.dev/api/planets/1/", 
            "*films": [
                "http://swapi.dev/api/films/1/", 
                "http://swapi.dev/api/films/2/", 
                "http://swapi.dev/api/films/3/", 
                "http://swapi.dev/api/films/6/"
            ], 
            "species": [], 
            "vehicles": [
                "http://swapi.dev/api/vehicles/14/", 
                "http://swapi.dev/api/vehicles/30/"
            ], 
            "starships": [
                "http://swapi.dev/api/starships/12/", 
                "http://swapi.dev/api/starships/22/"
            ], 
            "created": "2014-12-09T13:50:51.644000Z", 
            "edited": "2014-12-20T21:17:56.891000Z", 
            "url": "http://swapi.dev/api/people/1/",
            "description": "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111111111111111111111111111",
            "test_password": "***"
        }, 
        () => console.log('ok'),
        () => form2.reloadInputsToDefault()
    )

    // Validators
    form2.validators.name = (value, key, data, input) => value.length > 2 && 
                                                        value[0].toUpperCase() == value[0] &&
                                                        !value.includes(' ') ? true : 'Wrong name.'

    form2.validators.surname = (value, key, data, input) => value.length > 2 && 
                                                        value[0].toUpperCase() == value[0] &&
                                                        !value.includes(' ') ? true : 'Wrong surname.'

    form2.validators.height = (value, key, data, input) => value <= 0 ? 'Wrong height.' : true

    form2.validators.mass = (value, key, data, input) => value <= 0 ? 'Wrong mass.' : true

    // Call backs
    form2.okCallback = () => {
        logOk = {
            lastEdditElement: form2.lastEdditElement,
            allData: form2.data
        }
        console.log(logOk)
    }

    // Мда...

















// Power Of The Form:
// Change Password
// Реализовать форму изменения пароля с валидацией паролей (как минимум на совпадение двух, а так же можно на длину, регистр, наличие цифр и т.п)
    function PasswordWithValidation(parent, open = false){

        // CREATE ELEMENTS

        // Text password input
        let objInputPassword = document.createElement("input")
        objInputPassword.placeholder = "Пароль"
        parent.appendChild(objInputPassword)

        // Caption isOpen label
        let objCaptionIdOpenLabel = document.createElement("label")
        objCaptionIdOpenLabel.innerText = "Показать пароль"
        parent.appendChild(objCaptionIdOpenLabel)

        // Checkbox isOpen input
        let objCheckBox = document.createElement("input")
        objCheckBox.type = "checkbox"
        objCaptionIdOpenLabel.appendChild(objCheckBox)

        // Validation message
        let objValidationMessage = document.createElement("span")
        objValidationMessage.style.color = "rgb(255,0,0)"
        parent.appendChild(objValidationMessage)

        // FUNCTIONS
        this.onChange = data => {
            console.log(data)
        }
        
        this.onOpenChange = open => {
            if (open === true) objInputPassword.type = "text"
            else objInputPassword.type = "password"

            console.log(open)
        }

        // СИЕ, СОБСТВЕННО, ИЗ ВАЛИДАЦИЯ. ОСТАЛЬНОЕ - КОПИПАСТА СВЕРХУ
        this.validateValue = (value) => {

            // Да, я её зопрятал...
            function Validator(description, min, max = "", regExp = /./g){

                // Parameters
                this.min = min
                this.max = max
                this.regExp = regExp
                this.description = description

                // Functions
                this.toValidate = (value) => {

                    let createErrorMessage = (isNotValidByMinimum, limitValue, description) => {
                        
                        // Strings
                        const BEGIN_STRING = "Используйте "
                        const LESS_STRING = "минимум "
                        const MORE_STRING = "максимум "
                        const DOT_THE_MOST_NEEDED_CONSTANTA_IN_THE_WHOLE_UNIVERSE = "."

                        let resultString = BEGIN_STRING
                        resultString += isNotValidByMinimum ? LESS_STRING : MORE_STRING
                        resultString += limitValue
                        resultString += description
                        resultString += DOT_THE_MOST_NEEDED_CONSTANTA_IN_THE_WHOLE_UNIVERSE

                        return resultString

                    }
                    
                    // Validation
                    //Check minimum
                    if (value.match(regExp) === null || value.match(regExp).length < +this.min) {
                        return createErrorMessage(true, +this.min, this.description)
                    }

                    // Check maximum
                    else if (this.max !== "" && value.match(regExp).length > +this.max) {
                        return createErrorMessage(false, +this.max, this.description)
                    }

                    // If value is valid
                    return ""

                }

            }

            // Create validators
            let lengthValidator = new Validator(" символов", 8, 20, /./g) // С максимумом не пашет
            let numbersValidator = new Validator(" цифры", 2, "", /\d/g)
            let upLettersValidator = new Validator(" букву латинского алфавита в верхнем регистре", 1, "", /[A-Z]/g)
            let lowLettersValidator = new Validator(" буквы латинского алфавита в нижнем регистре", 4, "", /[a-z]/g)
            let specSymbolsValidator = new Validator(" спецсимвол", 1, "", /!|\"|#|\$|%|&|'|\(|\)|\*|\+|,|\/|-|\.|;|<|=|>|\?|@|\[|\\|\]|\^|_|`|{|\||}|~/g)

            // Create validators array
            validatorsArray = [
                lengthValidator,
                numbersValidator,
                upLettersValidator,
                lowLettersValidator,
                specSymbolsValidator
            ]
            
            // Validation
            for (let validator of validatorsArray) {
                
                if (validator.toValidate(value).length > 0) {
                    objValidationMessage.innerText = validator.toValidate(value)
                    break;
                } else {
                    objValidationMessage.innerText = ""
                } 
                
            }

        } // ЭНД ВАЛИДАЦИИ
        
        // SET VALUES
        this.setValue = value => {
            objInputPassword.value = value
            this.onChange(value)
        }

        this.setOpen = value => {
            objCheckBox.checked = value
            this.onOpenChange(value)
        }

        // GET VALUES
        this.getValue = () => objInputPassword.value
        this.getOpen = () => objCheckBox.checked
        this.getObjInputPassword = () => objInputPassword
        this.getObjCaptionIdOpenLabel = () => objCaptionIdOpenLabel 
        this.getObjCheckBox = () => objCheckBox

        //  EVENTS
        objInputPassword.oninput = () => {
            this.onChange(this.getValue())
            this.validateValue(this.getValue())
        }
        objCheckBox.onchange = () => this.onOpenChange(this.getOpen())

        // DEFAULT VALUES
        this.setOpen(open)

    }

    //  Вроде должна задолбать пользователя
    let validPass = new PasswordWithValidation(document.getElementsByClassName("passwordValidation")[0], true)









