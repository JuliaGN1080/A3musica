const express = require('express');
const authRoutes = require('./auth');
const analysisRoutes = require('./analysis');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/analysis', analysisRoutes);

module.exports = router;