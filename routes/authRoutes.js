const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getMe, changePassword, generateUserApiKey } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', protect, getMe);

// New Routes
router.post('/change-password', protect, changePassword);
router.post('/generate-key', protect, generateUserApiKey);

module.exports = router;
