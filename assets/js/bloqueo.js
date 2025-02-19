document.addEventListener("DOMContentLoaded", () => {
  const contVerifica = document.getElementById("cont-verifica");
  const btnContinuar = document.querySelector(".btn-bloq");
  const btnBloquear = document.querySelector(".btn-bloq");
  const modal = document.getElementById("modal-bloqueo");
  const closeModalBtn = document.querySelector(".btn-close");
  const btnCancel = document.getElementById("btn-cancel");

  // Cuando el usuario haga clic en la opción de verificación
  contVerifica.addEventListener("click", () => {
    console.log("Botón de verificación clickeado");
    btnContinuar.style.display = "block";
    contVerifica.classList.add("selected");
  });

  // Cuando el usuario haga clic en el botón de "Bloquear Cuenta", mostrar el modal
  btnBloquear.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Cerrar el modal cuando el usuario haga clic en el botón de cerrar
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cancelar la operación y cerrar el modal
  btnCancel.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
