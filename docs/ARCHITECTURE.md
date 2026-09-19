# Architecture

This document describes the high-level system design of the portfolio application.

## High-Level System Design

The application is built using a modern decoupled architecture:
1.  **Frontend (Presentation Layer)**: A Single Page Application (SPA) built with React and Vite. It handles routing, UI rendering, complex animations (GSAP/Framer Motion), and state management.
2.  **Backend / Database Layer**: Google Firebase provides a serverless backend.
    *   **Firestore (NoSQL Database)**: Stores all dynamic content (Projects, Achievements, Skills, Books, Music Library, Site Config).
    *   **Firebase Authentication**: Manages secure login for the Admin Dashboard (Google OAuth).
    *   **Firebase Hosting**: Serves the production build.
3.  **Third-Party Services**:
    *   **Spotify Web API**: Used by the `/music` page to fetch live playlists, featured tracks, and handle Spotify OAuth flows for authenticated users.

## Component Flow & Relationships

```mermaid
flowchart TD
    Client[Web Browser (User)] --> |HTTP Requests| Host(Firebase Hosting)
    Client --> |OAuth / API calls| Spotify[Spotify Web API]
    
    subgraph Frontend [React SPA (Vite)]
        Router(React Router)
        PublicUI[Public Components\nHero, Projects, Library]
        AdminUI[Admin Dashboard]
        Store(Portfolio Store)
    end
    
    Host -.-> Frontend
    Client --> Router
    Router --> PublicUI
    Router --> AdminUI
    
    PublicUI --> Store
    AdminUI --> Store
    
    subgraph Backend [Firebase Services]
        Auth(Firebase Auth)
        DB[(Firestore NoSQL)]
    end
    
    AdminUI --> Auth
    Store --> DB
```

## Key Design Decisions

1.  **Firebase as CMS**: Instead of a traditional headless CMS (like Sanity or Strapi), Firestore is used directly. This minimizes the stack complexity, integrates seamlessly with Firebase Hosting/Auth, and allows a completely custom Admin Dashboard to be built directly into the React app.
2.  **Bespoke Admin Dashboard**: The admin interface (`/admin`) is part of the main application bundle but gated behind Firebase Auth. This allows the user to update the site's content instantly without needing to redeploy or use a 3rd-party dashboard.
3.  **Spotify Integration vs. Static Fallbacks**: The Music page uses the live Spotify API if authenticated. To ensure the site never appears broken, a robust fallback system (now migrated to Firestore) provides static album recommendations when the Spotify API is unavailable or unauthorized.
4.  **Centralized CSS**: Styling relies heavily on standard CSS (`src/index.css`) utilizing CSS variables to build a cohesive design system, favoring this approach over widespread Tailwind utility classes to enforce strict brutalist/minimalist typography and spacing rules.
