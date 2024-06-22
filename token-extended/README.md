# Token-based Authentication with Flask and FlaskJWT-Extended


This builds up the `token` project but with the `FlaskJWT-Extended` extension, which provides a more robust way to handle token-based authentication.
The `FlaskJWT-Extended` extension is a wrapper around the `PyJWT` library, which is a Python implementation of the JSON Web Token (JWT) standard.
In this implementation, generated tokens are saved in cookies, with the `client` sending them with each request using axios.

```javascript
import axios from 'axios';
import Cookies from 'universal-cookie';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5000',
});

axiosClient.interceptors.request.use((config) => {
    // The withCredentials option is set to true, so that the client can send access tokens with each request.
    config.withCredentials = true;
    // The CSRF token is needed to protect against CSRF attacks.
    // Certain request methods (e.g DELETE) to protected endpoints are rejected if the CSRF token is not set.
    config.headers['X-CSRF-TOKEN'] = new Cookies().get('csrf_access_token'); 
    return config;
});

export default axiosClient;
```