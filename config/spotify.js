// Configurações da API do Spotify
const spotifyApiConfig = {
  baseUrl: 'https://api.spotify.com/v1',
  endpoints: {
    userProfile: '/me',
    topTracks: '/me/top/tracks',
    topArtists: '/me/top/artists',
    recentlyPlayed: '/me/player/recently-played',
    playlists: '/me/playlists',
    audioFeatures: '/audio-features',
    audioAnalysis: '/audio-analysis'
  }
};

module.exports = spotifyApiConfig;