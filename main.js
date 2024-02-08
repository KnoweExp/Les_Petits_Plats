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
const populateDropdown = (listId, items) => {
  const listElement = document.getElementById(listId);
  listElement.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#'; 
    a.textContent = item; 
    a.classList.add('block', 'px-3', 'py-2', 'hover:bg-gray-200');

    a.addEventListener('click', function() {
      addSelectedTag(item);
      
  });

    li.appendChild(a); 
    listElement.appendChild(li);
});
};

populateDropdown('ingredientsList', uniqueIngredients);
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
  removeBtn.classList.add('remove-tag-btn', 'text-sm', 'font-medium', 'text-black', 'rounded-xl', 'focus:ring-4', 'focus:outline-none');
  removeBtn.innerHTML = `
      <svg height="25px" viewBox="0 0 512 512" width="25px" xmlns="http://www.w3.org/2000/svg">
      <svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "></polygon> </g> </g> </g></svg>
      </svg>
      <span class="sr-only">Remove tag</span>
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


document.getElementById('searchInput').addEventListener('input', function(event) {
  const searchTerm = event.target.value.trim();
  
  if (searchTerm.length >= 3) {
      mainSearch(event);
  }
});

function mainSearch(event) {
  if (event && event.preventDefault) {
      event.preventDefault();
  }

  const searchTerm = searchInput.value;
  let results = [];

  for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const searchTermHasMoreThan3Characters = searchTerm.length <= 3;
      const recipeNameIsInSearchTerm = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const recipeDescriptionIsInSearchTerm = recipe.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (searchTermHasMoreThan3Characters || recipeNameIsInSearchTerm || recipeDescriptionIsInSearchTerm) {
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
  const messageContainer = document.getElementById('recipes-container');
  const defaultMessage = "Vous pouvez chercher « tarte aux pommes » par exemple.";

  
  if (searchTerm) {
      messageContainer.innerHTML = `Aucune recette ne contient '${searchTerm}'. ${defaultMessage}`;
  } else {
      messageContainer.innerHTML = defaultMessage;
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
  }

  




