//load favorites from API
import { fetchFavorites } from "./api.js";
//Keep track of favorites in memory
let favorites = new Set();



export async function loadFavorites() {
    const data = await fetchFavorites();

    data.forEach((fav) => {
        favorites.add(fav.image_id);
    });

    return data;
}

// //Remember all favorite image IDs
// data.forEach((fav) => {
//     favorites.add(fav.image_id);
// });
// return data;


//check if a cat is in favorites
export function isFavorite(imageId) {
    return favorites.has(imageId);
}

//Add to favorites
export function addToFavorites(imageId) {
    favorites.add(imageId);
}

//Remove from favorites
export function removeFromFavorites(imageId) {
    favorites.delete(imageId);
}
//Get all favorites
export function getFavoritesList() {
    return Array.from(favorites);
}