/*DB*/
const db = require("../../database/models");
const sequelize = db.sequelize;
/*DB*/

const productsAPIController = {
	list: (req, res) => {
		db.Products.findAll().then((product) => {
			let respuesta = {
				meta: {
					status: 200,
					total: product.length,
					url: "api/products",
				},
				data: product,
			};
			res.json(respuesta);
		});
	},

	lastProduct: (req, res) => {
		db.Products.max("id").then((maxID) => {
			db.Products.findByPk(maxID).then((respuesta) => {
				respuesta.image =
					"http://localhost:3000/img/products/" + respuesta.image;
				res.json(respuesta);
			});
		});
	},

	detail: (req, res) => {
		db.Products.findByPk(req.params.id).then((product) => {
			let respuesta = {
				meta: {
					status: 200,
					total: product.length,
					url: "/api/product/:id",
				},
				data: product,
			};
			res.json(respuesta);
		});
	},

	categoryProduct: (req, res) => {
		db.ProductCategory.findAll()
			.then((categorias) => {
				let promesas = categorias.map((categoria) => {
					return db.Products.count({
						where: { id_category: categoria.id },
					}).then((cantProductos) => {
						return {
							nombre_categoria: categoria.name,
							cantidad: cantProductos,
						};
					});
				});
				return Promise.all(promesas);
			})
			.then((respuestas) => {
				res.json(respuestas);
			})
			.catch((error) => {
				console.error(error);
				res.status(500).send("Error interno del servidor");
			});
	},
};
module.exports = productsAPIController;
