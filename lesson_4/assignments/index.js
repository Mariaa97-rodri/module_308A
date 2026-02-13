// ...existing code...
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
    ui.showLoading();
    const cats = await api.fetchCatsByBreed(breedId);
    ui.displayCats(cats);

    // initialize or get bootstrap carousel instance (if bootstrap loaded)
    const carouselEl = document.getElementById("carouselExampleControls");
    try {
        if (window.bootstrap && carouselEl) {
            window.bootstrap.Carousel.getOrCreateInstance(carouselEl, { interval: false });
        }
    } catch (e) {
        // ignore if bootstrap not available
    }

    // use event delegation on carouselInner (works for buttons added via template)
    const carouselInner = document.getElementById("carouselInner");
    if (carouselInner) {
        // remove previous handler to avoid duplicates
        carouselInner.removeEventListener("_fav_click", _favClickHandler);
        carouselInner.addEventListener("click", _favClickHandler);
    }

    // also wire buttons in fallback gallery
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const targetBtn = e.currentTarget;
            toggleFavoriteById(targetBtn.dataset.imgId, targetBtn);
        });
    });
}

function _favClickHandler(e) {
    const btn = e.target.closest(".favorite-btn");
    if (!btn) return;
    toggleFavoriteById(btn.dataset.imgId, btn);
}

async function toggleFavoriteById(imageId, btnElement) {
    if (!imageId) return;
    const isFav = favorites.isFavorite(imageId);

    if (isFav) {
        const ok = await api.removeFavoriteByImageId(imageId);
        if (ok) {
            favorites.removeFromFavorites(imageId);
            if (btnElement) btnElement.textContent = "🤍 Add to Favorites";
        } else {
            console.error("Failed to remove favorite for image:", imageId);
        }
    } else {
        const added = await api.addFavorite(imageId);
        if (added) {
            favorites.addToFavorites(imageId);
            if (btnElement) btnElement.textContent = "❤️ Remove from Favorites";
        } else {
            console.error("Failed to add favorite for image:", imageId);
        }
    }
}

async function showFavorites() {
    ui.showLoading();
    const favList = await api.fetchFavorites();
    if (!favList || favList.length === 0) {
        ui.infoDump.innerHTML = "<p>You don't have any favorite cats yet! ❤️</p>";
        return;
    }
    const images = favList.map((fav) => ({ id: fav.image_id, url: fav.image?.url }));
    ui.displayCats(images);

    // delegate handlers will be attached by loadBreedCats logic; attach for fallback gallery
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const targetBtn = e.currentTarget;
            toggleFavoriteById(targetBtn.dataset.imgId, targetBtn);
        });
    });
}

// safe event hookup
if (ui.breedSelect) ui.breedSelect.addEventListener("change", loadBreedCats);
else console.error("breedSelect element not found");

if (ui.getFavouritesBtn) ui.getFavouritesBtn.addEventListener("click", showFavorites);
else console.error("getFavouritesBtn element not found");

// Start app
init();