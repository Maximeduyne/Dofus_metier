import React from 'react';

export default function EmptyState({ 
  title, 
  message, 
  icon: Icon,
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {Icon && <Icon className="h-12 w-12 text-gray-400 mb-4" />}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{message}</p>
      {action}
    </div>
  );
}