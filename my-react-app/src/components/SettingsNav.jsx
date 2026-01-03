export default function SettingsNav({ activePage = 'settings' }) {
  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'map', icon: 'map', label: 'Map' },
    { id: 'settings', icon: 'settings', label: 'Settings', filled: true },
    { id: 'profile', icon: 'person', label: 'Profile' }
  ];

  return (
    <aside className="w-64 h-full flex flex-col justify-between bg-background-dark border-r border-[#233c48] shrink-0 z-20 hidden md:flex">
      <div className="flex flex-col gap-4 p-4">
        {/* Profile / Brand */}
        <div className="flex gap-3 items-center mb-6">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20"
            style={{
              backgroundImage: `url("")`
            }}
          ></div>
          <div className="flex flex-col">
            <h1 className="text-white text-base font-medium leading-normal">WeatherDash</h1>
            <p className="text-text-secondary text-xs font-normal leading-normal">Pro Plan</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                activePage === item.id
                  ? 'bg-input-dark border border-white/5'
                  : 'hover:bg-input-dark/50'
              }`}
              href="#"
            >
              <span
                className={`material-symbols-outlined ${
                  activePage === item.id ? 'text-primary' : 'text-text-secondary group-hover:text-white'
                }`}
                style={{
                  fontSize: '24px',
                  fontVariationSettings: item.filled && activePage === item.id ? "'FILL' 1" : undefined
                }}
              >
                {item.icon}
              </span>
              <p
                className={`text-sm font-medium leading-normal ${
                  activePage === item.id ? 'text-white' : 'text-text-secondary group-hover:text-white'
                }`}
              >
                {item.label}
              </p>
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-red-500/10 hover:text-red-400 text-text-secondary transition-colors group">
          <span className="material-symbols-outlined group-hover:text-red-400" style={{ fontSize: '24px' }}>
            logout
          </span>
          <p className="text-sm font-medium leading-normal">Log Out</p>
        </button>
      </div>
    </aside>
  );
}
