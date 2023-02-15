
window.onload = function () {

let form = document.querySelector(".contenedor-form");
let nameError = document.getElementById("nameError")
let short_descriptionError = document.getElementById("short_descriptionError")
let long_descriptionError = document.getElementById("long_descriptionError")
let priceError = document.getElementById("priceError")



console.log (form)

form.addEventListener("submit", (evento) => {
    let errores = false;
    let name = document.getElementById("name");
    let short_description = document.getElementById("short_description");
    let long_description = document.getElementById("long_description");
    let price = document.getElementById("price");
    nameError.innerText= ""
    short_descriptionError.innerText= ""
    long_descriptionError.innerText= ""
    priceError.innerText= ""
    
    
    if (name.value == "") {
        nameError.innerText= "El Nombre del producto no puede estar vacio"
        errores = true
    }
    else if(name.value.length <=5){
        nameError.innerText= "Nombre del producto debe ser mayor a 5 caracteres"; 
        errores = true
    }

    if (short_description.value == "" ) {
        short_descriptionError.innerText= "Las descripciones no pueden estar vacias";
        errores = true
    }
    else if(short_description.value.length <=20){
        short_descriptionError.innerText="Las descripciones deben superar los 20 caracteres"; 
        errores = true
    }

    if (long_description.value == "" ) {
        long_descriptionError.innerText= "Las descripciones no pueden estar vacias";
        errores = true
    }
    else if(short_description.value.length <=20){
        long_descriptionError.innerText="Las descripciones deben superar los 20 caracteres"; 
        errores = true
    }

    if (price.value == "" ) {
        priceError.innerText="El precio no puede ser vacio";
        errores = true
    }

    if (errores = true) {
        evento.preventDefault();
    } else {
        form.submit();
    }

})
}