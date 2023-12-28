import axios from 'axios';

const api = axios.create({
  baseURL: `http://${window.location.hostname}:3006`
});

export const findWinner = async () => {
  return await api.get('/find-winner');
};
