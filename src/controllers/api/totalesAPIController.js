/*DB*/
const db = require("../../database/models");
const sequelize = db.sequelize;
/*DB*/


const totalesAPIController = {
    'totales': (req, res) => {
        let products = db.Products.findAll()
        let users = db.Users.findAll()
        let categories = db.ProductCategory.findAll()

        Promise.all([products, users, categories])
        .then(values => {
          res.json({cantidad_productos: values[0].length, cantidad_usuarios: values[1].length, cantidad_categorias: values[2].length});
        })
    },
    
}
module.exports = totalesAPIController;