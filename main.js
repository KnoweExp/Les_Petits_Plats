import recipes from './data/recipes.js';

const container = document.getElementById('recipes-container');
recipes.forEach(recipe => {
    const recipeCardHtml = createRecipeCard(recipe);
    container.innerHTML += recipeCardHtml;
});

function createRecipeCard(recipe) {
    // Générer les ingrédients
    const ingredientsHtml = recipe.ingredients.map(ing => `
        <div class="flex flex-col mb-[1.3em] w-[35%] mr-[10%]">
            <p class="text-xs font-medium">${ing.ingredient}</p>
            <span class="text-xs font-manrope text-gray-400">${ing.quantity || ''} ${ing.unit || ''}</span>
        </div>
    `).join('');

    // Retourner la structure de la carte de recette
    return `
        <div class="w-[27vw] h-[100%] mb-6 bg-white rounded-xl relative">
            <div class="w-full h-[220px]">
                <span class="pl-2 pt-0.5 w-[50px] h-[20px] text-[10px] bg-yellow rounded-3xl top-4 right-4 absolute pl-1.5 ">${recipe.time} min</span>
                <img src="./img/${recipe.image}" class="h-full w-full object-cover rounded-t-xl">
            </div>
            <div class="ml-4 mr-4 h-full">
                <div class="py-6">
                    <h2 class="font-medium font-anton">${recipe.name}</h2>
                </div>
                <div>
                    <div>
                        <h3 class="pb-4 text-gray-400 text-xs font-bold">RECETTE</h3>
                        <p class="text-xs font-manrope">${recipe.description}</p>
                    </div>
                    <div>
                        <h3 class="py-4 text-gray-400 text-xs font-bold">INGRÉDIENTS</h3>
                        <div class="flex flex-wrap justify-between">
                            ${ingredientsHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
