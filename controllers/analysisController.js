const spotifyService = require('../services/spotifyService');
const analysisService = require('../services/analysisService');

// Obter perfil do usuário
const getUserProfile = async (req, res) => {
  try {
    const { access_token } = req;
    const profile = await spotifyService.getUserProfile(access_token);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// Obter músicas mais ouvidas
const getTopTracks = async (req, res) => {
  try {
    const { access_token } = req;
    const { time_range = 'medium_term', limit = 20, offset = 0 } = req.query;
    
    const topTracks = await spotifyService.getTopTracks(access_token, time_range, limit, offset);
    res.json(topTracks);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
};

// Obter artistas mais ouvidos
const getTopArtists = async (req, res) => {
  try {
    const { access_token } = req;
    const { time_range = 'medium_term', limit = 20, offset = 0 } = req.query;
    
    const topArtists = await spotifyService.getTopArtists(access_token, time_range, limit, offset);
    res.json(topArtists);
  } catch (error) {
    console.error('Error fetching top artists:', error);
    res.status(500).json({ error: 'Failed to fetch top artists' });
  }
};

// Obter histórico de reprodução
const getRecentlyPlayed = async (req, res) => {
  try {
    const { access_token } = req;
    const { limit = 20 } = req.query;
    
    const recentlyPlayed = await spotifyService.getRecentlyPlayed(access_token, limit);
    res.json(recentlyPlayed);
  } catch (error) {
    console.error('Error fetching recently played:', error);
    res.status(500).json({ error: 'Failed to fetch recently played' });
  }
};

// Analisar dados do usuário
const analyzeProfile = async (req, res) => {
  try {
    const { access_token } = req;
    const { time_range = 'medium_term', limit = 50 } = req.query;
    
    const analysis = await analysisService.analyzeUserProfile(access_token, time_range, limit);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing profile:', error);
    res.status(500).json({ error: 'Failed to analyze profile' });
  }
};

module.exports = {
  getUserProfile,
  getTopTracks,
  getTopArtists,
  getRecentlyPlayed,
  analyzeProfile
};