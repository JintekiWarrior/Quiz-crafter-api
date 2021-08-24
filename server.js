const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// custom middleware functions
const errorHandler = require('./app/lib/error_handler')
const requestLogger = require('./app/lib/request_logger')
const auth = require('./app/lib/auth')

// custome router
const userRoutes = require('./app/routes/user_routes')

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

app.use(cors())

// routes middleware
app.use(userRoutes)

// Last step in middleware
app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port} `)
})
