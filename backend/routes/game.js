const express = require('express');
const router = express.Router();
const { getStats, getProfile, saveProgress } = require('../controllers/gameController');

router.get('/stats/:playerId', getStats);
router.get('/profile/:playerId', getProfile);
router.post('/save', saveProgress);

module.exports = router;
