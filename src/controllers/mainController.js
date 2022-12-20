const fs = require("fs")
const path = require("path")

const categoryJson = path.join(__dirname, '../database/categories.json')
const categories = JSON.parse(fs.readFileSync(categoryJson, 'utf-8'));


const mainController = {
    index: (req, res) => {
        res.render('home', {
            categories:categories,
            userLogged:req.session.userLogged})
    },
}

module.exports = mainController;
