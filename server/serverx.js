const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Person = require('./models/Person');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const handleResponse = (res, success, message, data = null) => {
  if (success) {
    res.json({ success, message, data });
  } else {
    res.status(500).json({ success, message });
  }
};

app.post('/place-bid', async (req, res) => {
  const { name, bid } = req.body;
  const person = new Person({ name, currentBid: bid });

  try {
    await person.save();
    handleResponse(res, true, 'Bid placed successfully.');
  } catch (error) {
    handleResponse(res, false, 'Error placing bid.');
  }
});

app.get('/find-winner', async (req, res) => {
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
});


app.get('/get-bids', async (req, res) => {
  try {
    const allBids = await Person.find({}).sort({ createdAt: 'desc' });
    handleResponse(res, true, 'Bids fetched successfully.', allBids);
  } catch (error) {
    handleResponse(res, false, 'Error fetching bids.');
  }
});

app.delete('/delete-bid/:id', async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    handleResponse(res, true, 'Bid deleted successfully.');
  } catch (error) {
    handleResponse(res, false, 'Error deleting bid.');
  }
});

app.put('/update-bid/:id', async (req, res) => {
  try {
    await Person.findByIdAndUpdate(req.params.id, { currentBid: req.body.bid });
    handleResponse(res, true, 'Bid updated successfully.');
  } catch (error) {
    handleResponse(res, false, 'Error updating bid.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
