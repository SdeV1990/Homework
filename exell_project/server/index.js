import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
// import bodyParser from 'body-parser' // By-by...

import documentsRounter from './routes/documents.js'
import documentRounter from './routes/document.js'
import userRouter from "./routes/user.js"

const app = express()

app.use(express.json({ limit: '30mb', extended: true })) // bodyParser -> express
app.use(express.urlencoded({ limit: '30mb', extended: true })) // bodyParser -> express
app.use(cors())

app.use("/user", userRouter)
app.use("/documents", documentsRounter)
app.use("/document", documentRounter)

const CONNECTION_URL = 'mongodb://localhost:27017/exell'
const PORT = process.env.PORT|| 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false);