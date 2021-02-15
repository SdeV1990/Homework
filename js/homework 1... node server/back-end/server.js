#!/usr/bin/node
// Plugging NODE

// First try to make server part... throught ass (without express).

// To use HTTP server
const http = require('http')

// To use file stream
const fs = require("fs");

// History object (simulating data base)
const history = []

// After url (comands)
const routes = {

    // Set time stamp into message and put message into history
    "/message": {

        // Create new message
        POST(req, res){

            // Response
            // https://developer.mozilla.org/ru/docs/Web/HTTP/Status
            res.statusCode = 201 // Created
            
            // Converting data to JSON. Part by part into whole file
            let json = ""

            // https://nodejs.org/api/stream.html#stream_event_data
            req.on("data", partOfJson => {
                json += partOfJson
            })

            // Creating message
            // https://nodejs.org/api/stream.html#stream_writable_end_chunk_encoding_callback
            req.on("end", () => {
                try{
                    const message = JSON.parse(json)
                    message.timeStamp = (new Date).toISOString()
                    history.push(message)
                    res.end(JSON.stringify(message))
                }
                catch(e){
                    console.log(e)
                    res.statusCode = 403 // Forbidden(?)
                    res.end("WRONG JSON")
                }
            })
        },
    },

    // Return message history with messages, created after specified time stamp
    "/message-after" : {

        POST(req, res){

            // Response
            res.statusCode = 201 // Created
            
            // Converting data to JSON. Part by part into whole file
            let json = ""
            req.on("data", partOfJson => {
                json += partOfJson
            })

            // Return message by timeStamp
            req.on("end", () => {

                try{
                    // Get timeStamp from request
                    const timeStamp = JSON.parse(json).timeStamp
                    console.log(timeStamp)

                    // Find message wich have been craeted after timeStamp
                    let messages = history.filter((element) => element.timeStamp > timeStamp)

                    // Return message
                    res.end(JSON.stringify(messages))
                }
                catch(e){
                    console.log(e)
                    res.statusCode = 403 // Forbidden(?)
                    res.end("WRONG JSON")
                }

            })
        }
    }
}
//+обновите фронт под этот бэк.

// Creating server
const port = 4000
http.createServer((request, response) => {

    console.log(`Запрошенный адрес: ${request.url}`);

    // console.log(request)
    // If url in request is in routes and routes in request is in routes
    if (request.url in routes && request.method in routes[request.url]){
        
        // Do method
        routes[request.url][request.method](request, response)

    }

    // ASS
    // index.html
    else if (request.url === "/"){
        // получаем путь после слеша
        // const filePath = request.url.substr(1);
        const filePath = "public/index.html";
        fs.readFile(filePath, function(error, data){
                
            if(error){
                response.statusCode = 404;
                response.end("Resourse not found!");
            }   
            else{
                response.end(data);
            }

        });
    }
    // other
    else if (request.url !== ""){
        // получаем путь после слеша
        const filePath = "public/" + request.url.substr(1);
        fs.readFile(filePath, function(error, data){
                
            if(error){
                response.statusCode = 404;
                response.end("Resourse not found!");
            }   
            else{
                response.end(data);
            }

        });
    }
    // Unknown error
    else {
        response.statusCode = 404 // Not Found
        response.end("<h1>Unknown error!</h1>")
    }

}).listen(port) // Starts the HTTP server listening for connections.
