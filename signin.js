const form = document.querySelector("form");
const password = document.getElementById("password");
const email = document.getElementById("email");
const passwordValidation = document.getElementById("password-validation");
const emailValidation = document.getElementById("email-validation");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (email === "") {
    emailValidation.textContent = "Email cannot be empty";
  }
  if (password === "") {
    passwordValidation.textContent = "Password cannot be empty";
  } else if (!localStorage.getItem(email)) {
    emailValidation.textContent = "Email doesnt exists";
  } else if (localStorage.getItem(email) !== password) {
    passwordValidation.textContent = "Password incorrect";
  } else {
    window.location.href = "../homepage/homepage.html";
  }
});

email.addEventListener("input", function () {
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailValidation.textContent = "Please enter a valid email address";
  } else {
    emailValidation.textContent = "";
  }
});

password.addEventListener("input", function () {
  if (password.value.length < 6) {
    passwordValidation.textContent = "Password must have minimum 6 characters";
  } else if (!/[a-z]/.test(password.value)) {
    passwordValidation.textContent =
      "Password must contain at least one lowercase letter";
  } else if (!/[A-Z]/.test(password.value)) {
    passwordValidation.textContent =
      "Password must contain at least one uppercase letter";
  } else if (!/\d/.test(password.value)) {
    passwordValidation.textContent =
      "Password must contain at least one number";
  } else {
    passwordValidation.textContent = "";
  }
});

localStorage.setItem("admin@gmail.com", "Admin123");
