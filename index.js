const API_KEY = "8d606212daa94025be17131e2b28af9a";
const recipeListEl = document.getElementById("recipe-list");

//create a function to diplay recipes
const displayRecipes = (recipes) => {
  //emptying the ul
  recipeListEl.innerHTML = "";
  //use forEach method to get the 10 recipes one after the other
  recipes.forEach((recipe) => {
    //creating the li elemet
    const recipeItemEl = document.createElement("li");
    //adding class name to the li
    recipeItemEl.classList.add("recipe-item");
    //adding the recipe image
    recipeImageEl = document.createElement("img");
    //add the image source and alt text
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "recipe image";

    //adding the recipe title
    recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    // adding the recipe ingredients
    recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}`;

    // adding the recipe link to each li
    recipeUrlEl = document.createElement("a");
    recipeUrlEl.innerHTML = `<a href="${recipe.sourceUrl}">View Recipe</a> `;
    // recipeUrlEl.href = recipe.sourceUrl;
    // recipeUrlEl.innerText = "View Recipe";

    //adding the recipe contents to the li which which move to the ul
    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeUrlEl);
    //adding the li and its class to the recipe list(ul)
    recipeListEl.appendChild(recipeItemEl);
  });
};

// Getting information from the API
async function getRecipes() {
  //fetch data from API
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );

  // get data then convert the string to JSON
  const data = await response.json();

  return data.recipes;
}

// create an initialize function that will trigger to fetch API once user visit the website
async function init() {
  const recipes = await getRecipes();
  console.log(recipes);
  displayRecipes(recipes);
}
init();
