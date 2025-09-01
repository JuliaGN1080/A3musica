const axios = require('axios');
const querystring = require('querystring');
const { spotifyAuthConfig, scopes } = require('../config/auth');

// Iniciar fluxo de autenticação OAuth
const login = (req, res) => {
  const authQueryParams = querystring.stringify({
    client_id: spotifyAuthConfig.clientId,
    response_type: 'code',
    redirect_uri: spotifyAuthConfig.redirectUri,
    scope: scopes,
    show_dialog: true
  });

  res.redirect(`${spotifyAuthConfig.authUrl}?${authQueryParams}`);
};

// Callback para receber o código de autorização
const callback = async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }

  try {
    // Trocar código por access token
    const response = await axios.post(spotifyAuthConfig.tokenUrl, 
      querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: spotifyAuthConfig.redirectUri
      }), {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(
            `${spotifyAuthConfig.clientId}:${spotifyAuthConfig.clientSecret}`
          ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    
    // Redirecionar para o frontend com os tokens (em produção, isso deve ser seguro)
    res.redirect(`${process.env.FRONTEND_URL}/callback?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`);
  } catch (error) {
    console.error('Error during authentication:', error.response?.data || error.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Refresh do token de acesso
const refreshToken = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token not provided' });
  }

  try {
    const response = await axios.post(spotifyAuthConfig.tokenUrl,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }), {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(
            `${spotifyAuthConfig.clientId}:${spotifyAuthConfig.clientSecret}`
          ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
};

module.exports = {
  login,
  callback,
  refreshToken
};