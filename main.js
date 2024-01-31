import recipes from './data/recipes.js';

const container = document.getElementById('recipes-container');
recipes.forEach(recipe => {
    const recipeCardHtml = createRecipeCard(recipe);
    container.innerHTML += recipeCardHtml;
});

document.getElementById('ustensilsButton').addEventListener('click', function() {
  var menu = document.getElementById('ustensilsMenu');
  menu.classList.toggle('show-dropdown'); // Ajoute ou retire la classe 'show-dropdown'

  // Ajoutez ou supprimez la classe globale
  document.body.classList.toggle('dropdown-open');
});

document.getElementById('appareilsButton').addEventListener('click', function() {
  var menu = document.getElementById('appareilsMenu');
  menu.classList.toggle('show-dropdown'); // Ajoute ou retire la classe 'show-dropdown'

  // Ajoutez ou supprimez la classe globale
  document.body.classList.toggle('dropdown-open');
});

document.getElementById('ingredientsButton').addEventListener('click', function() {
  var menu = document.getElementById('ingredientsMenu');
  menu.classList.toggle('show-dropdown'); // Ajoute ou retire la classe 'show-dropdown'

  // Ajoutez ou supprimez la classe globale
  document.body.classList.toggle('dropdown-open');
});



const getAllUnique = (category) => {
  return [...new Set(recipes.flatMap(recipe => recipe[category]))];
};

const uniqueIngredients = getAllUnique('ingredients').map(ingredient => ingredient.ingredient);
const uniqueAppliances = getAllUnique('appliance');
const uniqueUstensils = getAllUnique('ustensils').flat();



const populateDropdown = (listId, items) => {
  const listElement = document.getElementById(listId);
  listElement.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li'); // Créer l'élément li
    const a = document.createElement('a'); // Créer l'élément a

    a.href = '#'; // Définir le href pour l'élément a
    a.textContent = item; // Utiliser item comme texte de l'élément a
    a.classList.add('block', 'px-3', 'py-2', 'hover:bg-gray-200'); // Ajouter des classes à l'élément a

    // Gestionnaire de clic pour chaque élément
    a.addEventListener('click', function() {
      // Ajouter l'ustensile sélectionné comme tag
      addSelectedTag(item);

      // Optionnel : mettre à jour la recherche globale avec le nouvel ustensile sélectionné
      // updateGlobalSearch(item);
  });

    li.appendChild(a); // Ajouter l'élément a comme enfant de l'élément li
    listElement.appendChild(li); // Ajouter l'élément li à l'élément de liste (ul ou ol)
});
};

populateDropdown('ingredientsList', uniqueIngredients);
populateDropdown('appareilsList', uniqueAppliances);
populateDropdown('ustensilsList', uniqueUstensils);

const addSelectedTag = (item) => {
  const selectedTagsContainer = document.getElementById('selected-tags');

  // Créer le conteneur pour le tag
  const tagContainer = document.createElement('div');
  tagContainer.classList.add('tag-container'); // Ajoutez des styles appropriés pour ce conteneur

  // Créer le span pour le texte du tag
  const tagText = document.createElement('span');
  tagText.textContent = item;
  tagText.classList.add('selected-tag'); // Ajoutez des styles appropriés pour les tags

  // Créer le bouton avec SVG pour supprimer le tag
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('type', 'button');
  removeBtn.classList.add('remove-tag-btn', 'text-sm', 'font-medium', 'text-black', 'rounded-xl', 'focus:ring-4', 'focus:outline-none');
  removeBtn.innerHTML = `
      <svg height="15px" viewBox="0 0 512 512" width="15px" xmlns="http://www.w3.org/2000/svg">
          <!-- Votre SVG ici -->
      </svg>
      <span class="sr-only">Remove tag</span>
  `;
  removeBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Empêchez le comportement par défaut du bouton
      selectedTagsContainer.removeChild(tagContainer);
      console.log("Tag supprimé");
  });

  // Ajouter le texte du tag et le bouton de suppression au conteneur du tag
  tagContainer.appendChild(tagText);
  tagContainer.appendChild(removeBtn);

  // Ajouter le conteneur du tag au conteneur global des tags sélectionnés
  selectedTagsContainer.appendChild(tagContainer);
};


// Supposons que `uniqueIngredients`, `uniqueAppliances`, et `uniqueUstensils` sont vos tableaux d'éléments uniques
filterAndPopulateDropdown('searchInputING', 'ingredientsList', uniqueIngredients);
filterAndPopulateDropdown('searchInputAPP', 'appareilsList', uniqueAppliances);
filterAndPopulateDropdown('searchInputUST', 'ustensilsList', uniqueUstensils);


function filterAndPopulateDropdown(inputId, listId, itemsArray) {
  document.getElementById(inputId).addEventListener('input', function() {
      const searchQuery = this.value.toLowerCase();
      let itemsToDisplay = [];

      // Vérifier que la longueur de la chaîne de recherche est d'au moins 3 caractères
      if (searchQuery.length >= 3) {
          itemsToDisplay = itemsArray.filter(item =>
              item.toLowerCase().includes(searchQuery)
          );
      } else {
          itemsToDisplay = itemsArray; // Afficher tous les éléments si la chaîne de recherche est vide ou moins de 3 caractères
      }

      populateDropdown(listId, itemsToDisplay);
  });
}


function createRecipeCard(recipe) {
    // Générer les ingrédients
    const ingredientsHtml = recipe.ingredients.map(ing => `
        <div class="flex flex-col mb-[1.3em] w-[35%] mr-[10%]">
            <p class="text-xs font-medium">${ing.ingredient}</p>
            <span class="text-xs font-manrope text-gray-400">${ing.quantity === undefined ? '' : ing.quantity} ${ing.unit || ''}</span>
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

// Récupérer les éléments
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', searchRecipes);

function searchRecipes(event) {
  // Ajouter un écouteur d'événement sur le bouton
  event.preventDefault();

  // Récupérer la valeur du champ input
  const searchTerm = searchInput.value;

  let results = [];

  if (searchTerm.length >= 3) {
    // Filtrer les recettes 
    recipes.forEach(recipe => {
      // Vérifier si le terme de recherche est dans le titre
      if (recipe.name.includes(searchTerm)) {
        results.push(recipe);
      }

      // Vérifier si le terme de recherche est dans la description
      if (recipe.description.includes(searchTerm)) {
        results.push(recipe);
      }

      const ingredients = recipe.ingredients;
      if (ingredients.some(ingredient => ingredient.ingredient.includes(searchTerm))) {
        results.push(recipe);
      }
    });
  }

  // Afficher les résultats
  displayRecipes(results);
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

  




