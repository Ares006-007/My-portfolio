// Spotify Helper Utility for Music Library
// Handles fetching dynamic details via Spotify's public OEmbed API with offline/fallback database.

export const musicCategories = [
  {
    name: 'Late Night Code',
    items: [
      {
        id: 'daft-punk-ram',
        title: 'Random Access Memories',
        artist: 'Daft Punk',
        spotifyUrl: 'https://open.spotify.com/album/4m2860ZgZY2x2eCMPY2j4H',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273b5f90382b6b063855e971a81',
        embedUrl: 'https://open.spotify.com/embed/album/4m2860ZgZY2x2eCMPY2j4H',
      },
      {
        id: 'aphex-twin-saw',
        title: 'Selected Ambient Works 85-92',
        artist: 'Aphex Twin',
        spotifyUrl: 'https://open.spotify.com/album/7kQzPskFvRrc3727V7zF36',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273af6cb85d8520bf214bf39e6a',
        embedUrl: 'https://open.spotify.com/embed/album/7kQzPskFvRrc3727V7zF36',
      },
      {
        id: 'massive-attack-mezz',
        title: 'Mezzanine',
        artist: 'Massive Attack',
        spotifyUrl: 'https://open.spotify.com/album/4986nfoVmqtdH422GZ1w8P',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e8e19af3a0058ec18e7e17af',
        embedUrl: 'https://open.spotify.com/embed/album/4986nfoVmqtdH422GZ1w8P',
      },
      {
        id: 'kraftwerk-cw',
        title: 'Computer World',
        artist: 'Kraftwerk',
        spotifyUrl: 'https://open.spotify.com/album/1M377gZcW2n6Zt5Lg4Cg29',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273d44dbd53c7c2518e1d5a7114',
        embedUrl: 'https://open.spotify.com/embed/album/1M377gZcW2n6Zt5Lg4Cg29',
      },
    ],
  },
  {
    name: 'Ambient & Focus',
    items: [
      {
        id: 'tycho-dive',
        title: 'Dive',
        artist: 'Tycho',
        spotifyUrl: 'https://open.spotify.com/album/432N5v5zYwpxw6e1Bw59nZ',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c55de7fb1be7a87e5b225af6',
        embedUrl: 'https://open.spotify.com/embed/album/432N5v5zYwpxw6e1Bw59nZ',
      },
      {
        id: 'brian-eno-airports',
        title: 'Ambient 1: Music for Airports',
        artist: 'Brian Eno',
        spotifyUrl: 'https://open.spotify.com/album/063f8Ej8rLVTz9Kkj4J16d',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b2737a28e8334468f7b7cb1d770c',
        embedUrl: 'https://open.spotify.com/embed/album/063f8Ej8rLVTz9Kkj4J16d',
      },
      {
        id: 'nils-frahm-spaces',
        title: 'Spaces',
        artist: 'Nils Frahm',
        spotifyUrl: 'https://open.spotify.com/album/6K5eS8Vrc4TfG5P6gYt8xW',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273cdb6189ef0cbcf8325a7fde9',
        embedUrl: 'https://open.spotify.com/embed/album/6K5eS8Vrc4TfG5P6gYt8xW',
      },
      {
        id: 'boards-of-canada-music',
        title: 'Music Has the Right to Children',
        artist: 'Boards of Canada',
        spotifyUrl: 'https://open.spotify.com/album/1snN1axdsqXn7ut4pH255H',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273f3c4fb6e36d4df6c54326505',
        embedUrl: 'https://open.spotify.com/embed/album/1snN1axdsqXn7ut4pH255H',
      },
    ],
  },
  {
    name: 'High Energy & Rhythm',
    items: [
      {
        id: 'justice-cross',
        title: '† (Cross)',
        artist: 'Justice',
        spotifyUrl: 'https://open.spotify.com/album/0t5H3kC8O4Jv3VpxT8L2L4',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273d42ee0c965c71bfa98e945c2',
        embedUrl: 'https://open.spotify.com/embed/album/0t5H3kC8O4Jv3VpxT8L2L4',
      },
      {
        id: 'disclosure-settle',
        title: 'Settle',
        artist: 'Disclosure',
        spotifyUrl: 'https://open.spotify.com/album/4X1c1e5gX5rX6z3Bv1bL6O',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273412704ebf94c483b879c3d42',
        embedUrl: 'https://open.spotify.com/embed/album/4X1c1e5gX5rX6z3Bv1bL6O',
      },
      {
        id: 'chem-bros-dig',
        title: 'Dig Your Own Hole',
        artist: 'The Chemical Brothers',
        spotifyUrl: 'https://open.spotify.com/album/4eP6S3mCgKz20N5K4bW8rG',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b2735f606e987c06fa2bf39dcff8',
        embedUrl: 'https://open.spotify.com/embed/album/4eP6S3mCgKz20N5K4bW8rG',
      },
    ],
  },
];

export const featuredTrack = {
  id: 'tame-impala-currents',
  title: 'Currents',
  artist: 'Tame Impala',
  spotifyUrl: 'https://open.spotify.com/album/79OZ09q6VdYrJ9fv07lZ46',
  coverUrl: 'https://i.scdn.co/image/ab67616d0000b2739e1c1ca1b20c6c124fc6612b',
  embedUrl: 'https://open.spotify.com/embed/album/79OZ09q6VdYrJ9fv07lZ46',
  note: 'A benchmark in modern psychedelic pop and sound engineering. The lush synthesis, sweeping filters, and impeccable rhythm sections in Currents serve as the ultimate sonic backdrop for long, focused programming sessions.',
};

// Simple oEmbed Client Cache
const oembedCache = {};

export async function fetchSpotifyOEmbed(url) {
  if (oembedCache[url]) {
    return oembedCache[url];
  }

  // Try to load from session storage cache
  try {
    const cached = sessionStorage.getItem(`spotify-oembed:${url}`);
    if (cached) {
      oembedCache[url] = JSON.parse(cached);
      return oembedCache[url];
    }
  } catch (e) {
    // Session storage not available
  }

  try {
    const response = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error('Failed to fetch Spotify OEmbed');
    const data = await response.json();
    
    // Store in cache
    oembedCache[url] = data;
    try {
      sessionStorage.setItem(`spotify-oembed:${url}`, JSON.stringify(data));
    } catch (e) {}

    return data;
  } catch (err) {
    console.warn('Spotify OEmbed fetch failed, using local fallback:', err);
    return null;
  }
}
