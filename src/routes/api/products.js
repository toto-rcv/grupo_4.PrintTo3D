const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//Listado de todos los actores
router.get('/api/products', usersAPIController.list);
//Detalle del actor
router.get('/api/product/:id', usersAPIController.detail);


module.exports = router;