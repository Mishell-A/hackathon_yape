const btnBloqueo = document.querySelector(".btn-bloqueo");
const modalOverlay = document.querySelector(".modal-overlay");
const modalCustom = document.querySelector(".modal-custom");
const closeModal = document.querySelector("#closeModal");
const cancelModal = document.querySelector("#cancelModal");

// Función para abrir el modal
function openModal() {
  modalOverlay.classList.add("show");
  modalCustom.classList.add("show");
}

// Función para cerrar el modal
function closeModalFunction() {
  modalOverlay.classList.remove("show");
  modalCustom.classList.remove("show");
}

// Event listeners
btnBloqueo.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalFunction);
cancelModal.addEventListener("click", closeModalFunction);
modalOverlay.addEventListener("click", closeModalFunction);

// Evitar que el click en el modal cierre la ventana
modalCustom.addEventListener("click", function (e) {
  e.stopPropagation();
});
