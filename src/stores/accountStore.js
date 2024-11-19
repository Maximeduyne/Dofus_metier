import { create } from 'zustand';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';

const useAccountStore = create((set) => ({
  accounts: [],
  loading: false,
  error: null,

  initialize: async () => {
    set({ loading: true });
    try {
      const accounts = await db.accounts.getAll();
      set({ accounts, loading: false, error: null });
    } catch (error) {
      console.error('Erreur de chargement des comptes:', error);
      set({ error: error.message, loading: false });
      notify.error('Erreur lors du chargement des comptes');
    }
  },

  addAccount: async (accountData) => {
    try {
      const newAccount = await db.accounts.create({
        name: accountData.name,
        email: accountData.email || null,
        password: accountData.password || null,
        isGoogle: accountData.isGoogle || false
      });
      
      set(state => ({
        accounts: [...state.accounts, { ...newAccount, characters: [] }]
      }));
      
      notify.success('Compte créé avec succès');
      return newAccount;
    } catch (error) {
      console.error('Erreur création compte:', error);
      notify.error('Erreur lors de la création du compte');
      throw error;
    }
  },

  updateAccount: async (id, updates) => {
    try {
      const updatedAccount = await db.accounts.update(id, updates);
      set(state => ({
        accounts: state.accounts.map(account =>
          account.id === id ? { ...account, ...updatedAccount } : account
        )
      }));
      notify.success('Compte mis à jour avec succès');
      return updatedAccount;
    } catch (error) {
      console.error('Erreur mise à jour compte:', error);
      notify.error('Erreur lors de la mise à jour du compte');
      throw error;
    }
  },

  deleteAccount: async (id) => {
    try {
      await db.accounts.delete(id);
      set(state => ({
        accounts: state.accounts.filter(account => account.id !== id)
      }));
      notify.success('Compte supprimé avec succès');
    } catch (error) {
      console.error('Erreur suppression compte:', error);
      notify.error('Erreur lors de la suppression du compte');
      throw error;
    }
  },

  addCharacter: async (accountId, characterData) => {
    try {
      const newCharacter = await db.characters.create(accountId, characterData);
      set(state => ({
        accounts: state.accounts.map(account =>
          account.id === accountId
            ? {
                ...account,
                characters: [...(account.characters || []), newCharacter]
              }
            : account
        )
      }));
      notify.success('Personnage créé avec succès');
      return newCharacter;
    } catch (error) {
      console.error('Erreur création personnage:', error);
      notify.error('Erreur lors de la création du personnage');
      throw error;
    }
  },

  updateCharacter: async (accountId, characterId, updates) => {
    try {
      const updatedCharacter = await db.characters.update(characterId, updates);
      set(state => ({
        accounts: state.accounts.map(account =>
          account.id === accountId
            ? {
                ...account,
                characters: account.characters.map(character =>
                  character.id === characterId
                    ? { ...character, ...updatedCharacter }
                    : character
                )
              }
            : account
        )
      }));
      notify.success('Personnage mis à jour avec succès');
      return updatedCharacter;
    } catch (error) {
      console.error('Erreur mise à jour personnage:', error);
      notify.error('Erreur lors de la mise à jour du personnage');
      throw error;
    }
  },

  deleteCharacter: async (accountId, characterId) => {
    try {
      await db.characters.delete(characterId);
      set(state => ({
        accounts: state.accounts.map(account =>
          account.id === accountId
            ? {
                ...account,
                characters: account.characters.filter(c => c.id !== characterId)
              }
            : account
        )
      }));
      notify.success('Personnage supprimé avec succès');
    } catch (error) {
      console.error('Erreur suppression personnage:', error);
      notify.error('Erreur lors de la suppression du personnage');
      throw error;
    }
  }
}));

export default useAccountStore;