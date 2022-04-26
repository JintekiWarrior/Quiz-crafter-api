const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// custom middleware functions
const errorHandler = require('./app/lib/error_handler')
const requestLogger = require('./app/lib/request_logger')
const auth = require('./app/lib/auth')

// custome router
const userRoutes = require('./app/routes/user_routes')
const quizRoutes = require('./app/routes/quiz_routes')
const questionRoutes = require('./app/routes/question_routes')

const app = express()
let port = process.env.MONGODB_URI || 8080

mongoose.connect('mongodb://localhost/quiz-crafter-db', {
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
app.use(quizRoutes)
app.use(questionRoutes)

// Last step in middleware
app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port} `)
})
