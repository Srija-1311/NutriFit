document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('form[onsubmit="return validateRegistration(event);"]');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const userData = {
                name: document.querySelector('input[name="username"]').value.trim(), // Using 'name' as key
                email: document.querySelector('input[name="email"]').value.trim(),
                password: document.querySelector('input[name="password"]').value,
                age: document.querySelector('input[name="age"]').value,
                gender: document.querySelector('select[name="gender"]').value,
                weight: document.querySelector('input[name="weight"]').value,
                height: document.querySelector('input[name="height"]').value,
                fitnessGoal: document.querySelector('select[name="fitnessGoal"]').value,
                foodAllergies: document.querySelector('select[name="foodAllergies"]').value,
                medicalConditions: document.querySelector('input[name="medicalConditions"]').value.trim()
            };

            // Save to both storage systems
            localStorage.setItem('nutriFitUser', JSON.stringify(userData));
            sessionStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Store in session
            sessionStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Redirect to profile
            window.location.href = './Profile.html';

            // Clear previous errors
            document.querySelectorAll('[id$="Error"]').forEach(el => el.textContent = '');

            // Validation checks
            let isValid = true;

            // Username validation
            if (formData.name === '') { // Changed to check formData.name
                document.getElementById('usernameError').textContent = 'Username is required';
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }

            // Password validation
            if (formData.password.length < 6) {
                document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
                isValid = false;
            }

            // Confirm Password
            const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;
            if (formData.password !== confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
                isValid = false;
            }

            // Age validation
            if (formData.age < 1 || formData.age > 100 || isNaN(formData.age)) {
                document.getElementById('ageError').textContent = 'Please enter a valid age (1-100)';
                isValid = false;
            }

            // Gender validation
            if (formData.gender === '') {
                document.getElementById('genderError').textContent = 'Please select your gender';
                isValid = false;
            }

            // Weight validation
            if (formData.weight <= 0 || isNaN(formData.weight)) {
                document.getElementById('weightError').textContent = 'Please enter a valid weight';
                isValid = false;
            }

            // Height validation
            if (formData.height <= 0 || isNaN(formData.height)) {
                document.getElementById('heightError').textContent = 'Please enter a valid height';
                isValid = false;
            }

            // Fitness Goal validation
            if (formData.fitnessGoal === '') {
                document.getElementById('fitnessGoalError').textContent = 'Please select a fitness goal';
                isValid = false;
            }

            // Food Allergies validation
            if (formData.foodAllergies === '') {
                document.getElementById('foodAllergiesError').textContent = 'Please select food allergies';
                isValid = false;
            }

            // If all validations pass
            if (isValid) {
                // Store user data in TWO places:
                // 1. localStorage for persistent data (key: 'nutriFitUser')
                localStorage.setItem('nutriFitUser', JSON.stringify(formData));
                // 2. sessionStorage for current session (key: 'currentUser')
                sessionStorage.setItem('currentUser', JSON.stringify(formData));
                
                // Redirect to profile page immediately after registration
                window.location.href = './Profile.html';
            }
        });
    }
});