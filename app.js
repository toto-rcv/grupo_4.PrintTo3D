const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('public'))
app.listen(3000)

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./views/home.html'))
})
app.get('/product', (req, res) => {
  res.sendFile(path.resolve('./views/product.html'))
})
app.get('/kart', (req, res) => {
  res.sendFile(path.resolve('./views/kart.html'))
})
app.get('/category', (req, res) => {
  res.sendFile(path.resolve('./views/category.html'))
})
app.get('/busqueda', (req, res) => {
  res.sendFile(path.resolve('./views/busqueda.html'))
})