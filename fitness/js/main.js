// Imports from ES Modules
import { workoutData, addWorkout, calculateTotalWorkouts, getPersonalBest } from './data.js';
import { renderHistoryTable, displayMessage, renderDashboardSummary } from './view.js';

// Select the form element
const form = document.getElementById('workout-form');

// --- Initialization Logic ---
function initializePage() {
    // Logic for the History Page
    if (document.getElementById('history-table')) {
        renderHistoryTable(workoutData);
    }
    
    // Logic for the Dashboard Page
    if (document.getElementById('dashboard-summary')) {
        const total = calculateTotalWorkouts();
        const bestLift = getPersonalBest('strength'); // Example usage of Array Method
        renderDashboardSummary(total, bestLift);
    }
}

// --- Event Handler Logic ---
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // 1. Collect form data
        const date = document.getElementById('date').value;
        const name = document.getElementById('exercise-name').value.trim();
        const type = document.querySelector('input[name="workout-type"]:checked').value;
        const value = parseFloat(document.getElementById('metric-value').value);
        const units = document.getElementById('units').value.trim();
        
        // 2. Conditional Branching (Validation)
        // Check if value is a valid positive number
        if (isNaN(value) || value <= 0 || name === '' || date === '') {
            displayMessage("Error: Please ensure all fields are filled correctly and the result is a positive number.", true);
            return; // Stops the function if validation fails
        }

        // 3. Create the new Object
        const newWorkout = {
            date,
            name,
            type,
            value,
            units
        };

        // 4. Add data (data.js) and update view (view.js)
        addWorkout(newWorkout); // Adds new Object to the Array
        renderHistoryTable(workoutData); // Re-renders table with new data
        
        // Provide user feedback
        displayMessage("Workout logged successfully! Go to Dashboard to see your stats update.", false);
        
        // Clear the form
        form.reset();
    });
}

// Run initialization when the page loads
initializePage();