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
  productDetails: async (req, res) => {
    let idProduct = req.params.id
    let productoEncontrado = db.Products.findByPk(idProduct)
    let colors = await db.ProductColors.findAll({
      where: {
        id_product: idProduct
      }
    })
    let colorsHexa = await Promise.all(
    colors.map
    (async color => {
        return db.Colors.findByPk(color.id_color).then((rsp) => {
          return rsp.hexadecimal
        })
      })
    )
    Promise.all([productoEncontrado]).then(
      ([productoEncontrado]) => {
        res.render('product', { productoEncontrado, colors: colorsHexa })
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
      name: req.body.name,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      image: req.file ? req.file.filename : 'default-image.jpg',
      id_category: req.body.id_category,
      price: req.body.price
    }
    db.Products.create(newProduct)
      .catch(error => res.send(error))
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