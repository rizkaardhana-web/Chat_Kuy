const joinBtn = document.getElementById("join-btn");
const usernameInput = document.getElementById("username");

const loginContainer = document.querySelector(".login-container");
const chatContainer = document.querySelector(".chat-container");

joinBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (!name) {
    alert("Masukkan nama!");
    return;
  }

  window.setUsername(name);
  loginContainer.style.display = "none";
  chatContainer.style.display = "block";
});
