document.addEventListener('DOMContentLoaded', function() {
    // Get user from session or use guest
    const userData = JSON.parse(sessionStorage.getItem('currentUser')) || {
        name: 'Guest',
        email: 'guest@example.com'
    };

    // Display profile info
    const profileHeader = document.querySelector('.profile-header');
    if (profileHeader) {
        profileHeader.innerHTML = `
            <img src="https://i.pinimg.com/736x/3a/c8/2d/3ac82dfc0e349f84d3afe91093959b81.jpg" 
                 class="profile-pic rounded-circle mb-2" 
                 alt="Profile picture"
                 width="120">
            <h2 class="mb-1">${userData.name}</h2>
            <p class="text-muted mb-3">${userData.email}</p>
        `;
    }

    // 2. Display BMI Section
    if (document.getElementById('bmi-value')) {
        document.getElementById('bmi-value').textContent = userData.bmi || '--';
        const bmiProgress = userData.bmi ? 
            ((userData.bmi - 18.5) / (24.9 - 18.5)) * 100 : 50;
        document.getElementById('bmi-progress').style.width = `${Math.min(100, bmiProgress)}%`;
    }

    // 3. Display Weekly Progress
    if (document.getElementById('meals-logged')) {
        document.getElementById('meals-logged').textContent = `${userData.mealsLogged || 0}/21`;
    }
    if (document.getElementById('workouts-completed')) {
        document.getElementById('workouts-completed').textContent = `${userData.workoutsCompleted || 0}/7`;
    }
    if (document.getElementById('water-intake')) {
        document.getElementById('water-intake').textContent = `${userData.waterIntake || 0}L`;
    }

    // 4. Display Current Streak
    updateStreakDisplay();

    function updateStreakDisplay() {
        if (!userData.streakHistory) userData.streakHistory = [];
        if (!userData.streakDays) userData.streakDays = 0;

        const streakContainer = document.querySelector('.streak-days');
        if (streakContainer) {
            streakContainer.innerHTML = '';
            
            // Show last 7 days
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dayStr = date.toISOString().split('T')[0];
                const dayActive = userData.streakHistory.some(day => day.date === dayStr && day.active);
                
                const dayElement = document.createElement('div');
                dayElement.className = `streak-day ${dayActive ? 'active' : ''}`;
                dayElement.setAttribute('data-day', ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]);
                streakContainer.appendChild(dayElement);
            }
        }

        if (document.getElementById('current-streak')) {
            document.getElementById('current-streak').textContent = 
                `${userData.streakDays} day${userData.streakDays !== 1 ? 's' : ''}`;
        }

        if (document.getElementById('streak-status')) {
            const messages = [
                "Start your streak today!",
                "Keep going!",
                "Great streak!",
                "🔥 On fire! 🔥",
                "🔥🔥 Legendary! 🔥🔥"
            ];
            const statusIndex = userData.streakDays < 3 ? 1 : 
                              userData.streakDays < 7 ? 2 : 
                              userData.streakDays < 14 ? 3 : 4;
            document.getElementById('streak-status').textContent = 
                userData.streakDays === 0 ? messages[0] : messages[statusIndex];
        }
    }

    // 5. Display Current Goal
    if (document.getElementById('current-goal')) {
        document.getElementById('current-goal').textContent = userData.goal || 'Not set';
    }
    if (document.getElementById('target-weight')) {
        document.getElementById('target-weight').textContent = `${userData.targetWeight || '--'}kg`;
    }
    if (document.getElementById('current-weight')) {
        document.getElementById('current-weight').textContent = `${userData.weight || '--'}kg`;
        
        // Update weight progress
        if (userData.weight && userData.targetWeight) {
            const progress = ((userData.weight - userData.targetWeight) / 
                            (userData.weight - userData.targetWeight + 5)) * 100;
            document.getElementById('weight-progress').style.width = `${Math.min(100, progress)}%`;
        }
    }

    // 6. Display Achievements
    const badgesContainer = document.getElementById('achievement-badges');
    if (badgesContainer) {
        badgesContainer.innerHTML = '';
        (userData.achievements || []).forEach(achievement => {
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
    }

    // 7. Initialize Weekly Chart
    const ctx = document.getElementById('weeklyChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
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
    }
});

// Activity logging function
function logActivity(type) {
    const userData = JSON.parse(sessionStorage.getItem('currentUser')) || 
                    JSON.parse(localStorage.getItem('nutriFitUser'));
    
    if (!userData) return;
    
    // Initialize streak data if missing
    if (!userData.streakHistory) userData.streakHistory = [];
    if (!userData.streakDays) userData.streakDays = 0;
    
    const today = new Date().toISOString().split('T')[0];
    let todayRecord = userData.streakHistory.find(day => day.date === today);
    
    if (!todayRecord) {
        todayRecord = { date: today, active: true };
        userData.streakHistory.push(todayRecord);
        
        // Update streak count
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const wasActiveYesterday = userData.streakHistory.some(
            day => day.date === yesterdayStr && day.active
        );
        
        userData.streakDays = wasActiveYesterday ? userData.streakDays + 1 : 1;
    }
    
    // Update activity counters
    if (type === 'meal') {
        userData.mealsLogged = (userData.mealsLogged || 0) + 1;
    } else if (type === 'workout') {
        userData.workoutsCompleted = (userData.workoutsCompleted || 0) + 1;
    }
    
    // Save updated data
    if (sessionStorage.getItem('currentUser')) {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
    }
    localStorage.setItem('nutriFitUser', JSON.stringify(userData));
}

// Logout function
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = './Signin.html';
}