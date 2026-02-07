// ---------------------------
// DOM Elements
// ---------------------------
const questionInput = document.getElementById("question");
const chatContainerWrapper = document.getElementById("chat-container").parentElement; // chat container wrapper
const chatContainer = document.getElementById("chat-container");
const darkToggles = document.querySelectorAll(".dark-toggle"); // ab class select kar rahe
const background = document.getElementById("background");



// Apply saved preference
if (localStorage.getItem("dark-mode") === "true") {
  document.documentElement.classList.add("dark");
  darkToggles.forEach(toggle => (toggle.checked = true));
} else {
  document.documentElement.classList.remove("dark");
  darkToggles.forEach(toggle => (toggle.checked = false));
}

// Add listener for all toggles
darkToggles.forEach(toggle => {
  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }

    // Sync all toggles
    darkToggles.forEach(otherToggle => {
      otherToggle.checked = isDark;
    });
  });
});


// ---------------------------
// Ask Question
// ---------------------------
function askQuestion() {
  const question = questionInput.value.trim();
  if (!question) return;

  addMessage("user", question);
  questionInput.value = "";

  // Typing indicator
  const typingMsg = document.createElement("div");
  typingMsg.className =
    "message bot-message bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg self-start";
  typingMsg.innerText = "Typing...";
  chatContainer.appendChild(typingMsg);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Call backend
  fetch("http://127.0.0.1:8000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  })
    .then((res) => res.json())
    .then((data) => {
      typingMsg.remove();
      addMessage("bot", data.answer);
    })
    .catch((err) => {
      typingMsg.remove();
      addMessage("bot", "Error getting response.");
      console.error(err);
    });
}

// ---------------------------
// Add message to chat
// ---------------------------
function addMessage(sender, text) {
  const message = document.createElement("div");
  if (sender === "user") {
    message.className =
      "message user-message bg-blue-500 text-white p-3 rounded-lg self-end max-w-xs break-words";
  } else {
    message.className =
      "message bot-message bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg self-start max-w-xs break-words";
  }
  message.innerText = text;
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// ---------------------------
// Handle Enter key press
// ---------------------------
questionInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    askQuestion();
  }
});

// ---------------------------
// clears the chat
// ---------------------------
const clearChatBtn = document.getElementById("clear-chat-btn");

clearChatBtn.addEventListener("click", () => {
  chatContainer.innerHTML = ""; // remove all messages
});


const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

