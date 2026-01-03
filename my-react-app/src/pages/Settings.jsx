import { useState, useEffect } from 'react';
import SettingsNav from '../components/SettingsNav';
import LocationListItem from '../components/LocationListItem';
import { useWeather } from '../context/WeatherContext';
import { useSavedLocations } from '../hooks/useSavedLocations';
import { useSettings } from '../hooks/useSettings';
import { geocodingService } from '../api/services';

export default function Settings() {
  const { currentLocation, setLocation } = useWeather();
  const { savedLocations, addLocation, removeLocation } = useSavedLocations();
  const { units, theme, updateUnits, updateTheme } = useSettings();

  const [showAddLocation, setShowAddLocation] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search for locations when typing
  useEffect(() => {
    if (!locationSearch.trim()) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        const results = await geocodingService.searchLocations(locationSearch);
        setSearchResults(results.slice(0, 5)); // Limit to 5 results
      } catch (error) {
        console.error('Error searching locations:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [locationSearch]);

  const handleAddLocation = (city) => {
    addLocation(city.name, city.country);
    setLocationSearch('');
    setSearchResults([]);
    setShowAddLocation(false);
  };

  const handleDeleteLocation = (id) => {
    removeLocation(id);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear search history?')) {
      // Clear search history from localStorage if you have one
      localStorage.removeItem('weather_search_history');
      alert('Search history cleared!');
    }
  };

  return (
    <div className="flex h-screen w-full bg-background-dark">
      <SettingsNav />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative flex flex-col bg-background-dark">
        {/* Header */}
        <header className="w-full px-6 py-8 md:px-10 lg:pt-10 lg:pb-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              Settings & Air Quality
            </h1>
            <p className="text-text-secondary text-base font-normal leading-normal max-w-2xl">
              Manage your system preferences, saved locations, and view detailed environmental reports.
            </p>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 px-6 pb-10 md:px-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Settings */}
            <div className="xl:col-span-7 flex flex-col gap-6">
              {/* General Preferences */}
              <section className="bg-card-dark rounded-xl shadow-sm border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>
                    tune
                  </span>
                  <h2 className="text-white text-lg font-bold">General Preferences</h2>
                </div>
                <div className="p-6 flex flex-col gap-6">
                  {/* Temperature Units */}
                  <div className="flex flex-col gap-3">
                    <label className="text-text-secondary text-sm font-medium">
                      Temperature & Wind Units
                    </label>
                    <div className="flex h-10 w-full items-center justify-center rounded-lg bg-input-dark p-1">
                      <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[4px] px-2 has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-text-secondary text-sm font-medium transition-all">
                        <span className="truncate">Metric (°C, km/h)</span>
                        <input
                          checked={units === 'metric'}
                          onChange={() => updateUnits('metric')}
                          className="invisible w-0"
                          name="units"
                          type="radio"
                          value="metric"
                        />
                      </label>
                      <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[4px] px-2 has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-text-secondary text-sm font-medium transition-all">
                        <span className="truncate">Imperial (°F, mph)</span>
                        <input
                          checked={units === 'imperial'}
                          onChange={() => updateUnits('imperial')}
                          className="invisible w-0"
                          name="units"
                          type="radio"
                          value="imperial"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Appearance */}
                  <div className="flex flex-col gap-3">
                    <label className="text-text-secondary text-sm font-medium">
                      Appearance
                    </label>
                    <div className="flex h-10 w-full items-center justify-center rounded-lg bg-input-dark p-1">
                      {['dark', 'light', 'system'].map((themeOption) => (
                        <label
                          key={themeOption}
                          className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[4px] px-2 has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-text-secondary text-sm font-medium transition-all gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {themeOption === 'dark'
                              ? 'dark_mode'
                              : themeOption === 'light'
                              ? 'light_mode'
                              : 'settings_system_daydream'}
                          </span>
                          <span className="truncate capitalize">{themeOption}</span>
                          <input
                            checked={theme === themeOption}
                            onChange={() => updateTheme(themeOption)}
                            className="invisible w-0"
                            name="theme"
                            type="radio"
                            value={themeOption}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Saved Locations */}
              <section className="bg-card-dark rounded-xl shadow-sm border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>
                      bookmark
                    </span>
                    <h2 className="text-white text-lg font-bold">Saved Locations</h2>
                  </div>
                  <button
                    onClick={() => setShowAddLocation(!showAddLocation)}
                    className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      {showAddLocation ? 'close' : 'add'}
                    </span>{' '}
                    {showAddLocation ? 'Cancel' : 'Add New'}
                  </button>
                </div>

                {/* Add Location Search */}
                {showAddLocation && (
                  <div className="px-6 py-4 border-b border-white/5">
                    <div className="relative">
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Search for a city..."
                        className="w-full px-4 py-2 rounded-lg bg-input-dark border border-white/10 text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {isSearching && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        </div>
                      )}
                      {searchResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-2 bg-card-dark border border-white/10 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {searchResults.map((city, index) => (
                            <button
                              key={index}
                              onClick={() => handleAddLocation(city)}
                              className="w-full px-4 py-3 text-left hover:bg-input-dark transition-colors border-b border-white/5 last:border-b-0"
                            >
                              <div className="flex flex-col">
                                <span className="text-white font-medium">{city.name}</span>
                                <span className="text-text-secondary text-sm">
                                  {city.state && `${city.state}, `}
                                  {city.country}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-2">
                  {savedLocations.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-text-secondary text-sm">No saved locations. Add one to get started!</p>
                    </div>
                  ) : (
                    savedLocations.map((location) => (
                      <LocationListItem
                        key={location.id}
                        city={location.name}
                        country={location.country}
                        onDelete={() => handleDeleteLocation(location.id)}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Data & Storage */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card-dark rounded-xl shadow-sm border border-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">save</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      Local Storage Active
                    </span>
                    <span className="text-xs text-text-secondary">
                      Preferences saved automatically
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleClearHistory}
                  className="px-4 py-2 rounded-lg border border-white/10 text-red-500 hover:bg-red-500/10 text-sm font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    history
                  </span>
                  Clear Search History
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Air Quality Insights */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              {/* Global Map Preview */}
              <div className="bg-card-dark rounded-xl shadow-sm border border-white/5 overflow-hidden h-48 relative group cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://africa.com/wp-content/uploads/2025/04/Africa-World-Map.jpg")`
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <p className="text-white font-bold">View AQI Map</p>
                    <p className="text-white/70 text-xs">Real-time global heatmap</p>
                  </div>
                  <span className="material-symbols-outlined text-white">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}