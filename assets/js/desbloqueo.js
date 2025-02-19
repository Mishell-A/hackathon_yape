document.addEventListener("DOMContentLoaded", () => {
  const contVerifica = document.getElementById("cont-verifica");
  const btnContinuar = document.getElementById("btn-desbloq");
  const modalDesbloqueo = document.getElementById("modal-desbloqueo");
  const modalSubirImagen = document.getElementById("modal-subir-imagen");
  const modalCoincidencia = document.getElementById("modal-coincidencia");
  const closeModalDesbloqueo = document.getElementById("closeModal");
  const closeModalImagen = document.getElementById("closeModalImagen");
  const closeModalCoincidencia = document.getElementById("btn-cerrar");
  const btnConfirmDesbloqueo = document.getElementById("btn-confirm");

  const siBtn = document.getElementById("si-btn");
  const noBtn = document.getElementById("no-btn");

  // Mostrar el botón de continuar cuando el usuario hace clic en el contenedor de verificación
  contVerifica.addEventListener("click", () => {
    console.log("Botón de verificación clickeado");
    btnContinuar.style.display = "block"; // Muestra el botón de continuar
    contVerifica.classList.add("selected"); // Agrega la clase 'selected'
  });

  // Mostrar el modal de desbloqueo cuando el usuario hace clic en "Continuar"
  btnContinuar.addEventListener("click", () => {
    modalDesbloqueo.style.display = "block"; // Muestra el modal de desbloqueo
    modalSubirImagen.style.display = "none"; // Asegúrate de ocultar el modal de imagen
  });

  // Cuando el usuario confirma el desbloqueo, se oculta el modal de desbloqueo y se muestra el modal de subir imagen
  btnConfirmDesbloqueo.addEventListener("click", () => {
    if (siBtn.checked) {
      modalDesbloqueo.style.display = "none";
      modalSubirImagen.style.display = "block";
    } else if (noBtn.checked) {
      // Resetear todo al estado inicial
      modalDesbloqueo.style.display = "none";
      btnContinuar.style.display = "none";
      contVerifica.classList.remove("selected");

      // Limpiar los radio buttons
      siBtn.checked = false;
      noBtn.checked = false;
    }
  });

  // Cerrar el modal de desbloqueo cuando se haga clic en la "X"
  closeModalDesbloqueo.addEventListener("click", () => {
    modalDesbloqueo.style.display = "none";
  });

  // Cerrar el modal de subir imagen cuando se haga clic en la "X"
  closeModalImagen.addEventListener("click", () => {
    modalSubirImagen.style.display = "none";
  });

  // Cerrar el modal de coincidencia cuando se haga clic en la "X"
  closeModalCoincidencia.addEventListener("click", () => {
    modalCoincidencia.style.display = "none";
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
});
