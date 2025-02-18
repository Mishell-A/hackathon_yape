import "./signup.js";
import "./signin.js";

//Manejo de la autenticación
//Cada ves que se cambie la autenticacion va a aparecer eso

// Esperar a que el documento esté listo
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("register-button");
  const signup = document.getElementById("signup-form");
  const signin = document.getElementById("signin-form");

  button.addEventListener("click", (e) => {
    e.preventDefault();

    // Visibilidad de los formularios
    if (signup.style.display === "none") {
      signup.style.display = "block";
      signin.style.display = "none";
    } else {
      signup.style.display = "none";
      signin.style.display = "block";
    }
  });
});
