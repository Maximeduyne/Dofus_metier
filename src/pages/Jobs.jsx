import { useState } from 'react';
import useAccountStore from '../stores/accountStore';
import { jobs } from '../data/jobs';

export default function Jobs() {
  const { accounts, updateCharacterJob } = useAccountStore();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [jobLevel, setJobLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAccount && selectedCharacter && selectedJob && jobLevel) {
      const job = jobs.find((j) => j.name === selectedJob);
      updateCharacterJob(parseInt(selectedAccount), parseInt(selectedCharacter), {
        ...job,
        level: parseInt(jobLevel),
      });
      setJobLevel('');
    }
  };

  const selectedAccountData = accounts.find((a) => a.id === parseInt(selectedAccount));

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Gestion des Métiers</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg bg-yellow-400 bg-opacity-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select
            value={selectedAccount}
            onChange={(e) => {
              setSelectedAccount(e.target.value);
              setSelectedCharacter('');
            }}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Sélectionner un compte</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.server})
              </option>
            ))}
          </select>

          <select
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
            disabled={!selectedAccount}
          >
            <option value="">Sélectionner un personnage</option>
            {selectedAccountData?.characters.map((character) => (
              <option key={character.id} value={character.id}>
                {character.name}
              </option>
            ))}
          </select>

          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
            disabled={!selectedCharacter}
          >
            <option value="">Sélectionner un métier</option>
            {jobs.map((job) => (
              <option key={job.name} value={job.name}>
                {job.icon} {job.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Niveau du métier"
            value={jobLevel}
            onChange={(e) => setJobLevel(e.target.value)}
            min="1"
            max="200"
            className="p-2 rounded bg-gray-700 text-white"
            disabled={!selectedJob}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors"
        >
          Mettre à jour le métier
        </button>
      </form>

      <div className="grid gap-6">
        {accounts.map((account) =>
          account.characters?.map((character) => (
            <div key={character.id} className="p-6 rounded-lg bg-yellow-400 bg-opacity-10">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{character.name}</h3>
                  <p className="text-sm">{account.name} ({account.server})</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {character.jobs?.map((job) => (
                  <div key={job.name} className="flex items-center gap-2 bg-gray-700 p-2 rounded">
                    <span>{job.icon}</span>
                    <span>{job.name}</span>
                    <span className="ml-auto">{job.level}/200</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}