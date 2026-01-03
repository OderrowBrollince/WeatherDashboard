import axios from 'axios';

// OpenWeatherMap API instance
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY, // API key from .env
    units: 'metric', // Use 'imperial' for Fahrenheit
  },
});

// One Call API instance (for UV Index and detailed forecasts)
const oneCallApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    units: 'metric',
  },
});

// Geocoding API instance (for location search)
const geocodingApi = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0',
  timeout: 10000,
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    limit: 5, // Limit search results
  },
});

// Original API instance (keep for other services if needed)
const api = axios.create({
  baseURL: 'https://your-api-url.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for original API (for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for handling errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized - redirecting to login');
    }
    return Promise.reject(error);
  }
);

export default api;
export { weatherApi, geocodingApi, oneCallApi };