# Product Overview

This document describes what the project does, the core problem it solves, and its main features.

## What it does

This project is a dynamic, highly interactive personal portfolio website designed for a software engineer, event organizer, and educator. It serves as a digital resume and a showcase of past work, achievements, reading habits, and musical tastes. 

Instead of relying on a third-party Content Management System (CMS) like WordPress or Sanity, the portfolio includes its own custom-built Admin Dashboard. This allows the portfolio owner to instantly update the site's content directly from the live web application.

## Core Problem & Target Audience

**The Problem**: Developers often build beautiful static portfolios but abandon them because updating the code for every new project, job change, or book read is tedious. 
**The Solution**: A fast, visually striking portfolio with a built-in, authenticated CMS. The owner can quickly log in, fill out a form, and instantly publish updates without touching a code editor.

**The Audience**: 
1. **Recruiters and Hiring Managers**: Reviewing the owner's projects, skills, and professional timeline.
2. **Peers and Collaborators**: Exploring the owner's interests ("On My Shelf" books, "Listening Archive" music) to build personal connections.
3. **The Owner (Admin)**: The sole user of the CMS interface for managing the site's data.

## Main Features & User Flows

### Public Visitor Flow
- **Interactive Hero**: Features an interactive WebGL physics simulation (`Ballpit`) and dynamic typography.
- **Projects Showcase**: A grid of software projects and physical builds.
- **Achievements Timeline**: A list of hackathons, events organized, and speaking engagements.
- **Personal Libraries**: 
  - **Books (`/books`)**: A curated gallery of books that have influenced the owner, dynamically generating book covers via ISBNs.
  - **Music (`/music`)**: A "Listening Archive" that hooks into the live Spotify API to show currently featured playlists and albums, falling back to CMS-curated records if the API is disconnected.

### Admin Flow (CMS)
- **Authentication**: Secured via Firebase Authentication (Google Sign-In).
- **Global Settings**: Toggles for the "Under Construction" banner and edits to the bio text.
- **Data Management**: Dedicated tabs to perform CRUD (Create, Read, Update, Delete) operations on:
  - Projects
  - Hackathons & Events (with optional cover photos)
  - Skill categories
  - Books Library
  - Music Library
