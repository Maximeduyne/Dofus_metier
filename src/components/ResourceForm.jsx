import React, { useState } from 'react';
import { jobs } from '../data/jobs';

const ResourceForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    type: 'HARVEST',
    jobType: '',
    level: 1,
    baseXP: 10,
    icon: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">
          {initialData ? 'Modifier la ressource' : 'Nouvelle ressource'}
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
            <label className="block text-sm mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 rounded bg-gray-700"
              required
            >
              <option value="HARVEST">Récolte</option>
              <option value="MATERIAL">Matériau</option>
            </select>
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

          <div>
            <label className="block text-sm mb-1">Icône</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full p-2 rounded bg-gray-700"
              placeholder="🌿"
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

export default ResourceForm;