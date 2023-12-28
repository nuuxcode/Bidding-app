import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [winner, setWinner] = useState('');
  const [bids, setBids] = useState([]);

  const api = axios.create({
    baseURL: `http://${window.location.hostname}:5000`
  });

  const deleteBid = async (id) => {
    const response = await api.delete(`/delete-bid/${id}`);
    if (response.data.success) {
      fetchBids();
    } else {
      console.error('Error deleting bid:', response.data.message);
    }
  };

  const updateBid = async (id, newBid) => {
    const response = await api.put(`/update-bid/${id}`, { bid: newBid });
    if (response.data.success) {
      fetchBids();
    } else {
      console.error('Error updating bid:', response.data.message);
    }
  };

  const placeBid = async () => {
    const response = await api.post('/place-bid', { name, bid });
    if (response.data.success) {
      setMessage(prevMessage => `${prevMessage}\nBid placed successfully by ${name} with bid ${bid}!`);
      fetchBids();
    } else {
      console.error('Error placing bid:', response.data.message);
      setMessage(prevMessage => `${prevMessage}\nError placing bid.`);
    }
  };

  const findWinner = async () => {
    const response = await api.get('/find-winner');
    if (response.data.success) {
      setWinner(`Winner: ${response.data.data.name} with bid ${response.data.data.currentBid}`);
    } else {
      console.error('Error finding winner:', response.data.message);
      setMessage('Error finding winner.');
    }
  };

  const fetchBids = async () => {
    const response = await api.get('/get-bids');
    if (response.data.success) {
      setBids(response.data.data);
    } else {
      console.error('Error fetching bids:', response.data.message);
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <div className="App">
      <h1>Bidding System</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Bid:</label>
        <input type="number" value={bid} onChange={(e) => setBid(e.target.value)} />
      </div>
      <button onClick={placeBid}>Place Bid</button>
      <button onClick={findWinner}>Find Winner</button>
      {message.split('\n').map((item, i) => <p key={i}>{item}</p>)} {/* Modify this line */}
      <p>{winner}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Bid</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, i) => (
            <tr key={i}>
              <td>{bid.name}</td>
              <td>
                <input type="number" value={bid.currentBid} onChange={(e) => updateBid(bid._id, e.target.value)} />
              </td>
              <td>
                <button onClick={() => deleteBid(bid._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
