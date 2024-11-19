import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function DatabaseStatus({ status }) {
  const getStatusComponent = () => {
    if (status.checking) {
      return (
        <div className="fixed top-4 right-4 bg-yellow-400/10 px-4 py-2 rounded-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-400 border-t-transparent" />
          <span>Vérification de la connexion...</span>
        </div>
      );
    }

    if (!status.connected) {
      return (
        <div className="fixed top-4 right-4 bg-red-500/10 px-4 py-2 rounded-lg flex items-center gap-2 text-red-500">
          <XCircleIcon className="h-5 w-5" />
          <span>Base de données déconnectée</span>
        </div>
      );
    }

    return (
      <div className="fixed top-4 right-4 bg-green-500/10 px-4 py-2 rounded-lg flex items-center gap-2 text-green-500">
        <CheckCircleIcon className="h-5 w-5" />
        <span>Base de données connectée</span>
      </div>
    );
  };

  return getStatusComponent();
}