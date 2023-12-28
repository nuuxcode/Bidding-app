const Person = require('../models/Person');
const handleResponse = require('../utils/responseHandler');

const placeBid = async (req, res) => {
  const { name, bid } = req.body;
  const person = new Person({ name, currentBid: bid });

  try {
    await person.save();
    handleResponse(res, true, 'Bid placed successfully.');
  } catch (error) {
    handleResponse(res, false, 'Error placing bid.');
  }
};

const getBids = async (req, res) => {
  try {
    const allBids = await Person.find({}).sort({ createdAt: 'desc' });
    handleResponse(res, true, 'Bids fetched successfully.', allBids);
  } catch (error) {
    handleResponse(res, false, 'Error fetching bids.');
  }
};

const deleteBid = async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    handleResponse(res, true, 'Bid deleted successfully.');
  } catch (error) {
    handleResponse(res, false, 'Error deleting bid.');
  }
};

const updateBid = async (req, res) => {
  try {
    await Person.findByIdAndUpdate(req.params.id, { currentBid: req.body.bid });
    handleResponse(res, true, 'Bid updated successfully.');
  } catch (error) {
    handleResponse(res, false, 'Error updating bid.');
  }
};

module.exports = {
  placeBid,
  getBids,
  deleteBid,
  updateBid
};
