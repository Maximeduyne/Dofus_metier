import { z } from 'zod';

export const accountSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  email: z.string().email('Email invalide').optional().nullable(),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').optional().nullable(),
  isGoogle: z.boolean().default(false)
});

export const characterSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  class: z.string().min(1, 'La classe est requise'),
  level: z.number().min(1, 'Le niveau minimum est 1').max(200, 'Le niveau maximum est 200'),
  server: z.string().min(1, 'Le serveur est requis')
});

export const jobSchema = z.object({
  name: z.string().min(1, 'Le nom du métier est requis'),
  level: z.number().min(1, 'Le niveau minimum est 1').max(200, 'Le niveau maximum est 200'),
  currentXP: z.number().min(0, "L'XP ne peut pas être négative"),
  icon: z.string()
});