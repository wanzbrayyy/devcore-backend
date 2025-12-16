const express = require('express');
const router = express.Router();
const { sendMessage, getSessions, createSession, deleteSession } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { checkMaintenance } = require('../middleware/maintenanceMiddleware');

// Semua fitur chat kena Maintenance Check
router.use(protect); 
router.use(checkMaintenance);

router.post('/send', sendMessage);
router.get('/sessions', getSessions);
router.post('/sessions', createSession);
router.delete('/sessions/:id', deleteSession);

module.exports = router;
