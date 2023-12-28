const express = require('express');
const router = express.Router();
const { findWinner } = require('../controllers/winnerController');

router.get('/find-winner', findWinner);

module.exports = router;
