window.onload = function () {

	let form = document.querySelector(".form-login");
	let emailError = document.getElementById("emailError");
	let passwordError = document.getElementById("passwordError");

	
	form.addEventListener("submit", (evento) => {
		let email = document.getElementById("email");
		let password = document.getElementById("password");
	

		emailError.innerText = !email.value ? "El email no puede estar vacio" : "";
		if (!password.value) {
			passwordError.innerText = "Debe ingresar una contraseña";
		}else {
			passwordError.innerText = "";			
		}

		if (
			!!emailError.innerText ||
			!!passwordError.innerText 
		) {
			evento.preventDefault();
			return;
		} else {
			form.submit();
		}
	});
};
