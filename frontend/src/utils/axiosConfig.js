import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 504) {
      return Promise.reject({ message: 'Server timeout. Please try again.' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;