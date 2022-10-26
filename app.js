const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('public'))
app.listen(3000)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,"./views/home.html"))
})

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname,"./views/login.html"))
})

app.get("/recuperacion", (req, res) => {
  res.sendFile(path.resolve(__dirname,"./views/r-contrasena.html"))
})