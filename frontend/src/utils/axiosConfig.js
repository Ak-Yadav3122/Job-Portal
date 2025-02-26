import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 30000, // Increase timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED' || error.response?.status === 504) {
      // Retry the request once
      return axiosInstance.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;