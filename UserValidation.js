function validateRegistration(event) {
  event.preventDefault();
function redirectToCatalog() {
    window.location.href = "Catalog.html"; // Change the filename if necessary
}

  const username = document.querySelector("input[name='username']").value;
  const email = document.querySelector("input[name='email']").value;
  const password = document.querySelector("input[name='password']").value;
  const confirmPassword = document.querySelector("input[name='confirmPassword']").value;
  const age = document.querySelector("input[name='age']").value;
  const weight = document.querySelector("input[name='weight']").value;
  const height = document.querySelector("input[name='height']").value;

  if (username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
  }
  if (!email.includes("@") || !email.includes(".")) {
      alert("Enter a valid email address.");
      return;
  }
  if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
  }
  if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
  }
  if (age < 1 || age > 100) {
      alert("Enter a valid age between 1 and 100.");
      return;
  }
  if (weight <= 0) {
      alert("Enter a valid weight.");
      return;
  }
  if (height <= 0) {
      alert("Enter a valid height.");
      return;
  }
  alert("Registration Successful!");
  event.target.submit();
}
