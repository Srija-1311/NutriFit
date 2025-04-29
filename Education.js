// Education.js
const guideContent = {
    'macronutrients': {
        title: 'Macronutrients 101',
        content: `
            <h3>The Three Macronutrients</h3>
            <div class="macro-grid">
                <div class="macro-item">
                    <h4>Proteins</h4>
                    <p>4 calories per gram</p>
                    <p>Essential for muscle repair and growth</p>
                    <p>Sources: Chicken, fish, eggs, tofu</p>
                </div>
                <div class="macro-item">
                    <h4>Carbohydrates</h4>
                    <p>4 calories per gram</p>
                    <p>Primary energy source for your body</p>
                    <p>Sources: Whole grains, fruits, vegetables</p>
                </div>
                <div class="macro-item">
                    <h4>Fats</h4>
                    <p>9 calories per gram</p>
                    <p>Important for hormone production</p>
                    <p>Sources: Avocados, nuts, olive oil</p>
                </div>
            </div>
            <h4>Recommended Balance:</h4>
            <p>Typical macronutrient ranges for a healthy diet:</p>
            <ul>
                <li>Protein: 10-35% of calories</li>
                <li>Carbs: 45-65% of calories</li>
                <li>Fats: 20-35% of calories</li>
            </ul>
        `
    },
    'micronutrients': {
        title: 'Essential Micronutrients',
        content: `
            <h3>Vitamins and Minerals Your Body Needs</h3>
            <div class="vitamin-grid">
                <div class="vitamin-item">
                    <h4>Vitamin D</h4>
                    <p>Supports bone health and immunity</p>
                    <p>Sources: Sunlight, fatty fish, fortified milk</p>
                </div>
                <div class="vitamin-item">
                    <h4>Iron</h4>
                    <p>Essential for blood production</p>
                    <p>Sources: Red meat, spinach, legumes</p>
                </div>
                <div class="vitamin-item">
                    <h4>Vitamin C</h4>
                    <p>Important for immune function</p>
                    <p>Sources: Citrus fruits, bell peppers</p>
                </div>
            </div>
        `
    },
    'squats': {
        title: 'Perfect Squat Form',
        content: `
            <h3>How to Perform a Proper Squat</h3>
            <ol>
                <li>Stand with feet shoulder-width apart</li>
                <li>Keep chest up and back straight</li>
                <li>Lower down as if sitting in a chair</li>
                <li>Go until thighs are parallel to ground</li>
                <li>Drive through heels to stand back up</li>
            </ol>
            <h4>Common Mistakes:</h4>
            <ul>
                <li>Knees caving inward</li>
                <li>Rounding the lower back</li>
                <li>Not going deep enough</li>
            </ul>
        `
    }
    // Add more guides as needed
};

function showGuide(guideId) {
    const guide = guideContent[guideId];
    if (!guide) return;
    
    const guideDisplay = document.getElementById('guide-display');
    const guideContentElement = document.getElementById('guide-content');
    
    guideContentElement.innerHTML = `
        <h2>${guide.title}</h2>
        ${guide.content}
    `;
    
    guideDisplay.style.display = 'block';
    window.scrollTo(0, 0);
}

function closeGuide() {
    document.getElementById('guide-display').style.display = 'none';
}

// Initialize - hide guide display on load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('guide-display').style.display = 'none';
});