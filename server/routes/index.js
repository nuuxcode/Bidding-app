const express = require('express');
const router = express.Router();

const bidRoutes = require('./bidRoutes');
const winnerRoutes = require('./winnerRoutes');

router.use('/', bidRoutes);
router.use('/', winnerRoutes);

module.exports = router;
