const express = require('express');
const router = express.Router()
const mainController = require('../controllers/mainController')

router.get('/busqueda', mainController.busqueda);

router.get('/category', mainController.category);

module.exports = router;