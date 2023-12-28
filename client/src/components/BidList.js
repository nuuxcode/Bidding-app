import React, { useState, useEffect } from 'react';
import { getBids, deleteBid, updateBid } from '../services/bidService';

function BidList() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      const response = await getBids();
      if (response.data.success) {
        setBids(response.data.data);
      }
    };

    fetchBids();
  }, []);

  const handleDelete = async (id) => {
    const response = await deleteBid(id);
    if (response.data.success) {
      setBids(bids.filter((bid) => bid._id !== id));
    }
  };

  const handleUpdate = async (id, newBid) => {
    const response = await updateBid(id, newBid);
    if (response.data.success) {
      setBids(bids.map((bid) => (bid._id === id ? { ...bid, currentBid: newBid } : bid)));
    }
  };

  return (
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
              <input type="number" value={bid.currentBid} onChange={(e) => handleUpdate(bid._id, e.target.value)} />
            </td>
            <td>
              <button onClick={() => handleDelete(bid._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BidList;
