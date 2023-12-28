import React, { useState } from 'react';
import { placeBid } from '../services/bidService';
import { findWinner } from '../services/winnerService';

function BidForm({ fetchBids }) {

  const [name, setName] = useState('');
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [winner, setWinner] = useState('');
  const [showWinner, setShowWinner] = useState(false);

  const handlePlaceBid = async () => {
    if (!name || !bid) {
      setError('Name and bid cannot be empty.');
      return;
    }

    const response = await placeBid(name, bid);
    if (response.data.success) {
      setName('');
      setBid('');
      setError('');
      setShowWinner(false);
      setMessage(prevMessage => `${prevMessage}\nBid placed successfully by ${name} with bid ${bid}!`);
      fetchBids();
    }
  };

  const handleFindWinner = async () => {
    const response = await findWinner();
    if (response.data.success) {
      setWinner(response.data.data);
      setShowWinner(true);
    }
  };

  return (
    <div>
      <h1>Bidding System</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Bid:</label>
        <input type="number" value={bid} onChange={(e) => setBid(e.target.value)} />
      </div>
      <button onClick={handlePlaceBid}>Place Bid</button>
      <button onClick={handleFindWinner}>Find Winner</button>
      {error && <p>{error}</p>}
      {message.split('\n').map((item, i) => <p key={i}>{item}</p>)}
      {showWinner && winner && <p>The winner is {winner.name} with a bid of {winner.currentBid}</p>}
    </div>
  );
}

export default BidForm;
