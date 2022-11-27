const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
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

/*** CARRITO ***/
router.get("/kart", productController.kart);

/*** CREATE ONE PRODUCT ***/
router.get("/productAdd", productController.productAdd);
router.post("/productAdd",upload.single('image'), productController.productStore);

/*** EDIT ONE PRODUCT ***/
    //falta ruta

/*** GET ONE PRODUCT ***/
router.get("/productDetails", productController.productDetails);

module.exports = router;
