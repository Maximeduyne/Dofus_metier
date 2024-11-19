import { PrismaClient } from '@prisma/client';
import { jobs } from '../src/data/jobs.js';

const prisma = new PrismaClient();

async function initDatabase() {
  try {
    console.log('🔄 Initialisation de la base de données...');
    
    // Test de connexion
    await prisma.$connect();
    console.log('✅ Connexion à la base de données établie');
    
    // Vérification de la base de données
    const databaseExists = await prisma.$queryRaw`
      SELECT SCHEMA_NAME 
      FROM INFORMATION_SCHEMA.SCHEMATA 
      WHERE SCHEMA_NAME = 'dofus_metiers'
    `;
    
    if (!databaseExists.length) {
      console.error('❌ Base de données "dofus_metiers" non trouvée');
      console.log('📝 Veuillez créer la base de données avec la commande:');
      console.log('CREATE DATABASE dofus_metiers;');
      process.exit(1);
    }

    console.log('✅ Base de données "dofus_metiers" trouvée');
    
    // Vérification des tables
    const tables = await prisma.$queryRaw`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'dofus_metiers'
    `;
    
    if (!tables.length) {
      console.log('⚙️ Création des tables...');
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS accounts (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          password VARCHAR(255),
          isGoogle BOOLEAN DEFAULT false,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS characters (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          class VARCHAR(255) NOT NULL,
          level INTEGER NOT NULL,
          server VARCHAR(255) NOT NULL,
          accountId INTEGER NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (accountId) REFERENCES accounts(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS jobs (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          level INTEGER NOT NULL DEFAULT 1,
          currentXP INTEGER NOT NULL DEFAULT 0,
          icon VARCHAR(255) NOT NULL,
          characterId INTEGER NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (characterId) REFERENCES characters(id) ON DELETE CASCADE
        );
      `;
      console.log('✅ Tables créées avec succès');
    } else {
      console.log('✅ Les tables existent déjà');
    }

    console.log('✅ Base de données initialisée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

initDatabase();