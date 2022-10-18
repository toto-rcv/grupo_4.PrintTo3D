const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('public'))
app.listen(3000)

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./views/home.html'))
})