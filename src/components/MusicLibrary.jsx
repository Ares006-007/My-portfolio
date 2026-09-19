import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { buildEmbedUrl } from './SpotifyHelper';
import { getCollection } from '../data/portfolioStore';

export default function MusicLibrary() {
  const [activeEmbedUrl, setActiveEmbedUrl] = useState(null);
  const [activeSpotifyUrl, setActiveSpotifyUrl] = useState(null);
  const [activeTitle, setActiveTitle] = useState('');
  const [activeArtist, setActiveArtist] = useState('');
  const [embedError, setEmbedError] = useState(false);
  const [homepageRecords, setHomepageRecords] = useState([]);

  useEffect(() => {
    getCollection('library').then((data) => {
      const records = data.flatMap(cat => cat.items || []).slice(0, 5);
      setHomepageRecords(records);
    });
  }, []);

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

  return (
    <section id="music" className="section-spacing" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="heading-xl" style={{ marginBottom: 'var(--space-md)' }}>
            Listening Archive
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <p className="body-md" style={{ color: 'var(--color-mute)', marginBottom: 'var(--space-section)', maxWidth: '44ch' }}>
            A curated shelf of records that keep me focused and inspired during building.
          </p>
        </RevealOnScroll>

        <div className="library-shelf" style={{ overflow: 'visible', paddingBottom: 'var(--space-xl)' }}>
          {homepageRecords.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 0.06} className="library-book-wrapper" style={{ overflow: 'visible' }}>
              <div className="library-record" onClick={() => playTrack(item)} data-cursor="action" title={`Play ${item.title} on Spotify`}>
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

        <div className="library-shelf-edge" aria-hidden="true" style={{ marginTop: 'var(--space-lg)' }} />

        <RevealOnScroll>
          <div className="library-show-more">
            <Link to="/music" className="caption-md" data-cursor="link">
              See the full record collection →
            </Link>
          </div>
        </RevealOnScroll>
      </div>

      <AnimatePresence>
        {activeEmbedUrl && (
          <motion.div className="player-drawer-container" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
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
                    <p className="caption-sm" style={{ color: 'var(--color-mute)', marginBottom: '8px' }}>Embed unavailable.</p>
                    {activeSpotifyUrl && (
                      <a href={activeSpotifyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', height: '36px', padding: '0 20px', fontSize: '13px', textDecoration: 'none', lineHeight: '36px' }}>
                        Listen on Spotify ↗
                      </a>
                    )}
                  </div>
                ) : (
                  <iframe key={activeEmbedUrl} src={`${activeEmbedUrl}?utm_source=generator&theme=0`} width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ borderRadius: '12px', border: 'none' }} onError={handleEmbedError} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
