import { getSpotifyToken, refreshSpotifyToken } from './spotifyAuth';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

/**
 * Base fetch function that handles authorization and token refresh.
 */
async function fetchWithAuth(endpoint, clientId, retryCount = 0) {
  let token = getSpotifyToken();
  if (!token) {
    throw new Error('Not authenticated with Spotify');
  }

  const url = `${SPOTIFY_API_BASE}${endpoint}`;
  
  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Handle token expiration
  if (response.status === 401 && retryCount < 1) {
    try {
      await refreshSpotifyToken(clientId);
      return fetchWithAuth(endpoint, clientId, retryCount + 1);
    } catch (refreshError) {
      throw new Error('Failed to refresh token and retry request.');
    }
  }

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches playlist metadata (name, description, images, owner).
 */
export async function getPlaylist(clientId, playlistId) {
  return fetchWithAuth(`/playlists/${playlistId}?fields=id,name,description,images,owner,external_urls`, clientId);
}

/**
 * Fetches tracks inside a playlist.
 * Returns up to `limit` tracks with their full track objects.
 */
export async function getPlaylistTracks(clientId, playlistId, limit = 20) {
  return fetchWithAuth(
    `/playlists/${playlistId}/tracks?limit=${limit}&fields=items(track(id,name,artists,album(id,name,images),external_urls,preview_url,duration_ms))`,
    clientId
  );
}
