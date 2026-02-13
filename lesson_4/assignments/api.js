const API_KEY = "live_Cp8KEYgbCRuIeRG3E1oVmbm6xLiILjdIzVUXQY3zMFvXo3fNq2Xg8z55eYVqAFR7";
const BASE_URL = "https://api.thecatapi.com/v1";
const SUB_ID = "my-cat-app-user";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["x-api-key"] = API_KEY;

export async function fetchBreeds() {
    try {
        const res = await axios.get("/breeds");
        return res.data;
    } catch (err) {
        console.error("fetchBreeds error:", err);
        return [];
    }
}

export async function fetchCatsByBreed(breedId, limit = 10) {
    try {
        const res = await axios.get("/images/search", {
            params: { breed_id: breedId, limit },
        });
        return res.data;
    } catch (err) {
        console.error("fetchCatsByBreed error:", err);
        return [];
    }
}

export async function fetchFavorites() {
    try {
        const res = await axios.get("/favourites", {
            params: { sub_id: "my-cat-app-user" },
        });
        return res.data;
    } catch (err) {
        console.error("fetchFavourites error:", err);
        return [];
    }
}

export async function addFavorite(imageId) {
    try {
        const res = await axios.post("/favourites", { image_id: imageId, sub_id: "my-cat-app-user" });
        return res.data;
    } catch (err) {
        console.error("addFavorite error:", err);
        return null;
    }
}

export async function removeFavorite(favouriteId) {
  try {
    const res = await axios.delete(`/favourites/${favouriteId}`);
    return res.data;
  } catch (err) {
    console.error("removeFavorite error:", err);
    return null;
  }
}

// Helper: find the favourite record for an image_id and delete it
export async function removeFavoriteByImageId(imageId) {
    try {
        const res = await axios.get("/favourites", {
            params: { sub_id: SUB_ID }    // ✅ filter by your user
        });
        const fav = res.data.find((f) => f.image_id === imageId);
        if (!fav) {
            console.warn("No favourite record found for image:", imageId);
            return false;
        }
        await axios.delete(`/favourites/${fav.id}`);  // ✅ British spelling
        return true;
    } catch (err) {
        console.error("removeFavoriteByImageId error:", err);
        return false;
    }
}