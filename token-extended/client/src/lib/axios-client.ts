import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const axiosClient = axios.create({
  baseURL: SERVER_URL || 'http://localhost:5000',
});

export default axiosClient;