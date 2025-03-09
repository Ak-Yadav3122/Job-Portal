import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 60000, // 60 seconds
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
    if (error.code === 'ECONNABORTED' || error.response?.status === 504) {
      return Promise.reject({ 
        message: 'Request timed out. Please try again with a smaller image file.',
        status: 504 
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;