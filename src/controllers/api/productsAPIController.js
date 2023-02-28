/*DB*/
const db = require("../../database/models");
const sequelize = db.sequelize;
/*DB*/


const productsAPIController = {
    'list': (req, res) => {
        db.Products.findAll()

        .then(product => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: product.length,
                    url: 'api/actors'
                },
                data: product
            }
                res.json(respuesta);
            })
    },
    'detail': (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/product/:id'
                    },
                    data: product
                }
                res.json(respuesta);
            });
    },
    
}
    module.exports = productsAPIController;