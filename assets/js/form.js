// Usar la misma versión para todos los imports
import {
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { auth } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("register-button");
  const signup = document.getElementById("signup-form");
  const signin = document.getElementById("signin-form");

  signup.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formulario enviado");

    const name = signup["signup-name"].value;
    const email = signup["signup-email"].value;
    const password = signup["signup-password"].value;
    const dni = signup[signup - dni].value;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        dni
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      showMessage("Usuario registrado", "success");
      localStorage.setItem("user", JSON.stringify(userCredentials.user));
      window.location.href = "./bloqueo.html";
      signup.reset(); // Cambiado de signupForm a signup
    } catch (error) {
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

  onAuthStateChanged(auth, async (user) => {
    console.log(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", JSON.stringify(user.email));
      localStorage.setItem("dni", JSON.stringify(user.dni));
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
