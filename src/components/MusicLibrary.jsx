import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { musicCategories, fetchSpotifyOEmbed } from './SpotifyHelper';

export default function MusicLibrary() {
  const [activeEmbedUrl, setActiveEmbedUrl] = useState(null);
  const [activeTitle, setActiveTitle] = useState('');
  const [activeArtist, setActiveArtist] = useState('');
  const [albumCovers, setAlbumCovers] = useState({});

  // Flatten some items from all categories for the homepage preview
  const homepageRecords = musicCategories.flatMap(cat => cat.items).slice(0, 5);

  useEffect(() => {
    // Dynamic fetch of high-quality artwork from Spotify OEmbed if available
    homepageRecords.forEach(async (item) => {
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
    <section id="music" className="section-spacing" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="section-container">
        {/* Section Header */}
        <RevealOnScroll>
          <h2 className="heading-xl" style={{ marginBottom: 'var(--space-md)' }}>
            Listening Archive
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <p
            className="body-md"
            style={{
              color: 'var(--color-mute)',
              marginBottom: 'var(--space-section)',
              maxWidth: '44ch',
            }}
          >
            A curated shelf of records that keep me focused and inspired during building.
          </p>
        </RevealOnScroll>

        {/* Shelf display */}
        <div className="library-shelf" style={{ overflow: 'visible', paddingBottom: 'var(--space-xl)' }}>
          {homepageRecords.map((item, i) => (
            <RevealOnScroll
              key={item.id}
              delay={i * 0.06}
              className="library-book-wrapper"
              style={{ overflow: 'visible' }}
            >
              <div 
                className="library-record"
                onClick={() => playTrack(item)}
                data-cursor="action"
                title={`Play ${item.title} on Spotify`}
              >
                {/* Sleeve Cover */}
                <div className="record-sleeve">
                  <img
                    src={albumCovers[item.id] || item.coverUrl}
                    alt={`${item.title} by ${item.artist}`}
                    loading="lazy"
                  />
                </div>
                {/* 3D sliding vinyl disc */}
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

        {/* Physical shelf line */}
        <div className="library-shelf-edge" aria-hidden="true" style={{ marginTop: 'var(--space-lg)' }} />

        {/* See full library → */}
        <RevealOnScroll>
          <div className="library-show-more">
            <Link to="/music" className="caption-md" data-cursor="link">
              See the full record collection →
            </Link>
          </div>
        </RevealOnScroll>
      </div>

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
    </section>
  );
}
