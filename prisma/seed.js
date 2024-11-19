import { PrismaClient } from '@prisma/client';
import { resources, recipes, predefinedPacks } from '../src/data/gameData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Insertion des ressources
  console.log('📦 Insertion des ressources...');
  for (const resource of resources) {
    await prisma.resource.upsert({
      where: { name: resource.name },
      update: resource,
      create: resource
    });
  }

  // Insertion des recettes
  console.log('📝 Insertion des recettes...');
  for (const recipe of recipes) {
    const { inputs, ...recipeData } = recipe;
    
    // Création de la recette
    const createdRecipe = await prisma.recipe.upsert({
      where: { name: recipe.name },
      update: recipeData,
      create: recipeData
    });

    // Création des ingrédients
    for (const input of inputs) {
      await prisma.craftInput.create({
        data: {
          recipeId: createdRecipe.id,
          resourceId: input.resourceId,
          quantity: input.quantity
        }
      });
    }
  }

  // Insertion des packs prédéfinis
  console.log('📦 Insertion des packs prédéfinis...');
  for (const pack of predefinedPacks) {
    const { items, ...packData } = pack;
    
    // Création du pack
    const createdPack = await prisma.pack.create({
      data: {
        ...packData,
        isTemplate: true
      }
    });

    // Création des items du pack
    for (const item of items) {
      await prisma.packItem.create({
        data: {
          packId: createdPack.id,
          resourceId: item.resourceId,
          quantity: item.quantity,
          obtained: 0
        }
      });
    }
  }

  console.log('✅ Seeding terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur pendant le seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });