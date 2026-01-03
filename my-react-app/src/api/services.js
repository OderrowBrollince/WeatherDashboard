import api from './axiosConfig';
import { weatherApi, geocodingApi } from './axiosConfig';

// ... existing userService and authService code ...

// Weather-related API calls
export const weatherService = {
  // Get current weather by city name
  getCurrentWeather: async (cityName, countryCode = '') => {
    try {
      const query = countryCode ? `${cityName},${countryCode}` : cityName;
      const response = await weatherApi.get('/weather', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  // Get current weather by coordinates
  getCurrentWeatherByCoords: async (lat, lon) => {
    try {
      const response = await weatherApi.get('/weather', {
        params: { lat, lon },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather by coordinates:', error);
      throw error;
    }
  },

  // Get 5-day forecast (3-hour intervals)
  getForecast: async (cityName, countryCode = '') => {
    try {
      const query = countryCode ? `${cityName},${countryCode}` : cityName;
      const response = await weatherApi.get('/forecast', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  // Get 5-day forecast by coordinates
  getForecastByCoords: async (lat, lon) => {
    try {
      const response = await weatherApi.get('/forecast', {
        params: { lat, lon },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast by coordinates:', error);
      throw error;
    }
  },

  // Get air pollution data
  getAirPollution: async (lat, lon) => {
    try {
      const response = await weatherApi.get('/air_pollution', {
        params: { lat, lon },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching air pollution:', error);
      throw error;
    }
  },

  // Get air pollution forecast
  getAirPollutionForecast: async (lat, lon) => {
    try {
      const response = await weatherApi.get('/air_pollution/forecast', {
        params: { lat, lon },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching air pollution forecast:', error);
      throw error;
    }
  },

  
};

// Geocoding API calls
export const geocodingService = {
  // Search for locations by name
  searchLocations: async (query) => {
    try {
      const response = await geocodingApi.get('/direct', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching locations:', error);
      throw error;
    }
  },

  // Reverse geocoding (get location name from coordinates)
  reverseGeocode: async (lat, lon) => {
    try {
      const response = await geocodingApi.get('/reverse', {
        params: { lat, lon },
      });
      return response.data;
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      throw error;
    }
  },
};