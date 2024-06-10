import axios from 'axios';


const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5000',
});

axiosClient.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
});

export default axiosClient;