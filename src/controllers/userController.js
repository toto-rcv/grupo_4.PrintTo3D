const fs = require("fs");
const path = require("path");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const usersFilePath = path.join(__dirname, "../database/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const { validationResult } = require("express-validator");

const userController = {
	contrasena: (req, res) => {
		res.render("r-contrasena");
	},
	register: (req, res) => {
		res.render("register");
	},
	userStore: (req, res) => {
		let errores = validationResult(req);
		if (
			typeof users.find((user) => user.email == req.body.email) == undefined &&
			req.body.email != ""
		) {
			errores.errors.push({
				value: "",
				msg: "El usuario ya existe.",
				param: "emailRepetido",
				location: "body",
			});
		}
		if (errores.isEmpty()) {
			let newUser = {
				id: users[users.length - 1].id + 1,
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, salt),
				categoria: 2,
				imagen: req.file ? req.file.filename : "default-image.jpg",
			};
			users.push(newUser);
			fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
			res.redirect("/login");
		} else {
			res.render("register", { errores: errores.mapped() });
		}
	},
	login: (req, res) => {
		res.render("login");
	},
	loginUser: (req, res) => {
		let errores = validationResult(req);
		let usuarioEncontrado = users.find(
			(user) => user.email === req.body.email.trim()
			
		);
		let useraux = {...usuarioEncontrado}
		if (typeof useraux === undefined && req.body.email !== "") {
			errores.errors.push({
				value: "",
				msg: "El usuario no existe.",
				param: "emailInexistente",
				location: "body",
			});
		} else {
			if (!bcrypt.compareSync(req.body.password, useraux.password))
				errores.errors.push({
					value: "",
					msg: "La contraseña es incorrecta.",
					param: "contrasenaIncorrecta",
					location: "body",
				});
		}
		if (errores.isEmpty()) {
			useraux.password = '';
			req.session.userLogged = useraux;
			res.redirect("/");
		} else {
			res.render("login", { errores: errores.mapped() });
		}
	},
	logout:(req,res)=>{
		req.session.destroy();
		return res.redirect("/")
	}
};

module.exports = userController;
