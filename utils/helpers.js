// Funções auxiliares

// Formatar duração em milissegundos para string (mm:ss)
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Calcular média de um array de números
const calculateAverage = (arr) => {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
};

// Gerar um array de cores para visualizações
const generateColors = (count) => {
  const colors = [];
  const hueStep = 360 / count;
  
  for (let i = 0; i < count; i++) {
    const hue = i * hueStep;
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  
  return colors;
};

// Validar se um token é válido (formato básico)
const isValidTokenFormat = (token) => {
  return typeof token === 'string' && token.length > 0;
};

module.exports = {
  formatDuration,
  calculateAverage,
  generateColors,
  isValidTokenFormat
};