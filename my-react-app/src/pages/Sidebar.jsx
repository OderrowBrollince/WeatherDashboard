export default function Sidebar({ activePage = 'home' }) {
  const savedCities = [
    { name: 'Nairobi', isActive: true },
    { name: 'Lagos', isActive: false },
    { name: 'Cape Town', isActive: false }
  ];

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
            <div className="px-3 pt-4 pb-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Cities</p>
            </div>

            {savedCities.map((city, index) => (
              <a
                key={index}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${
                  city.isActive
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-slate-100 dark:hover:bg-surface-highlight'
                }`}
                href="#"
              >
                <span
                  className={`material-symbols-outlined ${
                    city.isActive
                      ? 'text-primary'
                      : 'text-slate-500 dark:text-slate-400 group-hover:text-primary'
                  }`}
                  style={city.isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  location_on
                </span>
                <span
                  className={`font-medium ${
                    city.isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 group-hover:text-primary'
                  }`}
                >
                  {city.name}
                </span>
              </a>
            ))}
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
