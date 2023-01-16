const fs = require("fs")
const path = require("path")

const categoryJson = path.join(__dirname, '../database/categories.json')
const categories = JSON.parse(fs.readFileSync(categoryJson, 'utf-8'));


/*DB*/
const db = require('../database/models');
const sequelize = db.sequelize;
/*DB*/

const mainController = {
    index: (req, res) => {
        db.ProductCategory.findAll()
        .then(categories => {
            res.render('home', {categories:categories,
            userLogged:req.session.userLogged})
        })
            /*
        console.log (categories) 
        res.render('home', {

            categories:categories,
            userLogged:req.session.userLogged})*/
    },
}

module.exports = mainController;
