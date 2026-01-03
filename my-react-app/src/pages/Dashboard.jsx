import { useEffect, useMemo, useState } from 'react';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import HighlightCard from '../components/HighlightCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useWeather } from '../context/WeatherContext';
import { getFormattedDateTime, formatTimeInTimezone } from '../utils/timezoneHelpers';

export default function Dashboard() {
  const { weatherData, hourlyData, loading, error, currentLocation, setLocationByCoords } = useWeather();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLocating, setIsLocating] = useState(false);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle getting user's current location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationByCoords(latitude, longitude);
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
        
        let errorMessage = 'Unable to get your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Calculate highlights from weatherData
  const highlights = useMemo(() => {
    if (!weatherData) return [];

    const calculateDewPoint = (temp, humidity) => {
      return Math.round(temp - ((100 - humidity) / 5));
    };

    const getWindDirection = (degrees) => {
      const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      return directions[Math.round(degrees / 45) % 8];
    };

    return [
      {
        title: 'Humidity',
        icon: 'humidity_percentage',
        value: weatherData.humidity,
        unit: '%',
        subtitle: `Dew point: ${calculateDewPoint(weatherData.temp, weatherData.humidity)}°`,
      },
      {
        title: 'Wind Status',
        icon: 'air',
        value: weatherData.windSpeed,
        unit: 'km/h',
        subtitle: `🧭 ${getWindDirection(weatherData.windDirection)}`,
      },
      {
        title: 'UV Index',
        icon: 'wb_sunny',
        value: weatherData.uvIndex || 'N/A',
        unit: 'Mod',
        progress: weatherData.uvIndex ? (weatherData.uvIndex / 11) * 100 : 0,
      },
      {
        title: 'Visibility',
        icon: 'visibility',
        value: weatherData.visibility,
        unit: 'km',
        subtitle: 'Clear view',
      },
      {
        title: 'Pressure',
        icon: 'compress',
        value: weatherData.pressure,
        unit: 'hPa',
        subtitle: 'Stable conditions',
      },
    ];
  }, [weatherData]);

  // Get formatted date and time based on city's timezone
  const { dateStr, timeStr } = useMemo(() => {
    if (!weatherData || !weatherData.timezone) {
      const now = new Date();
      return {
        dateStr: now.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
        }),
        timeStr: now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      };
    }
    return getFormattedDateTime(weatherData.timezone);
  }, [weatherData, currentTime]);

  if (loading && !weatherData) {
    return (
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <LoadingState />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <ErrorState message={error} />
      </main>
    );
  }

  if (!weatherData) {
    return null;
  }

  const location = currentLocation 
    ? `${currentLocation.name}, ${currentLocation.country}`
    : 'Loading...';

  // Format sunrise/sunset times in city's timezone
  const sunriseTime = weatherData.timezone 
    ? formatTimeInTimezone(weatherData.sunrise, weatherData.timezone)
    : weatherData.sunrise.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  
  const sunsetTime = weatherData.timezone
    ? formatTimeInTimezone(weatherData.sunset, weatherData.timezone)
    : weatherData.sunset.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-bold text-white mb-1 flex items-center gap-3">
            {location}
            <button
              onClick={handleGetCurrentLocation}
              disabled={isLocating || loading}
              className="flex items-center justify-center text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Get my current location"
              aria-label="Get my current location"
            >
              {isLocating ? (
                <span className="material-symbols-outlined animate-spin">sync</span>
              ) : (
                <span className="material-symbols-outlined fill-1">near_me</span>
              )}
            </button>
          </h2>
          <p className="text-[#92b7c9] text-lg font-medium">
            {dateStr} • {timeStr}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#233c48]/50 px-4 py-2 rounded-full border border-[#233c48]">
          <span className="material-symbols-outlined text-yellow-400 text-sm">sunny</span>
          <span className="text-sm font-medium text-white">
            Sunrise {sunriseTime}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#92b7c9]"></span>
          <span className="material-symbols-outlined text-orange-400 text-sm">bedtime</span>
          <span className="text-sm font-medium text-white">
            Sunset {sunsetTime}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CurrentWeather data={weatherData} />
        <HourlyForecast hours={hourlyData} />
      </div>

      <h3 className="text-xl font-bold text-white mb-4">Today's Highlights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {highlights.map((highlight, index) => (
          <HighlightCard key={index} {...highlight} />
        ))}
      </div>
    </main>
  );
}