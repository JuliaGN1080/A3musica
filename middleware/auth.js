// Middleware para verificar e extrair o token de acesso
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  req.access_token = token;
  next();
};

// Middleware para verificar se o token é válido (simplificado)
// Em produção, você pode querer verificar com a API do Spotify
const validateToken = async (req, res, next) => {
  // Implementação básica - em produção, valide com Spotify
  next();
};

module.exports = {
  authenticateToken,
  validateToken
};