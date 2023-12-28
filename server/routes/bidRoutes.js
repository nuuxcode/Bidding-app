const express = require('express');
const router = express.Router();
const { placeBid, getBids, deleteBid, updateBid } = require('../controllers/bidController');

router.post('/place-bid', placeBid);
router.get('/get-bids', getBids);
router.delete('/delete-bid/:id', deleteBid);
router.put('/update-bid/:id', updateBid);

module.exports = router;
