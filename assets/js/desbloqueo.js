import { signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "./firebase.js";
import { showMessage } from "./toastMessage.js";
document.addEventListener("DOMContentLoaded", () => {
  const contVerifica = document.getElementById("cont-verifica");
  const btnContinuar = document.getElementById("btn-desbloq");
  const modalDesbloqueo = document.getElementById("modal-desbloqueo");
  const modalSubirImagen = document.getElementById("modal-subir-imagen");
  const modalCoincidencia = document.getElementById("modal-coincidencia");
  const modalDNI = document.getElementById("modal-dni");
  const closeModalDesbloqueo = document.getElementById("closeModal");
  const closeModalImagen = document.getElementById("closeModalImagen");
  const closeModalCoincidencia = document.getElementById("btn-cancel");
  const btnConfirmDesbloqueo = document.getElementById("btn-confirm");
  const modalOverlay = document.querySelector(".modal-overlay");
  const closeModalDNI = document.getElementById("closeModalDNI");
  const btnValidarDNI = document.getElementById("btn-validar-dni");
  const inputCodeDNI = document.getElementById("dni-security-code");
  const inputNumberDNI = document.getElementById("dni-number");

  const siBtn = document.getElementById("si-btn");
  const noBtn = document.getElementById("no-btn");

  modalDesbloqueo.style.display = "none";
  modalDNI.style.display = "none";

  const dniVerificador = 9;
  const numeroDni = 12345678;

  // Mostrar el botón de continuar cuando el usuario hace clic en el contenedor de verificación
  contVerifica.addEventListener("click", () => {
    console.log("Botón de verificación clickeado");
    btnContinuar.style.display = "block"; // Muestra el botón de continuar
    contVerifica.classList.add("selected"); // Agrega la clase 'selected'
  });

  // Mostrar el modal de desbloqueo cuando el usuario hace clic en "Continuar"
  btnContinuar.addEventListener("click", () => {
    modalDesbloqueo.style.display = "flex"; // Cambiar a 'flex' para que el modal sea visible
    modalOverlay.classList.add("show");
  });

  // Cuando el usuario confirma el desbloqueo, se oculta el modal de desbloqueo y se muestra el modal de subir imagen
  btnConfirmDesbloqueo.addEventListener("click", () => {
    if (!siBtn.checked && !noBtn.checked) {
      showMessage("Debes seleccionar una opción", "warning");
      return;
    }
    if (siBtn.checked) {
      modalDesbloqueo.style.display = "none";
      modalDNI.style.display = "flex"; // Muestra el modal de DNI
    } else if (noBtn.checked) {
      // Resetear todo al estado inicial
      modalDesbloqueo.style.display = "none";
      modalOverlay.classList.remove("show");
      contVerifica.classList.remove("selected");
      // Limpiar los radio buttons
      siBtn.checked = false;
      noBtn.checked = false;
    }
  });

  btnValidarDNI.addEventListener("click", () => {
    const dniCode = inputCodeDNI.value.trim();
    const dniNumber = inputNumberDNI.value.trim();
    if (
      dniCode !== dniVerificador.toString() ||
      dniNumber !== numeroDni.toString()
    ) {
      showMessage("Datos incorrectos", "error");
      return;
    }

    // Si el código de seguridad es correcto, pasar al siguiente paso
    modalDNI.style.display = "none"; // Ocultar modal de DNI
    modalSubirImagen.style.display = "block"; // Mostrar modal de reconocimiento facial
  });

  // Simulación de subida de imagen
  document
    .getElementById("image-upload")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imagePreview = document.getElementById("image-preview");

          // Asignamos la imagen al src y la hacemos visible
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block"; // Muestra la imagen cargada

          // Asegúrate de que el círculo de análisis también se muestre
          document.querySelector(".circle-overlay").style.display = "block";
          document.getElementById("status-text").textContent =
            "Cargando y analizando..."; // Texto de estado

          // Simulación de análisis con un tiempo de espera (5 segundos)
          setTimeout(() => {
            document.querySelector(".circle-overlay").style.display = "none"; // Esconder el círculo
            document.getElementById("status-text").textContent =
              "Análisis completado."; // Texto final

            // Esperar 2 segundos antes de mostrar el siguiente modal (modal de confirmación)
            setTimeout(() => {
              modalSubirImagen.style.display = "none"; // Ocultar el modal de subir imagen
              modalCoincidencia.style.display = "block"; // Mostrar el modal de coincidencia completa
            }, 2000); // Espera 2 segundos antes de cambiar al siguiente modal
          }, 5000); // 5 segundos de simulación de análisis
        };
        reader.readAsDataURL(file); // Lee el archivo de imagen como URL
      }
    });

  // Cerrar el modal de desbloqueo cuando se haga clic en la "X"
  closeModalDesbloqueo.addEventListener("click", () => {
    modalDesbloqueo.style.display = "none";
    modalOverlay.classList.remove("show");
    siBtn.checked = false;
    noBtn.checked = false;
  });

  closeModalDNI.addEventListener("click", () => {
    modalDNI.style.display = "none";
    modalOverlay.classList.remove("show");
  });

  // Cerrar el modal de subir imagen
  closeModalImagen.addEventListener("click", () => {
    modalSubirImagen.style.display = "none";
    modalOverlay.classList.remove("show");
  });

  // Cerrar el modal de coincidencia
  closeModalCoincidencia.addEventListener("click", () => {
    modalCoincidencia.style.display = "none";
    modalOverlay.classList.remove("show");
  });

  closeModalCoincidencia.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada exitosamente");
        window.location.href = "./index.html"; // Redirigir al inicio después de cerrar sesión
        // Prevenir que el usuario se quede en la página usando la tecla ESC
        window.addEventListener("keydown", (e) => {
          if (
            e.key === "Escape" &&
            modalConfirmacion.style.display === "flex"
          ) {
            e.preventDefault();
            showMessage(
              "Debes usar el botón de cerrar para continuar",
              "warning"
            );
          }
        });
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
        showMessage("Error al cerrar sesión", "error");
      });

    modalCoincidencia.style.display = "none";
    modalOverlay.classList.remove("show");
  });
});
