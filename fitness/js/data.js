let workoutData = [
    // --- Week 1: Strength Focus ---
    { id: 1, date: '2025-11-01', name: 'Leg Day (Heavy)', type: 'strength', value: 275, units: 'lbs' },
    { id: 2, date: '2025-11-03', name: 'Push Day (Chest/Shoulders)', type: 'strength', value: 185, units: 'lbs' },
    { id: 3, date: '2025-11-05', name: 'Pull Day (Back/Biceps)', type: 'strength', value: 135, units: 'lbs' },
    { id: 4, date: '2025-11-07', name: 'Easy Run', type: 'cardio', value: 2.5, units: 'miles' },

    // --- Week 2: Mixed Focus ---
    { id: 5, date: '2025-11-08', name: 'Full Body Circuit', type: 'strength', value: 155, units: 'lbs' },
    { id: 6, date: '2025-11-09', name: 'Long Run', type: 'cardio', value: 4.0, units: 'miles' },
    { id: 7, date: '2025-11-11', name: 'Shoulders & Arms', type: 'strength', value: 95, units: 'lbs' },
    { id: 8, date: '2025-11-13', name: 'Cycling Session', type: 'cardio', value: 45, units: 'mins' },
    { id: 9, date: '2025-11-14', name: 'Core & Mobility', type: 'strength', value: 0, units: 'bodyweight' },

    // --- Week 3: Cardio Focus ---
    { id: 10, date: '2025-11-15', name: 'Interval Run (PB Attempt)', type: 'cardio', value: 3.5, units: 'miles' },
    { id: 11, date: '2025-11-17', name: 'Bench Press (Medium)', type: 'strength', value: 175, units: 'lbs' },
    { id: 12, date: '2025-11-18', name: 'Hike', type: 'cardio', value: 90, units: 'mins' },
    { id: 13, date: '2025-11-20', name: 'Sprints', type: 'cardio', value: 20, units: 'mins' },
    { id: 14, date: '2025-11-21', name: 'Deadlift (Heavy)', type: 'strength', value: 315, units: 'lbs' }, // New PB

    // --- Week 4: Holiday & End of Month ---
    { id: 15, date: '2025-11-22', name: 'Recovery Walk', type: 'cardio', value: 1.5, units: 'miles' },
    { id: 16, date: '2025-11-24', name: 'Upper Body Maintenance', type: 'strength', value: 100, units: 'lbs' },
    { id: 17, date: '2025-11-26', name: 'Boxing Class', type: 'cardio', value: 60, units: 'mins' },
    { id: 18, date: '2025-11-28', name: 'Yoga', type: 'cardio', value: 45, units: 'mins' },
    { id: 19, date: '2025-11-29', name: 'Legs & Core', type: 'strength', value: 225, units: 'lbs' },
    { id: 20, date: '2025-10-31', name: 'New Year\'s Eve Run', type: 'cardio', value: 5.0, units: 'miles' }, // New PB
];

// Function that uses an Array Method (reduce) to find a high-level summary stat
export function calculateTotalWorkouts() {
    return workoutData.length; 
}

// Uses an Array Method (filter/reduce) to find the highest value for a specific exercise type
export function getPersonalBest(type) {
    const filteredWorkouts = workoutData.filter(workout => workout.type === type);
    
    if (filteredWorkouts.length === 0) return null;

    const bestWorkout = filteredWorkouts.reduce((best, current) => {
        return (current.value > best.value) ? current : best;
    });

    return bestWorkout;
}

// Function to add a new Object to the Array
export function addWorkout(newWorkout) {
    newWorkout.id = Date.now();
    workoutData.push(newWorkout);
    workoutData.sort((a, b) => new Date(b.date) - new Date(a.date));
}
// --- New Function to use Array Method for the 30-Day Activity Panel ---
export function calculateLast30DaysActivity(data) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date 30 days ago

    // Use the filter Array Method to count workouts within the last 30 days
    const recentWorkouts = data.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= thirtyDaysAgo;
    });

    return recentWorkouts.length;
}

export { workoutData };