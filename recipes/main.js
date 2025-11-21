import recipes from "./recipes.mjs";

/* -------------------------------------------
 * 02 Build the random functions
 * ------------------------------------------- */

/**
 * Generates a random whole number between 0 (inclusive) and range (exclusive).
 * @param {number} range - The upper limit for the random number.
 * @returns {number} A random whole number.
 */
function getRandomInt(range) {
    return Math.floor(Math.random() * range);
}

/**
 * Returns a random entry from an array.
 * @param {Array<any>} list - The array to select from.
 * @returns {any} A random element from the list.
 */
function getRandomListEntry(list) {
    const index = getRandomInt(list.length);
    return list[index];
}


/* -------------------------------------------
 * 03 Create Template Functions
 * ------------------------------------------- */

/**
 * Generates accessible HTML for the star rating.
 * @param {number} rating - The recipe's numerical rating (e.g., 4.5).
 * @returns {string} The HTML string for the star rating element.
 */
function ratingTemplate(rating) {
    const totalStars = 5;
    // Round to the nearest half star
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const halfStar = roundedRating % 1 !== 0; 
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
 
    let starsHtml = "";
    // Using '★' and '☆' characters for visual representation
    const createStar = (className, char) => `<span aria-hidden="true" class="${className}">${char}</span>`;
 
    // Output filled stars
    for (let i = 0; i < fullStars; i++) {
      starsHtml += createStar("icon-star", "★");
    }
    // Output half star
    if (halfStar) {
      starsHtml += createStar("icon-star-half", "★");
    }
    // Output empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += createStar("icon-star-empty", "☆");
    }
    
    const ariaRating = rating % 1 === 0 ? rating.toFixed(0) : rating.toFixed(1);

    // begin building an html string using the ratings HTML written earlier as a model.
    let html = `<span
        class="rating"
        role="img"
        aria-label="Rating: ${ariaRating} out of 5 stars">
        ${starsHtml}
    </span>`;

    return html;
}

/**
 * Generates HTML for the recipe tags.
 * @param {Array<string>} tags - The array of recipe tags.
 * @returns {string} The HTML string for the tags list.
 */
function tagsTemplate(tags) {
    // loop through the tags list and transform the strings to HTML
    const html = `<div class="recipe-tags">${tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join("")}</div>`;
    return html;
}

/**
 * Generates the HTML string for a single recipe card.
 * @param {object} recipe - The recipe data object.
 * @returns {string} The HTML string for the recipe card.
 */
function recipeTemplate(recipe) {
  // Use template functions inside the template literal
  const ratingStars = ratingTemplate(recipe.rating);
  const tags = tagsTemplate(recipe.tags);
  
  // Robust image path cleaning: use the filename only
  const imagePath = recipe.image.split('/').pop(); 

  return `
    <div class="recipe-card">
        <img src="images/${imagePath}" alt="${recipe.name}" class="recipe-image">
        <div class="recipe-details">
            ${tags}
            <h2 class="recipe-name">${recipe.name}</h2>
            <div class="recipe-rating">
                ${ratingStars}
            </div>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-meta">
                <p><strong>Prep:</strong> ${recipe.prepTime}</p>
                <p><strong>Cook:</strong> ${recipe.cookTime}</p>
                <p><strong>Yield:</strong> ${recipe.recipeYield || 'Varies'}</p>
            </div>
            <h3 class="ingredients-heading">Ingredients</h3>
            <ul class="ingredients-list">
                ${recipe.recipeIngredient.map(ing => `<li>${ing}</li>`).join("")}
            </ul>
        </div>
    </div>`;
}


/* -------------------------------------------
 * 04 Render the Random Recipe
 * ------------------------------------------- */

/**
 * Renders a list of recipes to the main container.
 * @param {Array<object>} recipeList - The list of recipe objects to display.
 */
function renderRecipes(recipeList) {
    // get the element we will output the recipes into
    const recipeContainer = document.querySelector(".recipe-display");
    
    if (!recipeContainer) {
        console.error("Recipe display container (.recipe-display) not found in the DOM.");
        return; 
    }

    // Clear previous results or show 'not found' message
    if (recipeList.length === 0) {
        recipeContainer.innerHTML = "<p>No recipes found matching your search criteria.</p>";
        // Update the heading to reflect the lack of results or current view
        const recipeSectionHeading = document.querySelector(".recipe-section h2");
        if(recipeSectionHeading) recipeSectionHeading.textContent = "Search Results";
        return;
    }
    
    // use the recipeTemplate function to transform our recipe objects into recipe HTML strings
    const recipeHtml = recipeList.map(recipe => recipeTemplate(recipe)).join("");

    // Set the HTML strings as the innerHTML of our output element.
    recipeContainer.innerHTML = recipeHtml;

    // Update the heading to reflect the content
    const recipeSectionHeading = document.querySelector(".recipe-section h2");
    if(recipeSectionHeading) recipeSectionHeading.textContent = recipeList.length > 1 ? "Search Results" : "Featured Recipe";
}

function init() {
  // get a random recipe
  const recipe = getRandomListEntry(recipes)
  // render the recipe with renderRecipes.
  renderRecipes([recipe]); // Pass single recipe as an array for renderRecipes
  
  // Set the current year in the footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
}


/* -------------------------------------------
 * 05 Filtering Recipes
 * ------------------------------------------- */

/**
 * Filters and sorts the recipes array based on a search query.
 * @param {string} query - The search term.
 * @returns {Array<object>} The filtered and sorted list of recipes.
 */
function filterRecipes(query) {
    if (!query) return []; // Return empty list if query is empty

    const lowerCaseQuery = query.toLowerCase();

    // Filter step: check name, description, tags, OR ingredients
    const filteredList = recipes.filter(recipe => {
        if (recipe.name.toLowerCase().includes(lowerCaseQuery)) return true;
        if (recipe.description.toLowerCase().includes(lowerCaseQuery)) return true;
        // Check if any tag includes the query (using Array.find)
        if (recipe.tags.find((item) => item.toLowerCase().includes(lowerCaseQuery))) return true;
        // Check if any ingredient includes the query (using Array.find)
        if (recipe.recipeIngredient.find((item) => item.toLowerCase().includes(lowerCaseQuery))) return true;
        return false;
    });
    
    // Sort step: Sort the list of recipes by name alphabetically.
    filteredList.sort((a, b) => a.name.localeCompare(b.name));

    return filteredList;
}

/**
 * Handles the form submission event (when the search button is clicked).
 */
function searchHandler(event) {
    // 1. Call event.preventDefault()
    event.preventDefault(); 

    // 2. Get whatever was typed into the search input and convert it all to lowercase.
    const searchInput = document.getElementById("search-input");
    const query = searchInput.value.trim().toLowerCase();

    // 3. Pass the query string into a filterRecipes(query) function.
    const filteredList = filterRecipes(query);

    // 4. Render the filtered list of recipes to the page.
    renderRecipes(filteredList);
}


// --- Event Listeners and Initialization ---
window.addEventListener("load", () => {
    // Run init to display a random recipe on load (Step 04)
    init();
    
    // Attach event listener to our search button (Step 05)
    const searchForm = document.querySelector(".search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", searchHandler);
    } 
});