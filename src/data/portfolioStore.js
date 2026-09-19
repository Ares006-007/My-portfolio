import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

// ── Default data (seeded on first load) ──────────────────────

const DEFAULT_PROJECTS = [];

const DEFAULT_ACHIEVEMENTS = [
  {
    name: 'Meta OpenEnv Hackathon',
    role: 'Competed',
    date: '2026',
    description: 'Top 800 out of 30,000. Qualified for the in-person round.',
    order: 0,
  },
  {
    name: 'Code Day 2026 v1',
    role: 'Organized',
    date: '2026',
    description: 'Organized the first edition of Code Day from the ground up.',
    order: 1,
  },
  {
    name: 'Daydream Bengaluru',
    role: 'Organized',
    date: '',
    description: 'Organized and produced Daydream Bengaluru.',
    order: 2,
  },
  {
    name: 'Campfire Bengaluru',
    role: 'Organized',
    date: '',
    description: 'Organized and produced Campfire Bengaluru.',
    order: 3,
  },
  {
    name: 'Comic Con India',
    role: 'Volunteered',
    date: '',
    description: 'Managed panelists, requirements, and stage setup on the Panel Stage team.',
    order: 4,
  },
  {
    name: 'BookMyShow — Def Leppard Bengaluru',
    role: 'Production',
    date: '',
    description: 'Managed concert stalls for the Def Leppard Bengaluru show.',
    order: 5,
  },
  {
    name: 'BookMyShow — OG Tour Thaman Bengaluru',
    role: 'Production',
    date: '',
    description: 'Ran box office operations for the Thaman Bengaluru concert.',
    order: 6,
  },
];

const DEFAULT_SKILLS = [
  { title: 'Languages', skills: ['Python', 'JavaScript', 'C/C++'], order: 0 },
  { title: 'Frameworks', skills: ['PyTorch', 'FastAPI', 'React', 'TensorFlow'], order: 1 },
  { title: 'Tools', skills: ['Arduino', 'KiCAD', 'Git', 'Docker', 'Linux'], order: 2 },
];

const DEFAULT_BOOKS = [
  { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', order: 0 },
  { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', order: 1 },
  { title: 'The Design of Everyday Things', author: 'Don Norman', isbn: '9780465050659', order: 2 },
  { title: 'Zero to One', author: 'Peter Thiel', isbn: '9780804139298', order: 3 },
  { title: "Surely You're Joking, Mr. Feynman!", author: 'Richard Feynman', isbn: '9780393355628', order: 4 },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '9780374533557', order: 5 },
  { title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt', isbn: '9780135957059', order: 6 },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', order: 7 },
];

const DEFAULT_LIBRARY = [
  {
    name: 'Late Night Code',
    order: 0,
    items: [
      { id: '4m2880jivSbbyEGAKfITCa', type: 'album', title: 'Random Access Memories', artist: 'Daft Punk', spotifyUrl: 'https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg' },
      { id: '7aNclGRxTysfh6z0d8671k', type: 'album', title: 'Selected Ambient Works 85-92', artist: 'Aphex Twin', spotifyUrl: 'https://open.spotify.com/album/7aNclGRxTysfh6z0d8671k', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Selected_Ambient_Works_85-92.png' },
      { id: '49MNmJhZQewjt06rpwp6QR', type: 'album', title: 'Mezzanine', artist: 'Massive Attack', spotifyUrl: 'https://open.spotify.com/album/49MNmJhZQewjt06rpwp6QR', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Massive_Attack_-_Mezzanine.png' },
      { id: '42hCHiMtfs7mfBTVX3V6k7', type: 'album', title: 'Computer World', artist: 'Kraftwerk', spotifyUrl: 'https://open.spotify.com/album/42hCHiMtfs7mfBTVX3V6k7', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Kraftwerk_-_Computer_World.png' },
    ],
  },
  {
    name: 'Ambient & Focus',
    order: 1,
    items: [
      { id: '4CBUbnGFz2iKFJjYqRIwst', type: 'album', title: 'Dive', artist: 'Tycho', spotifyUrl: 'https://open.spotify.com/album/4CBUbnGFz2iKFJjYqRIwst', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Tycho_-_Dive.png' },
      { id: '063f8Ej8rLVTz9KkjQKEMa', type: 'album', title: 'Ambient 1: Music for Airports', artist: 'Brian Eno', spotifyUrl: 'https://open.spotify.com/album/063f8Ej8rLVTz9KkjQKEMa', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/9/91/Eno_ambient1_music_for_airports.jpg' },
      { id: '0DFbQjp468sMiIMTrZdr5w', type: 'album', title: 'Spaces', artist: 'Nils Frahm', spotifyUrl: 'https://open.spotify.com/album/0DFbQjp468sMiIMTrZdr5w', coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80' },
      { id: '6LZiNXaDvhzvnXUubVOmNU', type: 'album', title: 'Music Has the Right to Children', artist: 'Boards of Canada', spotifyUrl: 'https://open.spotify.com/album/6LZiNXaDvhzvnXUubVOmNU', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a2/BoardsofCanadaMusicHasTheRightToChildren.jpg' },
    ],
  },
  {
    name: 'High Energy & Rhythm',
    order: 2,
    items: [
      { id: '4GGazqHvuKwxBjWLFaJkDL', type: 'album', title: '† (Cross)', artist: 'Justice', spotifyUrl: 'https://open.spotify.com/album/4GGazqHvuKwxBjWLFaJkDL', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Justice_cross.jpg' },
      { id: '2t3u8VvQ2iG678P2Q0T74p', type: 'album', title: 'Settle', artist: 'Disclosure', spotifyUrl: 'https://open.spotify.com/album/2t3u8VvQ2iG678P2Q0T74p', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/Disclosure_-_Settle.png' },
      { id: '3IexJ42i686v59cQ47e4Wd', type: 'album', title: 'Dig Your Own Hole', artist: 'The Chemical Brothers', spotifyUrl: 'https://open.spotify.com/album/3IexJ42i686v59cQ47e4Wd', coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ab/Digyourownhole.jpg' },
    ],
  },
];

const DEFAULT_SITE_CONFIG = {
  isUnderConstruction: true,
  about: {
    headline1: 'I Build Things',
    headline2: 'That Matter',
    bio: 'I organize mass-scale tech events, compete in international hackathons, and mentor teenagers in astrophysics — then come home and write code.',
    extendedBio:
      'My work spans event production for audiences of thousands, stage management at Comic Con and BookMyShow concerts, a top-800 finish at Meta\'s OpenEnv Hackathon, and a youth STEM mentorship program where I taught rocket science, black holes, and the Big Bang theory.',
    stats: [
      { number: '18', label: 'Years old' },
      { number: '6+', label: 'Events produced' },
      { number: 'Top 800', label: 'Out of 30,000 at Meta OpenEnv' },
    ],
  },
  contact: {
    email: 'hello@example.com',
    socialLinks: [
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'X / Twitter', href: 'https://x.com' },
    ],
  },
};

// ── Collection helpers ───────────────────────────────────────

/**
 * Get all documents from a collection, ordered by `order` field.
 */
export async function getCollection(collectionName) {
  const q = query(collection(db, collectionName), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Add a document to a collection.
 */
export async function addDocument(collectionName, data) {
  const ref = await addDoc(collection(db, collectionName), data);
  return { id: ref.id, ...data };
}

/**
 * Update a document in a collection.
 */
export async function updateDocument(collectionName, docId, data) {
  const ref = doc(db, collectionName, docId);
  await updateDoc(ref, data);
  return { id: docId, ...data };
}

/**
 * Delete a document from a collection.
 */
export async function deleteDocument(collectionName, docId) {
  const ref = doc(db, collectionName, docId);
  await deleteDoc(ref);
}

// ── Site config (single document) ────────────────────────────

const SITE_CONFIG_DOC = 'main';

export async function getSiteConfig() {
  const ref = doc(db, 'siteConfig', SITE_CONFIG_DOC);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  }
  // Seed defaults on first access
  await setDoc(ref, DEFAULT_SITE_CONFIG);
  return DEFAULT_SITE_CONFIG;
}

export async function updateSiteConfig(data) {
  const ref = doc(db, 'siteConfig', SITE_CONFIG_DOC);
  await setDoc(ref, data, { merge: true });
}

// ── Seed helpers ─────────────────────────────────────────────

/**
 * Seeds default data into Firestore if collections are empty.
 * Call once from admin dashboard on first load.
 */
export async function seedDefaults() {
  // Seed achievements
  const achievements = await getDocs(collection(db, 'achievements'));
  if (achievements.empty) {
    for (const item of DEFAULT_ACHIEVEMENTS) {
      await addDoc(collection(db, 'achievements'), item);
    }
  }

  // Seed skills
  const skills = await getDocs(collection(db, 'skills'));
  if (skills.empty) {
    for (const item of DEFAULT_SKILLS) {
      await addDoc(collection(db, 'skills'), item);
    }
  }

  // Seed books
  const books = await getDocs(collection(db, 'books'));
  if (books.empty) {
    for (const item of DEFAULT_BOOKS) {
      await addDoc(collection(db, 'books'), item);
    }
  }

  // Seed library
  const library = await getDocs(collection(db, 'library'));
  if (library.empty) {
    for (const item of DEFAULT_LIBRARY) {
      await addDoc(collection(db, 'library'), item);
    }
  }

  // Seed site config
  const configRef = doc(db, 'siteConfig', SITE_CONFIG_DOC);
  const configSnap = await getDoc(configRef);
  if (!configSnap.exists()) {
    await setDoc(configRef, DEFAULT_SITE_CONFIG);
  }
}
