# Project Context & Changelog

This document tracks the current state of the project, recent significant changes, and known issues. It acts as a rolling log for developers to understand what is currently being worked on.

## Current State
- **Status**: Active / Production-Ready.
- The core portfolio (Hero, About, Projects, Hackathons, Skills, Contact) is fully implemented and styled.
- The bespoke Admin Dashboard (CMS) is fully functional and hooked up to Firebase Firestore and Auth.
- The site is hosted on Firebase Hosting.

## Recent Significant Changes
*(Most recent first)*

- **Added `coverUrl` to Achievements**: Updated the `AdminAchievements` CMS form to accept a cover photo URL. Updated `Hackathons.jsx` to render this image prominently below the event description.
- **CMS Migration for Books & Music**:
  - The "On My Shelf" books list was migrated from a hardcoded array in `BooksPage.jsx` and `Library.jsx` to the Firestore `books` collection. Built the new `AdminBooks.jsx` interface.
  - The "Listening Archive" music fallbacks were migrated from `SpotifyHelper.js` to the Firestore `library` collection. Built the new `AdminLibrary.jsx` interface.
- **Under Construction Toggle**: Added a global setting in `AdminAbout.jsx` (and `siteConfig` document) to dynamically toggle the "Portfolio Under Construction" banner on the `Hero.jsx` component.
- **Admin Theme Overhaul**: Redesigned the `/admin` dashboard CSS. Stripped away the old dark-mode aesthetic to match the main portfolio's minimalist, brutalist, light-mode design system.

## Known Issues & TODOs
- **Spotify Token Expiry**: The Spotify token stored in `localStorage` expires after 1 hour. Currently, there is no silent refresh mechanism implemented on the client; the user must manually re-authenticate via the `MusicPage` UI if the token dies.
- **Image Hosting**: All images (Project images, Book covers, Achievement covers) currently rely on external hotlinking (via URLs). There is no Firebase Storage integration for direct image uploads via the Admin Dashboard. Implementing an image upload flow (drag-and-drop to Firebase Storage) is a potential future enhancement.
- **Build Chunk Size**: The Vite build process warns about chunk sizes exceeding 500kB (largely due to `three.js` and `framer-motion`). Code-splitting or lazy loading the `Ballpit.jsx` WebGL canvas could improve initial load times.
