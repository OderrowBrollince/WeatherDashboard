import ForecastCard from '../components/ForecastCard';
import HourlyChart from '../components/HourlyChart';

export default function Forecast() {
  const forecastDays = [
    { day: 'Today', date: 'Oct 24', icon: 'wb_sunny', high: 72, low: 58, precipitation: 0, isActive: true },
    { day: 'Fri', date: 'Oct 25', icon: 'cloud', high: 68, low: 55, precipitation: 10, isActive: false },
    { day: 'Sat', date: 'Oct 26', icon: 'rainy', high: 65, low: 52, precipitation: 60, isActive: false },
    { day: 'Sun', date: 'Oct 27', icon: 'thunderstorm', high: 64, low: 50, precipitation: 80, isActive: false },
    { day: 'Mon', date: 'Oct 28', icon: 'wb_sunny', high: 70, low: 55, precipitation: 0, isActive: false }
  ];

  const detailCards = [
    { icon: 'air', label: 'Wind Speed', value: '12', unit: 'mph NW', bgColor: 'bg-slate-100 dark:bg-slate-800', iconColor: 'text-slate-500 dark:text-slate-400' },
    { icon: 'water_drop', label: 'Humidity', value: '45', unit: '%', bgColor: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-primary' },
    { icon: 'light_mode', label: 'UV Index', value: '3', unit: 'Moderate', bgColor: 'bg-orange-50 dark:bg-orange-900/20', iconColor: 'text-orange-500' }
  ];

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
