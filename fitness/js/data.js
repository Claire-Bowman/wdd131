// js/data.js
// This array is pre-sorted in DESCENDING order (Newest to Oldest)

let workoutData = [
    // --- Newest Entries ---
    { id: 20, date: '2025-12-31', name: 'New Year\'s Eve Run', type: 'cardio', value: 5.0, units: 'miles' }, 
    { id: 19, date: '2025-12-29', name: 'Legs & Core', type: 'strength', value: 225, units: 'lbs' },
    { id: 18, date: '2025-12-28', name: 'Yoga', type: 'cardio', value: 45, units: 'mins' },
    { id: 17, date: '2025-12-26', name: 'Boxing Class', type: 'cardio', value: 60, units: 'mins' },
    { id: 16, date: '2025-12-24', name: 'Upper Body Maintenance', type: 'strength', value: 100, units: 'lbs' },
    { id: 15, date: '2025-12-22', name: 'Recovery Walk', type: 'cardio', value: 1.5, units: 'miles' },
    
    // --- Middle of Month ---
    { id: 14, date: '2025-12-21', name: 'Deadlift (Heavy)', type: 'strength', value: 315, units: 'lbs' }, 
    { id: 13, date: '2025-12-20', name: 'Sprints', type: 'cardio', value: 20, units: 'mins' },
    { id: 12, date: '2025-12-18', name: 'Hike', type: 'cardio', value: 90, units: 'mins' },
    { id: 11, date: '2025-12-17', name: 'Bench Press (Medium)', type: 'strength', value: 175, units: 'lbs' },
    { id: 10, date: '2025-12-15', name: 'Interval Run (PB Attempt)', type: 'cardio', value: 3.5, units: 'miles' },
    
    // --- Week 2 ---
    { id: 9, date: '2025-12-14', name: 'Core & Mobility', type: 'strength', value: 0, units: 'bodyweight' },
    { id: 8, date: '2025-12-13', name: 'Cycling Session', type: 'cardio', value: 45, units: 'mins' },
    { id: 7, date: '2025-12-11', name: 'Shoulders & Arms', type: 'strength', value: 95, units: 'lbs' },
    { id: 6, date: '2025-12-09', name: 'Long Run', type: 'cardio', value: 4.0, units: 'miles' },
    { id: 5, date: '2025-12-08', name: 'Full Body Circuit', type: 'strength', value: 155, units: 'lbs' },

    // --- Oldest Entries ---
    { id: 4, date: '2025-12-07', name: 'Easy Run', type: 'cardio', value: 2.5, units: 'miles' },
    { id: 3, date: '2025-12-05', name: 'Pull Day (Back/Biceps)', type: 'strength', value: 135, units: 'lbs' },
    { id: 2, date: '2025-12-03', name: 'Push Day (Chest/Shoulders)', type: 'strength', value: 185, units: 'lbs' },
    { id: 1, date: '2025-12-01', name: 'Leg Day (Heavy)', type: 'strength', value: 275, units: 'lbs' }, 
];

export function calculateTotalWorkouts() {
    return workoutData.length; 
}

// Uses Array Method (filter/reduce)
export function getPersonalBest(type) {
    const filteredWorkouts = workoutData.filter(workout => workout.type === type);
    
    if (filteredWorkouts.length === 0) return null;

    const bestWorkout = filteredWorkouts.reduce((best, current) => {
        return (current.value > best.value) ? current : best;
    }, filteredWorkouts[0]);

    return bestWorkout;
}

// Uses Array Method (filter)
export function calculateLast30DaysActivity(data) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); 

    const recentWorkouts = data.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= thirtyDaysAgo;
    });

    return recentWorkouts.length;
}

// Uses Array Method (filter/map/reduce) to prepare data for Chart.js
export function prepareChartData(data) {
    const activityMap = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Initialize map for the last 7 days to 0
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
        activityMap[dayLabel] = 0;
    }

    // Populate the map with counts from the workout data
    data.forEach(workout => {
        const workoutDate = new Date(workout.date);
        workoutDate.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(today - workoutDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 6) { 
            const dayLabel = workoutDate.toLocaleDateString('en-US', { weekday: 'short' });
            if (activityMap.hasOwnProperty(dayLabel)) {
                activityMap[dayLabel]++;
            }
        }
    });

    return {
        labels: Object.keys(activityMap),
        data: Object.values(activityMap)
    };
}

// Function to add a new Object to the Array and KEEP IT SORTED (Most Recent First)
export function addWorkout(newWorkout) {
    newWorkout.id = Date.now();
    workoutData.push(newWorkout);
    
    // Sort the array (Most Recent First)
    workoutData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export { workoutData };