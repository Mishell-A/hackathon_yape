import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { auth } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("register-button");
  const signup = document.getElementById("signup-form");
  const signin = document.getElementById("signin-form");

  signup.addEventListener("submit", async (e) => {
    //Para que no se recargue la pagina
    e.preventDefault();
    console.log("Formulario enviado");

    //Obtener los valores del formulario como objeto
    const name = signup["signup-name"].value;
    const email = signup["signup-email"].value;
    const password = signup["signup-password"].value;
    // Manejar errores
    try {
      //Crear las credenciasles
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Actualizar el perfil del usuario
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      showMessage("Usuario registrado", "success");
      // Guardar el usuario en el localstorage
      localStorage.setItem("user", JSON.stringify(userCredentials.user));
      //Redireccionar al home
      window.location.href = "./bloqueo.html";
      //Limpiar el formulario
      signupForm.reset();
    } catch (error) {
      //Mensaje de error
      if (error.code === "auth/email-already-in-use") {
        showMessage("Correo ya registrado", "error");
      } else if (error.code === "auth/invalid-email") {
        showMessage("Email inválido", "error");
      } else if (error.code === "auth/weak-password") {
        showMessage("Contraseña muy corta", "error");
      } else if (error.code === "auth/missing-password") {
        showMessage("Debes ingresar una contraseña", "error");
      } else if (error.code === "auth/missing-email") {
        showMessage("Debes ingresar un email", "error");
      } else {
        showMessage("Error desconocido", "error");
      }
    }
  });
  const showSignupForm = () => {
    signup.style.display = "block";
    signin.style.display = "none";
  };

  const showSigninForm = () => {
    signup.style.display = "none";
    signin.style.display = "block";
  };

  const cambioURL = new URLSearchParams(window.location.search);
  if (cambioURL.get("form") === "signup") {
    showSignupForm();
  } else {
    showSigninForm();
  }

  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (signup.style.display === "none") {
      showSignupForm();
    } else {
      showSigninForm();
    }
  });
});
