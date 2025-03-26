function validateLogin(event) {
  event.preventDefault();

  const username = document.querySelector("input[name='username']").value.trim();
  const password = document.querySelector("input[name='password']").value.trim();

  if (username === "") {
      alert("Username cannot be empty.");
      return false;
  }
  if (password === "") {
      alert("Password cannot be empty.");
      return false;
  }
  if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
  }

  alert("Login Successful!");
  window.location.href = "./Home.html"; // Redirect after successful login
}
