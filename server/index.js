import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { logger } from '../src/utils/logger.js';

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Route de statut
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes pour les comptes
app.get('/api/accounts', async (req, res) => {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        characters: {
          include: {
            jobs: true,
            packs: {
              include: {
                items: {
                  include: {
                    resource: true
                  }
                }
              }
            }
          }
        }
      }
    });
    res.json(accounts);
  } catch (error) {
    logger.error('Erreur récupération comptes:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/accounts', async (req, res) => {
  try {
    const account = await prisma.account.create({
      data: req.body,
      include: {
        characters: true
      }
    });
    logger.info(`Compte créé: ${account.name}`);
    res.json(account);
  } catch (error) {
    logger.error('Erreur création compte:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/accounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.update({
      where: { id: parseInt(id) },
      data: req.body,
      include: {
        characters: true
      }
    });
    logger.info(`Compte mis à jour: ${account.name}`);
    res.json(account);
  } catch (error) {
    logger.error('Erreur mise à jour compte:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/accounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.account.delete({
      where: { id: parseInt(id) }
    });
    logger.info(`Compte supprimé: ${id}`);
    res.json({ success: true });
  } catch (error) {
    logger.error('Erreur suppression compte:', error);
    res.status(500).json({ error: error.message });
  }
});

// Routes pour les personnages
app.post('/api/accounts/:accountId/characters', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { name, class: className, server, level } = req.body;

    const character = await prisma.character.create({
      data: {
        name,
        class: className,
        server,
        level: parseInt(level),
        accountId: parseInt(accountId)
      },
      include: {
        jobs: true
      }
    });

    logger.info(`Personnage créé: ${character.name}`);
    res.json(character);
  } catch (error) {
    logger.error('Erreur création personnage:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const character = await prisma.character.update({
      where: { id: parseInt(id) },
      data: req.body,
      include: {
        jobs: true
      }
    });
    logger.info(`Personnage mis à jour: ${character.name}`);
    res.json(character);
  } catch (error) {
    logger.error('Erreur mise à jour personnage:', error);
    res.status(500).json({ error: error.message });
  }
});

// Routes pour les métiers
app.post('/api/characters/:characterId/jobs', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { name, level = 1, currentXP = 0, icon } = req.body;

    const job = await prisma.job.create({
      data: {
        name,
        level: parseInt(level),
        currentXP: parseInt(currentXP),
        icon,
        characterId: parseInt(characterId)
      }
    });

    logger.info(`Métier créé: ${job.name} pour le personnage ${characterId}`);
    res.json(job);
  } catch (error) {
    logger.error('Erreur création métier:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/jobs/:id/level-xp', async (req, res) => {
  try {
    const { id } = req.params;
    const { level, currentXP } = req.body;

    const job = await prisma.job.update({
      where: { id: parseInt(id) },
      data: {
        level: parseInt(level),
        currentXP: parseInt(currentXP)
      }
    });

    logger.info(`Niveau/XP mis à jour pour le métier ${job.name}`);
    res.json(job);
  } catch (error) {
    logger.error('Erreur mise à jour niveau/XP:', error);
    res.status(500).json({ error: error.message });
  }
});

// Routes pour les activités des métiers
app.post('/api/jobs/:jobId/activities', async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const activity = req.body;
    // Ensure the object and method exist before calling create
    if (!activityService || !activityService.create) {
      throw new Error('activityService.create is not defined');
    }
    const newActivity = await activityService.create(jobId, activity);
    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'activité:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'activité' });
  }
});

// Routes pour les ressources
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json(resources);
  } catch (error) {
    logger.error('Erreur récupération ressources:', error);
    res.status(500).json({ error: error.message });
  }
});

// Routes pour les packs
app.get('/api/packs', async (req, res) => {
  try {
    const packs = await prisma.pack.findMany({
      include: {
        items: {
          include: {
            resource: true
          }
        }
      }
    });
    res.json(packs);
  } catch (error) {
    logger.error('Erreur récupération packs:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/packs', async (req, res) => {
  try {
    const { name, description, jobType, startLevel, targetLevel, items } = req.body;

    const pack = await prisma.pack.create({
      data: {
        name,
        description,
        jobType,
        startLevel: parseInt(startLevel),
        targetLevel: parseInt(targetLevel),
        items: {
          create: items.map(item => ({
            resourceId: parseInt(item.resourceId),
            quantity: parseInt(item.quantity)
          }))
        }
      },
      include: {
        items: {
          include: {
            resource: true
          }
        }
      }
    });

    logger.info(`Pack créé: ${pack.name}`);
    res.json(pack);
  } catch (error) {
    logger.error('Erreur création pack:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  logger.info(`Serveur démarré sur le port ${PORT}`);
});