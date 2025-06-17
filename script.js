const recipeContainer = document.getElementById('recipes');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal');
const modalResults = document.getElementById('modal-results');
const closeModal = document.querySelector('.close');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

const addForm = document.getElementById('add-form');
const addName = document.getElementById('add-name');
const addImage = document.getElementById('add-image');
const addIngredients = document.getElementById('add-ingredients');
const addInstructions = document.getElementById('add-instructions');

let allRecipes = [];

// Fetch dari API Dummy
async function fetchRecipes() {
  try {
    const res = await fetch('https://dummyjson.com/recipes');
    const data = await res.json();
    allRecipes = data.recipes;
    displayAllRecipes();
  } catch (error) {
    recipeContainer.innerHTML = '<p>Gagal mengambil data resep 😢</p>';
  }
}

function getLocalRecipes() {
  return JSON.parse(localStorage.getItem('localRecipes')) || [];
}

function saveLocalRecipe(recipe) {
  const current = getLocalRecipes();
  current.push(recipe);
  localStorage.setItem('localRecipes', JSON.stringify(current));
}

function displayAllRecipes() {
  recipeContainer.innerHTML = '';
  const local = getLocalRecipes();
  const all = [...local, ...allRecipes];
  displayRecipes(all);
}

function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    recipeContainer.appendChild(card);
  });
}

function createRecipeCard(recipe) {
  const card = document.createElement('article');
  card.className = 'recipe-card';
  card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.name}" />
    <h2>${recipe.name}</h2>
    <p><strong>Bahan:</strong> ${recipe.ingredients.slice(0, 3).join(', ')}</p>
    <p><strong>Langkah:</strong> ${recipe.instructions.slice(0, 2).join(', ')}...</p>
  `;
  return card;
}

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const recipeData = {
    id: Date.now(),
    name: addName.value.trim(),
    image: addImage.value.trim(),
    ingredients: addIngredients.value.split(',').map((i) => i.trim()),
    instructions: addInstructions.value.split(',').map((i) => i.trim()),
  };

  saveLocalRecipe(recipeData);

  addForm.reset();

  displayAllRecipes();

  alert('🎉 Resep berhasil ditambahkan!');
});

// Cari Resep
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const keyword = searchInput.value.toLowerCase().trim();
  if (!keyword) return;

  const all = [...getLocalRecipes(), ...allRecipes];
  const filtered = all.filter((r) => r.name.toLowerCase().includes(keyword));

  modalResults.innerHTML = '';
  if (filtered.length === 0) {
    modalResults.innerHTML = '<p>Resep tidak ditemukan 😢</p>';
  } else {
    filtered.forEach((r) => modalResults.appendChild(createRecipeCard(r)));
  }

  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => (modal.style.display = 'none'));
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});
hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));

fetchRecipes();
