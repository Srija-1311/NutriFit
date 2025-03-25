// SaveToPlan.js - Handles saving catalog items to My Plan

// Initialize saved items array
let savedItems = [];

// Function to save an item to My Plan
function saveToPlan(item) {
    // Add item to saved items array
    savedItems.push(item);
    
    // Update localStorage
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    
    // Update My Plan display
    updateMyPlan();
}

// Function to update My Plan page
function updateMyPlan() {
    const myPlanList = document.getElementById('myPlanList');
    if (myPlanList) {
        // Clear existing items
        myPlanList.innerHTML = '';
        
        // Add saved items
        savedItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'plan-item';
            listItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            myPlanList.appendChild(listItem);
        });
    }
}

// Load saved items from localStorage on page load
window.addEventListener('load', () => {
    const storedItems = localStorage.getItem('savedItems');
    if (storedItems) {
        savedItems = JSON.parse(storedItems);
        updateMyPlan();
    }
});
