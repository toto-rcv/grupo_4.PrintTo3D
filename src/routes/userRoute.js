const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const multer = require("multer");
const path = require("path");
const isLogged = require ('../middlewares/isLogged')
const authMiddleware = require("../middlewares/authMiddleware") 
const { body } = require("express-validator");
const { validationResult } = require("express-validator");


let fileLocal
const validaciones = [
  body('nombre')
    .notEmpty().withMessage('Tiene que ingresar un Nombre')
    .isLength({ min: 2 }).withMessage('El Nombre debe tener mas de 2 caracteres'),
  body('apellido')
    .notEmpty().withMessage('Tiene que ingresar un Apellido')
    .isLength({ min: 2 }).withMessage('El Apellido debe tener mas de 2 caracteres'),
  body('email')
    .notEmpty().withMessage('Tiene que ingresar un email.')
    .isEmail().withMessage('Tiene que ingresar un email valido'),
  body('password')
    .notEmpty().withMessage('Debe ingresar una contraseña')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
    .withMessage('La contraseña debe tener al menos una mayúscula, una minúscula y un número, y debe tener una longitud mínima de 8 caracteres'),
  body('confirmPassword').custom(async (confirmPassword, {req}) => {
		const password = req.body.password
		if(password !== confirmPassword){
		  throw new Error('Las contraseñas deben ser iguales')
		}
	}),
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

const validacionesLogin = [
  body('email').notEmpty().withMessage('Tiene que ingresar un email').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'i').withMessage('Debes ingresar un email válido'),
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

const upload = multer ({storage,fileFilter: (req, file, cb) => {
  fileLocal = file
	if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
		cb(null, true);
	} else {
    cb(null, false);
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