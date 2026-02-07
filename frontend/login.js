document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const googleBtn = document.getElementById("googleLogin");

  // Handle normal login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    console.log("Login Form Submitted:");
    console.log("Email:", email);
    console.log("Password:", password);

    alert("Login form submitted! Check console for details.");
  });

  // Handle Google login button click
  googleBtn.addEventListener("click", () => {
    console.log("Google login button clicked!");
    alert("Google login clicked (not connected yet)");
  });
});
