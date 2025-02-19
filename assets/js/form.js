document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("register-button");
  const signup = document.getElementById("signup-form");
  const signin = document.getElementById("signin-form");

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
