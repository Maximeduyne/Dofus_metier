import React from 'react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Paramètres</h2>
      <div className="grid gap-6">
        <div className="p-6 rounded-lg bg-yellow-400 bg-opacity-10">
          <h3 className="text-xl font-semibold mb-4">Apparence</h3>
          <p>Les paramètres d'apparence seront bientôt disponibles</p>
        </div>
        <div className="p-6 rounded-lg bg-yellow-400 bg-opacity-10">
          <h3 className="text-xl font-semibold mb-4">Données</h3>
          <p>Les options de sauvegarde et restauration seront bientôt disponibles</p>
        </div>
        <div className="p-6 rounded-lg bg-yellow-400 bg-opacity-10">
          <h3 className="text-xl font-semibold mb-4">À propos</h3>
          <p>Version 1.0.0</p>
          <p>© 2024 Dofus Métiers</p>
        </div>
      </div>
    </div>
  );
}