const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { 
    getUsers, toggleApproval, updateUserRole, // Import fungsi baru
    getConfig, updateMaintenance,
    addApiKey, deleteApiKey,
    addQuote, getQuotes, deleteQuote 
} = require('../controllers/adminController');

// Users
router.get('/users', protect, adminOnly, getUsers);
router.post('/approve', protect, adminOnly, toggleApproval);
router.post('/role', protect, adminOnly, updateUserRole); // Endpoint Baru

// System
router.get('/config', protect, adminOnly, getConfig);
router.post('/maintenance', protect, adminOnly, updateMaintenance);

// API
router.post('/apikey', protect, adminOnly, addApiKey);
router.delete('/apikey/:id', protect, adminOnly, deleteApiKey);

// Quotes
router.post('/quotes', protect, adminOnly, addQuote);
router.get('/quotes', getQuotes);
router.delete('/quotes/:id', protect, adminOnly, deleteQuote);

module.exports = router;
