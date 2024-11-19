import React, { useState, useEffect } from 'react';
import { db } from '../utils/db';
import { notify } from '../utils/notifications';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import RecipeForm from './RecipeForm';
import Confirm from './Confirm';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const data = await db.recipes.getAll();
      setRecipes(data);
    } catch (error) {
      console.error('Erreur chargement recettes:', error);
      notify.error('Erreur lors du chargement des recettes');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (recipeData) => {
    try {
      await db.recipes.update(editingRecipe.id, recipeData);
      await loadRecipes();
      notify.success('Recette mise à jour avec succès');
      setEditingRecipe(null);
    } catch (error) {
      console.error('Erreur mise à jour recette:', error);
      notify.error('Erreur lors de la mise à jour de la recette');
    }
  };

  const handleDelete = async () => {
    try {
      await db.recipes.delete(recipeToDelete.id);
      await loadRecipes();
      notify.success('Recette supprimée avec succès');
      setRecipeToDelete(null);
    } catch (error) {
      console.error('Erreur suppression recette:', error);
      notify.error('Erreur lors de la suppression de la recette');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="p-4 rounded-lg bg-yellow-400 bg-opacity-10"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{recipe.name}</h4>
              <p className="text-sm text-gray-400">
                {recipe.jobType} - Niveau {recipe.level}
              </p>
              
              <div className="mt-2">
                <div className="text-sm">
                  <span className="text-gray-400">Produit : </span>
                  <span>
                    {recipe.output.name} ({recipe.outputQty})
                  </span>
                </div>
                
                <div className="mt-1">
                  <span className="text-sm text-gray-400">Ingrédients :</span>
                  <ul className="mt-1 space-y-1">
                    {recipe.inputs.map((input) => (
                      <li key={input.id} className="text-sm">
                        {input.resource.name} ×{input.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingRecipe(recipe)}
                className="p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setRecipeToDelete(recipe)}
                className="p-2 rounded hover:bg-red-600 transition-colors text-red-500 hover:text-white"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {editingRecipe && (
        <RecipeForm
          initialData={editingRecipe}
          onSubmit={handleEdit}
          onCancel={() => setEditingRecipe(null)}
        />
      )}

      <Confirm
        isOpen={!!recipeToDelete}
        onClose={() => setRecipeToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer la recette"
        message={`Êtes-vous sûr de vouloir supprimer la recette "${recipeToDelete?.name}" ?`}
        type="danger"
      />
    </div>
  );
};

export default RecipeList;