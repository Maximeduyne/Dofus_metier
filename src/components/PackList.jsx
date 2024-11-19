import React, { useState } from 'react';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/solid';
import PackForm from './PackForm';
import Confirm from './Confirm';

const PackList = ({ packs, onPackUpdated }) => {
  const [editingPack, setEditingPack] = useState(null);
  const [packToDelete, setPackToDelete] = useState(null);

  const handleEdit = async (packData) => {
    try {
      await db.packs.update(editingPack.id, packData);
      onPackUpdated();
      notify.success('Pack mis à jour avec succès');
      setEditingPack(null);
    } catch (error) {
      console.error('Erreur mise à jour pack:', error);
      notify.error('Erreur lors de la mise à jour du pack');
    }
  };

  const handleDelete = async () => {
    try {
      await db.packs.delete(packToDelete.id);
      onPackUpdated();
      notify.success('Pack supprimé avec succès');
      setPackToDelete(null);
    } catch (error) {
      console.error('Erreur suppression pack:', error);
      notify.error('Erreur lors de la suppression du pack');
    }
  };

  const handleUpdateProgress = async (packId, itemId, obtained) => {
    try {
      await db.packs.updateItemProgress(packId, itemId, obtained);
      onPackUpdated();
    } catch (error) {
      console.error('Erreur mise à jour progression:', error);
      notify.error('Erreur lors de la mise à jour de la progression');
    }
  };

  if (packs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Vous n'avez pas encore créé de pack
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {packs.map((pack) => (
        <div
          key={pack.id}
          className="p-4 rounded-lg bg-yellow-400 bg-opacity-10"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{pack.name}</h4>
              {pack.description && (
                <p className="text-sm text-gray-400 mt-1">{pack.description}</p>
              )}
              
              <div className="mt-4">
                <div className="text-sm text-gray-400">
                  {pack.jobType} - Niveau {pack.startLevel} à {pack.targetLevel}
                </div>
                
                <div className="mt-2 space-y-2">
                  {pack.items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span>{item.resource.icon}</span>
                          <span>{item.resource.name}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {item.obtained} / {item.quantity}
                        </div>
                      </div>
                      
                      <input
                        type="number"
                        value={item.obtained}
                        onChange={(e) => handleUpdateProgress(
                          pack.id,
                          item.id,
                          Math.min(item.quantity, Math.max(0, parseInt(e.target.value) || 0))
                        )}
                        className="w-20 p-1 rounded bg-gray-700"
                        min="0"
                        max={item.quantity}
                      />

                      {item.obtained >= item.quantity && (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingPack(pack)}
                className="p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPackToDelete(pack)}
                className="p-2 rounded hover:bg-red-600 transition-colors text-red-500 hover:text-white"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {editingPack && (
        <PackForm
          initialData={editingPack}
          onSubmit={handleEdit}
          onCancel={() => setEditingPack(null)}
        />
      )}

      <Confirm
        isOpen={!!packToDelete}
        onClose={() => setPackToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer le pack"
        message={`Êtes-vous sûr de vouloir supprimer le pack "${packToDelete?.name}" ?`}
        type="danger"
      />
    </div>
  );
};

export default PackList;