function saveToPlan(type, name) {
  let plan = JSON.parse(localStorage.getItem('nutriPlan')) || { meals: [], workouts: [] };
  
  if (type === 'meal' && !plan.meals.includes(name)) {
      plan.meals.push(name);
  } else if (type === 'workout' && !plan.workouts.includes(name)) {
      plan.workouts.push(name);
  } else {
      alert("Item is already in your plan.");
      return;
  }
  
  localStorage.setItem('nutriPlan', JSON.stringify(plan));
  alert("Added to your plan successfully!");
}