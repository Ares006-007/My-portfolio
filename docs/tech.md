# Tech Stack & Environment

## Core Technologies

- **Language**: JavaScript (ES6+)
- **Frontend Framework**: React 19
- **Bundler / Build Tool**: Vite 8
- **Routing**: React Router DOM (v7)

## Styling & Animations
- **CSS**: Standard CSS (`index.css`) with heavy use of CSS variables for theming.
- **Tailwind CSS (v4)**: Used sparingly as a utility framework alongside the core custom CSS.
- **Framer Motion**: Used for declarative UI animations (e.g., page transitions, modal pop-ups, scroll reveals).
- **GSAP (GreenSock)**: Used for high-performance timeline animations and scroll-triggered events (`ScrollTrigger`).
- **Three.js**: Drives the WebGL physics simulation (`Ballpit.jsx`) on the Hero section.

## Backend & Infrastructure
- **Firebase Firestore**: A NoSQL cloud database used as the primary Content Management System.
- **Firebase Authentication**: Secures the Admin Dashboard (specifically using Google OAuth).
- **Firebase Hosting**: Hosts the compiled static frontend assets.

## Third-Party APIs
- **Spotify Web API**: Used to fetch the user's live playlists and albums for the `/music` page.
- **OpenLibrary API**: Automatically fetches book cover images using standard ISBN-13 codes.

## Development Environment Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- Firebase CLI (`npm install -g firebase-tools`)

### Local Setup
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory. You must supply your Firebase configuration and Spotify API keys.
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

### Build & Deploy
- **Production Build**: `npm run build`
- **Preview Build locally**: `npm run preview`
- **Deploy to Firebase**: 
  The project is configured for Firebase Hosting. Standard deployment is executed via `firebase deploy --only hosting`.
