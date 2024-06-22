import axios from 'axios';
import Cookies from 'universal-cookie';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5000',
});

axiosClient.interceptors.request.use((config) => {
    config.withCredentials = true;
    config.headers['X-CSRF-TOKEN'] = new Cookies().get('csrf_access_token');
    return config;
});

export default axiosClient;