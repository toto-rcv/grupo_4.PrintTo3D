/*DB*/
const db = require("../../database/models");
const sequelize = db.sequelize;
/*DB*/


const usersAPIController = {
    'list': (req, res) => {
        db.Users.findAll()
        .then(user => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: user.length,
                    url: 'api/actors'
                },
                data: user.name
            }
                res.json(respuesta);
            })
    },
    'detail': (req, res) => {
        db.Users.findByPk(req.params.id)
            .then(User => {
                User.password = ""
                let respuesta = {
                    meta: {
                        status: 200,
                        total: User.length,
                        url: '/api/user/:id'
                    },
                    data: User
                }
                res.json(respuesta);
            });
    },
    
}
    module.exports = usersAPIController;