import React, { useState, useEffect } from 'react';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import ResourceForm from './ResourceForm';
import Confirm from './Confirm';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingResource, setEditingResource] = useState(null);
  const [resourceToDelete, setResourceToDelete] = useState(null);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await db.resources.getAll();
      setResources(data);
    } catch (error) {
      console.error('Erreur chargement ressources:', error);
      notify.error('Erreur lors du chargement des ressources');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (resourceData) => {
    try {
      await db.resources.update(editingResource.id, resourceData);
      await loadResources();
      notify.success('Ressource mise à jour avec succès');
      setEditingResource(null);
    } catch (error) {
      console.error('Erreur mise à jour ressource:', error);
      notify.error('Erreur lors de la mise à jour de la ressource');
    }
  };

  const handleDelete = async () => {
    try {
      await db.resources.delete(resourceToDelete.id);
      await loadResources();
      notify.success('Ressource supprimée avec succès');
      setResourceToDelete(null);
    } catch (error) {
      console.error('Erreur suppression ressource:', error);
      notify.error('Erreur lors de la suppression de la ressource');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="p-4 rounded-lg bg-yellow-400 bg-opacity-10 flex justify-between items-center"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{resource.icon}</span>
              <div>
                <h4 className="font-semibold">{resource.name}</h4>
                <p className="text-sm text-gray-400">
                  {resource.jobType} - Niveau {resource.level}
                </p>
              </div>
            </div>
            {resource.description && (
              <p className="text-sm text-gray-400 mt-1">{resource.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditingResource(resource)}
              className="p-2 rounded hover:bg-gray-700 transition-colors"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setResourceToDelete(resource)}
              className="p-2 rounded hover:bg-red-600 transition-colors text-red-500 hover:text-white"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {editingResource && (
        <ResourceForm
          initialData={editingResource}
          onSubmit={handleEdit}
          onCancel={() => setEditingResource(null)}
        />
      )}

      <Confirm
        isOpen={!!resourceToDelete}
        onClose={() => setResourceToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer la ressource"
        message={`Êtes-vous sûr de vouloir supprimer la ressource "${resourceToDelete?.name}" ?`}
        type="danger"
      />
    </div>
  );
};

export default ResourceList;