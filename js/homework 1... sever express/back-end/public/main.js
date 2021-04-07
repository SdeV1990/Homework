const URL = "http://localhost:4000"

// Redux
function createRedux(reducer){
    let state = reducer(undefined, {})
    let subscribers = []

    function dispatch(action){
        if (typeof action === 'function'){
            return action(dispatch)
        }
        const newState = reducer(state, action)
        if (state !== newState){
            state =   newState
            subscribers.forEach(cb => cb())
        }
    }

    return {
        getState(){
            return state;
        },
        subscribe(cb){
            subscribers.push(cb)
            return () => subscribers = subscribers.filter(c => c !== cb)
        },
        dispatch
    }

}

// Reducer
function chatReducer(
    state={
        messages: [],
        sendStatus: "",
        getStatus: "",
        enterKeyPressed: false,
        inputNickFilled: false,
        inputMessageFilled: false,
        lastMessageID: "000000000000000000000000"
    }, 
    {type, data}
) {

    // Send statuses
    if (type === 'SEND_PENDING'){
        return {
            ...state, 
            sendStatus: 'PENDING'
        }
    }
    if (type === 'SEND_RESOLVED'){
        return {
            ...state, 
            sendStatus: 'RESOLVED'
        }
    }
    if (type === 'SEND_REJECTED'){
        return {
            ...state, 
            sendStatus: 'REJECTED'
        }
    }
    if (type === 'SEND_CLEAR'){
        return {
            ...state, 
            sendStatus: 'CLEAR'
        }
    }

    //Get statuses
    if (type === 'GET_PENDING'){
        return {
            ...state, 
            getStatus: 'PENDING'
        }
    }
    if (type === 'GET_RESOLVED'){
        return {
            ...state, 
            getStatus: 'RESOLVED', 
            messages: state.messages.concat(...data), 
            lastMessageID:  state.messages.length === 0 ? state.lastMessageID : state.messages[state.messages.length-1].timeStamp
        }
    }
    if (type === 'GET_REJECTED'){
        return {
            ...state, 
            getStatus: 'REJECTED'
        }
    }

    // Enter key statuses
    if (type === 'ENTER_KEY_UP'){
        return {
            ...state, 
            enterKeyPressed:  false
        }
    }
    if (type === 'ENTER_KEY_DOWN'){
        return {
            ...state, 
            enterKeyPressed:  true
        }
    }

    // Input nick statuses
    if (type === 'INPUT_NICK_EMPTY'){
        return {
            ...state, 
            inputNickFilled:  false
        }
    }
    if (type === 'INPUT_NICK_FILLED'){
        return {
            ...state, 
            inputNickFilled:  true
        }
    }

    // Input message statuses
    if (type === 'INPUT_MESSAGE_EMPTY'){
        return {
            ...state, 
            inputMessageFilled:  false
        }
    }
    if (type === 'INPUT_MESSAGE_FILLED'){
        return {
            ...state, 
            inputMessageFilled:  true
        }
    }

    return state;
}

// Return promise of data
function jsonPost(url, data) {
    return new Promise((resolve, reject) => {
        var x = new XMLHttpRequest();   
        x.onerror = () => reject(new Error('jsonPost failed'))
        //x.setRequestHeader('Content-Type', 'application/json');
        x.open("POST", url, true);
        x.send(JSON.stringify(data))

        x.onreadystatechange = () => {
            if (x.readyState == XMLHttpRequest.DONE && x.status == 201){
                resolve(JSON.parse(x.responseText))
            }
            else if (x.status != 201){
                reject(new Error('status is not 201'))
            }
        }
    })
}

// Create Redux
const redux = createRedux(chatReducer)


// ACTIONS

// Send actions
const actionSendPending = () => ({type: "SEND_PENDING"})
const actionSendResolved = () => ({type: "SEND_RESOLVED"})
const actionSendRejected = () => ({type: "SEND_REJECTED"})
const actionSendClear = () => ({type: "SEND_CLEAR"})

// Get actions
const actionGetPending = () => ({type: "GET_PENDING"})
const actionGetResolved = (data) => ({type: "GET_RESOLVED", data})
const actionGetRejected = () => ({type: "GET_REJECTED"})

// Enter key actions
const actionEnterKeyUp = () => ({type: "ENTER_KEY_UP"})
const actionEnterKeyDown = () => ({type: "ENTER_KEY_DOWN"})

// Input nick actions
const actionInputNickEmpty = () => ({type: "INPUT_NICK_EMPTY"})
const actionInputNickFilled = () => ({type: "INPUT_NICK_FILLED"})

// Input message actions
const actionInputMessageEmpty = () => ({type: "INPUT_MESSAGE_EMPTY"})
const actionInputMessageFilled = () => ({type: "INPUT_MESSAGE_FILLED"})

// Script of getting messages
const actionGet = () =>
    async dispatch => {
        try {
            dispatch(actionGetPending())

            // If there is no messages in state - return last message ID (empty string), if not - get time stamp of last message in state
            let lastMessageID = 
                redux.getState().messages.length === 0 ?  // If
                redux.getState().lastMessageID : // True
                redux.getState().messages[redux.getState().messages.length-1].timeStamp // False
            
            console.log("lastMessageID = " + lastMessageID)
            
            let result = await jsonPost(
                URL + "/message-after", 
                {
                    timeStamp: lastMessageID
                }
            )
            dispatch(actionGetResolved(result))
        }
        catch (e){
            console.log(e)
            dispatch(actionGetRejected())
        }
    }

// Script of sending message and loading it as fast as possible
const actionSendAndCheck = (nick, message) => 
    async dispatch => {

        // Send message
        try {
            dispatch(actionSendPending())
            let result = await jsonPost(
                URL + "/message",
                {
                    nick: nick, 
                    message: message
                }
            )
        }
        catch (e){
            console.log(e)
            dispatch(actionSendRejected())
        }

        // Get messages
        if (redux.getState().sendStatus === "PENDING") {

            try {
                dispatch(actionGetPending())

                // If there is no messages in state - return last message ID (empty string), if not - get time stamp of last message in state
                let lastMessageID = 
                    redux.getState().messages.length === 0 ?  // If
                    redux.getState().lastMessageID : // True
                    redux.getState().messages[redux.getState().messages.length-1].timeStamp// False
                
                console.log("lastMessageID = " + lastMessageID)
                
                let result = await jsonPost(
                    URL + "/message-after", 
                    {
                        timeStamp: lastMessageID
                    }
                )
                dispatch(actionGetResolved(result))
            }
            catch (e){
                console.log(e)
                dispatch(actionGetRejected())
            }

            if (redux.getState().getStatus === "RESOLVED") {

                // To prevent early enabling of send button
                dispatch(actionSendResolved())

                // To prevent doubling creating of messages
                dispatch(actionSendClear())

            }

        }

    }


// REACTIONS

// For send statuses

// Logging
redux.subscribe(() => console.log(redux.getState()))

// Edit nick input
redux.subscribe(() => {

    // Get status from redux
    const {sendStatus, getStatus} = redux.getState()

    // Then message is send - clear input and make it enabled and clear local storage
    if (sendStatus === "RESOLVED") {
        inputNick.value = ""
        inputNick.disabled = false
        inputNick.classList.remove("disabled")
    }

    // Then message is sending - make input disabled
    if (sendStatus === "PENDING") {
        inputNick.disabled = true
        inputNick.classList.add("disabled")
    }

    // Then message is rejected - make input enabled
    if (sendStatus === "REJECTED") {
        inputNick.disabled = false
        inputNick.classList.remove("disabled")
    }


    // Then try to get messages is failed
    if (getStatus === "REJECTED") {
        inputNick.disabled = true
        inputNick.classList.add("disabled")
    }

})

// Edit message input
redux.subscribe(() => {

    // Get status from redux
    const {sendStatus, getStatus} = redux.getState()

    // Then message is send - clear input and make it enabled and clear local storage
    if (sendStatus === "RESOLVED") {
        inputMessage.value = ""
        inputMessage.disabled = false
        inputMessage.classList.remove("disabled")
        inputMessage.focus()

        localStorage.setItem("message", "")
    }

    // Then message is sending - make input disabled
    if (sendStatus === "PENDING") {
        inputMessage.disabled = true
        inputMessage.classList.add("disabled")
    }

    // Then message is rejected - make input enabled
    if (sendStatus === "REJECTED") {
        inputMessage.disabled = false
        inputMessage.classList.remove("disabled")
    }


    // Then try to get messages is failed
    if (getStatus === "REJECTED") {
        inputMessage.disabled = true
        inputMessage.classList.add("disabled")
    }

})

// Edit send button

// Check send button for disabling
function checkSendButtonForDisabling() {



}

let isPointAnimationStarted = false // Is there are more delicate solution?
redux.subscribe(() => {

    // Get statuses from redux
    const {sendStatus, getStatus, enterKeyPressed, inputNickFilled, inputMessageFilled} = redux.getState()
    
    // Send message statuses
    
    // If send status is "pending" and point animation isn't started
    if (sendStatus === "PENDING" && isPointAnimationStarted === false) {

        // Styling button
        sendButton.disabled = true
        sendButton.className = "disabled"

        // Start point animation
        isPointAnimationStarted = true
        
        let loadingPointAnimation = pointAnimation()
        let timerId = setTimeout(function request() {
            
            if (isPointAnimationStarted) {
                timerId = setTimeout(request, 500);
                loadingPointAnimation(sendStatus)
            }

        }, 500);

    }

    // If sending message is failed
    if (sendStatus === "REJECTED") {

        isPointAnimationStarted = false

        sendButton.disabled = true
        sendButton.classList.add("disabled")
        sendButton.innerHTML = "ОШИБКА! Отсутствует соединение."

        // If getting message is successful
        if (getStatus === "RESOLVED") {
            sendButton.disabled = false
            sendButton.classList.remove("disabled")
        }

    }

    // If message is sended
    if (sendStatus === "RESOLVED") {

        isPointAnimationStarted = false

        // If getting message is failed
        if (getStatus === "REJECTED") {
            sendButton.innerHTML = "ОШИБКА! Отсутствует соединение."
            sendButton.disabled = true
            sendButton.classList.add("disabled")
        }

        // If getting message is successful
        if (getStatus === "RESOLVED") {
            sendButton.innerHTML = "Отправить сообщение"
            sendButton.disabled = false
            sendButton.classList.remove("disabled")
        }

    }

    // Send status "clear" is ignored

    // If input nick is empty
    if (inputNickFilled === false) {
        sendButton.innerHTML = "Введите ник!"
        sendButton.disabled = true
        sendButton.className = "disabled"
    }

    // If input message is empty
    if (inputMessageFilled === false) {
        sendButton.innerHTML = "Введите сообщение!"
        sendButton.disabled = true
        sendButton.className = "disabled"
    }





    // if (sendStatus !== "PENDING") {

    //     // If nick input is empty
    //     if (inputNick.value === "" ) {

    //         // Make and style send button as disabled
    //         sendButton.innerHTML = "Введите ник!"
    //         sendButton.disabled = true
    //         sendButton.className = "disabled"

    //     }
    //     // If message input is empty
    //     else if (inputMessage.value === "" ) {

    //         // Make and style send button as disabled
    //         sendButton.innerHTML = "Введите сообщение!"
    //         sendButton.disabled = true
    //         sendButton.className = "disabled"
    //     }
        
    //     // If user pressing enter key
    //     else if ((inputMessage.value).includes("\n")) {

    //         // Make and style send button as disabled
    //         inputMessage.value = (inputMessage.value).replace("\n", "")
    //         sendButton.innerHTML = "ОПУТИ!"
    //         sendButton.disabled = true
    //         sendButton.className = "disabled"
    //     }

    //     // If all is good
    //     else {

    //         // Make and style send button as abled
    //         sendButton.innerHTML = "Отправить сообщение"
    //         sendButton.disabled = false
    //         sendButton.className = ""

    //     }
    
    // }











})


// Making changing quantity of pointers in caption
function pointAnimation() {

    const STATUS_TEXT = "Сообщение отправляется"
    let pointCounter = 0
    let resultStatusText

    // Function to change status bar
    return (sendStatus) => {

        // When awaiting sending
        if (sendStatus === "PENDING") {

            // Forming status text
            resultStatusText = STATUS_TEXT + ".".repeat(pointCounter)

            // No more then 3 points
            if (pointCounter <= 3) {
                ++pointCounter 
            }
            // Turn back if more then 3 points
            else {
                pointCounter = 1
                resultStatusText = STATUS_TEXT
            }

            // Chanhe status bar caption
            sendButton.innerHTML = resultStatusText
        }

    }

}


// For get statuses

// Edit chat history
redux.subscribe(() => {

    // Get status from redux
    const {getStatus} = redux.getState()
    const {sendStatus} = redux.getState()
    const {messages} = redux.getState()

    // Check redux status and fill history chat
    if (getStatus === "RESOLVED" && (sendStatus === "CLEAR" || sendStatus === "")) {
        createMessagesList(messages)
    }

})

// Using data to create DOM
function createMessagesList(data) {

    // Previous timeStamp to compare date
    let nextMessageDateValue = ""

    // Find message wich have been craeted after timeStamp
    let newMessages = data.filter((element) => element.timeStamp > redux.getState().lastMessageID)

    //Creating messages
    for (let index = 0; index < newMessages.length; index++) {
        
        let message = newMessages[index]

        // Check if there are some messages
        if (message.timeStamp !== null) {

            // Message wrapper
            let messageWraper = elementConstructor("div", "messageWrapper", chatHistory, false)

            // Nick
            let messageNick = elementConstructor("div", "messageNick", messageWraper)
            messageNick.innerHTML = message.nick

            // Text
            let messageText = elementConstructor("div", "messageText", messageWraper)
            messageText.innerHTML = message.message

            // Time 
            let timeStamp = new Date( parseInt( message.timeStamp.substr(0,8), 16 ) )
            let messageTime = elementConstructor("div", "messageTime", messageWraper)
            messageTime.innerHTML = timeStamp.toLocaleTimeString()



            // Date measuring
            let currentMessageDateValue = timeStamp.toLocaleDateString()

            // If it isn't last message - get date of next message, if it is - just get date of current message
            if (index < newMessages.length-1) nextMessageDateValue = new Date( newMessages[index + 1].timestamp).toLocaleDateString()
            else nextMessageDateValue = currentMessageDateValue

            // If date of current message is different on date of next message or it is last message
            if (nextMessageDateValue !== currentMessageDateValue || index === newMessages.length-1) {

                // Create date limit
                let dateLimit = elementConstructor("div", "dateLimit", chatHistory, false)
                dateLimit.innerHTML = currentMessageDateValue

                // Delete old same date
                let dateLimits = [...document.getElementsByClassName("dateLimit")]

                // If there are more than 2 dates
                if (dateLimits.length >= 2) {
                    // If previous limit is the same - delete it
                    if (dateLimits[0].innerHTML === dateLimits[1].innerHTML) {
                        dateLimits[1].remove()
                    }

                }

            }
            
        }

    }
}

// Constructor of elements
function elementConstructor(element, className, parent, incertToEnd = true) {

    // Create element
    let newElement = document.createElement(element) 

    // Set class name
    if (className !== "") newElement.className = className

    // Set new element to parent
    if (incertToEnd) {
        parent.appendChild(newElement)
    }
    else {
        parent.prepend(newElement)
    }
    return newElement
    
}

// Change background color of messages
redux.subscribe(() => {
    let turner = redux.getState().messages.length % 2
    console.log(redux.getState().messages.length)
    chatHistory.style.setProperty(`--messageColor${turner}`, `var(--bg1_color)`)
    turner = (turner + 1) % 2
    chatHistory.style.setProperty(`--messageColor${turner}`, `var(--bg2_color)`)
})


// EVENTS

// Click button to send message
sendButton.onclick = () => {

    // Send message and loag messages
    redux.dispatch(actionSendAndCheck(inputNick.value, inputMessage.value))

}

// Every 5 seconds - reload messages
loadMessages()
setInterval(()=>{loadMessages()}, 5000)
function loadMessages() {

    // Start only if send or get statuses isn't "Pending"
    const {sendStatus} = redux.getState()
    const {getStatus} = redux.getState()
    if (sendStatus !== "PENDING" && sendStatus !== "RESOLVED" && getStatus !== "PENDING") {

        // Load messages
        redux.dispatch(actionGet())

    }

}


// Works with local storage

inputNick.oninput = () => {
    
    // Save nick in storage
    localStorage.setItem("nick", inputNick.value)

    // Check input nick for not empty value
    checkSendButtonForDisabling()

    

}

(function loadNickFromStorage() {
    
    // Load nick from storage
    if (localStorage.getItem("nick") !== null) inputNick.value = localStorage.getItem("nick")
    
    // Check input nick for not empty value
    checkSendButtonForDisabling()
    
})()

inputMessage.oninput = () => {
    
    // Save message in storage
    localStorage.setItem("message", inputMessage.value)

    // Check input message for not empty value
    checkSendButtonForDisabling()

}

(function loadMessageFromStorage() {

    // Load message from storage
    if (localStorage.getItem("message") !== null) inputMessage.value = localStorage.getItem("message")

    // Check input message for not empty value
    checkSendButtonForDisabling()

})()

document.addEventListener("keypress", (event) => {

    // Check input message for not empty value
    checkSendButtonForDisabling()

})

document.addEventListener("keydown", () => {

    // Check input message for not empty value
    checkSendButtonForDisabling()

})

document.addEventListener("keyup", (event) => {

    // Check input message for not empty value
    checkSendButtonForDisabling()

    // Send messages or delete "/n"
    pressEnterActions(event)

})

// Send messages or delete "/n"
const pressEnterActions = (event) => {

    // If enter button is pressed
    if (event.key === "Enter" ) {

        // If sendbutton is disabled
        if (sendButton.disabled === true) {
            inputMessage.value = (inputMessage.value).replace("\n", "")
        }

        // If sendbutton is not disable
        else  {
            redux.dispatch(actionSendAndCheck(inputNick.value, inputMessage.value))
        }

    }

}