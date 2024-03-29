const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session'); // para session
const cookies = require("cookie-parser");
const acceso = require('./src/middlewares/acceso');
const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
/*Middelware*/
app.use(express.static('public'))
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuro Session
app.use (session({
  secret:'Shh',
  resave:false,
  saveUninitialized:false
}))

app.use(cookies());

//Middleware para controlar si el user esta logueado o no.
app.use(acceso);

app.listen(3000, ()=>{
  console.log('Servidor funcionando');
  });

app.set('view engine', 'ejs');

app.set('views', './src/views');

const mainRoute = require('./src/routes/mainRoute');
const productRoute = require('./src/routes/productRoute');
const userRoute = require('./src/routes/userRoute');
const apiUsersRouter = require('./src/routes/api/users')
const apiProductsRouter = require('./src/routes/api/products')
const apiTotalesRouter = require('./src/routes/api/totales')


app.use("/", [mainRoute,productRoute,userRoute,apiUsersRouter,apiProductsRouter, apiTotalesRouter]);




app.use((req, res, next) =>{
  res.status(404).render('not-found')
})