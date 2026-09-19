// Spotify Helper — Source of truth for the Listening Archive
// ═══════════════════════════════════════════════════════════
// The CURATED_PLAYLISTS array defines EXACTLY which playlists appear in the archive.
// Only tracks from these playlists are shown when connected to Spotify.

/**
 * Your hand-picked playlists. Each entry becomes a shelf section in the archive.
 * To add/remove a playlist, just edit this array.
 *
 * Format: { id: 'spotifyPlaylistId', label: 'Optional custom shelf name' }
 * If `label` is omitted, the playlist's real Spotify name is used.
 */
export const CURATED_PLAYLISTS = [
  { id: '1tbidmY7uir4qvgqeFAzDu' },
  { id: '463c2b6LwVFHVVlyyWo7Ut' },
  { id: '37i9dQZF1EpjQYGsIGBOt2' },
];

// ═══════════════════════════════════════════════════════════
// STATIC FALLBACK — shown when the user is NOT connected to Spotify.
// These are manually curated records with verified Spotify album IDs.
// ═══════════════════════════════════════════════════════════

export const fallbackCategories = [
  {
    name: 'Late Night Code',
    items: [
      {
        id: '4m2880jivSbbyEGAKfITCa',
        type: 'album',
        title: 'Random Access Memories',
        artist: 'Daft Punk',
        spotifyUrl: 'https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg',
      },
      {
        id: '7aNclGRxTysfh6z0d8671k',
        type: 'album',
        title: 'Selected Ambient Works 85-92',
        artist: 'Aphex Twin',
        spotifyUrl: 'https://open.spotify.com/album/7aNclGRxTysfh6z0d8671k',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Selected_Ambient_Works_85-92.png',
      },
      {
        id: '49MNmJhZQewjt06rpwp6QR',
        type: 'album',
        title: 'Mezzanine',
        artist: 'Massive Attack',
        spotifyUrl: 'https://open.spotify.com/album/49MNmJhZQewjt06rpwp6QR',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Massive_Attack_-_Mezzanine.png',
      },
      {
        id: '42hCHiMtfs7mfBTVX3V6k7',
        type: 'album',
        title: 'Computer World',
        artist: 'Kraftwerk',
        spotifyUrl: 'https://open.spotify.com/album/42hCHiMtfs7mfBTVX3V6k7',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Kraftwerk_-_Computer_World.png',
      },
    ],
  },
  {
    name: 'Ambient & Focus',
    items: [
      {
        id: '4CBUbnGFz2iKFJjYqRIwst',
        type: 'album',
        title: 'Dive',
        artist: 'Tycho',
        spotifyUrl: 'https://open.spotify.com/album/4CBUbnGFz2iKFJjYqRIwst',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Tycho_-_Dive.png',
      },
      {
        id: '063f8Ej8rLVTz9KkjQKEMa',
        type: 'album',
        title: 'Ambient 1: Music for Airports',
        artist: 'Brian Eno',
        spotifyUrl: 'https://open.spotify.com/album/063f8Ej8rLVTz9KkjQKEMa',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/9/91/Eno_ambient1_music_for_airports.jpg',
      },
      {
        id: '0DFbQjp468sMiIMTrZdr5w',
        type: 'album',
        title: 'Spaces',
        artist: 'Nils Frahm',
        spotifyUrl: 'https://open.spotify.com/album/0DFbQjp468sMiIMTrZdr5w',
        coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80',
      },
      {
        id: '6LZiNXaDvhzvnXUubVOmNU',
        type: 'album',
        title: 'Music Has the Right to Children',
        artist: 'Boards of Canada',
        spotifyUrl: 'https://open.spotify.com/album/6LZiNXaDvhzvnXUubVOmNU',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a2/BoardsofCanadaMusicHasTheRightToChildren.jpg',
      },
    ],
  },
  {
    name: 'High Energy & Rhythm',
    items: [
      {
        id: '4GGazqHvuKwxBjWLFaJkDL',
        type: 'album',
        title: '† (Cross)',
        artist: 'Justice',
        spotifyUrl: 'https://open.spotify.com/album/4GGazqHvuKwxBjWLFaJkDL',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Justice_cross.jpg',
      },
      {
        id: '2t3u8VvQ2iG678P2Q0T74p',
        type: 'album',
        title: 'Settle',
        artist: 'Disclosure',
        spotifyUrl: 'https://open.spotify.com/album/2t3u8VvQ2iG678P2Q0T74p',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/Disclosure_-_Settle.png',
      },
      {
        id: '3IexJ42i686v59cQ47e4Wd',
        type: 'album',
        title: 'Dig Your Own Hole',
        artist: 'The Chemical Brothers',
        spotifyUrl: 'https://open.spotify.com/album/3IexJ42i686v59cQ47e4Wd',
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ab/Digyourownhole.jpg',
      },
    ],
  },
];

export const fallbackFeatured = {
  id: '79dL7FLiJFOO0EoehUHQBv',
  type: 'album',
  title: 'Currents',
  artist: 'Tame Impala',
  spotifyUrl: 'https://open.spotify.com/album/79dL7FLiJFOO0EoehUHQBv',
  coverUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png',
  note: 'A benchmark in modern psychedelic pop and sound engineering. The lush synthesis, sweeping filters, and impeccable rhythm sections in Currents serve as the ultimate sonic backdrop for long, focused programming sessions.',
};

/**
 * Normalizes a Spotify playlist track item into the standard record schema.
 * Filters out null tracks (local files, unavailable, etc.)
 */
export function normalizePlaylistTrack(item) {
  const track = item.track;
  if (!track || !track.id) return null; // Skip local files or unavailable tracks

  return {
    id: track.id,
    type: 'track',
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album?.name || '',
    coverUrl: track.album?.images?.[0]?.url || '',
    spotifyUrl: track.external_urls?.spotify || `https://open.spotify.com/track/${track.id}`,
  };
}

/**
 * Deduplicates tracks by ID, keeping the first occurrence.
 */
export function deduplicateTracks(tracks) {
  const seen = new Set();
  return tracks.filter(t => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });
}

/**
 * Builds a verified Spotify embed URL from an item's type and Spotify URL.
 */
export function buildEmbedUrl(item) {
  if (item.spotifyUrl) {
    const match = item.spotifyUrl.match(/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
    if (match) {
      const [, contentType, contentId] = match;
      return `https://open.spotify.com/embed/${contentType}/${contentId}`;
    }
  }
  if (item.type && item.id) {
    return `https://open.spotify.com/embed/${item.type}/${item.id}`;
  }
  return null;
}
