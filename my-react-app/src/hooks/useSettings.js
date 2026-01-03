import { useState, useEffect } from 'react';

const SETTINGS_STORAGE_KEY = 'weather_app_settings';

export const useSettings = () => {
  const [units, setUnits] = useState('metric');
  const [theme, setTheme] = useState('dark');

  // Load settings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUnits(parsed.units || 'metric');
        setTheme(parsed.theme || 'dark');
        // Apply theme immediately
        applyTheme(parsed.theme || 'dark');
      } catch (error) {
        console.error('Error parsing settings:', error);
      }
    } else {
      // Apply default theme
      applyTheme('dark');
    }
  }, []);

  // Apply theme to document
  const applyTheme = (themeValue) => {
    const root = document.documentElement;
    if (themeValue === 'light') {
      root.classList.remove('dark');
    } else if (themeValue === 'dark') {
      root.classList.add('dark');
    } else if (themeValue === 'system') {
      // Use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = { units, theme };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    applyTheme(theme);
  }, [units, theme]);

  const updateUnits = (newUnits) => {
    setUnits(newUnits);
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return {
    units,
    theme,
    updateUnits,
    updateTheme,
  };
};