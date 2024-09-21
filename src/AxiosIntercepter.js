// src/api/axios.js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Ensure this is your FastAPI server URL
  timeout: 10000, // Set a timeout for the requests
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Log the request configuration
    // console.log('Request Configuration:', config);
    return config;
  },
  (error) => {
    // Log the request error
    // console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log the response data
    // console.log('Response:', response);
    return response;
  },
  (error) => {
    // Log the error response (such as 404 or server errors)
    // console.error('Response Error:', error.response ? error.response : error);
    return Promise.reject(error);
  }
);

export default apiClient;
