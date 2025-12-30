export default function HourlyForecast({ hours }) {
  const defaultHours = [
    { time: 'Now', icon: 'partly_cloudy_day', temp: 18, isActive: true },
    { time: '11 AM', icon: 'cloud', temp: 19, isActive: false },
    { time: '12 PM', icon: 'sunny', temp: 21, isActive: false },
    { time: '1 PM', icon: 'sunny', temp: 22, isActive: false },
  ];

  const hourlyData = hours || defaultHours;

  return (
    <div className="lg:col-span-1 bg-surface-dark border border-[#233c48] rounded-xl p-6 flex flex-col gap-4">
      <h3 className="text-lg font-bold text-white mb-2">Hourly Forecast</h3>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[280px] pr-2">
        {hourlyData.map((hour, index) => (
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
                hour.icon === 'sunny'
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
