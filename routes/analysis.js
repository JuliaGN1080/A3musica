const express = require('express');
const { 
  getUserProfile, 
  getTopTracks, 
  getTopArtists, 
  getRecentlyPlayed, 
  analyzeProfile 
} = require('../controllers/analysisController');
const { authenticateToken, validateToken } = require('../middleware/auth');
const { validateQueryParams } = require('../middleware/validation');

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authenticateToken);
router.use(validateToken);

// Rotas de análise
router.get('/profile', getUserProfile);
router.get('/top/tracks', validateQueryParams, getTopTracks);
router.get('/top/artists', validateQueryParams, getTopArtists);
router.get('/recently-played', validateQueryParams, getRecentlyPlayed);
router.get('/analyze', validateQueryParams, analyzeProfile);

module.exports = router;