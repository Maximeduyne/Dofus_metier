import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAccountStore from '../stores/accountStore';
import { DOFUS_CLASSES, DOFUS_SERVERS } from '../data/constants';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';

export default function AccountCharacters() {
  const { accountId } = useParams();
  const { accounts, addCharacter, updateCharacter, deleteCharacter } = useAccountStore();
  const account = accounts.find((a) => a.id === parseInt(accountId));

  const [newCharacter, setNewCharacter] = useState({
    name: '',
    class: '',
    server: '',
    level: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCharacter.name && newCharacter.class && newCharacter.server) {
      addCharacter(parseInt(accountId), newCharacter);
      setNewCharacter({ name: '', class: '', server: '', level: '' });
    }
  };

  const handleDelete = (characterId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
      deleteCharacter(parseInt(accountId), characterId);
    }
  };

  if (!account) return <div>Compte non trouvé</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/comptes" className="text-yellow-400 hover:text-yellow-500">
          ← Retour aux comptes
        </Link>
        <h2 className="text-3xl font-bold">Personnages de {account.name}</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg bg-yellow-400 bg-opacity-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nom du personnage"
            value={newCharacter.name}
            onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <select
            value={newCharacter.class}
            onChange={(e) => setNewCharacter({ ...newCharacter, class: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Sélectionner une classe</option>
            {DOFUS_CLASSES.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
          <select
            value={newCharacter.server}
            onChange={(e) => setNewCharacter({ ...newCharacter, server: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Sélectionner un serveur</option>
            {DOFUS_SERVERS.map((server) => (
              <option key={server} value={server}>
                {server}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Niveau"
            value={newCharacter.level}
            onChange={(e) => setNewCharacter({ ...newCharacter, level: e.target.value })}
            min="1"
            max="200"
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors"
        >
          Ajouter un personnage
        </button>
      </form>

      <div className="grid gap-6">
        {account.characters?.map((character) => (
          <div key={character.id} className="p-6 rounded-lg bg-yellow-400 bg-opacity-10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{character.name}</h3>
                <p className="text-sm">
                  {character.class} - Niveau {character.level} - Serveur {character.server}
                </p>
              </div>
              <div className="flex gap-2">
                <Menu as="div" className="relative">
                  <Menu.Button className="p-2 rounded hover:bg-gray-700 transition-colors">
                    <PencilIcon className="h-5 w-5" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg p-2 z-10">
                    <div className="space-y-2">
                      <select
                        value={character.class}
                        onChange={(e) => updateCharacter(parseInt(accountId), character.id, { class: e.target.value })}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                      >
                        {DOFUS_CLASSES.map((className) => (
                          <option key={className} value={className}>
                            {className}
                          </option>
                        ))}
                      </select>
                      <select
                        value={character.server}
                        onChange={(e) => updateCharacter(parseInt(accountId), character.id, { server: e.target.value })}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                      >
                        {DOFUS_SERVERS.map((server) => (
                          <option key={server} value={server}>
                            {server}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={character.level}
                        onChange={(e) => updateCharacter(parseInt(accountId), character.id, { level: parseInt(e.target.value) })}
                        min="1"
                        max="200"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                      />
                    </div>
                  </Menu.Items>
                </Menu>
                <button
                  onClick={() => handleDelete(character.id)}
                  className="p-2 rounded hover:bg-red-600 transition-colors text-red-500 hover:text-white"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <Link
                  to={`/comptes/${accountId}/personnages/${character.id}/metiers`}
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors"
                >
                  Métiers
                </Link>
                <Link
                  to={`/comptes/${accountId}/personnages/${character.id}/ressources`}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Ressources
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}