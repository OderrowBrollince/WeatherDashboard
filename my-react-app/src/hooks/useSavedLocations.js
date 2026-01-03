import { useState, useEffect } from 'react';

const STORAGE_KEY = 'weather_saved_locations';

export const useSavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState([]);

  // Load saved locations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedLocations(parsed);
      } catch (error) {
        console.error('Error parsing saved locations:', error);
        setSavedLocations([]);
      }
    } else {
      // Initialize with default locations
      const defaultLocations = [
        { id: '1', name: 'Nairobi', country: 'KE' },
        { id: '2', name: 'Lagos', country: 'NG' },
        { id: '3', name: 'Cape Town', country: 'ZA' },
      ];
      setSavedLocations(defaultLocations);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLocations));
    }
  }, []);

  // Save to localStorage whenever locations change
  useEffect(() => {
    if (savedLocations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));
    }
  }, [savedLocations]);

  const addLocation = (name, country) => {
    const newLocation = {
      id: Date.now().toString(),
      name,
      country,
    };
    setSavedLocations((prev) => {
      // Check if location already exists
      const exists = prev.some(
        (loc) => loc.name.toLowerCase() === name.toLowerCase() && loc.country === country
      );
      if (exists) return prev;
      return [...prev, newLocation];
    });
  };

  const removeLocation = (id) => {
    setSavedLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  return {
    savedLocations,
    addLocation,
    removeLocation,
  };
};