import { PrismaClient } from '@prisma/client';
import { jobs } from '../src/data/jobs.js';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔄 Démarrage de la migration...');

    // Création des tables
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

    console.log('✅ Migration terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();