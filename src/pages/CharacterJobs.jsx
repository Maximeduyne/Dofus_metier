import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAccountStore from '../stores/accountStore';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';
import { jobs } from '../data/jobs';
import JobCard from '../components/JobCard';
import Confirm from '../components/Confirm';
import EmptyState from '../components/EmptyState';
import { PlusIcon, WrenchIcon } from '@heroicons/react/24/solid';

export default function CharacterJobs() {
  const { accountId, characterId } = useParams();
  const { accounts, initialize } = useAccountStore();
  const [selectedJob, setSelectedJob] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  
  const account = accounts.find(a => a.id === parseInt(accountId));
  const character = account?.characters?.find(c => c.id === parseInt(characterId));
  
  const availableJobs = jobs.filter(job => 
    !character?.jobs?.some(characterJob => characterJob.name === job.name)
  );

  const handleAddJob = async () => {
    if (selectedJob) {
      try {
        const jobToAdd = jobs.find(j => j.name === selectedJob);
        if (jobToAdd) {
          await db.jobs.create(parseInt(characterId), {
            name: jobToAdd.name,
            level: 1,
            currentXP: 0,
            icon: jobToAdd.icon
          });
          
          await initialize();
          notify.success('Métier ajouté avec succès');
          setSelectedJob('');
        }
      } catch (error) {
        console.error('Erreur ajout métier:', error);
        notify.error('Erreur lors de l\'ajout du métier');
      }
    }
  };

  const handleDeleteJob = async (jobId) => {
    setJobToDelete(jobId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await db.jobs.delete(jobToDelete);
      await initialize();
      notify.success('Métier supprimé avec succès');
    } catch (error) {
      console.error('Erreur suppression métier:', error);
      notify.error('Erreur lors de la suppression du métier');
    }
  };

  if (!account || !character) return <div>Personnage non trouvé</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to={`/comptes/${accountId}/personnages`}
          className="text-yellow-400 hover:text-yellow-500"
        >
          ← Retour aux personnages
        </Link>
        <h2 className="text-3xl font-bold">Métiers de {character.name}</h2>
      </div>

      {availableJobs.length > 0 && (
        <div className="mb-8 p-6 rounded-lg bg-yellow-400 bg-opacity-10">
          <div className="flex gap-4">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="flex-grow p-2 rounded bg-gray-700 text-white"
            >
              <option value="">Sélectionner un métier</option>
              {availableJobs.map((job) => (
                <option key={job.name} value={job.name}>
                  {job.icon} {job.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddJob}
              disabled={!selectedJob}
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Ajouter
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {character.jobs?.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            characterId={characterId}
            accountId={accountId}
            onDelete={handleDeleteJob}
          />
        ))}

        {character.jobs?.length === 0 && (
          <EmptyState
            icon={WrenchIcon}
            title="Aucun métier"
            message="Commencez par ajouter un métier à votre personnage"
          />
        )}
      </div>

      <Confirm
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Supprimer le métier"
        message="Êtes-vous sûr de vouloir supprimer ce métier ? Cette action est irréversible."
        type="danger"
      />
    </div>
  );
}