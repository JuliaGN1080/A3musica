const spotifyService = require('./spotifyService');

// Analisar perfil musical do usuário
const analyzeUserProfile = async (accessToken, timeRange = 'medium_term', limit = 50) => {
  try {
    // Obter dados do usuário
    const [profile, topTracks, topArtists] = await Promise.all([
      spotifyService.getUserProfile(accessToken),
      spotifyService.getTopTracks(accessToken, timeRange, limit),
      spotifyService.getTopArtists(accessToken, timeRange, limit)
    ]);

    // Extrair IDs das músicas para obter audio features
    const trackIds = topTracks.items.map(track => track.id);
    const audioFeatures = await spotifyService.getAudioFeatures(accessToken, trackIds);

    // Realizar análise
    const analysis = {
      user: {
        id: profile.id,
        display_name: profile.display_name,
        email: profile.email,
        country: profile.country,
        product: profile.product
      },
      topGenres: extractTopGenres(topArtists.items),
      audioFeatures: analyzeAudioFeatures(audioFeatures.audio_features),
      popularity: analyzePopularity(topTracks.items),
      timeRange: timeRange,
      timestamp: new Date().toISOString()
    };

    return analysis;
  } catch (error) {
    console.error('Error in profile analysis:', error);
    throw error;
  }
};

// Extrair gêneros mais frequentes dos artistas
const extractTopGenres = (artists) => {
  const genreCount = {};
  
  artists.forEach(artist => {
    artist.genres.forEach(genre => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });
  });

  // Ordenar por frequência e retornar top 10
  return Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([genre, count]) => ({ genre, count }));
};

// Analisar características de áudio das músicas
const analyzeAudioFeatures = (audioFeatures) => {
  if (!audioFeatures || audioFeatures.length === 0) {
    return null;
  }

  const features = ['danceability', 'energy', 'valence', 'acousticness', 'instrumentalness', 'liveness', 'speechiness'];
  const analysis = {};

  features.forEach(feature => {
    const values = audioFeatures.map(track => track[feature]).filter(val => val !== undefined);
    if (values.length > 0) {
      analysis[feature] = {
        average: values.reduce((sum, val) => sum + val, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values)
      };
    }
  });

  // Calcular média de duração das músicas (em minutos)
  const durations = audioFeatures.map(track => track.duration_ms / 60000);
  analysis.duration = {
    average: durations.reduce((sum, val) => sum + val, 0) / durations.length,
    min: Math.min(...durations),
    max: Math.max(...durations)
  };

  // Calcular média de tempo musical (BPM)
  const tempos = audioFeatures.map(track => track.tempo);
  analysis.tempo = {
    average: tempos.reduce((sum, val) => sum + val, 0) / tempos.length,
    min: Math.min(...tempos),
    max: Math.max(...tempos)
  };

  return analysis;
};

// Analisar popularidade das músicas
const analyzePopularity = (tracks) => {
  const popularities = tracks.map(track => track.popularity);
  
  return {
    average: popularities.reduce((sum, val) => sum + val, 0) / popularities.length,
    min: Math.min(...popularities),
    max: Math.max(...popularities)
  };
};

module.exports = {
  analyzeUserProfile,
  extractTopGenres,
  analyzeAudioFeatures,
  analyzePopularity
};