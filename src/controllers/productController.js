const productController = {
    busqueda: (req, res) =>{
        res.render('busqueda')
    },
    category: (req, res) =>{
        res.render('category')
    },
    kart: (req, res) =>{
        res.render('kart')
    },
    productAdd: (req, res) =>{
        res.render('productAdd')
    },
    productDetails: (req, res) =>{
        res.render('product')
    }
}

module.exports = productController;