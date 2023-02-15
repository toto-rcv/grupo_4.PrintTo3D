
window.onload = function () {

let form = document.querySelector(".contenedor-form");
console.log (form)

form.addEventListener("submit", (evento) => {
    let errores = [];
    let name = document.getElementById("name");
    let short_description = document.getElementById("short_description");
    let long_description = document.getElementById("long_description");
    let price = document.getElementById("price");



    if (name.value == "") {
        errores.push("El Nombre del producto no puede estar vacio");
    }
    else if(name.value.length <=5){
        errores.push("Nombre del producto debe ser mayor a 5 caracteres"); 
    }

    if (short_description.value == "" || long_description.value == ""  ) {
        errores.push("Las descripciones no pueden estar vacias");
    }
    else if(short_description.value.length <=20|| long_description.value.length <=20){
        errores.push("Las descripciones deben superar los 20 caracteres."); 
    }
    if (price.value == "" ) {
        errores.push("El precio no puede ser vacio");
    }

    if (errores.length > 0) {
        evento.preventDefault();
        let ulErrores = document.querySelector(".errores")
        ulErrores.innerHTML = ""
        for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += `<li>${errores[i]}</li>`
        }
       // ulErrores.classList.add ("alert-warning")
    } else {
        form.submit();
    }

})
}