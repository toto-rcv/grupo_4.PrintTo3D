const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//Listado de todos los actores
router.get('/api/products', productsAPIController.list);
//Detalle del actor
router.get('/api/product/:id', productsAPIController.detail);
router.get('/api/lastProduct', productsAPIController.lastProduct);
router.get('/api/categoryProduct', productsAPIController.categoryProduct);

module.exports = router;