import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAccountStore from '../stores/accountStore';
import { PencilIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function Accounts() {
  const { accounts, addAccount, updateAccount, deleteAccount } = useAccountStore();
  const [newAccount, setNewAccount] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    isGoogle: false 
  });
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState({});
  const [editingAccount, setEditingAccount] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAccount.name) {
      // S'assurer que toutes les propriétés sont incluses lors de la création
      const accountData = {
        name: newAccount.name,
        email: newAccount.email || '',
        password: newAccount.password || '',
        isGoogle: newAccount.isGoogle || false,
        characters: []
      };
      addAccount(accountData);
      setNewAccount({ name: '', email: '', password: '', isGoogle: false });
    }
  };

  const handleEdit = (account) => {
    if (editingId === account.id) {
      // S'assurer que toutes les propriétés sont incluses lors de la mise à jour
      const updates = {
        name: editingAccount.name,
        email: editingAccount.email,
        password: editingAccount.password,
        isGoogle: editingAccount.isGoogle
      };
      updateAccount(account.id, updates);
      setEditingId(null);
      setEditingAccount(null);
    } else {
      setEditingId(account.id);
      setEditingAccount({ ...account });
    }
  };

  const handleDelete = (accountId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      deleteAccount(accountId);
    }
  };

  const handleEditChange = (field, value) => {
    setEditingAccount(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (accountId) => {
    setShowPassword(prev => ({ ...prev, [accountId]: !prev[accountId] }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Mes Comptes</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg bg-yellow-400 bg-opacity-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nom du compte"
            value={newAccount.name}
            onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newAccount.email}
            onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={newAccount.password}
            onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newAccount.isGoogle}
              onChange={(e) => setNewAccount({ ...newAccount, isGoogle: e.target.checked })}
              className="rounded bg-gray-700"
            />
            <label>Compte Google</label>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors"
        >
          Ajouter un compte
        </button>
      </form>

      <div className="grid gap-6">
        {accounts.map((account) => (
          <div 
            key={account.id} 
            className="p-6 rounded-lg bg-yellow-400 bg-opacity-10"
          >
            {editingId === account.id && editingAccount ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={editingAccount.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="email"
                  value={editingAccount.email}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                />
                <div className="relative">
                  <input
                    type={showPassword[account.id] ? "text" : "password"}
                    value={editingAccount.password}
                    onChange={(e) => handleEditChange('password', e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white w-full"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(account.id)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword[account.id] ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingAccount.isGoogle}
                    onChange={(e) => handleEditChange('isGoogle', e.target.checked)}
                    className="rounded bg-gray-700"
                  />
                  <label>Compte Google</label>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{account.name}</h3>
                  {account.email && <p className="text-sm text-gray-400">{account.email}</p>}
                  <p className="text-sm">{account.isGoogle ? "Compte Google" : "Compte Standard"}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(account)}
                    className="p-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="p-2 rounded hover:bg-red-600 transition-colors text-red-500 hover:text-white"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <Link 
                    to={`/comptes/${account.id}/personnages`}
                    className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors"
                  >
                    Personnages ({account.characters?.length || 0})
                  </Link>
                </div>
              </div>
            )}
            {editingId === account.id && editingAccount && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleEdit(account)}
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors"
                >
                  Sauvegarder
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}