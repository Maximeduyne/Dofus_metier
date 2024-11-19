import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAccountStore from '../stores/accountStore';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';
import { JOB_ITEMS } from '../data/jobItems';
import XPProgressBar from '../components/XPProgressBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { getXPForLevel, getXPToNextLevel } from '../data/jobsXP';
import { ArrowPathIcon, BeakerIcon, ScissorsIcon } from '@heroicons/react/24/solid';

export default function JobXPCalculator() {
  const { accountId, characterId, jobName } = useParams();
  const { accounts, initialize } = useAccountStore();
  
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [pendingXP, setPendingXP] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('harvest');
  const [availableItems, setAvailableItems] = useState({ harvests: [], crafts: [] });
  const [searchTerm, setSearchTerm] = useState('');
  
  const account = accounts.find(a => a.id === parseInt(accountId));
  const character = account?.characters?.find(c => c.id === parseInt(characterId));
  const job = character?.jobs?.find(j => j.name === jobName);

  useEffect(() => {
    if (job?.level && JOB_ITEMS[job.name]) {
      const jobItems = JOB_ITEMS[job.name];
      setAvailableItems({
        harvests: jobItems.harvests.filter(item => item.minLevel <= job.level),
        crafts: jobItems.crafts.filter(item => item.minLevel <= job.level)
      });
    }
  }, [job]);

  const filteredItems = (type) => {
    const items = type === 'harvest' ? availableItems.harvests : availableItems.crafts;
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleAddActivity = (item, type) => {
    const xp = item.baseXP * selectedQuantity;
    setActivities(prev => [...prev, { 
      ...item, 
      type,
      quantity: selectedQuantity, 
      xp 
    }]);
    setPendingXP(prev => prev + xp);
    notify.success(`${item.name} ajouté (${xp} XP)`);
  };

  const handleRemoveActivity = (index) => {
    const removedActivity = activities[index];
    setActivities(prev => prev.filter((_, i) => i !== index));
    setPendingXP(prev => prev - removedActivity.xp);
    notify.info(`${removedActivity.name} retiré (-${removedActivity.xp} XP)`);
  };

  const handleClearActivities = () => {
    if (activities.length === 0) return;
    setActivities([]);
    setPendingXP(0);
    notify.info('Liste des activités effacée');
  };

  const handleValidateXP = async () => {
    if (!job || pendingXP <= 0) return;

    setLoading(true);
    try {
      // Enregistrer chaque activité
      await Promise.all(activities.map(activity => 
        db.jobs.addActivity(job.id, {
          type: activity.type,
          itemId: activity.id,
          quantity: activity.quantity,
          xpGained: activity.xp
        })
      ));

      await initialize();
      setActivities([]);
      setPendingXP(0);
      notify.success('XP validée avec succès !');
    } catch (error) {
      console.error('Erreur validation XP:', error);
      notify.error('Erreur lors de la validation de l\'XP');
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <div>Métier non trouvé</div>;

  const xpNeeded = getXPToNextLevel(job.currentXP);
  const remainingXPAfterPending = Math.max(0, xpNeeded - pendingXP);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to={`/comptes/${accountId}/personnages/${characterId}/metiers`}
          className="text-yellow-400 hover:text-yellow-500"
        >
          ← Retour aux métiers
        </Link>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <span>{job.icon}</span>
          <span>{job.name}</span>
        </h2>
      </div>

      <div className="mb-8 p-6 rounded-lg bg-yellow-400 bg-opacity-10">
        <XPProgressBar currentXP={job.currentXP} level={job.level} />
        <div className="mt-4 flex justify-between items-center text-sm">
          <span className="text-gray-400">
            {xpNeeded.toLocaleString()} XP requis pour le niveau {job.level + 1}
          </span>
          {pendingXP > 0 && (
            <span className="text-yellow-400">
              {remainingXPAfterPending.toLocaleString()} XP restants après validation
            </span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Section Gauche - Sélection des activités */}
        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-yellow-400 bg-opacity-10">
            {/* Onglets */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedTab('harvest')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === 'harvest' 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <ScissorsIcon className="h-5 w-5" />
                Récoltes
              </button>
              <button
                onClick={() => setSelectedTab('craft')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === 'craft' 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <BeakerIcon className="h-5 w-5" />
                Crafts
              </button>
            </div>

            {/* Contrôles */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    min="1"
                  />
                </div>
              </div>

              {/* Liste des items */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredItems(selectedTab).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAddActivity(item, selectedTab.toUpperCase())}
                    className="w-full p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-left"
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span className="text-yellow-400">+{item.baseXP * selectedQuantity} XP</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Niveau minimum: {item.minLevel}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Droite - Activités en cours */}
        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-yellow-400 bg-opacity-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Activités en cours</h3>
              <div className="flex items-center gap-4">
                <span className="text-lg">
                  Total : <span className="text-yellow-400 font-bold">{pendingXP.toLocaleString()} XP</span>
                </span>
                {activities.length > 0 && (
                  <button
                    onClick={handleClearActivities}
                    className="p-2 rounded hover:bg-gray-700 transition-colors"
                    title="Effacer tout"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {activities.length > 0 ? (
              <>
                <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
                  {activities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 rounded bg-gray-700"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{activity.name}</span>
                          <span className="text-sm text-gray-400">×{activity.quantity}</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {activity.type === 'HARVEST' ? 'Récolte' : 'Craft'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-yellow-400">+{activity.xp.toLocaleString()} XP</span>
                        <button
                          onClick={() => handleRemoveActivity(index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleValidateXP}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Validation en cours...</span>
                    </>
                  ) : (
                    <span>Valider {pendingXP.toLocaleString()} XP</span>
                  )}
                </button>
              </>
            ) : (
              <div className="text-center text-gray-400 py-8">
                Aucune activité en cours
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}