# Components Catalog

A catalog of major React components in the application, their responsibilities, and how they interact.

## Layout & Routing

### `App.jsx`
- **Responsibility**: The root wrapper. Defines the React Router `<Routes>` and maps URLs (`/`, `/books`, `/admin`) to their corresponding page components.
- **Dependencies**: React Router, GSAP (registers `ScrollTrigger`). Mounts global utility components like `CustomCursor` and `ScrollProgress`.

### `Navbar.jsx` & `Footer.jsx`
- **Responsibility**: Global navigation and footer. `Navbar` contains smooth-scroll links to homepage sections.
- **Dependencies**: GSAP (for scroll-to-element animations).

## Core Public Pages

### `Hero.jsx`
- **Responsibility**: Renders the landing section. Displays the user's name (with `AnimatedText`) and the physics background (`Ballpit`). Conditionally renders the "Under Construction" banner.
- **Dependencies**: `getSiteConfig` (from Firestore), `framer-motion`, `three.js`.

### `Projects.jsx` & `Hackathons.jsx`
- **Responsibility**: Displays lists of work and achievements.
- **Dependencies**: Fetches from the `projects` and `achievements` collections in Firestore.

### `BooksPage.jsx` & `Library.jsx`
- **Responsibility**: Renders the "On My Shelf" library. `Library.jsx` is a homepage preview (horizontal scroll rail), while `BooksPage.jsx` is the dedicated full-page grid.
- **Dependencies**: Fetches from the `books` collection in Firestore.

### `MusicPage.jsx` & `MusicLibrary.jsx`
- **Responsibility**: Renders the "Listening Archive". Integrates with the Spotify Web API.
- **Dependencies**: `spotifyApi.js`, `spotifyAuth.js`. Falls back to the `library` collection in Firestore if Spotify is disconnected.

## Admin Components (CMS)

### `AdminDashboard.jsx`
- **Responsibility**: The main shell for the CMS. Renders the sidebar and dynamically swaps out the active management panel.
- **Dependencies**: `useAuth` hook, `seedDefaults` (initializes empty collections on first load).

### `AdminAbout.jsx`
- **Responsibility**: Form interface for editing the bio, statistics, and global toggles (like `isUnderConstruction`). Updates the singleton `siteConfig` document.

### `AdminBooks.jsx` / `AdminLibrary.jsx` / `AdminProjects.jsx` / `AdminAchievements.jsx` / `AdminSkills.jsx`
- **Responsibility**: The core CRUD panels. Each manages a specific Firestore collection.
- **Dependencies**: `portfolioStore.js` (for Firebase operations). They all follow a similar pattern: fetch list -> render grid -> open modal to add/edit -> save to Firestore.

## Utility Components

### `RevealOnScroll.jsx`
- **Responsibility**: A lightweight wrapper that uses `framer-motion` to fade in and slide up its children when they enter the viewport.

### `Ballpit.jsx`
- **Responsibility**: Mounts a Three.js WebGL canvas. Simulates physics on a set of instanced spheres. Included inside an `ErrorBoundary` so that WebGL failures gracefully fallback to a solid color.

### `CustomCursor.jsx`
- **Responsibility**: Hijacks the default browser cursor and renders a custom dot and trailing ring. Listens for `data-cursor` attributes on hoverable elements to visually expand the cursor.
