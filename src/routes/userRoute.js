const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const multer = require("multer");
const path = require("path");

const { body } = require("express-validator");

const validaciones = [
    body('nombre').notEmpty().withMessage('Tiene que ingresar un Nombre'),
    body('apellido').notEmpty().withMessage('Tiene que ingresar un Apellido'),
    body('email').notEmpty().withMessage('Tiene que ingresar un email'),
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
	},
});

const upload = multer ({storage})

router.get('/recuperarContrasena', userController.contrasena)



//REGISTER
router.get('/register', userController.register)
router.post("/register", upload.single('image'), validaciones, userController.userStore);

//LOGIN
router.get('/login', userController.login)
router.post('/login',validacionesLogin, userController.loginUser)


module.exports = router;