import React, { useState, useEffect } from 'react';
import { jobs } from '../data/jobs';
import { db } from '../utils/db';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const RecipeForm = ({ onSubmit, onCancel, initialData }) => {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState(initialData || {
    name: '',
    jobType: '',
    level: 1,
    baseXP: 10,
    outputId: '',
    outputQty: 1,
    inputs: []
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

  const handleAddInput = () => {
    setFormData(prev => ({
      ...prev,
      inputs: [...prev.inputs, { resourceId: '', quantity: 1 }]
    }));
  };

  const handleRemoveInput = (index) => {
    setFormData(prev => ({
      ...prev,
      inputs: prev.inputs.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      inputs: prev.inputs.map((input, i) => 
        i === index ? { ...input, [field]: value } : input
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
          {initialData ? 'Modifier la recette' : 'Nouvelle recette'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 rounded bg-gray-700"
              required
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
              <label className="block text-sm mb-1">Niveau requis</label>
              <input
                type="number"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="w-full p-2 rounded bg-gray-700"
                min="1"
                max="200"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">XP de base</label>
              <input
                type="number"
                value={formData.baseXP}
                onChange={(e) => setFormData({ ...formData, baseXP: parseInt(e.target.value) })}
                className="w-full p-2 rounded bg-gray-700"
                min="1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Résultat</label>
              <select
                value={formData.outputId}
                onChange={(e) => setFormData({ ...formData, outputId: e.target.value })}
                className="w-full p-2 rounded bg-gray-700"
                required
              >
                <option value="">Sélectionner</option>
                {resources.map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Quantité produite</label>
              <input
                type="number"
                value={formData.outputQty}
                onChange={(e) => setFormData({ ...formData, outputQty: parseInt(e.target.value) })}
                className="w-full p-2 rounded bg-gray-700"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm">Ingrédients</label>
              <button
                type="button"
                onClick={handleAddInput}
                className="p-1 rounded hover:bg-gray-600 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              {formData.inputs.map((input, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    value={input.resourceId}
                    onChange={(e) => handleInputChange(index, 'resourceId', e.target.value)}
                    className="flex-grow p-2 rounded bg-gray-700"
                    required
                  >
                    <option value="">Sélectionner</option>
                    {resources.map((resource) => (
                      <option key={resource.id} value={resource.id}>
                        {resource.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={input.quantity}
                    onChange={(e) => handleInputChange(index, 'quantity', parseInt(e.target.value))}
                    className="w-20 p-2 rounded bg-gray-700"
                    min="1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInput(index)}
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
              {initialData ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;