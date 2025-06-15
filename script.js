const recipeContainer = document.getElementById("recipes");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const modal = document.getElementById("modal");
const modalResults = document.getElementById("modal-results");
const closeModal = document.querySelector(".close");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

let allRecipes = [];

// Ambil data resep dari API
async function fetchRecipes() {
  try {
    const res = await fetch("https://dummyjson.com/recipes");
    const data = await res.json();
    allRecipes = data.recipes;
    displayRecipes(allRecipes);
  } catch (error) {
    recipeContainer.innerHTML = "<p>Gagal mengambil data resep 😢</p>";
  }
}

// Tampilkan resep ke dalam container
function displayRecipes(recipes) {
  recipeContainer.innerHTML = "";
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    recipeContainer.appendChild(card);
  });
}

// Bikin elemen kartu resep
function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "recipe-card";
  card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.name}" />
    <h2>${recipe.name}</h2>
    <p><strong>Bahan:</strong> ${recipe.ingredients.slice(0, 3).join(", ")}</p>
    <p><strong>Langkah:</strong> ${recipe.instructions.slice(0, 2).join(", ")}...</p>
  `;
  return card;
}

// Event cari resep
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = searchInput.value.toLowerCase().trim();

  if (!keyword) return;

  const filtered = allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(keyword)
  );

  modalResults.innerHTML = "";
  if (filtered.length === 0) {
    modalResults.innerHTML = "<p>Resep tidak ditemukan 😢</p>";
  } else {
    filtered.forEach((recipe) => {
      const card = createRecipeCard(recipe);
      modalResults.appendChild(card);
    });
  }

  modal.style.display = "block";
});

// Tutup modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Klik luar modal = tutup
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Toggle hamburger menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

fetchRecipes();
