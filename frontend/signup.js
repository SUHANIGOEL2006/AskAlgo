// Wait until the page loads
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const googleBtn = document.getElementById("googleSignup");

  // Handle normal signup form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page refresh

    // Get form values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Just print to console (later connect to backend)
    console.log("Signup Form Submitted:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    alert("Signup form submitted! Check console for details.");
  });

  // Handle Google button click
  googleBtn.addEventListener("click", () => {
    console.log("Google signup button clicked!");
    alert("Google signup clicked (not connected yet)");
  });
});
