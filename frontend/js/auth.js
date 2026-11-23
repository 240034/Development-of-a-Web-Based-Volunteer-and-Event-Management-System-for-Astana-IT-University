
/* EVMA — AUTHENTICATION */

// Helper: show or clear an error under an input
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(`${inputId}-error`);

  if (!input || !error) return;

  error.textContent = message;
  input.classList.toggle("input-error", Boolean(message));
}

// Helper: check whether an email is valid
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// SIGN UP
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Name validation
    if (!name.value.trim()) {
      showError("name", "Please enter your full name.");
      isValid = false;
    } else {
      showError("name", "");
    }

    // Email validation
    if (!email.value.trim()) {
      showError("email", "Please enter your email.");
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError("email", "Please enter a valid email address.");
      isValid = false;
    } else {
      showError("email", "");
    }

    // Password validation
    if (password.value.length < 8) {
      showError("password", "Password must contain at least 8 characters.");
      isValid = false;
    } else {
      showError("password", "");
    }

    // Confirm password validation
    if (!confirmPassword.value) {
      showError("confirm-password", "Please confirm your password.");
      isValid = false;
    } else if (password.value !== confirmPassword.value) {
      showError("confirm-password", "Passwords do not match.");
      isValid = false;
    } else {
      showError("confirm-password", "");
    }

    if (!isValid) return;

    const userData = {
      full_name: name.value.trim(),
      email: email.value.trim(),
      password: password.value
    };

    console.log("Registration form is valid.");
    console.log("Registration data:", {
      ...userData,
      password: "[hidden]"
    });

    // Backend integration will be added here
  });

  // Clear errors while the user types
  [name, email, password, confirmPassword].forEach((input) => {
    input.addEventListener("input", () => {
      showError(input.id, "");

      if (
        input === password &&
        confirmPassword.value &&
        password.value !== confirmPassword.value
      ) {
        showError("confirm-password", "Passwords do not match.");
      } else if (
        input === confirmPassword &&
        password.value !== confirmPassword.value
      ) {
        showError("confirm-password", "Passwords do not match.");
      } else if (input === confirmPassword) {
        showError("confirm-password", "");
      }
    });
  });
}


// LOGIN
const loginForm = document.getElementById("login-form");

if (loginForm) {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    if (!email.value.trim()) {
      showError("email", "Please enter your email.");
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError("email", "Please enter a valid email address.");
      isValid = false;
    } else {
      showError("email", "");
    }

    if (!password.value) {
      showError("password", "Please enter your password.");
      isValid = false;
    } else {
      showError("password", "");
    }

    if (!isValid) return;

    console.log("Login form is valid.");
    console.log("Login email:", email.value.trim());

    // Backend integration will be added here
  });

  [email, password].forEach((input) => {
    input.addEventListener("input", () => {
      showError(input.id, "");
    });
  });
}
