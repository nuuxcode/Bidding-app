const Person = require('../models/Person');
const handleResponse = require('../utils/responseHandler');

const findWinner = async (req, res) => {
  try {
    const allBids = await Person.find({}, 'name currentBid _id').sort({ currentBid: 'desc' });

    let uniqueBids = [];
    let highestUniqueBid = null;

    allBids.forEach((bid) => {
      if (!uniqueBids.includes(bid.currentBid)) {
        uniqueBids.push(bid.currentBid);
        if (highestUniqueBid === null || bid.currentBid > highestUniqueBid.currentBid) {
          highestUniqueBid = bid;
        }
      }
    });
    handleResponse(res, true, 'Winner found successfully.', highestUniqueBid);
  } catch (error) {
    handleResponse(res, false, 'Error finding winner.');
  }
};

module.exports = {
  findWinner
};
