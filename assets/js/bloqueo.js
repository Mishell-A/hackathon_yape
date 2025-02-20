import { sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { auth } from "./firebase.js";
import { showMessage } from "./toastMessage.js";
import {} from "./form.js";

document.addEventListener("DOMContentLoaded", () => {
  const contVerifica = document.getElementById("cont-verifica");
  const btnContinuar = document.querySelector(".btn-bloq");
  const modalBloqueo = document.getElementById("modal-bloqueo");
  const modalConfirmacion = document.getElementById("modal-confirmacion");
  const closeModalBtn = document.getElementById("closeModal");
  const btnConfirmBloqueo = document.getElementById("btn-confirm");
  const siBtn = document.getElementById("si-btn");
  const noBtn = document.getElementById("no-btn");

  // Función para enviar email de confirmación
  const sendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (!user) {
      showMessage("Debes iniciar sesión primero", "error");
      return;
    }

    try {
      await sendEmailVerification(user);
      showMessage(
        `Se ha enviado un correo de confirmación a ${user.email}`,
        "success"
      );
      localStorage.setItem("emailVerificationSent", "true");

      // Cerrar modal de bloqueo y mostrar modal de confirmación
      modalBloqueo.style.display = "none";
      modalConfirmacion.style.display = "flex";
    } catch (error) {
      console.log("Error al enviar email de confirmación:", error);
      showMessage("Error al enviar el email de confirmación", "error");
    }
  };

  // Cuando el usuario haga clic en la opción de confirmación
  contVerifica.addEventListener("click", () => {
    console.log("Botón de confirmación clickeado");
    btnContinuar.style.display = "block";
    contVerifica.classList.add("selected");
  });

  // Cuando el usuario haga clic en el botón de "Continuar"
  btnContinuar.addEventListener("click", () => {
    const user = auth.currentUser;

    if (!user) {
      showMessage("Debes iniciar sesión primero", "error");
      return;
    }
    modalBloqueo.style.display = "flex";
  });

  // Manejar la confirmación en el modal de bloqueo
  btnConfirmBloqueo.addEventListener("click", () => {
    if (!siBtn.checked && !noBtn.checked) {
      showMessage("Debes seleccionar una opción", "warning");
      return;
    }

    if (noBtn.checked) {
      modalBloqueo.style.display = "none";
      return;
    }

    if (siBtn.checked) {
      sendVerificationEmail();
    }
  });

  // Cerrar botón en modal de bloqueo
  closeModalBtn.addEventListener("click", () => {
    modalBloqueo.style.display = "none";
    // Limpiar selección de radio buttons
    siBtn.checked = false;
    noBtn.checked = false;
  });

  // Botón de cerrar en modal de confirmación (redirige a inicio)
  document.getElementById("btn-cancel").addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  // Prevenir que el usuario se quede en la página usando la tecla ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalConfirmacion.style.display === "flex") {
      e.preventDefault();
      showMessage("Debes usar el botón de cerrar para continuar", "warning");
    }
  });
});
