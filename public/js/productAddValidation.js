window.onload = function () {

	let form = document.querySelector(".contenedor-form");
	let nameError = document.getElementById("nameError");
	let short_descriptionError = document.getElementById("short_descriptionError");
	let long_descriptionError = document.getElementById("long_descriptionError");
	let priceError = document.getElementById("priceError");
	let imageError = document.getElementById("imageError");
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
		imageError.innerText = "";
		if (curFiles && !validFileType(curFiles)) {
			imageError.innerText =
				"Solo es posible subir archivos (JPG, JPEG, PNG, GIF)";
		}
	}

	form.addEventListener("submit", (evento) => {
		let name = document.getElementById("name");
		let short_description = document.getElementById("short_description");
		let long_description = document.getElementById("long_description");
		let price = document.getElementById("price");
		evento.preventDefault();


		nameError.innerText = name.value
			? name.value.length <= 5
				? "El nombre debe ser mayor a 5 caracteres"
				: ""
			: "El Nombre no puede estar vacio";
		short_descriptionError.innerText = short_description.value
			? short_description.value.length <= 20
				? "El nombre debe ser mayor a 5 caracteres"
				: ""
			: "El Nombre no puede estar vacio";
		long_descriptionError.innerText = long_description.value
			? long_description.value.length <= 20
				? "El nombre debe ser mayor a 5 caracteres"
				: ""
			: "El Nombre no puede estar vacio";
		priceError.innerText = price.value ? "" : "El Nombre no puede estar vacio";

		if (
			!!nameError.innerText ||
			!!short_descriptionError.innerText ||
			!!long_descriptionError.innerText ||
			!!priceError.innerText ||
			!!imageError.innerText
		) {
			evento.preventDefault();
			return;
		} else {
			form.submit();
		}
	});

};
