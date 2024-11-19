import React, { useState } from 'react';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';
import { getXPForLevel } from '../data/jobsXP';

const JobLevelEditor = ({ job, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLevel, setNewLevel] = useState(job.level);
  const [newXP, setNewXP] = useState(job.currentXP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.jobs.updateLevelAndXP(job.id, {
        level: parseInt(newLevel),
        currentXP: parseInt(newXP)
      });
      onUpdate();
      setIsEditing(false);
      notify.success('Niveau et XP mis à jour avec succès');
    } catch (error) {
      console.error('Erreur mise à jour niveau:', error);
      notify.error('Erreur lors de la mise à jour du niveau');
    }
  };

  const handleLevelChange = (value) => {
    const level = Math.max(1, Math.min(200, parseInt(value) || 1));
    setNewLevel(level);
    setNewXP(getXPForLevel(level));
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
      >
        Modifier le niveau
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div>
          <label className="block text-sm text-gray-400">Niveau</label>
          <input
            type="number"
            value={newLevel}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="w-20 p-1 rounded bg-gray-700"
            min="1"
            max="200"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400">XP</label>
          <input
            type="number"
            value={newXP}
            onChange={(e) => setNewXP(e.target.value)}
            className="w-32 p-1 rounded bg-gray-700"
            min="0"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-yellow-400 text-gray-900 rounded text-sm hover:bg-yellow-500 transition-colors"
        >
          Valider
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default JobLevelEditor;