
const themeSelector = document.querySelector('#theme-selector');
const bodyElement = document.querySelector('body');
const logoElement = document.querySelector('#logo');

// Define the file names for the logos
const BLUE_LOGO_SRC = "byui-logo_blue.webp";
const WHITE_LOGO_SRC = "byui-logo_white.png";


function changeTheme() {
    // Check to see what the current value of our select is.
    const selectedTheme = themeSelector.value;

    if (selectedTheme === "dark") {
        // If the value is dark then:
        // 1. Add the dark class to the body
        bodyElement.classList.add('dark');
        
        // 2. Change the source of the logo img to point to the white logo.
        logoElement.src = WHITE_LOGO_SRC;
    } else {
        // Otherwise:
        // 1. Remove the dark class
        bodyElement.classList.remove('dark');
        
        // 2. Make sure the logo src is the blue logo.
        logoElement.src = BLUE_LOGO_SRC;
    }
}
// Add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);






