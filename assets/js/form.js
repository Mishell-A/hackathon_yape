// Usar la misma versión para todos los imports
import {
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { auth } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("register-button");
  const signup = document.getElementById("signup-form");
  const signin = document.getElementById("signin-form");

  //Auth del form del signup
  signup.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formulario enviado");

    const name = signup["signup-name"].value;
    const email = signup["signup-email"].value;
    const password = signup["signup-password"].value;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      showMessage("Usuario registrado", "success");
      localStorage.setItem("user", JSON.stringify(userCredentials.user));
      window.location.href = "./bloqueo.html";
      signup.reset();
    } catch (error) {
      console.log("Error completo:", error);
      console.log("Código de error:", error.code);
      console.log("Mensaje de error:", error.message);

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
        showMessage("Error desconocido: " + error.message, "error");
      }
    }
  });

  onAuthStateChanged(auth, async (user) => {
    console.log(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", JSON.stringify(user.email));
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

  //Auth del form del signin
  signin.addEventListener("submit", async (e) => {
    console.log("Formulario enviado");
    e.preventDefault();

    const email = signin["signin-email"].value;
    const password = signin["signin-password"].value;

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("user", JSON.stringify(userCredentials.user));
      window.location.href = "./bloqueo.html";
      signin.reset();
    } catch (error) {
      console.log("Error completo:", error);
      console.log("Código de error:", error.code);
      console.log("Mensaje de error:", error.message);

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
        showMessage("Error desconocido: " + error.message, "error");
      }
    }
  });
});
