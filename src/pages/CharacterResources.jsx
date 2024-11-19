import { useParams, Link } from 'react-router-dom';
import useAccountStore from '../stores/accountStore';

export default function CharacterResources() {
  const { accountId, characterId } = useParams();
  const { accounts } = useAccountStore();
  
  const account = accounts.find((a) => a.id === parseInt(accountId));
  const character = account?.characters?.find((c) => c.id === parseInt(characterId));

  if (!account || !character) return <div>Personnage non trouvé</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to={`/comptes/${accountId}/personnages/${characterId}/metiers`} 
          className="text-yellow-400 hover:text-yellow-500"
        >
          ← Retour aux métiers
        </Link>
        <h2 className="text-3xl font-bold">Ressources de {character.name}</h2>
      </div>

      <div className="p-6 rounded-lg bg-yellow-400 bg-opacity-10">
        <p className="text-lg mb-4">
          Gérez ici les ressources nécessaires pour les packs métiers de {character.name}.
        </p>
        
        {character.jobs?.map((job) => (
          <div key={job.name} className="mb-6">
            <h3 className="text-xl font-semibold mb-3">
              {job.icon} {job.name} (Niveau {job.level})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ici nous ajouterons la gestion des ressources par métier */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}