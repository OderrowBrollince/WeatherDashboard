import { useState, useEffect, useRef } from 'react';
import { geocodingService } from '../api/services';
import { useWeather } from '../context/WeatherContext';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const { setLocation } = useWeather();

  // Debounced search function
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        const results = await geocodingService.searchLocations(searchQuery);
        setSearchResults(results);
        setShowResults(results.length > 0);
      } catch (error) {
        console.error('Error searching cities:', error);
        setSearchResults([]);
        setShowResults(false);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        resultsRef.current &&
        !searchRef.current.contains(event.target) &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city) => {
    // Use setLocation from WeatherContext
    setLocation(city.name, city.country);
    setSearchQuery(`${city.name}, ${city.country}`);
    setShowResults(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleCitySelect(searchResults[0]);
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  return (
    <div className="flex-1 max-w-lg w-full relative" ref={searchRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#92b7c9] group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined">search</span>
        </div>
        <input
          className="block w-full pl-10 pr-10 py-2.5 border-none rounded-lg bg-[#233c48] text-white placeholder-[#92b7c9] focus:ring-2 focus:ring-primary focus:bg-[#1e293b] transition-all sm:text-sm"
          placeholder="Search city..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowResults(searchResults.length > 0)}
          onKeyDown={handleKeyDown}
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-2 bg-[#1e293b] border border-[#233c48] rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {searchResults.map((city, index) => (
            <button
              key={index}
              onClick={() => handleCitySelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-[#233c48] transition-colors border-b border-[#233c48] last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-white font-medium">{city.name}</span>
                  <span className="text-[#92b7c9] text-sm">
                    {city.state && `${city.state}, `}
                    {city.country}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#92b7c9] text-xl">
                  location_on
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}