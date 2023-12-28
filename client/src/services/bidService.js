import axios from 'axios';

const api = axios.create({
  baseURL: `http://${window.location.hostname}:3006`
});

export const getBids = async () => {
  return await api.get('/get-bids');
};

export const placeBid = async (name, bid) => {
  return await api.post('/place-bid', { name, bid });
};

export const deleteBid = async (id) => {
  return await api.delete(`/delete-bid/${id}`);
};

export const updateBid = async (id, newBid) => {
  return await api.put(`/update-bid/${id}`, { bid: newBid });
};
