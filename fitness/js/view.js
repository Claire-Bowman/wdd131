// Selects the history table body
const historyTableBody = document.querySelector('#history-table tbody');
// Selects the message area for feedback
const messageArea = document.getElementById('message-area');

// Function to display messages (used for validation feedback)
export function displayMessage(message, isError) {
    messageArea.textContent = message;
    messageArea.classList.remove('hidden');
    
    // Apply styles based on whether it's an error or success (DOM styling)
    if (isError) {
        messageArea.style.color = 'var(--accent1-color)'; // Red/Error
    } else {
        messageArea.style.color = 'var(--primary-color)'; // Green/Success
    }

    // Hide message after a few seconds
    setTimeout(() => {
        messageArea.textContent = '';
        messageArea.classList.add('hidden');
    }, 3000);
}

// Function to render the full history table (DOM Interaction)
export function renderHistoryTable(dataArray) {
    if (!historyTableBody) return; // Exit if not on the history page

    historyTableBody.innerHTML = ''; // Clear existing rows
    
    dataArray.forEach(workout => {
        const row = historyTableBody.insertRow();
        
        // Insert cells and populate them with data from the Object
        row.insertCell().textContent = workout.date;
        row.insertCell().textContent = workout.name;
        row.insertCell().textContent = workout.type;
        row.insertCell().textContent = `${workout.value} ${workout.units}`;
        
        // Optional: Add a class for different row styles based on type
        row.classList.add(`${workout.type}-row`);
    });
}

// Function to render the dashboard summary (DOM Interaction)
export function renderDashboardSummary(totalWorkouts, bestLift) {
    const summaryElement = document.getElementById('dashboard-summary');
    if (!summaryElement) return;

    summaryElement.innerHTML = `
        <p>Total Workouts Logged: <strong>${totalWorkouts}</strong></p>
        <p>Your Best Lift: <strong>${bestLift ? bestLift.value + ' ' + bestLift.units : 'N/A'} (${bestLift ? bestLift.name : 'N/A'})</strong></p>
        <a href="log-workout.html" class="cta-button">Log New Workout</a>
    `;
}