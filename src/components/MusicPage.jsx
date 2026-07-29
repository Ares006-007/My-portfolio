import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { musicCategories, featuredTrack, fetchSpotifyOEmbed } from './SpotifyHelper';

export default function MusicPage() {
  const [activeEmbedUrl, setActiveEmbedUrl] = useState(null);
  const [activeTitle, setActiveTitle] = useState('');
  const [activeArtist, setActiveArtist] = useState('');
  const [albumCovers, setAlbumCovers] = useState({});

  const totalRecords = musicCategories.reduce((acc, cat) => acc + cat.items.length, 0) + 1;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch dynamic covers for all items
    const allItems = [...musicCategories.flatMap(cat => cat.items), featuredTrack];
    allItems.forEach(async (item) => {
      const data = await fetchSpotifyOEmbed(item.spotifyUrl);
      if (data && data.thumbnail_url) {
        setAlbumCovers(prev => ({ ...prev, [item.id]: data.thumbnail_url }));
      }
    });
  }, []);

  const playTrack = (item) => {
    setActiveEmbedUrl(item.embedUrl);
    setActiveTitle(item.title);
    setActiveArtist(item.artist);
  };

  return (
    <div className="books-page" style={{ minHeight: '100vh', backgroundColor: '#FAF8F5' }}>
      {/* Minimal navigation */}
      <nav className="books-nav" style={{ backgroundColor: '#FAF8F5' }}>
        <div
          className="section-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Link
            to="/"
            className="caption-md"
            style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
            data-cursor="link"
          >
            ← Back to portfolio
          </Link>
          <Link
            to="/"
            className="body-strong"
            style={{
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              textDecoration: 'none',
            }}
            data-cursor="link"
          >
            SMA
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="books-hero">
        <div className="section-container">
          <RevealOnScroll>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-lg)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              <p className="label">Listening Library</p>
              <span className="caption-sm" style={{ color: 'var(--color-stone)' }}>
                {totalRecords} records
              </span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h1
              className="display-campaign"
              style={{
                fontSize: 'clamp(40px, 7vw, 80px)',
                color: 'var(--color-ink)',
              }}
            >
              Listening Archive
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p
              className="body-md"
              style={{
                color: 'var(--color-mute)',
                maxWidth: '52ch',
                marginTop: 'var(--space-xl)',
              }}
            >
              An editorial archive of vinyl albums and tracks that provide focus, rhythm, and atmosphere. From deep atmospheric ambient textures to French electro-house beats.
            </p>
          </RevealOnScroll>
        </div>
      </header>

      {/* Featured Section */}
      <section className="books-featured-section">
        <div className="section-container">
          <RevealOnScroll>
            <div className="books-featured-card" style={{ backgroundColor: '#F0EBE4' }}>
              <p className="label" style={{ marginBottom: 'var(--space-xl)' }}>
                Now Spinning
              </p>
              <div className="music-featured-grid">
                <div 
                  className="library-record music-featured-cover"
                  onClick={() => playTrack(featuredTrack)}
                  data-cursor="action"
                  title="Play on Spotify"
                  style={{ margin: '0 auto', width: '200px', height: '200px' }}
                >
                  <div className="record-sleeve">
                    <img
                      src={albumCovers[featuredTrack.id] || featuredTrack.coverUrl}
                      alt={featuredTrack.title}
                    />
                  </div>
                  <div className="record-vinyl">
                    <div 
                      className="record-label"
                      style={{ backgroundImage: `url(${albumCovers[featuredTrack.id] || featuredTrack.coverUrl})` }}
                    />
                  </div>
                </div>
                <div className="books-featured-info">
                  <h2 className="heading-lg" style={{ marginBottom: 'var(--space-sm)' }}>
                    {featuredTrack.title}
                  </h2>
                  <p
                    className="caption-md"
                    style={{
                      color: 'var(--color-mute)',
                      marginBottom: 'var(--space-xl)',
                    }}
                  >
                    {featuredTrack.artist}
                  </p>
                  <div className="music-featured-note">
                    <p
                      className="body-md"
                      style={{
                        color: 'var(--color-charcoal)',
                        lineHeight: '1.7',
                        marginBottom: 'var(--space-lg)'
                      }}
                    >
                      {featuredTrack.note}
                    </p>
                    <button
                      className="btn-primary"
                      onClick={() => playTrack(featuredTrack)}
                      style={{ height: '40px', padding: '0 24px', fontSize: '14px' }}
                      data-cursor="link"
                    >
                      Listen Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Quote / Reflection */}
      <section className="books-note-section">
        <div className="section-container">
          <RevealOnScroll>
            <blockquote className="books-reading-note" style={{ backgroundColor: '#F0EBE4' }}>
              <p>
                "Music isn't noise. It's the architecture of focus. The right rhythm aligns the brain, blocks out distractions, and turns engineering into art."
              </p>
            </blockquote>
          </RevealOnScroll>
        </div>
      </section>

      {/* Curated Shelves */}
      {musicCategories.map((category, catIndex) => (
        <section key={category.name} className="music-shelf-section">
          <div className="section-container">
            <RevealOnScroll>
              <p className="label music-shelf-label">{category.name}</p>
            </RevealOnScroll>

            <div className={catIndex === 0 ? 'books-shelf-grid' : 'library-shelf'} style={{ overflow: 'visible' }}>
              {category.items.map((item, i) => (
                <RevealOnScroll
                  key={item.id}
                  delay={i * 0.06}
                  className="library-book-wrapper"
                  style={{ overflow: 'visible' }}
                >
                  <div
                    className="library-record books-page-book"
                    onClick={() => playTrack(item)}
                    data-cursor="action"
                    title={`Play ${item.title} on Spotify`}
                  >
                    <div className="record-sleeve">
                      <img
                        src={albumCovers[item.id] || item.coverUrl}
                        alt={`${item.title} by ${item.artist}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="record-vinyl">
                      <div 
                        className="record-label"
                        style={{ backgroundImage: `url(${albumCovers[item.id] || item.coverUrl})` }}
                      />
                    </div>
                    
                    <p
                      className="caption-md"
                      style={{
                        color: 'var(--color-ink)',
                        marginTop: 'var(--space-md)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="caption-sm"
                      style={{
                        color: 'var(--color-mute)',
                        marginTop: 'var(--space-xxs)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.artist}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Shelf edge */}
            <div className="books-shelf-edge" aria-hidden="true" style={{ marginTop: 'var(--space-lg)' }} />
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="books-footer" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div
          className="section-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-sm)',
          }}
        >
          <Link
            to="/"
            className="caption-md"
            style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
            data-cursor="link"
          >
            ← Back to portfolio
          </Link>
          <p className="utility-xs" style={{ color: 'var(--color-mute)' }}>
            © {new Date().getFullYear()} Shaik Mohammad Ajhaj
          </p>
        </div>
      </footer>

      {/* Floating dynamic player drawer */}
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
                    <span className="caption-sm" style={{ color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Now Playing
                    </span>
                    <h4 className="body-strong" style={{ fontSize: '14px', margin: 0 }}>
                      {activeTitle} — <span style={{ fontWeight: 400, color: 'var(--color-mute)' }}>{activeArtist}</span>
                    </h4>
                  </div>
                  <button 
                    className="player-drawer-close"
                    onClick={() => setActiveEmbedUrl(null)}
                  >
                    Close Player ✕
                  </button>
                </div>
                
                {/* Spotify Embed Player */}
                <iframe
                  src={`${activeEmbedUrl}?utm_source=generator&theme=0`}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
