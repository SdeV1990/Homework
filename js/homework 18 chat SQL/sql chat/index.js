#!/usr/bin/node
// Plugging NODE

// Use file system
const fileSystem = require("fs")

// Use Express
const express = require('express')
const app = express()
// const jsonParser = express.json()

// Use dotenv
// https://www.npmjs.com/package/dotenv
require('dotenv').config()
const {DB_PASSWORD, DB_USER} = process.env

const DB_HOST = "localhost"
const DB_DB = "sqlchat"

// Use sequelize
// https://sequelize.org/master/manual/getting-started.html
const { Sequelize, Model, DataTypes, Op } = require('sequelize')
const sequelize = new Sequelize(DB_DB,DB_USER, DB_PASSWORD, {host: DB_HOST, dialect: 'mysql'})

// Use graphql, express
// https://tproger.ru/translations/graphql-beginners-guide/
const  express_graphql  = require('express-graphql').graphqlHTTP
const { buildSchema } = require('graphql')

// Schema of SQL by GraphQL
const schema = buildSchema(`

    type Query {
        getMessages(timeStamp:String):[Message]
    }

     type Mutation {
        addMessage(message:MessageInput):Message
    }

    type Message {
        nick: String
        message: String
        timeStamp: String
    }

    input MessageInput {
        nick: String
        message: String
    }
    
`)

// Root resolver
const rootResolver = {
    async addMessage(data){
        try {

            console.log({nick: data.message.nick, message: data.message.message})

            // Create new message
            return await Message.create({
                nick: data.message.nick, 
                message: data.message.message, 
                timeStamp: (new Date().valueOf()).toString()
            })
        }
        catch(error) {
            console.log("addMessage error:" + error)
        }
    },
    async getMessages(data){
        try {
            return await Message.findAll({
                where: {
                    timeStamp: {
                        [Op.gt]: data.timeStamp
                    }
                }
            })
        }
        catch(error){
            console.log("getMessage error:" + error);
        }
    }
}

// Logging url requests
app.use(function(request, response, next){

    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`
    console.log(data)

    // Save in file
    fileSystem.appendFile("server.log", data + "\n", function(){})

    next()

});

// Provide static files
app.use(express.static('public'))

// Main url -> index.html
app.get("/", (request, response) => {
    const filePath = "public/index.html"
    fileSystem.readFile(filePath, function(error, data){
            
        if (error) {
            response.statusCode = 404 // Not found
            response.end("Resourse not found!")
        }   
        else {
            response.end(data)
        }

    })
});

// Plug graphQL
// https://graphql.org/graphql-js/express-graphql/
app.use('/graphql', express_graphql(
    async (require, resolve) => ({
        schema,
        rootValue: rootResolver,
        graphiql: true,
        context: {}
    })
));

// Run server
// https://expressjs.com/ru/4x/api.html#app.listen
app.listen(process.env.PORT, () => console.log('RUN SERVER!')) // 

// Create class uzer for sequelize
class Message extends Model {}

// Initialyze model
Message.init({
    nick: DataTypes.STRING,
    message: DataTypes.STRING,
    timeStamp: DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'message', 
    timestamps: false
});

// Syncronize with database, create table messages if not exist end crate greeting if table messages is empty
(async () => await sequelize.sync()

    // All right
    .then(() => console.log("Database is sycronized.") )

    // Create greetting if table messages is empty
    .then(async () => { 

            // Check table messages for messages
            if (await Message.findAndCountAll().then(result => result.count) == 0 ) {

                // Create greeting
                await Message.create({
                    nick: "Admin", 
                    message: "Welcome to the new chat!", 
                    timeStamp: new Date().valueOf().toString()
                })
            }
        }
    )

    // Check for error
    .catch(err=> {
        console.log("Error with database syncronization.")
        console.log(err)
    })
    
)()