import { useState } from 'react';
import SettingsNav from '../components/SettingsNav';
import AirQualityGauge from '../components/AirQualityGauge';
import PollutantCard from '../components/PollutantCard';
import LocationListItem from '../components/LocationListItem';

export default function Settings() {
  const [units, setUnits] = useState('metric');
  const [theme, setTheme] = useState('dark');
  const [locations, setLocations] = useState([
    { id: 1, city: 'San Francisco, CA', country: 'United States' },
    { id: 2, city: 'Tokyo', country: 'Japan' },
    { id: 3, city: 'London', country: 'United Kingdom' }
  ]);

  const pollutants = [
    { name: 'PM2.5', value: 12, status: 'good' },
    { name: 'PM10', value: 18, status: 'good' },
    { name: 'O₃', value: 45, status: 'good' },
    { name: 'NO₂', value: 8, status: 'good' },
    { name: 'SO₂', value: 2, status: 'good' },
    { name: 'CO', value: 240, status: 'good' }
  ];

  const handleDeleteLocation = (id) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  return (
    <div className="flex h-screen w-full">
      <SettingsNav />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative flex flex-col">
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
              <section className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>
                    tune
                  </span>
                  <h2 className="text-slate-900 dark:text-white text-lg font-bold">General Preferences</h2>
                </div>
                <div className="p-6 flex flex-col gap-6">
                  {/* Temperature Units */}
                  <div className="flex flex-col gap-3">
                    <label className="text-slate-500 dark:text-text-secondary text-sm font-medium">
                      Temperature & Wind Units
                    </label>
                    <div className="flex h-10 w-full items-center justify-center rounded-lg bg-slate-100 dark:bg-input-dark p-1">
                      <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[4px] px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-text-secondary text-sm font-medium transition-all">
                        <span className="truncate">Metric (°C, km/h)</span>
                        <input
                          checked={units === 'metric'}
                          onChange={() => setUnits('metric')}
                          className="invisible w-0"
                          name="units"
                          type="radio"
                          value="metric"
                        />
                      </label>
                      <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[4px] px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-text-secondary text-sm font-medium transition-all">
                        <span className="truncate">Imperial (°F, mph)</span>
                        <input
                          checked={units === 'imperial'}
                          onChange={() => setUnits('imperial')}
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
                    <label className="text-slate-500 dark:text-text-secondary text-sm font-medium">
                      Appearance
                    </label>
                    <div className="flex h-10 w-full items-center justify-center rounded-lg bg-slate-100 dark:bg-input-dark p-1">
                      {['dark', 'light', 'system'].map((themeOption) => (
                        <label
                          key={themeOption}
                          className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[4px] px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-text-secondary text-sm font-medium transition-all gap-2"
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
                            onChange={() => setTheme(themeOption)}
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
              <section className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>
                      bookmark
                    </span>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold">Saved Locations</h2>
                  </div>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      add
                    </span>{' '}
                    Add New
                  </button>
                </div>
                <div className="p-2">
                  {locations.map((location) => (
                    <LocationListItem
                      key={location.id}
                      city={location.city}
                      country={location.country}
                      onDelete={() => handleDeleteLocation(location.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Data & Storage */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">save</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Local Storage Active
                    </span>
                    <span className="text-xs text-slate-500 dark:text-text-secondary">
                      Preferences saved automatically
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    history
                  </span>
                  Clear Search History
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Air Quality Insights */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              {/* Main AQI Card */}
              <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden relative">
                {/* Abstract Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-green-500"
                        style={{ fontVariationSettings: "'FILL' 1", fontSize: '24px' }}
                      >
                        energy_savings_leaf
                      </span>
                      <h2 className="text-slate-900 dark:text-white text-lg font-bold">Air Quality Index</h2>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-text-secondary">
                      San Francisco
                    </span>
                  </div>

                  <AirQualityGauge
                    value={42}
                    status="Good"
                    description="Air quality is satisfactory, and air pollution poses little or no risk."
                  />
                </div>

                {/* Pollutants Grid */}
                <div className="bg-slate-50 dark:bg-[#152028] p-6 border-t border-slate-100 dark:border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-text-secondary mb-4">
                    Major Pollutants
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {pollutants.map((pollutant, index) => (
                      <PollutantCard key={index} {...pollutant} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Health Recommendation */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-green-500 text-white rounded-lg p-2 shrink-0">
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                    health_and_safety
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">Health Advice</h4>
                  <p className="text-slate-600 dark:text-text-secondary text-sm leading-relaxed">
                    Enjoy your outdoor activities! It's a great day to open your windows and let fresh air in.
                  </p>
                </div>
              </div>

              {/* Global Map Preview */}
              <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden h-48 relative group cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYjT-ezQrxClQFG1MNHDrTCbca_qLyy78Fs70z8XKggEdeCQt2QgJdY4u1utP3bA4BGq8TnsMF9bERPc4VZa3jUmPRJrSkAld6eNG4H3JHEFbPxhlDP2bK8t2hqEylULFWXVqQAkndyiLb7Xjxr3xRf9VgHK2H7Qgxy4YHeb8WHcJM0qqbWHZyl28QTEi0sE1oOlrj6jQ7g--tSm6Ilgr5CnLUcEvqS-GpZDsobjs0Mw93dvy1P9qTGFwYDMndPUgOVsPhcuGJFsw")`
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
