const fs = require('fs')
const path = require('path')
const { where } = require('sequelize')

const productsFilePath = path.join(__dirname, '../database/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const categoryJson = path.join(__dirname, '../database/categories.json')
const categories = JSON.parse(fs.readFileSync(categoryJson, 'utf-8'))
const coloresJson = path.join(__dirname, '../database/colores.json')
const colores = JSON.parse(fs.readFileSync(coloresJson, 'utf-8'))


/*DB*/
const db = require('../database/models');
const sequelize = db.sequelize;
/*DB*/

const productController = {
  busqueda: (req, res) => {
    res.render('busqueda')
  },
  category: (req, res) => {
    let id = req.params.id;
    db.Products.findAll({
      where: {
        id_category: id
      }
    })
      .then(productosId => {
        console.log(productosId)
        res.render('category', { productosId })
      })

  },
  kart: (req, res) => {
    res.render('kart')
  },
  productAdd: (req, res) => {
    let ProductCategory = db.ProductCategory.findAll()
    let Colors = db.Colors.findAll()
    Promise.all([ProductCategory, Colors]).then(
      ([ProductCategory, Colors]) => {
        res.render('productAdd', { categories: ProductCategory, colores: Colors })
      })
  },
  productDetails: (req, res) => {
    let idProduct = req.params.id
    let productoEncontrado = db.Products.findByPk(idProduct)
    let colors = db.ProductColors.findAll({
      include: 'Colores',
      where: {
        id_product: idProduct
      }
    })
    Promise.all([productoEncontrado, colors]).then(
      ([productoEncontrado, colors]) => {
        let filterColor = []
        colors.forEach(element => {
          filterColor.push(element.hexadecimal)
          console.log(element)
        });
        filterColor = filterColor.flat()
        res.send(colors)
        //res.render('product', { productoEncontrado, colors: filterColor })
      })
  },
  edit: (req, res) => {
    let id = req.params.id
    let productToEdit = db.Products.findByPk(id)
    let categories = db.ProductCategory.findAll()
    let colors = db.Colors.findAll()
    let coloresSeleccionados = db.ProductColors.findAll({
      include: 'Colores',
      where: {
        id_product: req.params.id
      }
    })
    Promise.all([productToEdit, categories, colors, coloresSeleccionados]).then(
      ([productToEdit, categories, colors, coloresSeleccionados]) => {
        let filterColor = []
        coloresSeleccionados.forEach(element => {
          filterColor.push(element.id_color)
        });
        filterColor = filterColor.flat()
        res.render('productEdit', { productToEdit, categories, colores: colors, filterColor })
      })
  },
  update: async (req, res) => {
    let colorsArr = [req.body.colores] // Los colores pueden ser un string o un array, por eso se le aplica flat
    colorsArr = colorsArr.flat()
    const id = req.params.id
    const { nombreProducto, descripcion, descripcionAmpliada, idCategory, precioProducto } = req.body
    let productToEdit = {
      id: id,
      name: nombreProducto,
      short_description: descripcion,
      long_description: descripcionAmpliada,
      image: req.file ? req.file.filename : 'default-image.jpg',
      id_category: idCategory,
      price: precioProducto
    }
    await db.Products.update({
      ...productToEdit
    },
      {
        where: { id }
      })
      .catch(error => res.send(error))
    db.ProductColors.destroy({
      where: { id_product: id }
    })
      .catch(error => res.send(error))
    const newProductColors = colorsArr.map(color => {
      return {
        id_product: id,
        id_color: color
      }
    })
    console.log(newProductColors)
    newProductColors.forEach(relation => {
      db.ProductColors.create(relation)
        .catch(error => res.send(error))
    })
    res.redirect('/')
  },
  productStore: (req, res) => {
    let newProduct = {
      id: products[products.length - 1].id + 1,
      name: req.body.name,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      image: req.file ? req.file.filename : 'default-image.jpg',
      id_category: req.body.id_category,
      price: req.body.price
    }
    products.push(newProduct)
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
    res.redirect('/');
  },
  delete: (req, res) => {
    let id = req.params.id
    let newProducts = products.filter(product => product.id != id)
    fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '))
    res.redirect('/')
  }
}

module.exports = productController;

const controller = {
  async destroy(req, res) {
    try {
      // Obtén el ID del registro a eliminar a partir de la petición
      const { id } = req.params;

      // Utiliza el método destroy para eliminar el registro
      const deleted = await model.Usuario.destroy({
        where: { id }
      });

      // Verifica si el registro fue eliminado correctamente
      if (deleted) {
        return res.status(204).json();
      }

      // Si no se encontró el registro, devuelve un mensaje de error
      return res.status(404).json({ error: 'El registro no se encontró' });
    } catch (error) {
      // Maneja cualquier error o excepción
      return res.status(500).json({ error: 'Error al eliminar el registro' });
    }
  }
};