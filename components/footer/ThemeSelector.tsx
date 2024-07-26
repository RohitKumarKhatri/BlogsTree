'use client';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';

const ThemeSelector = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      setTheme('system');
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        if (e.matches) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
      }
    };

    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkMediaQuery.addEventListener('change', handleSystemThemeChange);

    return () =>
      darkMediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      document.documentElement.classList.add(systemTheme);
      document.documentElement.classList.remove(
        systemTheme === 'dark' ? 'light' : 'dark'
      );
    } else {
      document.documentElement.classList.add(newTheme);
      document.documentElement.classList.remove(
        newTheme === 'dark' ? 'light' : 'dark'
      );
    }
  };

  return (
    <div className="flex space-x-4 mx-auto">
      <button
        onClick={() => handleThemeChange('light')}
        className={`${theme === 'light' ? 'text-yellow-500' : ''}`}>
        <FaSun />
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className={`${theme === 'dark' ? 'text-blue-400' : ''}`}>
        <FaMoon />
      </button>
      <button
        onClick={() => handleThemeChange('system')}
        className={`${theme === 'system' ? 'text-blue-500' : ''}`}>
        <FaDesktop />
      </button>
    </div>
  );
};

export default ThemeSelector;
