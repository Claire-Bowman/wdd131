// js/main.js
import { workoutData, addWorkout, calculateTotalWorkouts, getPersonalBest, calculateLast30DaysActivity, prepareChartData } from './data.js';
import { renderHistoryTable, displayMessage, renderDashboardSummary, renderActivityPanel } from './view.js';

// Select the form element (for log-workout.html)
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
        
        const bestStrength = getPersonalBest('strength'); 
        const bestCardio = getPersonalBest('cardio'); 
        
        renderDashboardSummary(total, bestStrength, bestCardio);

        const recentCount = calculateLast30DaysActivity(workoutData);
        const chartData = prepareChartData(workoutData);
        renderActivityPanel(recentCount, chartData);
    }
}

// --- Event Handler Logic (DOM Interaction & Conditional Branching) ---
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // 1. Collect form data
        const date = document.getElementById('date').value;
        const name = document.getElementById('exercise-name').value.trim();
        const typeElement = document.querySelector('input[name="workout-type"]:checked');
        const type = typeElement ? typeElement.value : '';
        const value = parseFloat(document.getElementById('metric-value').value);
        const units = document.getElementById('units').value.trim();
        
        // 2. Conditional Branching (Validation)
        if (isNaN(value) || value <= 0 || name === '' || date === '' || type === '' || units === '') {
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

        // 4. Add data and update view
        addWorkout(newWorkout); 
        renderHistoryTable(workoutData); 
        
        displayMessage("Workout logged successfully!", false);
        
        form.reset();
        
        // Re-initialize the dashboard panels to show updated stats/chart
        initializePage(); 
    });
}

// Run initialization when the page loads
initializePage();