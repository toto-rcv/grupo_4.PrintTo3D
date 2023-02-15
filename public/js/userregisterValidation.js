
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

    nombreError.innerText= ""
    apellidoError.innerText= ""
    emailError.innerText= ""
    passwordError.innerText= ""
    confirmPasswordError.innerText= ""
    /*
    //apellidoError.innerText = apellido.value?():"El AP del producto no puede estar vacio"
    //errores= apellidoError.innerText || apellidoError || emailError || passwordError || confirmPasswordError
    
    if (apellido.value == "") {
        apellidoError.innerText= "El AP del producto no puede estar vacio"
        errores = true
    }
    else if(apellido.value.length <=2){
        apellidoError.innerText= "Nombre del producto debe ser mayor a 5 caracteres"; 
        errores = true
    }

    if (nombre.value == "") {
        nombreError.innerText= "El Nombre del producto no puede estar vacio"
        errores = true
    }
    else if(nombre.value.length <=2){
        nombreError.innerText= "Nombre del producto debe ser mayor a 5 caracteres"; 
        errores = true
    }


    if (errores = true) {
        evento.preventDefault();
    } else {
        form.submit();
    }
*/
})
}