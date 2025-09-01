// Middleware para validar parâmetros de consulta
const validateQueryParams = (req, res, next) => {
  // Validação para endpoints de top tracks/artists
  if (req.query.time_range) {
    const validTimeRanges = ['short_term', 'medium_term', 'long_term'];
    if (!validTimeRanges.includes(req.query.time_range)) {
      return res.status(400).json({ 
        error: 'Invalid time_range parameter', 
        valid_values: validTimeRanges 
      });
    }
  }

  if (req.query.limit) {
    const limit = parseInt(req.query.limit);
    if (isNaN(limit) || limit < 1 || limit > 50) {
      return res.status(400).json({ 
        error: 'Invalid limit parameter', 
        message: 'Limit must be a number between 1 and 50' 
      });
    }
  }

  if (req.query.offset) {
    const offset = parseInt(req.query.offset);
    if (isNaN(offset) || offset < 0) {
      return res.status(400).json({ 
        error: 'Invalid offset parameter', 
        message: 'Offset must be a non-negative number' 
      });
    }
  }

  next();
};

module.exports = {
  validateQueryParams
};