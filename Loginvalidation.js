document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form[onsubmit="return validateLogin(event);"]');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get the entered username
            const username = document.querySelector('input[name="username"]').value.trim();
            
            // Create a minimal user object
            const userData = {
                name: username || 'Guest',
                email: username ? `${username}@example.com` : 'guest@example.com'
            };
            
            // Store in session
            sessionStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Redirect to profile
            window.location.href = './Profile.html';
        });
    }
});