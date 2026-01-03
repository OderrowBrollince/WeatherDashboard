import { useMemo } from 'react';
import ForecastCard from '../components/ForecastCard';
import HourlyChart from '../components/HourlyChart';
import { useWeather } from '../context/WeatherContext';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function Forecast() {
  const { forecastData, weatherData, loading, error } = useWeather();

  // Transform forecast data for ForecastCard components
  const forecastDays = useMemo(() => {
    if (!forecastData || forecastData.length === 0) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return forecastData.map((day, index) => {
      const dayDate = new Date(day.date);
      dayDate.setHours(0, 0, 0, 0);
      const isToday = dayDate.getTime() === today.getTime();

      return {
        day: isToday ? 'Today' : day.day,
        date: day.dateStr,
        icon: day.icon,
        high: day.high,
        low: day.low,
        precipitation: parseInt(day.precipitation) || 0,
        isActive: index === 0, // First day is active by default
      };
    });
  }, [forecastData]);

  // Helper function for wind direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  // Helper function for UV index status
  const getUVStatus = (uvIndex) => {
    if (!uvIndex) return 'N/A';
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
  };

  // Detail cards with real data
  const detailCards = useMemo(() => {
    if (!weatherData) return [];

    return [
      {
        icon: 'air',
        label: 'Wind Speed',
        value: Math.round(weatherData.windSpeed),
        unit: `km/h ${getWindDirection(weatherData.windDirection)}`,
        bgColor: 'bg-slate-100 dark:bg-slate-800',
        iconColor: 'text-slate-500 dark:text-slate-400',
      },
      {
        icon: 'water_drop',
        label: 'Humidity',
        value: weatherData.humidity,
        unit: '%',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        iconColor: 'text-primary',
      },
      {
        icon: 'light_mode',
        label: 'UV Index',
        value: weatherData.uvIndex || 'N/A',
        unit: getUVStatus(weatherData.uvIndex),
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        iconColor: 'text-orange-500',
      },
    ];
  }, [weatherData]);

  // Loading state
  if (loading) {
    return (
      <div className="flex-1 px-6 py-8 md:px-10">
        <LoadingState />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex-1 px-6 py-8 md:px-10">
        <ErrorState message={error} />
      </div>
    );
  }

  // No data state
  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="flex-1 px-6 py-8 md:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center h-64">
          <p className="text-slate-500 dark:text-[#92b7c9]">No forecast data available. Please search for a city.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-8 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* 5-Day Forecast Grid */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">date_range</span>
            5-Day Forecast
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {forecastDays.map((day, index) => (
              <ForecastCard key={index} {...day} />
            ))}
          </div>
        </section>

        {/* Detailed View Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <HourlyChart />
          </div>

          {/* Side Stats Column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white hidden lg:block">Details</h3>
            {detailCards.map((card, index) => (
              <div
                key={index}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-5 flex items-center gap-4 transition-colors hover:border-primary/30"
              >
                <div className={`h-12 w-12 rounded-full ${card.bgColor} flex items-center justify-center ${card.iconColor}`}>
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-slate-500 dark:text-[#92b7c9]">{card.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {card.value} <span className="text-base font-normal text-slate-400">{card.unit}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}