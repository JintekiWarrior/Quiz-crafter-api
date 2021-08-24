const express = require('express')
const mongoose = require('mongoose')

// custom middleware functions
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')
const auth = require('./lib/auth')

const app = express()
let port = process.env.PORT || 8080

mongoose.connect('mongodb://localhost/nodeJS-auth-template', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

app.use(express.json())

app.use(auth)

app.use(requestLogger)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port} `)
})
