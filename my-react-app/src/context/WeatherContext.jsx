import { createContext, useContext, useState, useEffect } from 'react';
import { weatherService, geocodingService } from '../api/services';
import { transformCurrentWeather, transformHourlyForecast, transformForecast, transformAirQuality } from '../utils/weatherHelpers';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load default location on mount
  useEffect(() => {
    if (!currentLocation) {
      setLocation('Nairobi', 'KE');
    }
  }, []);

  const setLocation = async (cityName, countryCode = '') => {
    try {
      setLoading(true);
      setError(null);

      // Fetch weather data
      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(cityName, countryCode),
        weatherService.getForecast(cityName, countryCode),
      ]);

      const transformedCurrent = transformCurrentWeather(currentWeather);
      const transformedHourly = transformHourlyForecast(forecast);
      const transformedForecast = transformForecast(forecast);

      const coordinates = transformedCurrent.coordinates;

      // Fetch air quality data using coordinates
      let airQuality = null;
      try {
        const airPollution = await weatherService.getAirPollution(coordinates.lat, coordinates.lon);
        airQuality = transformAirQuality(airPollution);
      } catch (aqError) {
        console.error('Error fetching air quality:', aqError);
        // Air quality is optional, don't fail the whole request
      }

      setCurrentLocation({
        name: transformedCurrent.city,
        country: transformedCurrent.country,
        coordinates: coordinates,
      });

      setWeatherData(transformedCurrent);
      setForecastData(transformedForecast);
      setHourlyData(transformedHourly);
      setAirQualityData(airQuality);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const setLocationByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      // Get location name from coordinates
      const reverseGeo = await geocodingService.reverseGeocode(lat, lon);
      const locationName = reverseGeo[0]?.name || 'Unknown';
      const countryCode = reverseGeo[0]?.country || '';

      // Fetch weather data
      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeatherByCoords(lat, lon),
        weatherService.getForecastByCoords(lat, lon),
      ]);

      const transformedCurrent = transformCurrentWeather(currentWeather);
      const transformedHourly = transformHourlyForecast(forecast);
      const transformedForecast = transformForecast(forecast);

      // Fetch air quality data
      let airQuality = null;
      try {
        const airPollution = await weatherService.getAirPollution(lat, lon);
        airQuality = transformAirQuality(airPollution);
      } catch (aqError) {
        console.error('Error fetching air quality:', aqError);
      }

      setCurrentLocation({
        name: locationName,
        country: countryCode,
        coordinates: { lat, lon },
      });

      setWeatherData(transformedCurrent);
      setForecastData(transformedForecast);
      setHourlyData(transformedHourly);
      setAirQualityData(airQuality);
    } catch (err) {
      console.error('Error fetching weather by coordinates:', err);
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentLocation,
    weatherData,
    forecastData,
    hourlyData,
    airQualityData,
    loading,
    error,
    setLocation,
    setLocationByCoords,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};