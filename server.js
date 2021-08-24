const express = require("express")
const app = express()
let port = process.env.PORT || 8080

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port} `)
})
