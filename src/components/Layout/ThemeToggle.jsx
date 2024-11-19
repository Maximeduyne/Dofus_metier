import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed bottom-6 right-6 p-3 rounded-full transition-all duration-200 shadow-lg ${
        darkMode 
          ? 'bg-brakmar-dark text-brakmar-red hover:bg-brakmar-dark/80' 
          : 'bg-white text-bonta-blue hover:bg-bonta-lighter'
      }`}
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
}