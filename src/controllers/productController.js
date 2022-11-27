const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
    busqueda: (req, res) =>{
        res.render('busqueda')
    },
    category: (req, res) =>{
        res.render('category')
    },
    kart: (req, res) =>{
        res.render('kart')
    },
    productAdd: (req, res) =>{
        res.render('productAdd')
    },
    productStore: (req, res) =>{
        let newProduct = {
			id: products[products.length - 1].id + 1,
            nombreProducto: req.body.nombreProducto,
            descripcion: req.body.descripcion,
            image: req.file ? req.file.filename :'default-image.jpg',
            idCategory: req.body.idCategory,
            colores: ["","",""],
            price: req.body.precioProducto
           }
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
    },
    productDetails: (req, res) =>{
        res.render('product')
    }
}

module.exports = productController;