import { useMemo } from 'react';
import { useWeather } from '../context/WeatherContext';

export default function HourlyForecast({ hours }) {
  const { hourlyData: contextHourlyData } = useWeather();

  // Transform hourly data for display
  const processedHours = useMemo(() => {
    // Use hours prop if provided, otherwise use context data, otherwise default
    const dataSource = hours || contextHourlyData || [];
    
    if (!dataSource || dataSource.length === 0) {
      return [
        { time: 'Now', icon: 'partly_cloudy_day', temp: 18, isActive: true },
        { time: '11 AM', icon: 'cloud', temp: 19, isActive: false },
        { time: '12 PM', icon: 'sunny', temp: 21, isActive: false },
        { time: '1 PM', icon: 'sunny', temp: 22, isActive: false },
      ];
    }

    // Transform the hourly data to match component format
    return dataSource.slice(0, 12).map((hour, index) => {
      // For the first item, show "Now" instead of time
      const displayTime = index === 0 ? 'Now' : hour.time;
      
      return {
        time: displayTime,
        icon: hour.icon || 'wb_sunny',
        temp: hour.temp,
        isActive: index === 0, // First hour is active
      };
    });
  }, [hours, contextHourlyData]);

  return (
    <div className="lg:col-span-1 bg-surface-dark border border-[#233c48] rounded-xl p-6 flex flex-col gap-4">
      <h3 className="text-lg font-bold text-white mb-2">Hourly Forecast</h3>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[280px] pr-2">
        {processedHours.map((hour, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors group cursor-pointer ${
              hour.isActive
                ? 'bg-[#111c22]'
                : 'bg-transparent hover:bg-[#233c48] border border-transparent hover:border-[#233c48]'
            }`}
          >
            <span
              className={`font-medium w-16 ${
                hour.isActive ? 'text-white' : 'text-[#92b7c9] group-hover:text-white'
              }`}
            >
              {hour.time}
            </span>
            <span
              className={`material-symbols-outlined ${
                hour.icon === 'sunny' || hour.icon === 'wb_sunny'
                  ? 'text-yellow-400 group-hover:text-yellow-300'
                  : hour.isActive
                  ? 'text-primary'
                  : 'text-[#92b7c9] group-hover:text-white'
              }`}
            >
              {hour.icon}
            </span>
            <span
              className={`font-bold ${
                hour.isActive ? 'text-white' : 'text-[#92b7c9] group-hover:text-white'
              }`}
            >
              {hour.temp}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}