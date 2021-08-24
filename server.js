const express = require("express")
const mongoose = require('mongoose')
const app = express()
let port = process.env.PORT || 8080

mongoose.connect('mongodb://localhost/nodeJS-auth-template', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

app.use(express.json())

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port} `)
})
