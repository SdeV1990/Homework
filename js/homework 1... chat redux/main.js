
// Redux
function createStore(reducer){
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
        lastMessageID: 0
    }, 
    {type, data}
) {

    //  if type.startsWith('SEND_) {
    //     return {...state, sendStatus: type.slice('_')[1]}
    // }

    // Send status
    if (type === 'SEND_PENDING'){
        return {...state, sendStatus: 'PENDING'}
    }
    if (type === 'SEND_RESOLVED'){
        return {...state, sendStatus: 'RESOLVED'}
    }
    if (type === 'SEND_REJECTED'){
        return {...state, sendStatus: 'REJECTED'}
    }
    if (type === 'SEND_CLEAR'){
        return {...state, sendStatus: 'CLEAR'}
    }

    //Get status
    if (type === 'GET_PENDING'){
        return {...state, getStatus: 'PENDING'}
    }
    if (type === 'GET_RESOLVED'){
        return {...state, getStatus: 'RESOLVED', messages: state.messages.concat(...data), lastMessageID:  state.messages.length}
    }
    if (type === 'GET_REJECTED'){
        return {...state, getStatus: 'REJECTED'}
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
            if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
                resolve(JSON.parse(x.responseText))
            }
            else if (x.status != 200){
                reject(new Error('status is not 200'))
            }
        }
    })
}


// ACTIONS

// Send actions
const actionSendPending = () => ({type: "SEND_PENDING"})
const actionSendResolved = () => ({type: "SEND_RESOLVED"})
const actionSendRejected = () => ({type: "SEND_REJECTED"})
const actionSendClear = () => ({type: "SEND_CLEAR"})

//// Script of sending messages
// const actionSend = (nick, message) => 
//     async dispatch => {
//         try {
//             dispatch(actionSendPending())
//             let result = await jsonPost(
//                 "http://students.a-level.com.ua:10012", 
//                 {
//                     func: 'addMessage', 
//                     nick: nick, 
//                     message: message
//                 }
//             )
//             dispatch(actionSendResolved())
//             dispatch(actionSendClear())
//         }
//         catch (e){
//             console.log(e)
//             dispatch(actionSendRejected())
//         }
//     }

const store = createStore(chatReducer)

// Get actions
const actionGetPending = () => ({type: "GET_PENDING"})
const actionGetResolved = (data) => ({type: "GET_RESOLVED", data})
const actionGetRejected = () => ({type: "GET_REJECTED"})

// Script of getting messages
const actionGet = () =>
    async dispatch => {
        try {
            dispatch(actionGetPending())
            let lastMessageID = store.getState().messages.length
            let result = await jsonPost(
                "http://students.a-level.com.ua:10012", 
                {
                    func: "getMessages", 
                    messageId: lastMessageID
                }
            )
            dispatch(actionGetResolved(result.data))
        }
        catch (e){
            console.log(e)
            dispatch(actionGetRejected())
        }
    }

// Script of sending message and loading it as fast as possible
// Function bellow is not good enought: doubling craeting messages (if you send quickly) ¯\_(ツ)_/¯
// async function sendAndCheck(nick, message) {
     
//     // Send message
//     await store.dispatch(actionSend(nick, message))

//     // Get messages
//     store.dispatch(actionGet())

// }

// This is better
// Script of sending message and loading it as fast as possible
const sendAndCheck = (nick, message) => 
    async dispatch => {

        // Send message
        try {
            dispatch(actionSendPending())
            let result = await jsonPost(
                "http://students.a-level.com.ua:10012", 
                {
                    func: 'addMessage', 
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
        if (store.getState().sendStatus === "PENDING") {

            try {
                dispatch(actionGetPending())
                let lastMessageID = store.getState().messages.length
                let result = await jsonPost(
                    "http://students.a-level.com.ua:10012", 
                    {
                        func: "getMessages", 
                        messageId: lastMessageID
                    }
                )
                dispatch(actionGetResolved(result.data))
            }
            catch (e){
                console.log(e)
                dispatch(actionGetRejected())
            }

            if (store.getState().getStatus === "RESOLVED") {

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
store.subscribe(() => console.log(store.getState()))

// Edit inputs
store.subscribe(() => {

    // Get status from redux
    const {sendStatus} = store.getState()

    // Check redux status and clean input if it is needed
    if (sendStatus === "RESOLVED") {
        inputMessage.value = ""
        localStorage.setItem("message", "")
    }

})

// Edit button
let startPointAnimation = false// Is there are more delicate solution?
store.subscribe(() => {

    // Get status from redux
    const {sendStatus} = store.getState()
    const {getStatus} = store.getState()
    
    // Check redux status and clean status bar
    if (sendStatus === "PENDING" && startPointAnimation === false) {

        // Styling button
        sendButton.disabled = true
        sendButton.className = "disabled"

        // Start point animation
        startPointAnimation = true
        let loadingPointAnimation = pointAnimation()
        let timerId = setTimeout(function request() {
            
            if (startPointAnimation) {
                timerId = setTimeout(request, 500);
                loadingPointAnimation(sendStatus)
            }

        }, 500);

    }

    // Check redux status and clean status bar
    if (sendStatus === "RESOLVED") {
        startPointAnimation = false
        checkSendButtonForDisabling()
        inputMessage.focus()
    }

    // Check redux status and make error caption if it is needed
    if (sendStatus === "REJECTED" && getStatus === "RESOLVED") {
        startPointAnimation = false
        checkSendButtonForDisabling()
    }

    // Check redux status and clean status bar
    if (sendStatus === "REJECTED" && getStatus === "REJECTED") {
        startPointAnimation = false
        // checkSendButtonForDisabling()
        sendButton.innerHTML = "ОШИБКА! Отсутствует соединение."
    }

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
store.subscribe(() => {

    // Get status from redux
    const {getStatus} = store.getState()
    const {sendStatus} = store.getState()
    const {messages} = store.getState()

    // Check redux status and fill history chat
    if (getStatus === "RESOLVED" && (sendStatus === "CLEAR" || sendStatus === "")) {
        createMessagesList(messages)
    }

})

// Using data to create DOM
function createMessagesList(data) {

    // Previous timeStamp to compare date
    let nextMessageDateValue = ""
    
    //Creating messages
    for (let index = store.getState().lastMessageID; index<data.length; index++) {

        let message = data[index]

        // Check if there are some messages
        if (message.timestamp !== null) {

            // Message wrapper
            let messageWraper = elementConstructor("div", "messageWrapper", chatHistory, false)

            // Nick
            let messageNick = elementConstructor("div", "messageNick", messageWraper)
            messageNick.innerHTML = message.nick

            // Text
            let messageText = elementConstructor("div", "messageText", messageWraper)
            messageText.innerHTML = message.message

            // Time
            let timeStamp = new Date(+message.timestamp)
            let messageTime = elementConstructor("div", "messageTime", messageWraper)
            messageTime.innerHTML = timeStamp.toLocaleTimeString()



            // Date measuring
            let currentMessageDateValue = timeStamp.toLocaleDateString()

            // If it isn't last message - get date of next message, if it is - just get date of current message
            if (index<data.length-1) nextMessageDateValue = new Date(+data[index + 1].timestamp).toLocaleDateString()
            else nextMessageDateValue = currentMessageDateValue

            // If date of current message is different on date of next message or it is last message
            if (nextMessageDateValue !== currentMessageDateValue || index === data.length-1) {

                // Create date limit
                let dateLimit = elementConstructor("div", "dateLimit", chatHistory, false)
                dateLimit.innerHTML = currentMessageDateValue

                // // Delete old same date
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

        // Set background color
        let turner = store.getState().lastMessageID % 2
        chatHistory.style.setProperty(`--messageColor${turner}`, `var(--bg1_color)`)
        turner = (turner + 1) % 2
        chatHistory.style.setProperty(`--messageColor${turner}`, `var(--bg2_color)`)
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


// EVENTS

// Click button to send message
sendButton.onclick = () => {

    // Send message and loag messages
    store.dispatch(sendAndCheck(inputNick.value, inputMessage.value))

}

// Every 5 seconds - reload messages
loadMessages()
setInterval(()=>{loadMessages()}, 5000)
function loadMessages() {

    // Start only if send or get statuses isn't "Pending"
    const {sendStatus} = store.getState()
    const {getStatus} = store.getState()
    if (sendStatus !== "PENDING" && sendStatus !== "RESOLVED" && getStatus !== "PENDING") {

        // Load messages
        store.dispatch(actionGet())

    }

}


// Works with local storage

inputNick.oninput = () => {
    
    // Save nick in storage
    localStorage.setItem("nick", inputNick.value)

    // Check input nick for not empty value
    checkSendButtonForDisabling()

}

loadNickFromStorage()
function loadNickFromStorage() {
    
    // Load nick from storage
    if (localStorage.getItem("nick") !== null) inputNick.value = localStorage.getItem("nick")
    
    // Check input nick for not empty value
    checkSendButtonForDisabling()
    
}

inputMessage.oninput = () => {
    
    // Save message in storage
    localStorage.setItem("message", inputMessage.value)

    // Check input message for not empty value
    checkSendButtonForDisabling()

}

loadMessageFromStorage()
function loadMessageFromStorage() {

    // Load message from storage
    if (localStorage.getItem("message") !== null) inputMessage.value = localStorage.getItem("message")

    // Check input message for not empty value
    checkSendButtonForDisabling()

}



// Check send button for disabling
function checkSendButtonForDisabling() {

    if (store.getState().sendStatus !== "PENDING") {

        // If nick input is empty
        if (inputNick.value === "" ) {

            // Make and style send button as disabled
            sendButton.innerHTML = "Введите ник!"
            sendButton.disabled = true
            sendButton.className = "disabled"

        }
        // If message input is empty
        else if (inputMessage.value === "" ) {

            // Make and style send button as disabled
            sendButton.innerHTML = "Введите сообщение!"
            sendButton.disabled = true
            sendButton.className = "disabled"
        }
        
        // If user pressing enter key
        else if ((inputMessage.value).includes("\n")) {

            // Make and style send button as disabled
            inputMessage.value = (inputMessage.value).replace("\n", "")
            sendButton.innerHTML = "ОПУТИ!"
            sendButton.disabled = true
            sendButton.className = "disabled"
        }

        // If all is good
        else {

            // Make and style send button as abled
            sendButton.innerHTML = "Отправить сообщение"
            sendButton.disabled = false
            sendButton.className = ""

        }
    
    }

}

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
            store.dispatch(sendAndCheck(inputNick.value, inputMessage.value))
        }

    }

}