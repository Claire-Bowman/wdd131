const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav"); 

// --- 01 Fix the menu ---
function toggleMenu() {
  mainNav.classList.toggle("visible"); 
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
  menuButton.setAttribute('aria-expanded', !isExpanded);
}

menuButton.addEventListener("click", toggleMenu);


// --- 02 Handle the window resize event ---
const BREAKPOINT = 1000; 

function handleResize() {
  if (window.innerWidth > BREAKPOINT) {
    mainNav.classList.remove("visible"); 
  } 
}

handleResize(); 
window.addEventListener("resize", handleResize);

// --- 03 & 04 Image Viewer Modal ---

const gallery = document.querySelector('.gallery');
const main = document.querySelector('main'); 

function viewImage(event) {
    // 1. Find the clicked image element
    const clickedImage = event.target.closest('img');
    if (!clickedImage) return;

    // 2. Get attributes of the clicked image (small version)
    const smallSrc = clickedImage.getAttribute('src');
    const altText = clickedImage.getAttribute('alt');
    
    // 3. Construct the full image source
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

gallery.addEventListener('click', viewImage);