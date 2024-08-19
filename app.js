document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('search');
    const recipesContainer = document.getElementById('recipes');
    const clickDiv = document.querySelector('.clickdiv');

    search.addEventListener('click', () => {
        let input = document.querySelector('#input').value;

        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${input}`)
            .then(response => response.json())
            .then(data => {
                const recipes = data.data.recipes;
                console.log(recipes);

                // Clear previous recipes
                recipesContainer.innerHTML = "";

                recipes.forEach(recipe => {
                    const recipeElement = document.createElement("div");
                    recipeElement.classList.add('recipe-item', 'border', 'rounded', 'mb-3');

                    recipeElement.innerHTML = `
                        <div class="ele">
                            <div class="foodimg">
                                <img src="${recipe.image_url}" alt="${recipe.title}" class="img-fluid">
                            </div>
                            <div class="food-content">
                                <h3 style ="color:#facf74;">${recipe.title}</h3>
                                <p>${recipe.publisher}</p>
                            </div>
                        </div>
                    `;

                    // Append the recipeElement to the recipesContainer
                    recipesContainer.appendChild(recipeElement);

                    // Add click event to fetch and update the clickDiv with single recipe details
                    recipeElement.addEventListener('click', () => {
                        // Fetch single recipe details using the recipe id
                        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}`)
                            .then(response => response.json())
                            .then(singleData => {
                                const singleRecipe = singleData.data.recipe;

                                // Update the clickDiv content
                                clickDiv.innerHTML = `
                                    <img src="${singleRecipe.image_url}" alt="${singleRecipe.title}" class="img-fluid">
                                    <div class="clickContent">
                                        <h2>${singleRecipe.title}</h2>
                                        <p>Published by: ${singleRecipe.publisher}</p>
                                        <p>Cooking Time: ${singleRecipe.cooking_time} minutes</p>
                                        <p>Servings: ${singleRecipe.servings}</p>
                                        <h4>Ingredients:</h4>
                                        <ul>
                                            ${singleRecipe.ingredients.map(ingredient => `<li>${ingredient.quantity} ${ingredient.unit} ${ingredient.description}</li>`).join('')}
                                        </ul>
                                    </div>
                                `;
                            })
                            .catch(error => {
                                console.error('Error fetching single recipe data:', error);
                            });
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});
