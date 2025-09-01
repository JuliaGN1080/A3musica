const axios = require('axios');
const spotifyApiConfig = require('../config/spotify');

// Cliente HTTP para requests à API do Spotify
const spotifyClient = axios.create({
  baseURL: spotifyApiConfig.baseUrl,
  timeout: 10000
});

// Interceptor para adicionar o token de acesso
spotifyClient.interceptors.request.use(
  (config) => {
    if (!config.headers['Authorization']) {
      // Se não tiver authorization header, assumimos que será fornecido via função
      console.warn('No authorization header set for Spotify API request');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros comuns
spotifyClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Token expirado ou inválido
      if (error.response.status === 401) {
        console.error('Spotify API: Authentication failed');
      }
      // Rate limiting
      else if (error.response.status === 429) {
        console.error('Spotify API: Rate limit exceeded');
      }
    }
    return Promise.reject(error);
  }
);

// Obter perfil do usuário
const getUserProfile = async (accessToken) => {
  const response = await spotifyClient.get(spotifyApiConfig.endpoints.userProfile, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  return response.data;
};

// Obter músicas mais ouvidas
const getTopTracks = async (accessToken, timeRange = 'medium_term', limit = 20, offset = 0) => {
  const response = await spotifyClient.get(spotifyApiConfig.endpoints.topTracks, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      time_range: timeRange,
      limit: limit,
      offset: offset
    }
  });
  return response.data;
};

// Obter artistas mais ouvidos
const getTopArtists = async (accessToken, timeRange = 'medium_term', limit = 20, offset = 0) => {
  const response = await spotifyClient.get(spotifyApiConfig.endpoints.topArtists, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      time_range: timeRange,
      limit: limit,
      offset: offset
    }
  });
  return response.data;
};

// Obter histórico de reprodução recente
const getRecentlyPlayed = async (accessToken, limit = 20) => {
  const response = await spotifyClient.get(spotifyApiConfig.endpoints.recentlyPlayed, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      limit: limit
    }
  });
  return response.data;
};

// Obter playlists do usuário
const getUserPlaylists = async (accessToken, limit = 20, offset = 0) => {
  const response = await spotifyClient.get(spotifyApiConfig.endpoints.playlists, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      limit: limit,
      offset: offset
    }
  });
  return response.data;
};

// Obter audio features para uma ou mais músicas
const getAudioFeatures = async (accessToken, trackIds) => {
  const ids = Array.isArray(trackIds) ? trackIds.join(',') : trackIds;
  const response = await spotifyClient.get(spotifyApiConfig.endpoints.audioFeatures, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      ids: ids
    }
  });
  return response.data;
};

module.exports = {
  getUserProfile,
  getTopTracks,
  getTopArtists,
  getRecentlyPlayed,
  getUserPlaylists,
  getAudioFeatures
};