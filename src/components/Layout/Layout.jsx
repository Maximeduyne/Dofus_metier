import React from 'react';

export default function Layout({ children, darkMode }) {
  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className="min-h-screen transition-colors duration-200">
        {children}
      </div>
    </div>
  );
}