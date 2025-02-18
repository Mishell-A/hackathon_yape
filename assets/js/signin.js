import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signInForm = document.querySelector("#signin-form");

//Cuando se envie el formulario
//async : asincronó
signInForm.addEventListener("submit", async (e) => {
  //Para que no se recargue la pagina
  console.log("Formulario enviado");
  e.preventDefault();

  //Obtener los valores del formulario como objeto
  const email = signInForm["signin-email"].value;
  const password = signInForm["signin-password"].value;

  // Manejar errores
  try {
    //Crear las credenciasles
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Guardar el usuario en el localstorage
    localStorage.setItem("user", JSON.stringify(userCredentials.user));
    //Redireccionar al home
    window.location.href = "./inicio.html";
    //Limpiar el formulario
    signInForm.reset();
  } catch (error) {
    console.log(error.code);
    //Mensaje de error
    if (error.code === "auth/user-not-found") {
      showMessage("No se encontró un usuario con este correo", "error");
    } else if (error.code === "auth/invalid-credential") {
      showMessage("Contraseña o correo ingresado son incorrectos", "error");
    } else if (error.code === "auth/missing-password") {
      showMessage("Debes ingresar una contraseña", "error");
    } else if (error.code === "auth/invalid-email") {
      showMessage("Debes ingresar un email", "error");
    } else if (error.code === "auth/too-many-requests") {
      showMessage(
        "Demasiadas solicitudes de inicio de sesión. Inténtelo más tarde",
        "error"
      );
    } else {
      showMessage("Error desconocido", "error");
    }
  }
});
