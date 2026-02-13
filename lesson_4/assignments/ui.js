//This file updates the HTML

//Get HTML elements
export const breedSelect = document.getElementById("breedSelect");
export const infoDump = document.getElementById("infoDump");
export const progressBar = document.getElementById("progressBar");
export const getFavoritesBtn = document.getElementById("getFavoritesBtn");

//Fill the breed dropdown with options
export function populateBreeds(breeds) {
//Clear old options
breedSelect.innerHTML = '<option value="">-- Select a breed --</option>';

//Add each breed as an option
breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
});

//Auto-select the first breed
if (breeds.length > 0) {
    breedSelect.value = breeds[0].id;
    }
}

//show cat pictures in a carousel
export function displayCats(images) {
    //clear old images
    infoDump.innerHTML = "";

    if (images.length === 0) {
        infoDump.innerHTML = "<p> Where did the kitties go?</p>";
        return;
    }
    //Create a simple gallery
    const gallery = document.createElement("div");
    gallery.className = "cat-gallery";

    images.forEach((image) => {
        const card = document.createElement("div");
        card.className = "cat-card";
        card.innerHTML = `
         <img src="${image.url}" alt="Cat" style="width: 100%; border-radius: 8px;">
      <button class="favorite-btn" data-img-id="${image.id}">❤️ Favorite</button>
    `;
    gallery.appendChild(card);
    });
    infoDump.appendChild(gallery);
}

//Show loading message
export function showLoading() {
    infoDump.innerHTML = "<p>Loading cute cats... 🐱</p>";
}

//Show error message
export function showError(message) {
    infoDump.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}

//Update progress bar
export function updateProgress(percent) {
    progressBar.style.width = `${percent}`
}