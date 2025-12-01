// A simple array for storing workout data (your Array of Objects requirement)
let workoutData = [
    { id: 1, date: '2025-11-28', name: '5k Run', type: 'cardio', value: 3.1, units: 'miles' },
    { id: 2, date: '2025-11-30', name: 'Squats', type: 'strength', value: 205, units: 'lbs' },
];

// Uses an Array Method (reduce) to find a high-level summary stat
export function calculateTotalWorkouts() {
    return workoutData.length; 
}

// Uses an Array Method (filter) to find the highest value for a specific exercise type
export function getPersonalBest(type) {
    // 1. Filter for the desired type (strength or cardio)
    const filteredWorkouts = workoutData.filter(workout => workout.type === type);
    
    // 2. Use reduce to find the entry with the maximum 'value'
    if (filteredWorkouts.length === 0) return null;

    const bestWorkout = filteredWorkouts.reduce((best, current) => {
        return (current.value > best.value) ? current : best;
    });

    return bestWorkout;
}

// Function to add a new Object to the Array
export function addWorkout(newWorkout) {
    // Assign a simple unique ID (for better tracking/future deletion)
    newWorkout.id = Date.now();
    workoutData.push(newWorkout);
    // Sort by date (optional, but good practice)
    workoutData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Export the data array for use in rendering
export { workoutData };