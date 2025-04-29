// Profile.js - User Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load user data from localStorage or create default
    const userData = JSON.parse(localStorage.getItem('nutriFitUser')) || {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        age: 28,
        weight: 72,
        height: 175,
        targetWeight: 68,
        goal: 'Weight Loss',
        bmi: 22.5,
        mealsLogged: 12,
        workoutsCompleted: 4,
        waterIntake: 5.2,
        achievements: [
            { id: 1, name: 'First Meal', earned: true },
            { id: 2, name: 'Weekly Streak', earned: true },
            { id: 3, name: 'Hydration Hero', earned: false },
            { id: 4, name: 'Fitness Newbie', earned: true },
            { id: 5, name: 'Meal Planner', earned: false }
        ]
    };

    // Update profile info
    document.getElementById('username').textContent = userData.name;
    document.getElementById('user-email').textContent = userData.email;
    
    // Update stats
    document.getElementById('bmi-value').textContent = userData.bmi;
    document.getElementById('meals-logged').textContent = `${userData.mealsLogged}/21`;
    document.getElementById('workouts-completed').textContent = `${userData.workoutsCompleted}/7`;
    document.getElementById('water-intake').textContent = `${userData.waterIntake}L`;
    document.getElementById('current-goal').textContent = userData.goal;
    document.getElementById('target-weight').textContent = `${userData.targetWeight}kg`;
    document.getElementById('current-weight').textContent = `${userData.weight}kg`;
    
    // Calculate progress
    const weightProgress = ((userData.weight - userData.targetWeight) / (userData.weight - userData.targetWeight + 5)) * 100;
    document.getElementById('weight-progress').style.width = `${weightProgress}%`;
    
    const bmiProgress = ((userData.bmi - 18.5) / (24.9 - 18.5)) * 100;
    document.getElementById('bmi-progress').style.width = `${bmiProgress}%`;

    // Load achievements
    const badgesContainer = document.getElementById('achievement-badges');
    userData.achievements.forEach(achievement => {
        const badge = document.createElement('div');
        badge.className = `badge-item ${achievement.earned ? 'unlocked' : 'locked'}`;
        badge.innerHTML = `
            <div class="badge-icon">
                <i class="fas ${achievement.earned ? 'fa-trophy' : 'fa-lock'}"></i>
            </div>
            <small>${achievement.name}</small>
        `;
        badgesContainer.appendChild(badge);
    });

    // Initialize chart
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Meals',
                    data: [3, 2, 3, 2, 3, 1, 0],
                    backgroundColor: '#859864'
                },
                {
                    label: 'Workouts',
                    data: [1, 0, 1, 1, 0, 1, 0],
                    backgroundColor: '#697E50'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

// Save to localStorage when profile is updated
function updateProfile() {
    // You would implement this when adding profile editing functionality
}