import { useState } from 'react';
import useAccountStore from '../stores/accountStore';
import { jobs } from '../data/jobs';

export default function Characters() {
  const { accounts, addCharacter } = useAccountStore();
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    class: '',
    level: '',
    accountId: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCharacter.name && newCharacter.accountId) {
      addCharacter(parseInt(newCharacter.accountId), newCharacter);
      setNewCharacter({ name: '', class: '', level: '', accountId: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Mes Personnages</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg bg-yellow-400 bg-opacity-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nom du personnage"
            value={newCharacter.name}
            onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Classe"
            value={newCharacter.class}
            onChange={(e) => setNewCharacter({ ...newCharacter, class: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Niveau"
            value={newCharacter.level}
            onChange={(e) => setNewCharacter({ ...newCharacter, level: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <select
            value={newCharacter.accountId}
            onChange={(e) => setNewCharacter({ ...newCharacter, accountId: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Sélectionner un compte</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.server})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors"
        >
          Ajouter un personnage
        </button>
      </form>

      <div className="grid gap-6">
        {accounts.map((account) =>
          account.characters?.map((character) => (
            <div key={character.id} className="p-6 rounded-lg bg-yellow-400 bg-opacity-10">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{character.name}</h3>
                  <p className="text-sm">
                    {character.class} - Niveau {character.level}
                  </p>
                </div>
                <span className="text-sm bg-gray-700 px-3 py-1 rounded">
                  {account.name} ({account.server})
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {character.jobs?.map((job) => (
                  <div key={job.name} className="flex items-center gap-2">
                    <span>{job.icon}</span>
                    <span>{job.name}: {job.level}</span>
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