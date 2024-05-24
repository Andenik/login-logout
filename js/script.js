document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("error-message");
  const logoutButton = document.getElementById("logout");

  const defaultUser = [{ email: "teste@email.com", password: "frontendcp", name: "Nik" }];
  let users = JSON.parse(localStorage.getItem("users"));

  if (!users || users.length === 0) {
    localStorage.setItem("users", JSON.stringify(defaultUser));
    users = defaultUser;
  }

  console.log("Stored users:", users);

  if (loginForm) {
    if (sessionStorage.getItem("currentUser")) {
      window.location.href = "index.html";
      return;
    }

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      console.log("Login attempt with email:", email, "and password:", password);

      const users = JSON.parse(localStorage.getItem("users"));
      console.log("Users in storage:", users);

      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        errorMessage.textContent = "Login bem-sucedido!";
        errorMessage.style.color = "green";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        errorMessage.textContent = "Email ou senha inválidos!";
        errorMessage.style.color = "red";
        setTimeout(() => {
          errorMessage.textContent = "";
        }, 5000);
      }
    });
  }

  if (logoutButton) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) {
      window.location.href = "login.html";
    } else {
      document.getElementById("welcome-message").textContent = `Bem-vindo, ${currentUser.name}!`;
      document.getElementById("user-details").textContent = `Email: ${currentUser.email}`;
    }

    logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }

  document.getElementById("reset-users").addEventListener("click", function () {
    localStorage.setItem("users", JSON.stringify(defaultUser));
    alert("Usuários redefinidos para o padrão.");
  });
});
