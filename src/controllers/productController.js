const fs = require("fs");
const path = require("path");
const { where } = require("sequelize");

const productsFilePath = path.join(__dirname, "../database/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const categoryJson = path.join(__dirname, "../database/categories.json");
const categories = JSON.parse(fs.readFileSync(categoryJson, "utf-8"));
const coloresJson = path.join(__dirname, "../database/colores.json");
const colores = JSON.parse(fs.readFileSync(coloresJson, "utf-8"));

const { validationResult } = require("express-validator");

/*DB*/
const db = require("../database/models");
const sequelize = db.sequelize;
/*DB*/

const productController = {
	busqueda: (req, res) => {
    db.ProductCategory.findAll()
    .then(categories => {
      res.render('busqueda', {categories})
    })
	},
	category: async (req, res) => {
		let id = req.params.id;
    let categories = await db.ProductCategory.findAll()
		db.Products.findAll({
			where: {
				id_category: id,
			},
		}).then((productosId) => {
			res.render("category", { productosId, categories });
		});
	},
	kart: (req, res) => {
		res.render("kart");
	},
	productAdd: (req, res) => {
		let ProductCategory = db.ProductCategory.findAll();
		let Colors = db.Colors.findAll();
		Promise.all([ProductCategory, Colors]).then(([ProductCategory, Colors]) => {
			res.render("productAdd", {
				categories: ProductCategory,
				colores: Colors,
			});
		});
	},
	productDetails: async (req, res) => {
    let categories = await db.ProductCategory.findAll()
		let idProduct = req.params.id;
		let productoEncontrado = db.Products.findByPk(idProduct);
		let colors = db.ProductColors.findAll({
			include: "Colores",
			where: {
				id_product: idProduct,
			},
		});
		Promise.all([productoEncontrado, colors]).then(
			([productoEncontrado, colors]) => {
				let filterColor = [];
				colors.forEach((element) => {
					filterColor.push(element.Colores);
				});
				filterColor = filterColor.flat();
				res.render("product", { productoEncontrado, colors: filterColor, categories });
			}
		);
	},

	edit: (req, res) => {
		let id = req.params.id;
		let productToEdit = db.Products.findByPk(id);
		let categories = db.ProductCategory.findAll();
		let colors = db.Colors.findAll();
		let coloresSeleccionados = db.ProductColors.findAll({
			include: "Colores",
			where: {
				id_product: req.params.id,
			},
		});
		Promise.all([productToEdit, categories, colors, coloresSeleccionados]).then(
			([productToEdit, categories, colors, coloresSeleccionados]) => {
				let filterColor = [];
				coloresSeleccionados.forEach((element) => {
					filterColor.push(element.id_color);
				});
				filterColor = filterColor.flat();
				res.render("productEdit", {
					productToEdit,
					categories,
					colores: colors,
					filterColor,
				});
			}
		);
	},
	update: async (req, res) => {
		let errores = validationResult(req);
		let colorsArr = [req.body.colores]; // Los colores pueden ser un string o un array, por eso se le aplica flat
			colorsArr = colorsArr.flat();
			const id = req.params.id;
		const {
			name,
			short_description,
			long_description,
			idCategory,
			price,
		} = req.body;
		let productToEdit = {
			id: id,
			name,
			short_description,
			long_description,
			image: req.file ? req.file.filename : "default-image.jpg",
			id_category: idCategory,
			price,
		};
		if (errores.isEmpty()) {
			await db.Products.update(
				{
					...productToEdit,
				},
				{
					where: { id },
				}
			).catch((error) => res.send(error));
			db.ProductColors.destroy({
				where: { id_product: id },
			}).catch((error) => res.send(error));
			const newProductColors = colorsArr.map((color) => {
				return {
					id_product: id,
					id_color: color,
				};
			});
			newProductColors.forEach((relation) => {
				db.ProductColors.create(relation).catch((error) => res.send(error));
			});
			res.redirect("/");
		} else {
			let coloresSeleccionados = db.ProductColors.findAll({
				include: "Colores",
				where: {
					id_product: req.params.id,
				},
			});
			let categories = db.ProductCategory.findAll();
			let colors = db.Colors.findAll();
			Promise.all([coloresSeleccionados, categories, colors]).then(([coloresSeleccionados, categories, colors]) => {
				let filterColor = [];
				coloresSeleccionados.forEach((element) => {
					filterColor.push(element.id_color);
				});
				filterColor = filterColor.flat();
				res.render("productEdit", {
					productToEdit,
					categories,
					colores: colors,
					filterColor,
					errores: errores.mapped()
				});
			})
		}
	},

	productStore: (req, res) => {
		let errores = validationResult(req);
		let colorsArr = [req.body.colores];
		colorsArr = colorsArr.flat();
		let newProduct = {
			name: req.body.name,
			short_description: req.body.short_description,
			long_description: req.body.long_description,
			image: req.file ? req.file.filename : "default-image.jpg",
			id_category: req.body.id_category,
			price: req.body.price,
		};
		console.log (errores)
		if (errores.isEmpty()) {
			console.log ('Entro a crear el producto')
			db.Products.create(newProduct)
				.then((createProduct => {
					const newProductColors = colorsArr.map((color) => {
						return {
							id_product: createProduct.id,
							id_color: color,
						};
					});
					newProductColors.forEach((relation) => {
						db.ProductColors.create(relation).catch((error) => res.send(error));
					});
				}))
			res.redirect("/")
		} else {
			console.log ('Tiene errores')
			let ProductCategory = db.ProductCategory.findAll();
			let Colors = db.Colors.findAll();
			Promise.all([ProductCategory, Colors]).then(([ProductCategory, Colors]) => {
				res.render("productAdd", {
					categories: ProductCategory,
					colores: Colors,
					errores: errores.mapped()
				});
			});
		}

	},

	delete: (req, res) => {
		let id = req.params.id;
		let productDelete = db.Products.destroy({
			where: { id: id },
		})
		let productColor = db.ProductColors.destroy({
			where: { id_product: id },
		})
		Promise.all([productDelete, productColor])
			.then(res.redirect("/"))
			.catch((error) => res.send(error));
	},
};

module.exports = productController;
