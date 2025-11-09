import axios from 'axios';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // IMPORTANT: This sends the cookie with each request
});

// This line exports the 'axiosInstance' as the default export
export default axiosInstance;