import * as api from "./api.js";
import * as ui from "./ui.js";
import * as favorites from "./favorites.js";

async function init() {
    try {
        ui.showLoading();
        const breeds = await api.fetchBreeds();
        ui.populateBreeds(breeds);
        await favorites.loadFavorites();
        if (breeds && breeds.length > 0) {
            ui.breedSelect.value = breeds[0].id;
            await loadBreedCats();
        } else {
            ui.infoDump.innerHTML = "<p>No breeds available.</p>";
        }
    } catch (error) {
        ui.showError("Failed to load the app!");
        console.error(error);
    }
}

async function loadBreedCats() {
    const breedId = ui.breedSelect.value;

    if (!breedId) {
        ui.infoDump.innerHTML = "<p>Please select a breed to see cats!</p>";
        return;
    }

    // START LOADING
    ui.showLoading();
    ui.updateProgress("20%");

    const cats = await api.fetchCatsByBreed(breedId);

    // DATA ARRIVED
    ui.updateProgress("80%");
    ui.displayCats(cats);

    // FINISHED
    ui.updateProgress("100%");

    // initialize carousel if bootstrap present
    const carouselEl = document.getElementById("carouselExampleControls");
    try {
        if (window.bootstrap && carouselEl) {
            window.bootstrap.Carousel.getOrCreateInstance(
                carouselEl,
                { interval: false }
            );
        }
    } catch (e) {}

    // favorite button handling
    const infoDump = document.getElementById("infoDump");
    if (infoDump) {
        infoDump.removeEventListener("click", _favClickHandler);
        infoDump.addEventListener("click", _favClickHandler);
    }
}
function _favClickHandler(e) {
    const btn = e.target.closest(".favorite-btn");
    if (!btn) return;
    toggleFavoriteById(btn.dataset.imgId, btn);
}

async function toggleFavoriteById(imageId, btnElement) {
    if (!imageId) return;

    const isFav = favorites.isFavorite(imageId);

    if (btnElement) btnElement.disabled = true;

    if (isFav) {
        const ok = await api.removeFavoriteByImageId(imageId);
        if (ok) {
            favorites.removeFromFavorites(imageId);
            btnElement.textContent = "🤍 Add to Favorites";
        }
    } else {
        const added = await api.addFavorite(imageId);
        if (added) {
            favorites.addToFavorites(imageId);
            // btnElement.textContent = "❤️ Remove from Favorites";
        }
    }

    if (btnElement) btnElement.disabled = false;
}

async function showFavorites() {
    ui.showLoading();
    ui.updateProgress("20%");

    const favList = await api.fetchFavorites();

    ui.updateProgress("100%");

    if (!favList.length) {
        ui.infoDump.innerHTML = "<p>No favorites yet ❤️</p>";
        return;
    }

    const images = favList.map((fav) => ({
        id: fav.image_id,
        url: fav.image?.url
    }));

    ui.displayCats(images);

    const infoDump = document.getElementById("infoDump");
    if (infoDump) {
        infoDump.removeEventListener("click", _favClickHandler);
        infoDump.addEventListener("click", _favClickHandler);
    }
}
// safe event hookup
if (ui.breedSelect) ui.breedSelect.addEventListener("change", loadBreedCats);
else console.error("breedSelect element not found");

if (ui.getFavoritesBtn) ui.getFavoritesBtn.addEventListener("click", showFavorites);
else console.error("getFavouritesBtn element not found");

// Start app
init();