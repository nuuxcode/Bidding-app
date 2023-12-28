import React, { useState, useEffect } from 'react';
import BidForm from './components/BidForm';
import BidList from './components/BidList';
import { getBids } from './services/bidService';

function App() {
  const [bids, setBids] = useState([]);

  const fetchBids = async () => {
    const response = await getBids();
    if (response.data.success) {
      setBids(response.data.data);
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <div>
      <BidForm fetchBids={fetchBids} />
      <BidList bids={bids} fetchBids={fetchBids} />
    </div>
  );
}

export default App;
