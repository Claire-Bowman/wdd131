const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav"); // Target the container for the menu

// --- 01 Fix the menu ---
function toggleMenu() {
  // Toggle a class on the nav container to show/hide the links
  mainNav.classList.toggle("visible"); 
  
  // Update aria-expanded for accessibility (optional but good practice)
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
  menuButton.setAttribute('aria-expanded', !isExpanded);
}

menuButton.addEventListener("click", toggleMenu);


// --- 02 Handle the window resize event ---
const BREAKPOINT = 1000; // Define the media query breakpoint

function handleResize() {
  if (window.innerWidth > BREAKPOINT) {
    // If screen is wide, ensure the menu is visible and remove mobile-specific class
    mainNav.classList.remove("visible"); 
    // In a full implementation, you'd hide the button here too if not already in CSS
  } 
  // We don't explicitly hide it here if it's small, because the CSS already handles the default hidden state.
  // The 'visible' class is only managed by the button for mobile.
}

// Call the function immediately on load
handleResize(); 
// Add event listener for when the window is resized
window.addEventListener("resize", handleResize);

// The following section will be for the image viewer (03 & 04)
// ...

// --- 03 & 04 Image Viewer Modal ---

const gallery = document.querySelector('.gallery');
const main = document.querySelector('main'); // Use 'main' to append the dialog

function viewImage(event) {
    // 1. Find the clicked image element
    const clickedImage = event.target.closest('img');
    
    // Check if an image was actually clicked
    if (!clickedImage) return;

    // 2. Get attributes of the clicked image (small version)
    const smallSrc = clickedImage.getAttribute('src');
    const altText = clickedImage.getAttribute('alt');
    
    // 3. Construct the full image source
    // Takes 'norris-sm.jpeg', splits it at '-', takes the first part ('norris'), 
    // and adds '-full.jpeg' to get 'norris-full.jpeg'
    const fullSrc = smallSrc.split('-')[0] + '-full.jpeg';
    
    // 4. Build the HTML for the dialog (modal)
    const dialogHTML = `
        <img src="${fullSrc}" alt="${altText}">
        <button class='close-viewer'>X</button>
    `;

    // 5. Create the <dialog> element
    const modal = document.createElement('dialog');
    modal.innerHTML = dialogHTML;
    
    // 6. Append the modal to the main content area (or body)
    main.appendChild(modal);

    // 7. Show the modal
    modal.showModal();

    // 8. Add event listener to close the modal when the 'X' button is clicked
    const closeButton = modal.querySelector('.close-viewer');
    closeButton.addEventListener('click', () => {
        modal.close();
        // Remove the modal from the DOM after closing
        modal.remove(); 
    });

    // 9. Add event listener to close the modal when the backdrop is clicked
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
            modal.remove();
        }
    });
}

// Add the click handler to the entire gallery
gallery.addEventListener('click', viewImage);

// Note: The menu-related code from 01 & 02 should precede this in your coolpics.js file.