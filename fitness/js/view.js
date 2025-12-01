// js/view.js
// Selects the history table body and message area
const historyTableBody = document.querySelector('#history-table tbody');
const messageArea = document.getElementById('message-area');

// Function for Conditional Branching feedback (visual messages)
export function displayMessage(message, isError) {
    if (!messageArea) return;
    
    messageArea.textContent = message;
    messageArea.classList.remove('hidden');
    
    messageArea.style.color = isError ? 'var(--accent1-color)' : 'var(--primary-color)';

    setTimeout(() => {
        messageArea.textContent = '';
        messageArea.classList.add('hidden');
    }, 3000);
}

// Function to render the full history table (DOM Interaction)
export function renderHistoryTable(dataArray) {
    if (!historyTableBody) return;

    historyTableBody.innerHTML = ''; 
    
    dataArray.forEach(workout => {
        const row = historyTableBody.insertRow();
        
        row.insertCell().textContent = workout.date;
        row.insertCell().textContent = workout.name;
        row.insertCell().textContent = workout.type;
        row.insertCell().textContent = `${workout.value} ${workout.units}`;
    });
}

// Function to render the Dashboard Summary (Key Metrics)
export function renderDashboardSummary(totalWorkouts, bestStrength, bestCardio) {
    const summaryElement = document.getElementById('dashboard-summary');
    if (!summaryElement) return;

    summaryElement.innerHTML = `
        <p>Total Workouts Logged: <strong>${totalWorkouts}</strong></p>
        <p>Best Lift (Weight): <strong>${bestStrength ? bestStrength.value + ' ' + bestStrength.units : 'N/A'} (${bestStrength ? bestStrength.name : 'N/A'})</strong></p>
        <p>Best Cardio (Distance/Time): <strong>${bestCardio ? bestCardio.value + ' ' + bestCardio.units : 'N/A'} (${bestCardio ? bestCardio.name : 'N/A'})</strong></p>
    `;
}

// Function to render the 30-Day Activity Panel
export function renderActivityPanel(recentCount, activityData) {
    const panelElement = document.getElementById('progress-chart');
    if (!panelElement) return;

    panelElement.innerHTML = `
        <h2>Last 30 Days Activity</h2>
        <p>You have logged <strong>${recentCount}</strong> workouts in the last 30 days.</p>
        
        <div class="chart-container">
            <canvas id="activityChart"></canvas>
        </div>
        
        <p class="small-text">Visualizing your progress promotes consistency.</p>
    `;

    // Draw the chart immediately after rendering the canvas
    drawActivityChart(activityData);
}

// Function to draw the Chart.js graph
function drawActivityChart(activityData) {
    const ctx = document.getElementById('activityChart');
    if (!ctx || typeof Chart === 'undefined') return;

    const labels = activityData.labels;
    const data = activityData.data;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Workouts Logged',
                data: data,
                borderColor: '#4A5D46', 
                backgroundColor: 'rgba(74, 93, 70, 0.2)',
                tension: 0.4, 
                pointRadius: 5,
                pointBackgroundColor: '#AABD8C' 
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.max(...data, 2), // Adjust max dynamically
                    title: { display: true, text: 'Workouts' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}