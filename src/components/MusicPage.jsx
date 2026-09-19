import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import {
  CURATED_PLAYLISTS,
  fallbackCategories,
  fallbackFeatured,
  normalizePlaylistTrack,
  deduplicateTracks,
  buildEmbedUrl,
} from './SpotifyHelper';
import { loginToSpotify, getSpotifyToken, logoutFromSpotify } from '../utils/spotifyAuth';
import { getPlaylist, getPlaylistTracks } from '../utils/spotifyApi';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/callback`;

export default function MusicPage() {
  // Player state
  const [activeEmbedUrl, setActiveEmbedUrl] = useState(null);
  const [activeSpotifyUrl, setActiveSpotifyUrl] = useState(null);
  const [activeTitle, setActiveTitle] = useState('');
  const [activeArtist, setActiveArtist] = useState('');
  const [embedError, setEmbedError] = useState(false);

  // Auth & data state
  const [isConnected, setIsConnected] = useState(!!getSpotifyToken());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Playlist-based categories: [{ name, items: [...tracks] }]
  const [playlistCategories, setPlaylistCategories] = useState([]);
  const [playlistFeatured, setPlaylistFeatured] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isConnected) {
      loadPlaylistData();
    }
  }, [isConnected]);

  // ────────────────────────────────────────
  // Fetch tracks from each curated playlist
  // ────────────────────────────────────────
  const loadPlaylistData = async () => {
    if (!CLIENT_ID) {
      setError('Spotify Client ID missing.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch metadata + tracks for every curated playlist in parallel
      const results = await Promise.all(
        CURATED_PLAYLISTS.map(async (pl) => {
          const [meta, tracksRes] = await Promise.all([
            getPlaylist(CLIENT_ID, pl.id),
            getPlaylistTracks(CLIENT_ID, pl.id, 20),
          ]);

          // Normalize & clean tracks
          const tracks = tracksRes.items
            .map(normalizePlaylistTrack)
            .filter(Boolean); // remove nulls (local files, etc.)

          const uniqueTracks = deduplicateTracks(tracks);

          return {
            name: pl.label || meta.name || 'Untitled Playlist',
            items: uniqueTracks,
          };
        })
      );

      // Filter out any playlists that returned 0 valid tracks
      const validCategories = results.filter(cat => cat.items.length > 0);
      setPlaylistCategories(validCategories);

      // Use the first track of the first playlist as the featured item
      if (validCategories.length > 0 && validCategories[0].items.length > 0) {
        setPlaylistFeatured(validCategories[0].items[0]);
      }
    } catch (err) {
      console.error('Failed to load playlist data:', err);
      setError('Failed to load your playlists. Showing curated library instead.');
      handleDisconnect();
    } finally {
      setIsLoading(false);
    }
  };

  // ────────────────────────
  // Auth handlers
  // ────────────────────────
  const handleConnect = () => {
    if (!CLIENT_ID) {
      alert('Please set VITE_SPOTIFY_CLIENT_ID in your .env.local file first.');
      return;
    }
    // Clear old tokens so the user re-authenticates with new scopes
    logoutFromSpotify();
    loginToSpotify(CLIENT_ID, REDIRECT_URI);
  };

  const handleDisconnect = () => {
    logoutFromSpotify();
    setIsConnected(false);
    setPlaylistCategories([]);
    setPlaylistFeatured(null);
  };

  // ────────────────────────
  // Player handlers
  // ────────────────────────
  const playTrack = useCallback((item) => {
    setEmbedError(false);
    const embed = buildEmbedUrl(item);
    const fallbackUrl = item.spotifyUrl;

    if (embed) {
      setActiveEmbedUrl(embed);
      setActiveSpotifyUrl(fallbackUrl);
      setActiveTitle(item.title);
      setActiveArtist(item.artist);
    } else if (fallbackUrl) {
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleEmbedError = useCallback(() => setEmbedError(true), []);
  const closePlayer = useCallback(() => {
    setActiveEmbedUrl(null);
    setActiveSpotifyUrl(null);
    setEmbedError(false);
  }, []);

  // ────────────────────────
  // Determine display data
  // ────────────────────────
  const isShowingRealData = isConnected && !isLoading && !error && playlistCategories.length > 0;
  const displayCategories = isShowingRealData ? playlistCategories : fallbackCategories;
  const displayFeatured = isShowingRealData ? (playlistFeatured || fallbackFeatured) : fallbackFeatured;
  const totalRecords = displayCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  // ════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════
  return (
    <div className="books-page" style={{ minHeight: '100vh', backgroundColor: '#FAF8F5' }}>
      {/* ─── Navigation ─── */}
      <nav className="books-nav" style={{ backgroundColor: '#FAF8F5' }}>
        <div
          className="section-container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}
        >
          <Link to="/" className="caption-md" style={{ color: 'var(--color-ink)', textDecoration: 'none' }} data-cursor="link">
            ← Back to portfolio
          </Link>
          <Link to="/" className="body-strong" style={{ letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-ink)', textDecoration: 'none' }} data-cursor="link">
            SMA
          </Link>
        </div>
      </nav>

      {/* ─── Hero Header ─── */}
      <header className="books-hero">
        <div className="section-container">
          <RevealOnScroll>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                <p className="label">Listening Library</p>
                <span className="caption-sm" style={{ color: 'var(--color-stone)' }}>
                  {totalRecords} tracks
                </span>
              </div>

              {/* Spotify Auth Controls */}
              <div>
                {!isConnected ? (
                  <button onClick={handleConnect} className="btn-outline" style={{ padding: '8px 16px', fontSize: '12px', height: 'auto' }}>
                    Connect Spotify
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="caption-sm" style={{ color: '#1DB954', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1DB954', display: 'inline-block' }} />
                      Connected
                    </span>
                    <button onClick={handleDisconnect} className="caption-sm" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-mute)', textDecoration: 'underline' }}>
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.05}>
            <h1 className="display-campaign" style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: 'var(--color-ink)' }}>
              Listening Archive
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p className="body-md" style={{ color: 'var(--color-mute)', maxWidth: '52ch', marginTop: 'var(--space-xl)' }}>
              {isShowingRealData
                ? 'Songs from your hand-picked Spotify playlists — the tracks that define your rhythm, focus, and creative energy.'
                : 'An editorial archive of records that provide focus, rhythm, and atmosphere. Connect your Spotify to see tracks from your curated playlists.'}
            </p>
          </RevealOnScroll>

          {error && (
            <RevealOnScroll delay={0.15}>
              <p className="caption-sm" style={{ color: '#d32f2f', marginTop: 'var(--space-sm)' }}>{error}</p>
            </RevealOnScroll>
          )}
        </div>
      </header>

      {/* ─── Body ─── */}
      {isLoading ? (
        <div className="section-container" style={{ padding: 'var(--space-section) 0', textAlign: 'center' }}>
          <p className="body-md" style={{ color: 'var(--color-mute)' }}>Syncing your playlists…</p>
        </div>
      ) : (
        <>
          {/* Featured Section */}
          <section className="books-featured-section">
            <div className="section-container">
              <RevealOnScroll>
                <div className="books-featured-card" style={{ backgroundColor: '#F0EBE4' }}>
                  <p className="label" style={{ marginBottom: 'var(--space-xl)' }}>Now Spinning</p>
                  <div className="music-featured-grid">
                    <div
                      className="library-record music-featured-cover"
                      onClick={() => playTrack(displayFeatured)}
                      data-cursor="action"
                      title="Play on Spotify"
                      style={{ margin: '0 auto', width: '200px', height: '200px' }}
                    >
                      <div className="record-sleeve">
                        <img src={displayFeatured.coverUrl} alt={displayFeatured.title} />
                      </div>
                      <div className="record-vinyl">
                        <div className="record-label" style={{ backgroundImage: `url(${displayFeatured.coverUrl})` }} />
                      </div>
                    </div>
                    <div className="books-featured-info">
                      <h2 className="heading-lg" style={{ marginBottom: 'var(--space-sm)' }}>{displayFeatured.title}</h2>
                      <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: 'var(--space-xl)' }}>
                        {displayFeatured.artist}
                      </p>
                      <div className="music-featured-note">
                        <p className="body-md" style={{ color: 'var(--color-charcoal)', lineHeight: '1.7', marginBottom: 'var(--space-lg)' }}>
                          {displayFeatured.note || (displayFeatured.album ? `From ${displayFeatured.album}` : 'A current favorite from your curated playlists.')}
                        </p>
                        <button className="btn-primary" onClick={() => playTrack(displayFeatured)} style={{ height: '40px', padding: '0 24px', fontSize: '14px' }} data-cursor="link">
                          Listen Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* Quote */}
          <section className="books-note-section">
            <div className="section-container">
              <RevealOnScroll>
                <blockquote className="books-reading-note" style={{ backgroundColor: '#F0EBE4' }}>
                  <p>"Music isn't noise. It's the architecture of focus. The right rhythm aligns the brain, blocks out distractions, and turns engineering into art."</p>
                </blockquote>
              </RevealOnScroll>
            </div>
          </section>

          {/* ─── Playlist Shelves ─── */}
          {displayCategories.map((category, catIndex) => (
            <section key={category.name} className="music-shelf-section">
              <div className="section-container">
                <RevealOnScroll>
                  <p className="label music-shelf-label">{category.name}</p>
                </RevealOnScroll>

                <div className={catIndex === 0 ? 'books-shelf-grid' : 'library-shelf'} style={{ overflow: 'visible' }}>
                  {category.items.map((item, i) => (
                    <RevealOnScroll key={item.id} delay={i * 0.06} className="library-book-wrapper" style={{ overflow: 'visible' }}>
                      <div className="library-record books-page-book" onClick={() => playTrack(item)} data-cursor="action" title={`Play ${item.title} on Spotify`}>
                        <div className="record-sleeve">
                          <img src={item.coverUrl} alt={`${item.title} by ${item.artist}`} loading="lazy" />
                        </div>
                        <div className="record-vinyl">
                          <div className="record-label" style={{ backgroundImage: `url(${item.coverUrl})` }} />
                        </div>

                        <p className="caption-md" style={{ color: 'var(--color-ink)', marginTop: 'var(--space-md)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </p>
                        <p className="caption-sm" style={{ color: 'var(--color-mute)', marginTop: 'var(--space-xxs)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.artist}
                        </p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>

                <div className="books-shelf-edge" aria-hidden="true" style={{ marginTop: 'var(--space-lg)' }} />
              </div>
            </section>
          ))}
        </>
      )}

      {/* ─── Footer ─── */}
      <footer className="books-footer" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div className="section-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
          <Link to="/" className="caption-md" style={{ color: 'var(--color-mute)', textDecoration: 'none' }} data-cursor="link">
            ← Back to portfolio
          </Link>
          <p className="utility-xs" style={{ color: 'var(--color-mute)' }}>© {new Date().getFullYear()} Shaik Mohammad Ajhaj</p>
        </div>
      </footer>

      {/* ─── Player Drawer ─── */}
      <AnimatePresence>
        {activeEmbedUrl && (
          <motion.div
            className="player-drawer-container"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="player-drawer">
              <div className="section-container">
                <div className="player-drawer-header">
                  <div>
                    <span className="caption-sm" style={{ color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Now Playing</span>
                    <h4 className="body-strong" style={{ fontSize: '14px', margin: 0 }}>
                      {activeTitle} — <span style={{ fontWeight: 400, color: 'var(--color-mute)' }}>{activeArtist}</span>
                    </h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {activeSpotifyUrl && (
                      <a href={activeSpotifyUrl} target="_blank" rel="noopener noreferrer" className="caption-sm" style={{ color: '#1DB954', textDecoration: 'none' }} data-cursor="link">
                        Open in Spotify ↗
                      </a>
                    )}
                    <button className="player-drawer-close" onClick={closePlayer}>✕</button>
                  </div>
                </div>

                {embedError ? (
                  <div style={{ padding: '16px 20px', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '8px', textAlign: 'center' }}>
                    <p className="caption-sm" style={{ color: 'var(--color-mute)', marginBottom: '8px' }}>Embed unavailable for this item.</p>
                    {activeSpotifyUrl && (
                      <a href={activeSpotifyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', height: '36px', padding: '0 20px', fontSize: '13px', textDecoration: 'none', lineHeight: '36px' }}>
                        Listen on Spotify ↗
                      </a>
                    )}
                  </div>
                ) : (
                  <iframe
                    key={activeEmbedUrl}
                    src={`${activeEmbedUrl}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '12px', border: 'none' }}
                    onError={handleEmbedError}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
