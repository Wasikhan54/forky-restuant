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

                // Clear previous recipes
                recipesContainer.innerHTML = "";

                recipes.forEach(recipe => {
                    const recipeElement = document.createElement("div");
                    recipeElement.classList.add('recipe-item', 'border', 'rounded', 'mb-3');

                    recipeElement.innerHTML = `
                        <div class="foodimg">
                            <img src="${recipe.image_url}" alt="${recipe.title}" class="img-fluid">
                        </div>
                        <div class="food-content">
                            <h2>${recipe.title}</h2>
                            <p>${recipe.publisher}</p>
                        </div>
                    `;

                    // Append the recipeElement to the recipesContainer
                    recipesContainer.appendChild(recipeElement);

                    // Add click event to update the clickDiv content
                    recipeElement.addEventListener('click', () => {
                        // Update the clickDiv content
                        clickDiv.innerHTML = `
                            <img src="${recipe.image_url}" alt="${recipe.title}" class="img-fluid">
                            <div class="clickContent">
                                <h2>${recipe.title}</h2>
                                <p>Published by: ${recipe.publisher}</p>
                            </div>
                        `;
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});
