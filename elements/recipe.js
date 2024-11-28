const API_KEY = "b1d71dc302764202b67ed27d1fa1e22d";
const recipeListElement = document.getElementById("recipe-list");

// Function to display recipes in the DOM
function displayRecipes(recipes) {
  recipeListElement.innerHTML = ""; // Clear previous recipes

  recipes.forEach((recipe) => {
    // Create the recipe item card
    const recipeItemElement = document.createElement("li");
    recipeItemElement.classList.add("recipe-item");

    // Recipe image
    const recipeImageElement = document.createElement("img");
    recipeImageElement.src = recipe.image;
    recipeImageElement.alt = "Recipe Image";

    // Recipe title
    const recipeTitleElement = document.createElement("h2");
    recipeTitleElement.innerHTML = recipe.title;

    // Recipe ingredients
    const recipeIngredientsElement = document.createElement("p");
    recipeIngredientsElement.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}`;

    // Recipe link
    const recipeLinkElement = document.createElement("a");
    recipeLinkElement.href = recipe.sourceUrl;
    recipeLinkElement.innerText = "View Recipe";
    recipeLinkElement.target = "_blank";

    // Append all elements to the recipe item
    recipeItemElement.appendChild(recipeImageElement);
    recipeItemElement.appendChild(recipeTitleElement);
    recipeItemElement.appendChild(recipeIngredientsElement);
    recipeItemElement.appendChild(recipeLinkElement);

    // Append recipe item to the list
    recipeListElement.appendChild(recipeItemElement);
  });
}

// Function to fetch recipes from the Spoonacular API
async function getRecipes() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    recipeListElement.innerHTML = "<p>Sorry, we couldn't load recipes at this time. Please try again later.</p>";
    return [];
  }
}

// Initialization function
async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

// Event listener for the refresh button
document.querySelector(".refresh-btn").addEventListener("click", () => {
  init(); // Refresh and load new recipes
});

// Initialize the app
init();
