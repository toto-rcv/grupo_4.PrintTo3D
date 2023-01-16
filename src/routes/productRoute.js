const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware") 
const multer = require("multer");
const path = require("path");

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
router.post("/products/create", authMiddleware, upload.single('image'), productController.productStore);

/*** EDIT ONE PRODUCT ***/
router.get('/products/:id/edit', authMiddleware, productController.edit);
router.put('/products/:id', authMiddleware, upload.single("image"), productController.update);
router.delete('/products/:id', authMiddleware, productController.delete);

/*** GET ONE PRODUCT ***/
router.get("/productDetails/:id", productController.productDetails);

module.exports = router;
