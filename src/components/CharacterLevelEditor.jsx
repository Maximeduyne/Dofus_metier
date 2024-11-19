import React, { useState } from 'react';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';

const CharacterLevelEditor = ({ character, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLevel, setNewLevel] = useState(character.level);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.characters.update(character.id, {
        ...character,
        level: parseInt(newLevel)
      });
      onUpdate();
      setIsEditing(false);
      notify.success('Niveau du personnage mis à jour');
    } catch (error) {
      console.error('Erreur mise à jour niveau:', error);
      notify.error('Erreur lors de la mise à jour du niveau');
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
      >
        Niveau {character.level}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="number"
        value={newLevel}
        onChange={(e) => setNewLevel(e.target.value)}
        className="w-20 p-1 rounded bg-gray-700"
        min="1"
        max="200"
      />
      <button
        type="submit"
        className="px-2 py-1 bg-yellow-400 text-gray-900 rounded text-sm hover:bg-yellow-500 transition-colors"
      >
        OK
      </button>
      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="px-2 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600 transition-colors"
      >
        ✕
      </button>
    </form>
  );
};

export default CharacterLevelEditor;