const fs = require('fs')
const path = require('path')

const productsFilePath = path.join(__dirname, '../database/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

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
    productStore: (req, res) =>{
      let newProduct = {
			id: products[products.length - 1].id + 1,
            nombreProducto: req.body.nombreProducto,
            descripcion: req.body.descripcion,
            descripcionAmpliada: req.body.descripcionAmpliada,
            image: req.file ? req.file.filename :'default-image.jpg',
            idCategory: req.body.idCategory,
            colores: ["","",""],
            price: req.body.precioProducto
      }
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
    },
    productDetails: (req, res) => {
      let idProduct = req.params.id
      let productoEncontrado = products.find(product => product.id == idProduct)
      res.render('product', {productoEncontrado})
    }
}

module.exports = productController;