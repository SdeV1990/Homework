#!/usr/bin/node
// Plugging NODE

// Second try to make server part... (without MongoDB: there are problems in installing on Windows 7).

// To use HTTP server
const http = require('http')

// To use file stream
const fs = require("fs");

// History object (simulating data base)
const history = []

// To use Express
const express = require('express')


const app = express()

// Providin static files
app.use(express.static('public'));

// Main url -> index.html
app.get("/", (request, response) => {
    const filePath = "public/index.html"
    fs.readFile(filePath, function(error, data){
            
        if(error){
            response.statusCode = 404
            response.end("Resourse not found!")
        }   
        else{
            response.end(data);
        }

    });
})

// Set message
app.post("/message", (request, result) => {

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
            const message = JSON.parse(json)
            message.timeStamp = (new Date).toISOString()
            history.push(message)
            result.end(JSON.stringify(message))
        }
        catch(e){
            console.log(e)
            result.statusCode = 403 // Forbidden(?)
            result.end("WRONG JSON")
        }
    })
})

// Get messages
app.post("/message-after", (request, result) => {

    // Response
    result.statusCode = 201 // Created
    
    // Converting data to JSON. Part by part into whole file
    let json = ""
    request.on("data", partOfJson => {
        json += partOfJson
    })

    // Return message by timeStamp
    request.on("end", () => {

        try{
            // Get timeStamp from request
            const timeStamp = JSON.parse(json).timeStamp
            console.log(timeStamp)

            // Find message wich have been craeted after timeStamp
            let messages = history.filter((element) => element.timeStamp > timeStamp)

            // Return message
            result.end(JSON.stringify(messages))
        }
        catch(e){
            console.log(e)
            result.statusCode = 403 // Forbidden(?)
            result.end("WRONG JSON")
        }

    })
})

// Creating server
const port = 4000
app.listen(port, () => {
    console.log("Example app listening at http://localhost:${port}")
})