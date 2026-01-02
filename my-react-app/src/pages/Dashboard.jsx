import { useEffect, useMemo } from 'react';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import HighlightCard from '../components/HighlightCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useWeather } from '../context/WeatherContext';

export default function Dashboard() {
  const { weatherData, hourlyData, loading, error, currentLocation } = useWeather();

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

  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
  const timeStr = currentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const location = currentLocation 
    ? `${currentLocation.name}, ${currentLocation.country}`
    : 'Loading...';

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-bold text-white mb-1 flex items-center gap-3">
            {location}
            <span className="material-symbols-outlined text-primary fill-1">near_me</span>
          </h2>
          <p className="text-[#92b7c9] text-lg font-medium">
            {dateStr} • {timeStr}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#233c48]/50 px-4 py-2 rounded-full border border-[#233c48]">
          <span className="material-symbols-outlined text-yellow-400 text-sm">sunny</span>
          <span className="text-sm font-medium text-white">
            Sunrise {weatherData.sunrise.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#92b7c9]"></span>
          <span className="material-symbols-outlined text-orange-400 text-sm">bedtime</span>
          <span className="text-sm font-medium text-white">
            Sunset {weatherData.sunset.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
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