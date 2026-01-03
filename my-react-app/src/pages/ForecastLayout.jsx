import { useMemo } from 'react';
import Sidebar from './Sidebar';
import { useWeather } from '../context/WeatherContext';

export default function ForecastLayout({ children, setCurrentPage }) {
  const { currentLocation, forecastData } = useWeather();

  // Calculate date range from forecast data
  const dateRange = useMemo(() => {
    if (!forecastData || forecastData.length === 0) return '';

    const firstDate = forecastData[0].dateStr;
    const lastDate = forecastData[forecastData.length - 1].dateStr;
    return `${firstDate} - ${lastDate}`;
  }, [forecastData]);

  // Get city name
  const cityName = useMemo(() => {
    if (!currentLocation) return 'Search for a city';
    return `${currentLocation.name}${currentLocation.country ? `, ${currentLocation.country}` : ''}`;
  }, [currentLocation]);

  return (
    <div className="flex h-screen w-full">
      <Sidebar setCurrentPage={setCurrentPage} />

      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-light dark:bg-background-dark relative">
        <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-6 py-6 md:px-10">
          <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight dark:text-white text-slate-900">
                {cityName}
              </h2>
              {dateRange && (
                <div className="flex items-center gap-2 text-slate-500 dark:text-[#92b7c9]">
                  <span className="material-symbols-outlined text-xl">calendar_today</span>
                  <p className="text-base font-normal">{dateRange}</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}