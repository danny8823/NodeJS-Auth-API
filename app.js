require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3001

// ! Connect to MongoDB
mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log('DB connected successfuly')
}).catch((error)=>{
    console.log('Error:',error.message)
})

// ! Starting the server
app.listen(PORT,() => {
    console.log(`Server listening on port: ${PORT}`)
})