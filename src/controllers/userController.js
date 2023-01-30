const fs = require("fs");
const path = require("path");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const usersFilePath = path.join(__dirname, "../database/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const { validationResult } = require("express-validator");

/*DB*/
const db = require("../database/models");
const sequelize = db.sequelize;
/*DB*/

const userController = {
	contrasena: (req, res) => {
		res.render("r-contrasena");
	},
	register: (req, res) => {
		res.render("register");
	},
	userStore: (req, res) => {
		let errores = validationResult(req);

		db.Users.findAll({
			where: {
				email: req.body.email,
			},
		}).then((dbUsers) => {
			if (dbUsers.length > 0) {
				errores.errors.push({
					value: "",
					msg: "El usuario ya existe.",
					param: "emailRepetido",
					location: "body",
				});
			}
			if (errores.isEmpty()) {
				let newUser = {
					name: req.body.nombre,
					apellido: req.body.apellido,
					email: req.body.email,
					password: bcrypt.hashSync(req.body.password, salt),
					id_level: 2,
					imagen: req.file ? req.file.filename : "default-image.jpg",
				};
				db.Users.create(newUser)
					.then(res.redirect("/login"))
					.catch((error) => res.send(error));
			} else {
				res.render("register", { errores: errores.mapped() });
			}
		});
	},

	loginUser: (req, res) => {
		let errores = validationResult(req);
		db.Users.findAll({
			where: {
				email: req.body.email.trim(),
			},
		})
		.then((dbUser)=>{
			if (dbUser.length <= 0) {
				errores.errors.push({
					value: "",
					msg: "El usuario no existe.",
					param: "email",
					location: "body",
				});
			} else {
				if (!bcrypt.compareSync(req.body.password, dbUser[0].dataValues.password))
					errores.errors.push({
						value: "",
						msg: "La contraseña es incorrecta.",
						param: "password",
						location: "body",
					});
			}
			
			if (errores.isEmpty()) {
				dbUser[0].password = "";
				req.session.userLogged = {...dbUser[0].dataValues};				
				if (req.body.checkbox) {
					res.cookie("userEmail", dbUser[0].email, {
						maxAge: 1000 * 60 * 60 * 24,
					});
				}
				return res.redirect("/")
			}else {
				return res.render("login", { errores: errores.mapped() });
			}


		})
	},

	login: (req, res) => {
		res.render("login");
	},

	logout: (req, res) => {
		req.session.destroy();
		res.cookie("userEmail", null, { maxAge: -1 });
		return res.redirect("/");
	},
};

module.exports = userController;
