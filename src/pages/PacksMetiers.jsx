import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';
import PackForm from '../components/PackForm';
import PackList from '../components/PackList';
import PackTemplateList from '../components/PackTemplateList';

export default function PacksMetiers() {
  const [showPackForm, setShowPackForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState('templates');
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPacks();
  }, []);

  const loadPacks = async () => {
    try {
      const data = await db.packs.getAll();
      setPacks(data);
    } catch (error) {
      console.error('Erreur chargement packs:', error);
      notify.error('Erreur lors du chargement des packs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPack = async (packData) => {
    try {
      await db.packs.create(packData);
      await loadPacks();
      notify.success('Pack créé avec succès');
      setShowPackForm(false);
    } catch (error) {
      console.error('Erreur création pack:', error);
      notify.error('Erreur lors de la création du pack');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Packs Métiers</h2>

      {/* Onglets */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedTab('templates')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedTab === 'templates'
              ? 'bg-yellow-400 text-gray-900'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Modèles de packs
        </button>
        <button
          onClick={() => setSelectedTab('custom')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedTab === 'custom'
              ? 'bg-yellow-400 text-gray-900'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Mes packs
        </button>
      </div>

      {/* Contenu */}
      <div className="space-y-6">
        {selectedTab === 'templates' ? (
          <PackTemplateList 
            packs={packs.filter(p => p.isTemplate)} 
            onPackCreated={loadPacks}
          />
        ) : (
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPackForm(true)}
                className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Créer un pack
              </button>
            </div>
            <PackList 
              packs={packs.filter(p => !p.isTemplate)} 
              onPackUpdated={loadPacks}
            />
          </>
        )}

        {showPackForm && (
          <PackForm
            onSubmit={handleAddPack}
            onCancel={() => setShowPackForm(false)}
          />
        )}
      </div>
    </div>
  );
}