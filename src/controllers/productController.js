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
        idcategory: id
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
        idproduct: idProduct
      }
    })

    Promise.all([productoEncontrado, colors]).then(
      ([productoEncontrado, colors]) => {
        let filterColor = []
        colors.forEach(element => {
          filterColor.push(element.Colores)
        });
        filterColor = filterColor.flat()
        res.render('product', { productoEncontrado, colors: filterColor })
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
        idproduct: req.params.id
      }
    })
    Promise.all([productToEdit, categories, colors, coloresSeleccionados]).then(
      ([productToEdit, categories, colors, coloresSeleccionados]) => {
        let filterColor = []
        coloresSeleccionados.forEach(element => {
          filterColor.push(element.Colores)
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
      id: productToEdit.id,
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
    const newProductColors = colorsArr.map(elemento => {
      return {
        id_product: id,
        id_color: elemento
      }
    })
    db.ProductColors.bulkCreate(newProductColors)
      .then(() => res.redirect('/'))
      .catch(error => res.send(error))
  },
  productStore: (req, res) => {
    let newProduct = {
      id: products[products.length - 1].id + 1,
      nombreProducto: req.body.nombreProducto,
      descripcion: req.body.descripcion,
      descripcionAmpliada: req.body.descripcionAmpliada,
      image: req.file ? req.file.filename : 'default-image.jpg',
      idCategory: req.body.idCategory,
      colores: req.body.colores,
      price: req.body.precioProducto
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