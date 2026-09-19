import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleSpotifyCallback } from '../utils/spotifyAuth';

// In a real setup, VITE_SPOTIFY_CLIENT_ID would be in your .env.local
// For this portfolio template, we'll try to read it from env, and show a clear error if missing.
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export default function SpotifyCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  // Use a ref to prevent double-firing in strict mode
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    
    const code = searchParams.get('code');
    const redirectUri = `${window.location.origin}/callback`;

    if (code) {
      processed.current = true;
      if (!CLIENT_ID) {
        setError("Spotify Client ID is missing. Please set VITE_SPOTIFY_CLIENT_ID in your environment.");
        return;
      }

      handleSpotifyCallback(CLIENT_ID, redirectUri, code)
        .then(() => {
          // Success! Redirect back to music page
          navigate('/music');
        })
        .catch((err) => {
          console.error("Spotify Auth Error:", err);
          setError("Failed to authenticate with Spotify. Please try again.");
        });
    } else {
      // If there's no code (e.g. user denied access), redirect back or show error
      const errorParam = searchParams.get('error');
      if (errorParam) {
          setError(`Spotify returned an error: ${errorParam}`);
      } else {
          navigate('/music');
      }
    }
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="section-container min-h-screen flex flex-col justify-center items-center">
        <h2 className="heading-lg" style={{ color: 'var(--color-ink)', marginBottom: 'var(--space-md)' }}>
          Authentication Error
        </h2>
        <p className="body-md" style={{ color: 'var(--color-mute)', marginBottom: 'var(--space-xl)', textAlign: 'center', maxWidth: '400px' }}>
          {error}
        </p>
        <button className="btn-primary" onClick={() => navigate('/music')}>
          Return to Music Library
        </button>
      </div>
    );
  }

  return (
    <div className="section-container min-h-screen flex flex-col justify-center items-center">
      <p className="body-strong" style={{ color: 'var(--color-ink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Connecting to Spotify...
      </p>
    </div>
  );
}
