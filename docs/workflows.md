# Key Workflows

## 1. CMS Update Flow (Admin)

The process by which the site owner updates portfolio content.

1. **Authentication**:
   - User navigates to `/admin`.
   - The `ProtectedRoute` component checks if a Firebase Auth user is present.
   - If not authenticated, the user is redirected to `/admin/login`.
   - User clicks "Sign in with Google". `useAuth` triggers Firebase OAuth.
2. **Dashboard Initialization**:
   - On successful login, the `AdminDashboard` mounts.
   - A `useEffect` hook fires `seedDefaults()`. If the database is completely empty (first time setup), this populates Firestore with boilerplate data.
3. **Data Modification**:
   - User selects a tab (e.g., "Books").
   - `AdminBooks.jsx` queries the `books` collection and displays the list.
   - User clicks "Add Book", fills out the modal form, and clicks Save.
   - `addDocument` (in `portfolioStore.js`) pushes the new record to Firestore.
   - The component re-fetches the list, instantly updating the UI.
4. **Public Site Reflection**:
   - Any visitor viewing the public `/books` route will immediately see the new book on their next page load (or refresh), as `BooksPage.jsx` fetches directly from the same Firestore collection.

## 2. Spotify Integration Flow (Public)

The process of fetching and rendering music data on the `/music` page.

1. **Initial Load**:
   - The user navigates to `/music`.
   - `MusicPage` mounts and immediately queries Firestore for the `library` collection (the CMS fallback).
   - Simultaneously, it checks for a Spotify OAuth token in `localStorage`.
2. **Authenticated State (Real Data)**:
   - If a token exists, `loadPlaylistData()` is triggered.
   - It makes HTTP requests to the Spotify Web API (via `spotifyApi.js`) to fetch the user's specific curated playlists.
   - The UI renders the live tracks, prioritizing them over the Firestore CMS data.
3. **Fallback State**:
   - If no token exists (e.g., standard public visitor) or the API request fails (expired token, network error), the UI gracefully falls back to displaying the `cmsLibrary` data fetched in Step 1.
4. **Playback**:
   - When a user clicks a track, the `buildEmbedUrl` helper constructs an iframe URL.
   - An embedded Spotify player modal pops up, allowing the user to listen to previews directly on the site.
