const express = require('express');
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/busqueda', productController.busqueda);
router.get('/category', productController.category);
router.get('/kart', productController.kart);
router.get('/productAdd', productController.productAdd);

module.exports = router;