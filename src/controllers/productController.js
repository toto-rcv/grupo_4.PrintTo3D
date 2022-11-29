const fs = require('fs')
const path = require('path')

const productsFilePath = path.join(__dirname, '../database/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const categoryJson = path.join(__dirname, '../database/categories.json')
const categories = JSON.parse(fs.readFileSync(categoryJson, 'utf-8'));


const productController = {
    busqueda: (req, res) =>{
        res.render('busqueda')
    },
    category: (req, res) =>{
        let id = req.params.id;
        let productosId = products.filter(producto => producto.idCategory == id)
        res.render('category', {productosId})
    },
    edit: (req, res) => {
		let id = req.params.id
		let productToEdit = products.find(product => product.id == id)
		res.render('productEdit', {productToEdit,categories})
    },
    update: (req, res) => {
		  let id = req.params.id
		  let productToEdit = products.find(product => product.id == id)
		  productToEdit = {
        id: productToEdit.id,
        nombreProducto: req.body.nombreProducto,
        descripcion: req.body.descripcion,
        descripcionAmpliada: req.body.descripcionAmpliada,
        image: req.file ? req.file.filename :'default-image.jpg',
        idCategory: req.body.idCategory,
        colores: ["","",""],
        price: req.body.precioProducto
		  }
		  let newProducts = products.map(product => {
		  	if (product.id == productToEdit.id) {
		  		return product = {...productToEdit}
		  	}
		  	return product;
		  })
		  fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '))
		  res.redirect('/')
	  },
    delete: (req, res) => {
		  let id = req.params.id
		  let newProducts = products.filter(product => product.id != id)
		  fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '))
		  res.redirect('/')
    },
    kart: (req, res) =>{
        res.render('kart')
    },
    productAdd: (req, res) =>{
        res.render('productAdd',{categories})
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