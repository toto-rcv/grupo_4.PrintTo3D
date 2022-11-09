const { userInfo } = require('os');
const path = require('path');

const mainController = {
    busqueda: (req, res) =>{
        res.render('busqueda')
    },
    category: (req, res) =>{
        res.render('category')
    }
}

module.exports = mainController;
//user: registro login recuperacion de contraseña
//product: categoria busqueda
//main: 
