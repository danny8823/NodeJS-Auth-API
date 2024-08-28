require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router  = require('./routes/users')
const app = express()
const PORT = process.env.PORT || 3001

// ! Connect to MongoDB
mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log('DB connected successfuly')
}).catch((error)=>{
    console.log('Error:',error.message)
})

// ! MIDDLEWARES
app.use(express.json()) //* PASS INCOMING JSON DATA FROM THE USER

// ! ROUTES
app.use('/', router)

// ! Starting the server
app.listen(PORT,() => {
    console.log(`Server listening on port: ${PORT}`)
})