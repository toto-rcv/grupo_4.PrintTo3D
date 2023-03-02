const express = require('express');
const router = express.Router();
const totalesAPIController = require('../../controllers/api/totalesAPIController');

//Rutas
//Totales
router.get('/api/totales', totalesAPIController.totales);


module.exports = router;