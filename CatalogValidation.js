// CatalogValidation.js
function saveToPlan(type, name, event) {
    // Get the card element that was clicked
    const card = event.target.closest('.card');
    
    // Get the image URL and description
    const imageUrl = card.querySelector('.card-img-top').src;
    const description = card.querySelector('.card-text').textContent;

    // Create the item object
    const item = {
        type: type,
        name: name,
        image: imageUrl,
        description: description
    };

    // Get existing plan or create new one
    let plan = JSON.parse(localStorage.getItem('nutriPlan')) || { meals: [], workouts: [] };

    // Check if item already exists
    const exists = type === 'meal' 
        ? plan.meals.some(meal => meal.name === name)
        : plan.workouts.some(workout => workout.name === name);

    if (exists) {
        alert("This item is already in your plan.");
        return;
    }

    // Add to the appropriate array
    if (type === 'meal') {
        plan.meals.push(item);
    } else {
        plan.workouts.push(item);
    }

    // Save back to localStorage
    localStorage.setItem('nutriPlan', JSON.stringify(plan));
    alert(`${name} has been added to your plan!`);
}