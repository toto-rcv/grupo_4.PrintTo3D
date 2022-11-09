const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('public'))
app.listen(3000, ()=>{
  console.log('Servidor funcionando');
  });

app.set('view engine', 'ejs');

app.set('views', './src/views');

const mainRoute = require('./src/routes/mainRoute');
const productRoute = require('./src/routes/productRoute');
const userRoute = require('./src/routes/userRoute');

app.use("/", [mainRoute,productRoute,userRoute]);

/*
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,"./views/home.html"))
})

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname,"./views/login.html"))
})

app.get("/recuperacion", (req, res) => {
  res.sendFile(path.resolve(__dirname,"./views/r-contrasena.html"))
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
app.get('/register', (req, res) => {
  res.sendFile(path.resolve('./views/register.html'))
})*/