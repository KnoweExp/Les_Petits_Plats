import recipes from './data/recipes.js';
let selectedTags = [];


const container = document.getElementById('recipes-container');
recipes.forEach(recipe => {
    const recipeCardHtml = createRecipeCard(recipe);
    container.innerHTML += recipeCardHtml;
});

document.getElementById('ustensilsButton').addEventListener('click', function() {
  var menu = document.getElementById('ustensilsMenu');
  menu.classList.toggle('show-dropdown');

  document.body.classList.toggle('dropdown-open');
});

document.getElementById('appareilsButton').addEventListener('click', function() {
  var menu = document.getElementById('appareilsMenu');
  menu.classList.toggle('show-dropdown');

  document.body.classList.toggle('dropdown-open');
});

document.getElementById('ingredientsButton').addEventListener('click', function() {
  var menu = document.getElementById('ingredientsMenu');
  menu.classList.toggle('show-dropdown');

  document.body.classList.toggle('dropdown-open');
});

document.getElementById('ingredientsSelect').addEventListener('change', function() {
  if (this.value) {
      addSelectedTag(this.value);
      // Assurez-vous de réinitialiser le select après l'ajout pour éviter des sélections répétées involontaires
      this.selectedIndex = 0;
  }
});



const getAllUnique = (category) => {
  return [...new Set(recipes.flatMap(recipe => recipe[category]))];
};

const uniqueIngredients = getAllUnique('ingredients').map(ingredient => ingredient.ingredient);
const uniqueAppliances = getAllUnique('appliance');
const uniqueUstensils = getAllUnique('ustensils').flat();


/**
 * affiche des tags dans une liste déroulante par catégorie
 * ecoute le clique sur un item pour l'ajouter a la liste des tags selectionnés
 * @param {*} listId est l'identifiant de la catégorie
 * @param {*} items 
 */
const populateDropdown = (selectId, items) => {
  const selectElement = document.getElementById(selectId);
  // Assurez-vous que selectElement est défini et accessible ici
  selectElement.innerHTML = '<option value="">Choisir...</option>'; // Ajoute une option par défaut

  items.forEach(item => {
      const option = document.createElement('option');
      option.value = item; // Ajustez si nécessaire pour votre structure de données
      option.textContent = item;
      selectElement.appendChild(option);
  });
};



populateDropdown('ingredientsList', uniqueIngredients);
populateDropdown('ingredientsSelect', uniqueIngredients)
populateDropdown('appareilsList', uniqueAppliances);
populateDropdown('ustensilsList', uniqueUstensils);


/**
 * verifie, affiche, supprime les tags sélectionnés
 * @param {*} item 
 * @returns 
 */
const addSelectedTag = (item) => {
  if (selectedTags.includes(item)) {
    console.log("Tag déjà sélectionné");
    return;
  }

  const selectedTagsContainer = document.getElementById('selected-tags');

  
  const tagContainer = document.createElement('div');
  tagContainer.classList.add('tag-container', 'tagButton'); 

 
  const tagText = document.createElement('span');
  tagText.textContent = item;
  tagText.classList.add('selected-tag');

  
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('type', 'button');
  removeBtn.classList.add('remove-tag-btn', 'text-sm', 'font-medium', 'text-black', 'rounded-xl');
  removeBtn.innerHTML = `
  <svg height="15px" width="15px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000">
  <g>
      <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256"></polygon>
  </g>
  <span class="sr-only">Remove tag</span>
</svg>
  `;
  removeBtn.addEventListener('click', function(event) {
      event.preventDefault();
      selectedTagsContainer.removeChild(tagContainer);

  
    selectedTags = selectedTags.filter(t => t !== item);

    mainSearch();
  });

  tagContainer.appendChild(tagText);
  tagContainer.appendChild(removeBtn);


  selectedTagsContainer.appendChild(tagContainer);
  mainSearch();

  
  selectedTags.push(item);
  
  mainSearch();
};


filterAndPopulateDropdown('searchInputING', 'ingredientsList', uniqueIngredients);
filterAndPopulateDropdown('searchInputAPP', 'appareilsList', uniqueAppliances);
filterAndPopulateDropdown('searchInputUST', 'ustensilsList', uniqueUstensils);


function filterAndPopulateDropdown(inputId, listId, itemsArray) {
  document.getElementById(inputId).addEventListener('input', function() {
      const searchQuery = this.value.toLowerCase();
      let itemsToDisplay = [];

      
      if (searchQuery.length >= 3) {
          itemsToDisplay = itemsArray.filter(item =>
              item.toLowerCase().includes(searchQuery)
          );
      } else {
          itemsToDisplay = itemsArray;
      }

      populateDropdown(listId, itemsToDisplay);
  });
}

// créé la carte de la recette dans le html
function createRecipeCard(recipe) {
    const ingredientsHtml = recipe.ingredients.map(ing => `
        <div class="flex flex-col mb-[1.3em] w-[35%] mr-[10%]">
            <p class="text-xs font-medium">${ing.ingredient}</p>
            <span class="text-xs font-manrope text-gray-400">${ing.quantity === undefined ? '' : ing.quantity} ${ing.unit || ''}</span>
        </div>
    `).join('');

    return `
        <div class="w-[27vw] h-[100%] mb-6 bg-white rounded-xl relative">
            <div class="w-full h-[220px]">
                <span class="pl-2 pt-0.5 w-[50px] h-[20px] text-[10px] bg-yellow-950 border rounded-3xl top-4 right-4 absolute pl-1.5 ">${recipe.time} min</span>
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

const searchButton = document.getElementById('searchButton');


searchButton.addEventListener('click', function(event) {
  event.preventDefault();

  mainSearch(event);
});

document.getElementById('searchInput').addEventListener('input', function(event) {
  const searchTerm = event.target.value.trim();
  
  if (searchTerm.length >= 3) {
      mainSearch(event);
  }
});

function mainSearch(event) {
  clearErrorMessage();
  if (event && event.preventDefault) {
      event.preventDefault();
  }

  const searchTerm = searchInput.value.toLowerCase();
  let results = [];

  for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const recipeNameIsInSearchTerm = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const recipeDescriptionIsInSearchTerm = recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const ingredientIsInSearchTerm = recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(searchTerm)
    );

    if (recipeNameIsInSearchTerm || recipeDescriptionIsInSearchTerm || ingredientIsInSearchTerm) {
      results.push(recipe);
  }
  }

  if (results.length > 0) {
    displayRecipes(results);
    displayNoResultsMessage("");
} else {
    displayNoResultsMessage(searchTerm);
}

  filterByTags(results);
  updateDropdowns(results);
}

// Affiche un message pour indiquer qu'il n'y a pas de résultat
function displayNoResultsMessage(searchTerm) {
  const messageContainer = document.getElementById('message-error');
  const defaultMessage = "Vous pouvez chercher « tarte aux pommes » par exemple.";

  
  if (searchTerm) {
      messageContainer.innerHTML = `Aucune recette ne contient '${searchTerm}'. ${defaultMessage}`;
  }
}

// supprime le message d'erreur
function clearErrorMessage() {
  const messageContainer = document.getElementById('message-error');
  if (messageContainer) {
      messageContainer.innerHTML = '';
  }
}


function filterByTags(recipesToFilter) {
  let filteredResults = [];

  for (let i = 0; i < recipesToFilter.length; i++) {
      const recipe = recipesToFilter[i];
      const ingredients = recipe.ingredients.map(ing => ing.ingredient.toLowerCase());
      const appliance = recipe.appliance.toLowerCase();
      const ustensils = recipe.ustensils.map(ust => ust.toLowerCase());
      const recipeTags = [...ingredients, appliance, ...ustensils];

      let matchesTags = true;
      for (let j = 0; j < selectedTags.length; j++) {
          if (!recipeTags.includes(selectedTags[j].toLowerCase())) {
              matchesTags = false;
              break;
          }
      }

      if (matchesTags) {
          filteredResults.push(recipe);
      }
  }

  
  displayRecipes(filteredResults);
  updateDropdowns(filteredResults);
}


//met a jour les listes déroulante en fonction des résultats de la recherche
function updateDropdowns(filteredRecipes) {
  const uniqueIngredients = getAllUniqueFromFiltered('ingredients', filteredRecipes).map(ingredient => ingredient.ingredient);
  const uniqueAppliances = getAllUniqueFromFiltered('appliance', filteredRecipes);
  const uniqueUstensils = getAllUniqueFromFiltered('ustensils', filteredRecipes).flat();


  populateDropdown('ingredientsList', uniqueIngredients);
  populateDropdown('appareilsList', uniqueAppliances);
  populateDropdown('ustensilsList', uniqueUstensils);
}

function getAllUniqueFromFiltered(category, filteredRecipes) {
  return [...new Set(filteredRecipes.flatMap(recipe => recipe[category]))];
}

// Fonction pour afficher les recettes
function displayRecipes(filteredRecipes) {
    container.innerHTML = '';
  
    filteredRecipes.forEach(recipe => {
      const cardHtml = createRecipeCard(recipe);
      const cardElement = document.createElement('div');
      cardElement.innerHTML = cardHtml;
      container.appendChild(cardElement);
    });

    
    updateRecipeCount(filteredRecipes.length);
  }


  function updateRecipeCount(count) {
    const recipeCountNumberElement = document.getElementById('recipeCountNumber');
    const recipeCountTextElement = document.getElementById('recipeCountText');

    recipeCountNumberElement.textContent = count;

    recipeCountTextElement.textContent = `recette${count > 1 ? 's' : ''}`;
}

  




