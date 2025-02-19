document.getElementById("registerForm").addEventListener("submit", function (event) {
    const form = document.getElementById("registerForm");
    const formData = new FormData(form);
    
    let isValid = true;

    let name = document.getElementById("username").value.trim();
    if (name === "") {
        isValid = false;
        document.getElementById("nameError").innerText = "Name is required";
    } else {
        document.getElementById("nameError").innerText = ""; 
    }

    let email = document.getElementById("email").value.trim();
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        isValid = false;
        document.getElementById("emailError").innerText = "Enter a valid email";
    } else {
        document.getElementById("emailError").innerText = "";
    }

    let password = document.getElementById("password").value;
    if (password.length < 6) {
        isValid = false;
        document.getElementById("passwordError").innerText = "Password must be at least 6 characters";
    } else {
        document.getElementById("passwordError").innerText = "";
    }

    let confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword !== password) {
        isValid = false;
        document.getElementById("confirmPasswordError").innerText = "Passwords do not match";
    } else {
        document.getElementById("confirmPasswordError").innerText = "";
    }

    let age = document.getElementById("age").value;
    if (age < 1 || age > 100 || isNaN(age)) {
        isValid = false;
        document.getElementById("ageError").innerText = "Age must be between 1 and 100";
    } else {
        document.getElementById("ageError").innerText = "";
    }

    let gender = document.getElementById("gender").value;
    if (gender === "") {
        isValid = false;
        document.getElementById("genderError").innerText = "Gender is required";
    } else {
        document.getElementById("genderError").innerText = "";
    }

    let weight = document.getElementById("weight").value;
    if (weight <= 0 || isNaN(weight)) {
        isValid = false;
        document.getElementById("weightError").innerText = "Weight must be a valid number";
    } else {
        document.getElementById("weightError").innerText = "";
    }

    let height = document.getElementById("height").value;
    if (height <= 0 || isNaN(height)) {
        isValid = false;
        document.getElementById("heightError").innerText = "Height must be a valid number";
    } else {
        document.getElementById("heightError").innerText = "";
    }

    let fitnessGoal = document.getElementById("fitnessGoal").value;
    if (fitnessGoal === "") {
        isValid = false;
        document.getElementById("fitnessGoalError").innerText = "Fitness goal is required";
    } else {
        document.getElementById("fitnessGoalError").innerText = "";
    }

    let foodAllergies = document.getElementById("foodAllergies").value;
    if (foodAllergies === "") {
        isValid = false;
        document.getElementById("foodAllergiesError").innerText = "Food allergies selection is required";
    } else {
        document.getElementById("foodAllergiesError").innerText = "";
    }

    if (!isValid) {
        event.preventDefault();
        for (let [name, value] of formData.entries()) {
            const input = form.elements[name];
            if (input && input.type !== "submit") {
                if (input.type === "select-one") {
                    input.value = value;
                } else {
                    input.value = value;
                }
            }
        }
    } else {
        window.location.href = "./Home.html";
        event.preventDefault();
    }




});
