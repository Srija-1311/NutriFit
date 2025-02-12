        function validateForm() {
            const password = document.querySelector('input[name="password"]').value;
            const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;
            const age = document.querySelector('input[name="age"]').value;
            const weight = document.querySelector('input[name="weight"]').value;
            const height = document.querySelector('input[name="height"]').value;
            const errorMessages = [];

            if (password !== confirmPassword) {
                errorMessages.push("Passwords do not match.");
            }
            if (age < 1 || age > 100) {
                errorMessages.push("Age must be between 1 and 100.");
            }
            if (weight <= 0) {
                errorMessages.push("Weight must be a positive number.");
            }
            if (height <= 0) {
                errorMessages.push("Height must be a positive number.");
            }

            if (errorMessages.length > 0) {
                alert(errorMessages.join("\n"));
                return false; // Prevent form submission
            }
            return true; // Allow form submission
        }
