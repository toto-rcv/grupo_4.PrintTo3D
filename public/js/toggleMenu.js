window.onload = function () {
  let toggle = false
	let button = document.getElementById("menu-button");
	let menu = document.getElementById("hamb-menu");
	let overlay = document.getElementById("overlay");

	button.addEventListener("click", (evento) => {
    toggle = !toggle
    if (toggle) {
      menu.classList.add("opened")
      overlay.classList.add("shown")
    }
    else {
      menu.classList.remove("opened")
      overlay.classList.remove("shown")
    }
	})
	overlay.addEventListener("click", (evento) => {
    toggle = !toggle
    menu.classList.remove("opened")
    overlay.classList.remove("shown")
	})

};
