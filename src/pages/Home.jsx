import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Bienvenue sur Dofus Métiers</h2>
      <p className="text-lg mb-4">
        Gérez vos personnages et leurs métiers efficacement avec notre outil dédié.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/comptes" className="block">
          <div className="p-6 rounded-lg bg-yellow-400 bg-opacity-10 hover:bg-opacity-20 transition-all">
            <h3 className="text-xl font-semibold mb-3">Personnages</h3>
            <p>Créez et gérez vos personnages Dofus</p>
          </div>
        </Link>
        <Link to="/comptes" className="block">
          <div className="p-6 rounded-lg bg-yellow-400 bg-opacity-10 hover:bg-opacity-20 transition-all">
            <h3 className="text-xl font-semibold mb-3">Métiers</h3>
            <p>Suivez la progression de vos métiers</p>
          </div>
        </Link>
      </div>
    </div>
  );
}