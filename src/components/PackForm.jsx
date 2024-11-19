import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { jobs } from '../data/jobs';
import { db } from '../utils/db';

const PackForm = ({ onSubmit, onCancel, initialData }) => {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    startLevel: 1,
    targetLevel: 20,
    jobType: '',
    items: []
  });

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await db.resources.getAll();
      setResources(data);
    } catch (error) {
      console.error('Erreur chargement ressources:', error);
    }
  };

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { resourceId: '', quantity: 1 }]
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">
          {initialData ? 'Modifier le pack' : 'Nouveau pack'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nom du pack</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 rounded bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 rounded bg-gray-700"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Métier</label>
            <select
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              className="w-full p-2 rounded bg-gray-700"
              required
            >
              <option value="">Sélectionner un métier</option>
              {jobs.map((job) => (
                <option key={job.name} value={job.name}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Niveau de départ</label>
              <input
                type="number"
                value={formData.startLevel}
                onChange={(e) => setFormData({ ...formData, startLevel: parseInt(e.target.value) })}
                className="w-full p-2 rounded bg-gray-700"
                min="1"
                max="199"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Niveau cible</label>
              <input
                type="number"
                value={formData.targetLevel}
                onChange={(e) => setFormData({ ...formData, targetLevel: parseInt(e.target.value) })}
                className="w-full p-2 rounded bg-gray-700"
                min="2"
                max="200"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm">Ressources nécessaires</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="p-1 rounded hover:bg-gray-600 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    value={item.resourceId}
                    onChange={(e) => handleItemChange(index, 'resourceId', e.target.value)}
                    className="flex-grow p-2 rounded bg-gray-700"
                    required
                  >
                    <option value="">Sélectionner une ressource</option>
                    {resources
                      .filter(r => r.jobType === formData.jobType)
                      .map((resource) => (
                        <option key={resource.id} value={resource.id}>
                          {resource.name}
                        </option>
                      ))
                    }
                  </select>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    className="w-24 p-2 rounded bg-gray-700"
                    min="1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 rounded hover:bg-red-600 transition-colors text-red-500 hover:text-white"
                  >
                    <MinusIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors"
            >
              {initialData ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackForm;