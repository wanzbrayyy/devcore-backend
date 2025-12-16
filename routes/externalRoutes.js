const express = require('express');
const router = express.Router();
const { handleExternalChat } = require('../controllers/externalController');

// Endpoint: POST /api/v1/chat/completions
router.post('/chat/completions', handleExternalChat);

module.exports = router;
