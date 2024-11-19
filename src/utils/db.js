// Utilitaire de gestion de la base de données
import { API_ENDPOINTS } from './constants';

export const db = {
  // Vérifie la connexion à la base de données
  isConnected: async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/status`);
      const data = await response.json();
      return data.status === 'ok';
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    }
  },

  // Gestion des comptes
  accounts: {
    getAll: async () => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/accounts`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des comptes');
      return response.json();
    },

    create: async (data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la création du compte');
      return response.json();
    },

    update: async (id, data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/accounts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du compte');
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/accounts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression du compte');
    }
  },

  // Gestion des personnages
  characters: {
    create: async (accountId, data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/accounts/${accountId}/characters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la création du personnage');
      return response.json();
    },

    update: async (id, data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/characters/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du personnage');
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/characters/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression du personnage');
    }
  },

  // Gestion des métiers
  jobs: {
    create: async (characterId, data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/characters/${characterId}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la création du métier');
      return response.json();
    },

    update: async (id, data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du métier');
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/jobs/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression du métier');
    },

    // Ajout d'une activité (récolte ou craft)
    addActivity: async (jobId, activity) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/jobs/${jobId}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout de l\'activité');
      return response.json();
    },

    // Mise à jour directe du niveau et de l'XP
    updateLevelAndXP: async (jobId, { level, currentXP }) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/jobs/${jobId}/level-xp`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, currentXP })
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du niveau et de l\'XP');
      return response.json();
    }
  },

  // Gestion des ressources
  resources: {
    getAll: async () => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/resources`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des ressources');
      return response.json();
    },

    create: async (data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la création de la ressource');
      return response.json();
    },

    update: async (id, data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/resources/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de la ressource');
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/resources/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression de la ressource');
    }
  },

  // Gestion des recettes
  recipes: {
    getAll: async () => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/recipes`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des recettes');
      return response.json();
    },

    create: async (data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la création de la recette');
      return response.json();
    },

    update: async (id, data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de la recette');
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/recipes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression de la recette');
    }
  },

  // Gestion des packs métiers
  packs: {
    getAll: async () => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/packs`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des packs');
      return response.json();
    },

    create: async (data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/packs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la création du pack');
      return response.json();
    },

    update: async (id, data) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/packs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du pack');
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/packs/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression du pack');
    }
  }
};