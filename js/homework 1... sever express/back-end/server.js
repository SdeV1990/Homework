#!/usr/bin/node
// Plugging NODE

// To use file stream
const fs = require("fs")

// To use Express
const express = require('express')
const app = express()
const jsonParser = express.json();

// Mongoose
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// In this chat there is no need to use version rey
const messageScheme = new Schema({ nick: String, message: String }, {versionKey: false})
const Message = mongoose.model("Message", messageScheme)

// Connection to mongoose
const port = 4000
mongoose.connect("mongodb://localhost:27017/messageDB", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
});


// Logging url requests
app.use(function(request, response, next){

    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);

    // Save in file
    fs.appendFile("server.log", data + "\n", function(){});
    next();

});

// Provide static files
app.use(express.static('public'));

// Main url -> index.html
app.get("/", (request, response) => {
    const filePath = "public/index.html"
    fs.readFile(filePath, function(error, data){
            
        if (error) {
            response.statusCode = 404 // Not found
            response.end("Resourse not found!")
        }   
        else {
            response.end(data);
        }

    });
})

// Set message
app.post("/message", jsonParser, (request, result) => {

    // Response
    // https://developer.mozilla.org/ru/docs/Web/HTTP/Status
    result.statusCode = 201 // Created
    
    // Converting data to JSON. Part by part into whole file
    let json = ""

    // https://nodejs.org/api/stream.html#stream_event_data
    request.on("data", partOfJson => {
        json += partOfJson
    })

    // Creating message
    // https://nodejs.org/api/stream.html#stream_writable_end_chunk_encoding_callback
    request.on("end", () => {
        try{
            const message = new Message(JSON.parse(json))
            console.log("Message " + message)
            message.save(function(error){
                if(error) return console.log("Data base saving error. " + error);
                result.send(message);
            })
        }
        catch(error){
            console.log(error)
            result.statusCode = 403 // Forbidden(?)
            result.send("WRONG JSON")
        }
    })
})

// Get messages
app.post("/message-after", (request, result) => {

    // Response
    result.statusCode = 201 // Created

    // If there is no messages in database
    Message.count( {}, (error, count) => {

        // On error
        if (error) console.log("Problem with counting messages. " + error)

        if (count == 0) {

            // Create first message
            (new Message({ nick: "Admin", message: "Wellcome to the new chat!" })).save(function(error){
                if(error) return console.log("Problem with creating first message/" + error)
            });

        }
    })
    
    // Converting data to JSON. Part by part into whole file
    let json = ""
    request.on("data", partOfJson => {
        json += partOfJson
    })

    // Return message by timeStamp
    request.on("end", () => {
        try{

            // Create id from time stamp
            let constructedObjectId = mongoose.Types.ObjectId(JSON.parse(json).timeStamp)

            // Find message wich have been created after time stamp
            Message.find({"_id": { $gt: constructedObjectId }}, function(err, messages){
                 
                // Return error
                if(err) return console.log("Problem with getting messages from data base. " + err)

                // Create array of messages
                let resultArray = messages.map((item) => {

                    // Create one message
                    let {nick, message} = item
                    return {nick, message, timeStamp: item._id.toString()}

                })

                result.send(resultArray)
            });
        }
        catch(error){
            console.log(error)
            result.statusCode = 403 // Forbidden
            result.send("WRONG JSON")
        }
    })
})