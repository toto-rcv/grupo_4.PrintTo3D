const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const multer = require("multer");
const path = require("path");
const isLogged = require ('../middlewares/isLogged')
const authMiddleware = require("../middlewares/authMiddleware") 
const { body } = require("express-validator");



const validaciones = [
    body('nombre').notEmpty().withMessage('Tiene que ingresar un Nombre'), 
	body('nombre').isLength({ min: 2 }).withMessage('El Nombre debe tener mas de 2 caracteres'),
    body('apellido').notEmpty().withMessage('Tiene que ingresar un Apellido'),
	body('apellido').isLength({ min: 2 }).withMessage('El Apellido debe tener mas de 2 caracteres'),
    body('email').notEmpty().withMessage('Tiene que ingresar un email'),
	body('email').isEmail().withMessage('Tiene que ingresar un email valido'),
    body('password').notEmpty().withMessage('Debe ingresar una contraseña'), 
	//body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage('La contraseña debe cumplir con una Mayuscula'), 
    body('confirmPassword').custom(async (confirmPassword, {req}) => {
		const password = req.body.password
		if(password !== confirmPassword){
		  throw new Error('Las contraseñas deben ser iguales')
		}
	})
]

const validacionesLogin = [
  body('email').notEmpty().withMessage('Tiene que ingresar un email'),
  body('password').notEmpty().withMessage('Tiene que ingresar una contraseña')
]



const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/img/users");
	},
	filename: function (req, file, cb) {
		cb(null,"user_" + file.fieldname + "_" + Date.now() + path.extname(file.originalname));

	}

});


//Tenemos que ver como devolver el error.

const upload = multer ({storage,fileFilter: (req, file, cb) => {
	if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
		cb(null, true);
	} else {
		return cb(new Error('Invalid mime type'));
	}
}})

router.get('/recuperarContrasena', userController.contrasena)



//REGISTER
router.get('/register', userController.register)
router.post("/register", upload.single('image'), validaciones, userController.userStore);

//LOGIN
router.get('/login',isLogged, userController.login)
router.get('/logout', userController.logout)
router.post('/login',validacionesLogin, userController.loginUser)


module.exports = router;