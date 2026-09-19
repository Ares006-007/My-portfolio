# Personal Portfolio & Built-in CMS

A dynamic, brutalist-inspired personal portfolio website built for developers. This project goes beyond a static site by integrating a **custom Content Management System (CMS)** directly into the frontend, allowing for instant, seamless content updates without ever leaving the browser.

## Overview

- **The Problem:** Static portfolios quickly fall out of date because editing source code to add a new project or update a bio is tedious.
- **The Solution:** A fast, heavily animated React application backed by Firebase. An authenticated `/admin` dashboard allows the owner to perform full CRUD operations on their Projects, Hackathons, Skills, Books, and Music Library.

## Tech Stack

- **Frontend**: React 19, Vite, React Router DOM
- **Styling**: Vanilla CSS (CSS Variables for a strict design system) + Tailwind CSS (v4)
- **Animations**: GSAP (GreenSock) & Framer Motion
- **WebGL / 3D**: Three.js (Interactive hero physics simulation)
- **Backend & Database**: Firebase Firestore & Firebase Auth
- **Integrations**: Spotify Web API & OpenLibrary API

## Documentation

For a deep dive into how this project is architected and built, check the `/docs` folder:
- [Architecture & System Design](./docs/ARCHITECTURE.md)
- [Codebase Map](./docs/CODEBASE_MAP.md)
- [Product & Features](./docs/product.md)
- [Tech Stack & Local Setup](./docs/tech.md)
- [Data Models](./docs/data_models.md)
- [Workflows](./docs/workflows.md)

## Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root with your Firebase and Spotify credentials (see [tech.md](./docs/tech.md) for details).

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Deploy:**
   Built and optimized for Firebase Hosting.
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

---
*Designed with a focus on minimalism, precise typography, and rich micro-interactions.*
