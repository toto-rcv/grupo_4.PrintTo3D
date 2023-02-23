window.onload = function () {
	let form = document.querySelector(".contenedor-form");
	let nombreError = document.getElementById("nombreError");
	let apellidoError = document.getElementById("apellidoError");
	let emailError = document.getElementById("emailError");
	let passwordError = document.getElementById("passwordError");
	let confirmPasswordError = document.getElementById("confirmPasswordError");
	let image = document.querySelector("input[type=file]");

	const fileTypes = [
		"image/png",
		"image/gif",
		"image/jpeg",
		"image/jpg",
		"image/png",
	];

	image.addEventListener("change", updateImageDisplay);

	function validFileType(file) {
		return fileTypes.includes(file.type);
	}

	function updateImageDisplay() {
		const curFiles = image.files[0];
        imageError.innerText = ""
		if (curFiles && !validFileType(curFiles)) {
			imageError.innerText ="Solo es posible subir archivos (JPG, JPEG, PNG, GIF)";
		}
	}

	form.addEventListener("submit", (evento) => {
		let errores = false;
		let nombre = document.getElementById("nombre");
		let apellido = document.getElementById("apellido");
		let email = document.getElementById("email");
		let password = document.getElementById("password");
		let confirmPassword = document.getElementById("confirmPassword");

		nombreError.innerText = nombre.value
			? nombre.value.length <= 2
				? "El nombre debe ser mayor a dos caracteres"
				: ""
			: "El Nombre no puede estar vacio";
		apellidoError.innerText = !apellido.value
			? "El Apellido no puede estar vacio"
			: apellido.value.length <= 2
			? "El apellido debe ser mayor a dos caracteres"
			: "";
		emailError.innerText = !email.value ? "El email no puede estar vacio" : "";
		if (!!password.value) {
			if (
				!password.value.matches(
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
					"i"
				)
			) {
				passwordError.innerText =
					"La contraseña debe tener al menos una mayúscula, una minúscula y un número, y debe tener una longitud mínima de 8 caracteres";
			} else if (password.value !== confirmPassword.value) {
				passwordError.innerText = "Las contraseñas no coinciden";
			}
		} else {
			passwordError.innerText = "Debe ingresar una contraseña";
		}
		//imageError.innerText= ""

		if (
			!!nombreError.innerText ||
			!!apellidoError.innerText ||
			!!emailError.innerText ||
			!!passwordError.innerText
		) {
			evento.preventDefault();
			return;
		} else {
			console.log("holis");
			form.submit();
		}
	});
};
