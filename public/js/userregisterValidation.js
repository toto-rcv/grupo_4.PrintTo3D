
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
   // let image = document.getElementById("image");
 
 
    nombreError.innerText= nombre.value ? (nombre.value.length <= 2 ? "El nombre debe ser mayor a dos caracteres" : "") : "El Nombre no puede estar vacio"
    apellidoError.innerText= !apellido.value ? "El Apellido no puede estar vacio" : (apellido.value.length <= 2 ? "El apellido debe ser mayor a dos caracteres" : "") 
    emailError.innerText= !email.value ?  "El email no puede estar vacio" : ""
    passwordError.innerText= !password.value ? "Debe ingresar una contraseña" : (password.value !== confirmPassword.value ? "Las contraseñas no coinciden" : "")
    //imageError.innerText= ""
    //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
   
    if(!!nombreError.innerText || !!apellidoError.innerText || !!emailError.innerText || !!passwordError.innerText){
        evento.preventDefault();
        return
    }else {
        console.log ("holis")
        form.submit();
    }
})
}