import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import HighlightCard from '../components/HighlightCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function Dashboard() {
  // Mock data
  const weatherData = {
    temp: 18,
    feelsLike: 16,
    low: 14,
    high: 20,
    precipitation: 12,
    description: 'Scattered Clouds',
    icon: 'partly_cloudy_day'
  };

  const highlights = [
    { title: 'Humidity', icon: 'humidity_percentage', value: 82, unit: '%', subtitle: 'Dew point: 15°' },
    { title: 'Wind Status', icon: 'air', value: 12, unit: 'km/h', subtitle: '🧭 NE Direction' },
    { title: 'UV Index', icon: 'wb_sunny', value: 3.0, unit: 'Mod', progress: 30 },
    { title: 'Visibility', icon: 'visibility', value: 10, unit: 'km', subtitle: 'Clear view' },
    { title: 'Pressure', icon: 'compress', value: 1014, unit: 'hPa', subtitle: 'Stable conditions' }
  ];

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-bold text-white mb-1 flex items-center gap-3">
            London, GB
            <span className="material-symbols-outlined text-primary fill-1">near_me</span>
          </h2>
          <p className="text-[#92b7c9] text-lg font-medium">Wednesday, 14 Oct • 10:23 AM</p>
        </div>
        <div className="flex items-center gap-2 bg-[#233c48]/50 px-4 py-2 rounded-full border border-[#233c48]">
          <span className="material-symbols-outlined text-yellow-400 text-sm">sunny</span>
          <span className="text-sm font-medium text-white">Sunrise 06:45 AM</span>
          <span className="w-1 h-1 rounded-full bg-[#92b7c9]"></span>
          <span className="material-symbols-outlined text-orange-400 text-sm">bedtime</span>
          <span className="text-sm font-medium text-white">Sunset 06:15 PM</span>
        </div>
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CurrentWeather data={weatherData} />
        <HourlyForecast />
      </div>


      <h3 className="text-xl font-bold text-white mb-4">Today's Highlights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {highlights.map((highlight, index) => (
          <HighlightCard key={index} {...highlight} />
        ))}
      </div>


      <div className="mt-16 pt-8 border-t border-[#233c48] opacity-80 hover:opacity-100 transition-opacity">
        <h4 className="text-sm uppercase tracking-wider text-[#92b7c9] font-bold mb-6">
          Design System: Feedback States
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs text-white mb-2">Loading State</p>
            <LoadingState />
          </div>
          <div>
            <p className="text-xs text-white mb-2">Error State</p>
            <ErrorState />
          </div>
        </div>
      </div>
    </main>
  );
}
