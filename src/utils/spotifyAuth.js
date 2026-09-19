// src/utils/spotifyAuth.js

// 1. Generate a random string for the code verifier
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// 2. Generate code challenge from the verifier
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function loginToSpotify(clientId, redirectUri) {
  const verifier = generateRandomString(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('spotify_verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', redirectUri);
  params.append('scope', 'user-library-read user-top-read playlist-read-private playlist-read-collaborative');
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function handleSpotifyCallback(clientId, redirectUri, code) {
  const verifier = localStorage.getItem('spotify_verifier');
  
  if (!verifier) {
    throw new Error('No verifier found in local storage.');
  }

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('code_verifier', verifier);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Token fetch failed: ${errorData.error_description || response.statusText}`);
  }

  const data = await response.json();
  
  // Store tokens
  localStorage.setItem('spotify_access_token', data.access_token);
  if (data.refresh_token) {
    localStorage.setItem('spotify_refresh_token', data.refresh_token);
  }
  
  // Clean up
  localStorage.removeItem('spotify_verifier');
  
  return data;
}

export async function refreshSpotifyToken(clientId) {
  const refreshToken = localStorage.getItem('spotify_refresh_token');
  if (!refreshToken) {
    throw new Error('No refresh token available.');
  }

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  if (!response.ok) {
    // If refresh fails (e.g., revoked access), we should clear tokens to force re-login
    logoutFromSpotify();
    throw new Error('Failed to refresh token.');
  }

  const data = await response.json();
  localStorage.setItem('spotify_access_token', data.access_token);
  if (data.refresh_token) {
    localStorage.setItem('spotify_refresh_token', data.refresh_token);
  }
  return data.access_token;
}

export function logoutFromSpotify() {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
}

export function getSpotifyToken() {
  return localStorage.getItem('spotify_access_token');
}
