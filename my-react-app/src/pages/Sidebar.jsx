import { useWeather } from '../context/WeatherContext';
import { useSavedLocations } from '../hooks/useSavedLocations';

export default function Sidebar({ activePage = 'home' }) {
  const { currentLocation, setLocation } = useWeather();
  const { savedLocations, removeLocation } = useSavedLocations();

  const handleLocationClick = (location) => {
    setLocation(location.name, location.country);
  };

  const handleRemoveLocation = (e, locationId) => {
    e.stopPropagation(); // Prevent triggering the location click
    removeLocation(locationId);
  };

  // Check if a location is currently active
  const isLocationActive = (location) => {
    if (!currentLocation) return false;
    return (
      currentLocation.name.toLowerCase() === location.name.toLowerCase() &&
      currentLocation.country === location.country
    );
  };

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111c22] h-full flex-shrink-0">
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex flex-col px-2">
            <h1 className="text-primary text-xl font-bold tracking-tight">Forecast</h1>
            <p className="text-slate-500 dark:text-[#92b7c9] text-sm font-normal">Weather App</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <a
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-highlight transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                home
              </span>
              <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-primary transition-colors">
                Home Dashboard
              </span>
            </a>

            {/* Saved Cities Section */}
            <div className="px-3 pt-4 pb-2 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Cities</p>
            </div>

            {savedLocations.length === 0 ? (
              <div className="px-3 py-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">No saved locations</p>
              </div>
            ) : (
              savedLocations.map((location) => {
                const isActive = isLocationActive(location);
                return (
                  <div
                    key={location.id}
                    className={`relative flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group cursor-pointer ${
                      isActive
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-slate-100 dark:hover:bg-surface-highlight'
                    }`}
                    onClick={() => handleLocationClick(location)}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        isActive
                          ? 'text-primary'
                          : 'text-slate-500 dark:text-slate-400 group-hover:text-primary'
                      }`}
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      location_on
                    </span>
                    <span
                      className={`font-medium flex-1 ${
                        isActive
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-300 group-hover:text-primary'
                      }`}
                    >
                      {location.name}
                    </span>
                    <button
                      onClick={(e) => handleRemoveLocation(e, location.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-500"
                      title="Remove location"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                );
              })
            )}
          </nav>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-3 py-4 border-t border-slate-200 dark:border-slate-800">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium dark:text-white">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pro Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
}