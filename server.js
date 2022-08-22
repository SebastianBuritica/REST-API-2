require('dotenv').config()

const express = require('express')
const app = express()

// Mongoose will be used to connect to our MongoDB database
const mongoose = require('mongoose')

const port = process.env.PORT || 3001

// Lets connect to our MongoDB database
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.yphipax.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

    mongoose.connect(uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
        .then(() => console.log('Base de datos conectada'))
        .catch(e => console.log(e))



app.use(express.json())

// Setting up the routes
const subscribersRouter = require('./routes/subscribers.js')
app.use('/subscribers', subscribersRouter)


// This will get run whenever our server starts.
app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})