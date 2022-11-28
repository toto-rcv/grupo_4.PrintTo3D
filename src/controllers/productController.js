const fs = require("fs")
const path = require("path")

const productsJson = path.join(__dirname, '../database/products.json')
const products = JSON.parse(fs.readFileSync(productsJson, 'utf-8'));


const productController = {
    busqueda: (req, res) =>{
        res.render('busqueda')
    },
    category: (req, res) =>{
        let id = req.params.id;
        let productosId = products.filter(producto => producto.idCategory == id)
        res.render('category', {productosId})
    },
    kart: (req, res) =>{
        res.render('kart')
    },
    productAdd: (req, res) =>{
        res.render('productAdd')
    },
    productDetails: (req, res) =>{
        res.render('product')
    }
}

module.exports = productController;