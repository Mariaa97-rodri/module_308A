# 🐱 Cat Breed Browser

A single-page web application that lets you explore cat breeds, browse photos, and save your favorite cats — powered by [The Cat API](https://thecatapi.com/).

---

## 📖 About the App

Cat Breed Browser is an interactive web app where you can:

- **Browse cat breeds** via a dropdown menu that loads all available breeds from The Cat API
- **View cat photos** for any selected breed in a responsive image gallery
- **Favorite cats** by clicking the ❤️ button on any cat card — saved directly to the API
- **View your favorites** anytime by clicking the "Get Favorites" button
- **Unfavorite cats** by clicking the heart button again on a favorited image

The app uses a live progress bar to show loading state and handles all API interactions asynchronously to keep the UI responsive.

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- A package manager (npm)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project folder
cd cat-breed-browser

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open in your browser at `http://localhost:1234` (or whichever port Parcel assigns).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 / CSS3 | Structure and styling |
| JavaScript (ES Modules) | Application logic |
| [Axios](https://axios-http.com/) | HTTP requests to The Cat API |
| [Bootstrap 5](https://getbootstrap.com/) | Responsive layout and UI components |
| [The Cat API](https://thecatapi.com/) | Cat breeds, images, and favorites |
| [Parcel](https://parceljs.org/) | Development bundler (`npm start`) |

---

## 📁 Project Structure

```
├── index.html        # Main HTML page
├── styles.css        # Custom styles
├── src/
│   ├── index.js      # App entry point — initializes app, wires up events
│   ├── api.js        # All API calls (fetch breeds, images, favorites)
│   ├── ui.js         # DOM manipulation — rendering cats, progress bar, etc.
│   └── favorites.js  # In-memory favorites state management
└── README.md
```

---

## ✅ SBA Requirements Met

### Fetch / Axios — API Communication (20%)
All API interactions are handled through **Axios** in `api.js`. The app communicates with The Cat API to fetch breed lists, search cat images by breed, and manage user favorites via GET, POST, and DELETE requests.

### User Interaction via GET Requests (15%)
The **breed dropdown** allows users to select any cat breed and immediately loads a gallery of matching cat photos. Every selection triggers a `GET /images/search` call filtered by `breed_id`.

### User Data Manipulation via POST/DELETE (15%)
Users can **favorite and unfavorite cats** in real time. Clicking ❤️ sends a `POST /favourites` request to save the image to The Cat API. Clicking again sends a `DELETE /favourites/{id}` to remove it. All favorites are persisted server-side.

### Promises and async/await (15%)
Every API function in `api.js` and `favorites.js` uses `async/await` with `try/catch` error handling. No raw `.then()` chains — all asynchronous code is clean and readable.

### Three or More Module Files (3%)
The JavaScript code is organized into **four ES modules**:
- `api.js` — API layer
- `ui.js` — DOM/rendering layer
- `favorites.js` — Favorites state management
- `index.js` — App orchestration and event wiring

### No Race Conditions / Event Loop Correctness (5%)
Favorite buttons are **disabled during async operations** to prevent duplicate requests. Event listeners use delegation on a stable parent element (`#infoDump`) and are properly removed before re-adding on each render to prevent listener stacking.

### Engaging UI with HTML and CSS (5%)
The app features a **live progress bar**, a responsive cat image gallery, and Bootstrap-powered layout with custom styles for an enjoyable browsing experience.

### Program Runs Without Errors (10%)
All API calls are wrapped in `try/catch` blocks. Null checks guard against missing DOM elements. The app degrades gracefully when no breeds or favorites are available.

### Frequent Git Commits (5%)
The repository includes frequent, descriptive commits tracking development progress from initial setup through feature completion.

### README File (2%)
*You're reading it!* 🐾

### Creativity and User Experience (5%)
The app is built around a fun, lighthearted topic with emoji feedback, a smooth progress bar, and an intuitive one-page layout that makes browsing and favoriting cats enjoyable.

---

## 🔑 API Key

This project uses a personal API key from [The Cat API](https://thecatapi.com/). To run your own version:

1. Sign up at [https://thecatapi.com/](https://thecatapi.com/) for a free API key
2. Replace the `API_KEY` value at the top of `api.js` with your own key

---

## 🐾 Acknowledgements

- [The Cat API](https://thecatapi.com/) for providing free access to cat breed data and image hosting
- [Bootstrap](https://getbootstrap.com/) for responsive UI components
- [Axios](https://axios-http.com/) for clean HTTP request handling