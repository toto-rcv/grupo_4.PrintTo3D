const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware") 
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");
let fileLocal;
const validaciones = [
    body('name')
		.notEmpty().withMessage('Tiene que ingresar un nombre')
		.isLength({ min: 5 }).withMessage('El nombre debe tener mas de 5 caracteres'),
	body('short_description')
		.notEmpty().withMessage('Tiene que ingresar una descripción')
		.isLength({ min: 20 }).withMessage('Tiene que ingresar una descripción de mas de 20 caracteres'),
	body('long_description')
		.notEmpty().withMessage('Tiene que ingresar una descripción')
		.isLength({ min: 50 }).withMessage('Tiene que ingresar una descripción de más de 20 caracteres'),
	body('price').notEmpty().withMessage('Tiene que ingresar un precio'),
	body('imageFormat').custom(async (value, {req}) => {
		let file = fileLocal;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
	
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
	
		return true;
		})
]
const validacionesEdit = [
    body('nombreProducto')
		.notEmpty().withMessage('Tiene que ingresar un Nombre')
		.isLength({ min: 5 }).withMessage('El Nombre debe tener mas de 5 caracteres'),
	body('descripcion')
		.notEmpty().withMessage('Tiene que ingresar una Descripción')
		.isLength({ min: 20 }).withMessage('Tiene que ingresar una Descripción de mas de 20 caracteres'),
	body('descripcionAmpliada')
		.notEmpty().withMessage('Tiene que ingresar una Descripción')
		.isLength({ min: 50 }).withMessage('Tiene que ingresar una Descripción de mas de 50 caracteres'),
	body('precioProducto').notEmpty().withMessage('Tiene que ingresar un precio'),
	body('imageFormat').custom(async (value, {req}) => {
		let file = fileLocal;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
	
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
	
		return true;
		})
]
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/img/products");
	},
	filename: function (req, file, cb) {
		cb(null,"product_" + file.fieldname + "_" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer ({storage,fileFilter: (req, file, cb) => {
	fileLocal = file
	  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
		  cb(null, true);
	  } else {
	  cb(null, false);
	  }
  }})

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
router.put('/products/:id/edit', upload.single("image"), validacionesEdit, productController.update);
router.delete('/products/:id', productController.delete);

/*** GET ONE PRODUCT ***/
router.get("/productDetails/:id", productController.productDetails);

module.exports = router;
