//This file manages the user's favorite cats

//Keep track of favorites in memory
let favorites = new Set();

//load favorites from API
export async function loadFavorites() {
    const response = await fetch("https://api.thecatapi.com/v1/favourites", {
        headers: {
            "x-api-key":"live_Cp8KEYgbCRuIeRG3E1oVmbm6xLiILjdIzVUXQY3zMFvXo3fNq2Xg8z55eYVqAFR7",
        
        },
});
const data = await response.json();

//Remember all favorite image IDs
data.forEach((fav) => {
    favorites.add(fav.image_id);
});
return data;

}

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