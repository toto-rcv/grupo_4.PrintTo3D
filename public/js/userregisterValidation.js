
window.onload = function () {

let form = document.querySelector(".contenedor-form");
let nombreError = document.getElementById("nombreError")
let apellidoError = document.getElementById("apellidoError")
let emailError = document.getElementById("emailError")
let passwordError = document.getElementById("passwordError")
let confirmPasswordError = document.getElementById("confirmPasswordError")



form.addEventListener("submit", (evento) => {
    let errores = false;
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let image = document.getElementById("image");
 
 
    nombreError.innerText= ""
    apellidoError.innerText= ""
    emailError.innerText= ""
    passwordError.innerText= ""
    confirmPasswordError.innerText= ""
    imageError.innerText= ""
    
    if (nombre.value == "") {
        nombreError.innerText= "El Nombre no puede estar vacio"
        errores = true
    }else if(nombre.value.length <=2){
        nombreError.innerText= "El Nombre debe ser mayor a 2 caracteres"; 
        errores = true
    }

    if (apellido.value == "") {
        apellidoError.innerText= "El Apellido no puede estar vacio"
        errores = true
    }
    else if(apellido.value.length <=2){
        apellidoError.innerText= "El Apellido debe ser mayor a 2 caracteres"; 
        errores = true
    }

    if (email.value == "") {
        emailError.innerText= "El email no puede estar vacio"
        errores = true
    }

    if (password.value == "") {
        passwordError.innerText= "Debe ingresar una contraseña"
        errores = true
    }else if (password.value != confirmPassword.value) {
        confirmPasswordError.innerText= "Las contraseñas no coinciden"
        errores = true
    }

    if (errores = true) {
        evento.preventDefault();
    } else {
        form.submit();
    }

})
}