// src/api/config.js
import axios from 'axios';

// Base configuration
const BASE_URL = 'https://api.weatherstack.com';
const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY || 'cfaf997c505936d5ca79851156170956';


// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
  params: {
    access_key: API_KEY
  }
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Check if WeatherStack returned an error in the response
    if (response.data?.error) {
      throw new Error(response.data.error.info || 'WeatherStack API Error');
    }
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    // Handle different types of errors
    if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your internet connection.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
);

export default apiClient;