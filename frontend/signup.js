// Wait until the page loads
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const googleBtn = document.getElementById("googleSignup");

  // Handle normal signup form submission
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page refresh

    // Get form values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic validation
    if (!username || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      // Send data to backend API
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Parse JSON response
      const data = await response.json();

      if (response.ok) {
        alert("✅ Signup successful!");
        console.log("User saved:", data);
        // Redirect to login page if needed
        window.location.href = "login.html";
      } else {
        alert(`⚠️ Signup failed: ${data.detail || "Unknown error"}`);
        console.error(data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again later.");
    }
  });

  // Handle Google signup (not implemented yet)
  googleBtn.addEventListener("click", () => {
    console.log("Google signup button clicked!");
    alert("Google signup feature coming soon 🚀");
  });
});

