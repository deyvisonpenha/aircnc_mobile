import axios from 'axios';

const api = axios.create({
  baseURL: 'https://myaircnc.herokuapp.com',
});

export default api;
