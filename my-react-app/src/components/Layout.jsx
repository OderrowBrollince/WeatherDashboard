import { useState } from 'react';
import SearchBar from './SearchBar';

export default function Layout({ children, currentPage, setCurrentPage }) {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
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

              {/* Right Actions - Desktop */}
              <div className="hidden md:flex items-center gap-3">
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
                
                {/* Navigation Buttons - Desktop */}
                <div className="h-8 w-[1px] bg-[#233c48] mx-1"></div>
                <button
                  onClick={() => handleNavigation('forecast')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'forecast'
                      ? 'bg-primary text-white'
                      : 'bg-[#233c48] hover:bg-[#2d4a58] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  Forecast
                </button>
                <button
                  onClick={() => handleNavigation('settings')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'settings'
                      ? 'bg-primary text-white'
                      : 'bg-[#233c48] hover:bg-[#2d4a58] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">settings</span>
                  Settings
                </button>
                
                <div className="h-8 w-[1px] bg-[#233c48] mx-1"></div>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold border border-primary/30">
                    OO
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  aria-label="Toggle Theme"
                  onClick={toggleTheme}
                  className="flex items-center justify-center size-10 rounded-lg bg-[#233c48] hover:bg-[#2d4a58] hover:text-primary transition-colors text-white"
                >
                  <span className="material-symbols-outlined">
                    {isDark ? 'light_mode' : 'dark_mode'}
                  </span>
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-center size-10 rounded-lg bg-[#233c48] hover:bg-[#2d4a58] hover:text-primary transition-colors text-white"
                  aria-label="Toggle Menu"
                >
                  <span className="material-symbols-outlined">
                    {isMobileMenuOpen ? 'close' : 'menu'}
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-[#233c48] pt-4">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavigation('dashboard')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      currentPage === 'dashboard'
                        ? 'bg-primary text-white'
                        : 'bg-[#233c48] hover:bg-[#2d4a58] text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined">dashboard</span>
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavigation('forecast')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      currentPage === 'forecast'
                        ? 'bg-primary text-white'
                        : 'bg-[#233c48] hover:bg-[#2d4a58] text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined">calendar_today</span>
                    Forecast
                  </button>
                  <button
                    onClick={() => handleNavigation('settings')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      currentPage === 'settings'
                        ? 'bg-primary text-white'
                        : 'bg-[#233c48] hover:bg-[#2d4a58] text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                  </button>
                  <button
                    aria-label="Locate Me"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-left bg-[#233c48] hover:bg-[#2d4a58] text-white transition-colors"
                  >
                    <span className="material-symbols-outlined">my_location</span>
                    Locate Me
                  </button>
                </div>
              </div>
            )}
          </header>

          {/* Main Content */}
          {children}
        </div>
      </div>
    </div>
  );
}