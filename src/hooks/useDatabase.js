import { useEffect, useState } from 'react';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';
import useAccountStore from '../stores/accountStore';

export function useDatabase() {
  const { accounts, setAccounts } = useAccountStore();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
    loadAccounts();
  }, []);

  const checkConnection = async () => {
    const connected = await db.isConnected();
    setIsConnected(connected);
  };

  const loadAccounts = async () => {
    try {
      const data = await db.accounts.getAll();
      setAccounts(data);
    } catch (error) {
      notify.error('Erreur lors du chargement des données');
      console.error('Erreur de chargement:', error);
    }
  };

  const createAccount = async (accountData) => {
    try {
      const newAccount = await db.accounts.create(accountData);
      await loadAccounts();
      notify.success('Compte créé avec succès');
      return newAccount;
    } catch (error) {
      notify.error('Erreur lors de la création du compte');
      console.error('Erreur de création:', error);
      throw error;
    }
  };

  const updateAccount = async (id, accountData) => {
    try {
      const updatedAccount = await db.accounts.update(id, accountData);
      await loadAccounts();
      notify.success('Compte mis à jour avec succès');
      return updatedAccount;
    } catch (error) {
      notify.error('Erreur lors de la mise à jour du compte');
      console.error('Erreur de mise à jour:', error);
      throw error;
    }
  };

  const deleteAccount = async (id) => {
    try {
      await db.accounts.delete(id);
      await loadAccounts();
      notify.success('Compte supprimé avec succès');
    } catch (error) {
      notify.error('Erreur lors de la suppression du compte');
      console.error('Erreur de suppression:', error);
      throw error;
    }
  };

  return {
    isConnected,
    accounts,
    createAccount,
    updateAccount,
    deleteAccount,
    reloadAccounts: loadAccounts
  };
}