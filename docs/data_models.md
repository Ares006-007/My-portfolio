# Data Models

The application uses Firebase Firestore, a NoSQL document database. Data is organized into collections of documents.

## Schema Overview

### 1. `siteConfig` (Collection)
Contains a single document with ID `main` that controls global settings and singleton text.

```typescript
{
  isUnderConstruction: boolean;
  about: {
    headline1: string;
    headline2: string;
    bio: string;
    extendedBio: string;
    stats: Array<{ number: string, label: string }>;
  };
  contact: {
    email: string;
    socialLinks: Array<{ label: string, href: string }>;
  };
}
```

### 2. `projects` (Collection)
Individual portfolio projects displayed in a grid.

```typescript
{
  title: string;
  category: string;
  year: string;
  description: string;
  imageUrl: string;
  link?: string; // Optional external link
  tags: string[]; // e.g. ["React", "Firebase"]
  order: number; // For manual sorting
}
```

### 3. `achievements` (Collection)
Hackathons, events, and speaking engagements displayed in a timeline.

```typescript
{
  name: string;
  role: string; // e.g., "Organized", "Competed"
  date: string;
  description: string;
  coverUrl?: string; // Optional image rendered below the description
  order: number;
}
```

### 4. `skills` (Collection)
Categories of technical skills.

```typescript
{
  title: string; // e.g., "Languages", "Frameworks"
  skills: string[]; // e.g., ["Python", "JavaScript"]
  order: number;
}
```

### 5. `books` (Collection)
The reading library ("On My Shelf").

```typescript
{
  title: string;
  author: string;
  isbn: string; // Used strictly to dynamically fetch OpenLibrary covers
  order: number;
}
```

### 6. `library` (Collection)
The music listening archive (serves as the CMS fallback if Spotify API is disconnected). Each document represents a "Shelf" (Category).

```typescript
{
  name: string; // Shelf name (e.g., "Ambient & Focus")
  order: number;
  items: Array<{
    id: string; // Unique ID (often spoofed or grabbed from Spotify URL)
    type: string; // Usually "album"
    title: string;
    artist: string;
    spotifyUrl: string;
    coverUrl: string;
  }>;
}
```

## Relationships
Because this is a simple portfolio site utilizing NoSQL, there are no complex relational joins. All data is flattened and fetched directly per page requirement. The `order` field on every document is heavily relied upon to maintain consistent sorting across the public UI, as Firestore queries default to alphanumeric ID sorting otherwise.
