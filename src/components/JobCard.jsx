import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, TrashIcon } from '@heroicons/react/24/solid';
import XPProgressBar from './XPProgressBar';

export default function JobCard({ job, characterId, accountId, onDelete }) {
  return (
    <div className="p-4 rounded-lg bg-yellow-400 bg-opacity-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{job.icon}</span>
          <div>
            <h3 className="text-xl font-semibold">{job.name}</h3>
            <p className="text-sm text-gray-400">Niveau {job.level}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/comptes/${accountId}/personnages/${characterId}/metiers/${encodeURIComponent(job.name)}/xp`}
            className="p-2 rounded hover:bg-gray-600 transition-colors"
            title="Calculateur XP"
          >
            <ChartBarIcon className="h-5 w-5" />
          </Link>
          <button
            onClick={() => onDelete(job.id)}
            className="p-2 rounded hover:bg-red-600 transition-colors text-red-500 hover:text-white"
            title="Supprimer le métier"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <XPProgressBar currentXP={job.currentXP} level={job.level} />
    </div>
  );
}