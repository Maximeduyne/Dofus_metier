import React from 'react';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';
import { ClipboardIcon } from '@heroicons/react/24/solid';

const PackTemplateList = ({ packs, onPackCreated }) => {
  const handleUseTemplate = async (template) => {
    try {
      const { id, isTemplate, ...packData } = template;
      await db.packs.create({
        ...packData,
        name: `${packData.name} (Copie)`,
        isTemplate: false
      });
      onPackCreated();
      notify.success('Pack créé à partir du modèle');
    } catch (error) {
      console.error('Erreur création pack:', error);
      notify.error('Erreur lors de la création du pack');
    }
  };

  if (packs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Aucun modèle de pack disponible
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
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
                
                <div className="mt-2 space-y-1">
                  {pack.items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-2"
                    >
                      <span>{item.resource.icon}</span>
                      <span>{item.resource.name}</span>
                      <span className="text-sm text-gray-400">
                        ×{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleUseTemplate(pack)}
              className="p-2 rounded hover:bg-gray-700 transition-colors"
              title="Utiliser ce modèle"
            >
              <ClipboardIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackTemplateList;