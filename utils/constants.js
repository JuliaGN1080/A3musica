// Constantes e configurações

const TIME_RANGES = {
  SHORT_TERM: 'short_term',   // ~4 semanas
  MEDIUM_TERM: 'medium_term', // ~6 meses
  LONG_TERM: 'long_term'      // Vários anos
};

const MAX_LIMIT = 50; // Limite máximo permitido pela API do Spotify

const DEFAULT_LIMIT = 20;

const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutos
  MEDIUM: 30 * 60 * 1000, // 30 minutos
  LONG: 60 * 60 * 1000 // 60 minutos
};

module.exports = {
  TIME_RANGES,
  MAX_LIMIT,
  DEFAULT_LIMIT,
  CACHE_DURATION
};