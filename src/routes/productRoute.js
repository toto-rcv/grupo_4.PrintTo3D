const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware") 
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");

const validaciones = [
    body('name').notEmpty().withMessage('Tiene que ingresar un Nombre'),
	body('name').isLength({ min: 5 }).withMessage('El Nombre debe tener mas de 5 caracteres'),
	body('short_description').notEmpty().withMessage('Tiene que ingresar una Descripción'),
	body('short_description').isLength({ min: 20 }).withMessage('Tiene que ingresar una Descripción de mas de 20 caracteres'),
	body('long_description').notEmpty().withMessage('Tiene que ingresar una Descripción'),
	body('long_description').isLength({ min: 20 }).withMessage('Tiene que ingresar una Descripción de mas de 20 caracteres'),
	body('price').notEmpty().withMessage('Tiene que ingresar un precio'),
]
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/img/products");
	},
	filename: function (req, file, cb) {
		cb(null,"product_" + file.fieldname + "_" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer ({storage})

router.get("/busqueda", productController.busqueda);

/*** GET ALL PRODUCTS ***/
router.get("/category", productController.category);
router.get('/category/:id', productController.category);

/*** CARRITO ***/
router.get("/kart", productController.kart);

/*** CREATE ONE PRODUCT ***/
router.get("/products/create", productController.productAdd);
router.post("/products/create", upload.single('image'), validaciones, productController.productStore);

/*** EDIT ONE PRODUCT ***/
router.get('/products/:id/edit',  productController.edit);
router.put('/products/:id', upload.single("image"), productController.update);
router.delete('/products/:id', productController.delete);

/*** GET ONE PRODUCT ***/
router.get("/productDetails/:id", productController.productDetails);

module.exports = router;
