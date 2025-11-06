// 02.1: Initialize the participant count
let participantCount = 1;

// Helper function to create the HTML template for a new participant
function participantTemplate(count) {
    return `
        <section class="participant${count}">
            <p>Participant ${count}</p>
            <div class="item">
                <label for="fname${count}">First Name</label>
                <input id="fname${count}" type="text" name="fname${count}" value="" required />
            </div>
            <div class="item activities">
                <label for="activity${count}">Activity</label>
                <select id="activity${count}" name="activity${count}">
                    <option selected value="">Choose Activity</option>
                    <option value="Standard">Standard - $50</option>
                    <option value="Premium">Premium - $100</option>
                    <option value="VIP">VIP - $150</option>
                </select>
            </div>
            <div class="item hidden">
                <label for="fee${count}">Fee</label>
                <input id="fee${count}" type="number" name="fee${count}" value="0" />
            </div>
        </section>
    `;
}

// 05.2: Helper function for the success message template
function successTemplate(info) {
    // info is an object like { adultName: '...', participantCount: N, feeTotal: $N }
    return `
        <p>Thank you **${info.adultName}** for registering. You have registered **${info.participantCount}** participants and owe **$${info.feeTotal.toFixed(2)}** in Fees.</p>
    `;
}

// 05.3: Function to calculate the fee total
function totalFees() {
    // Selector grabs elements with an ID that begins with "fee" (fee1, fee2, etc.)
    let feeElements = document.querySelectorAll("[id^=fee]");

    // Convert NodeList to an Array using the spread operator
    feeElements = [...feeElements];

    // Use Array.reduce() to sum up the values
    const total = feeElements.reduce((sum, element) => {
        // Use parseFloat to ensure numbers are correctly added
        return sum + parseFloat(element.value || 0); 
    }, 0);

    return total;
}

// 03.1: Event listener for the "Add Participant" button
document.getElementById('add').addEventListener('click', function() {
    // 02.2.1: Increment the count
    participantCount++;
    
    // 02.2.2 & 02.2.3: Create new HTML with unique IDs
    const newParticipantHTML = participantTemplate(participantCount);

    // 02.2.4: Select the Add Button element
    const addButton = document.getElementById('add'); 
    
    // Insert the new participant HTML before the 'add' button
    addButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
});

// 04.1: Event listener for the form submission
document.getElementById('registration').addEventListener('submit', function(event) {
    // 04.2 & 05.1: Prevent the default form submission (page reload)
    event.preventDefault(); 
    
    // 04.3: Calculate the total fees
    const feeTotal = totalFees(); 

    // 04.4: Get the adult name
    const adultName = document.getElementById('adult_name').value;
    
    // Prepare the info object
    const info = {
        adultName: adultName,
        participantCount: participantCount, 
        feeTotal: feeTotal
    };

    // Get the form and summary elements
    const formElement = document.getElementById('registration');
    const summaryElement = document.getElementById('summary'); 

    // 04.5 & 05.4: Hide the form and show the summary
    formElement.style.display = 'none';
    summaryElement.innerHTML = successTemplate(info);
    summaryElement.style.display = 'block'; 
});