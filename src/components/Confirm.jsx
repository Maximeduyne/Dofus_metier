import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function Confirm({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirmation', 
  message = 'Êtes-vous sûr de vouloir effectuer cette action ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'danger'
}) {
  if (!isOpen) return null;

  const typeClasses = {
    danger: {
      button: 'bg-red-500 hover:bg-red-600',
      icon: 'text-red-500'
    },
    warning: {
      button: 'bg-yellow-500 hover:bg-yellow-600',
      icon: 'text-yellow-500'
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-4 mb-4">
          <ExclamationTriangleIcon className={`h-6 w-6 ${typeClasses[type].icon}`} />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        
        <p className="text-gray-300 mb-6">{message}</p>
        
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded transition-colors ${typeClasses[type].button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}