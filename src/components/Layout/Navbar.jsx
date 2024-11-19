import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/comptes', label: 'Comptes' },
  { path: '/packs-metiers', label: 'Packs Métiers' },
  { path: '/parametres', label: 'Paramètres' }
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="p-6">
      <div className="container mx-auto flex flex-col items-center">
        <Link to="/" className="block">
          <h1 className="text-4xl font-bold text-center mb-12 text-yellow-400">
            DOFUS MÉTIERS
          </h1>
        </Link>
        <div className="flex flex-col items-center space-y-6 text-xl">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`transition-colors ${
                location.pathname === path ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}