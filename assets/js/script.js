const btnBloqueo = document.querySelector(".btn-bloqueo");
const modalOverlay = document.querySelector(".modal-overlay");
const modalCustom = document.querySelector(".modal-custom");
const closeModalButton = document.querySelector("#closeModal"); // Renamed variable
// Función para abrir el modal
function openModal() {
  modalOverlay.classList.add("show");
  modalCustom.classList.add("show");
}

// Función para cerrar el modal
function closeModal() {
  modalOverlay.classList.remove("show");
  modalCustom.classList.remove("show");
}

btnBloqueo.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// Evitar que el click en el modal cierre la ventana
modalCustom.addEventListener("click", function (e) {
  e.stopPropagation();
});
