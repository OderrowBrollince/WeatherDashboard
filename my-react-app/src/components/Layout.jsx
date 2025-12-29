import { useState } from 'react';
import SearchBar from './SearchBar';

export default function Layout({ children }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden">
        {/* Ambient Background Glow */}
        <div className="fixed inset-0 z-0 bg-weather-gradient pointer-events-none"></div>

        {/* Main Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full grow">
          {/* Header */}
          <header className="sticky top-0 z-50 backdrop-blur-md bg-[#111c22]/80 border-b border-[#233c48] px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="size-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-[28px]">cloud</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight">WeatherDash</h1>
              </div>

              {/* Search Bar */}
              <SearchBar />

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                <button
                  aria-label="Locate Me"
                  className="flex items-center justify-center size-10 rounded-lg bg-[#233c48] hover:bg-[#2d4a58] hover:text-primary transition-colors text-white"
                >
                  <span className="material-symbols-outlined">my_location</span>
                </button>
                <button
                  aria-label="Toggle Theme"
                  onClick={toggleTheme}
                  className="flex items-center justify-center size-10 rounded-lg bg-[#233c48] hover:bg-[#2d4a58] hover:text-primary transition-colors text-white"
                >
                  <span className="material-symbols-outlined">
                    {isDark ? 'light_mode' : 'dark_mode'}
                  </span>
                </button>
                <div className="h-8 w-[1px] bg-[#233c48] mx-1 hidden md:block"></div>
                <div className="hidden md:flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold border border-primary/30">
                    JD
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
