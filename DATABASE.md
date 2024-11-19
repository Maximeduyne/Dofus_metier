# Documentation de la Base de Données

## Configuration MySQL

1. Installez MySQL 8.0+ depuis [le site officiel](https://dev.mysql.com/downloads/mysql/)

2. Créez la base de données et l'utilisateur :

```sql
CREATE DATABASE dofus_metiers;
CREATE USER 'dofus_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON dofus_metiers.* TO 'dofus_user'@'localhost';
FLUSH PRIVILEGES;
```

3. Configurez le fichier `.env` :
```env
DATABASE_URL="mysql://dofus_user:votre_mot_de_passe@localhost:3306/dofus_metiers"
```

## Structure des Tables

### Comptes (accounts)
| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER | Clé primaire auto-incrémentée |
| name | VARCHAR(255) | Nom du compte |
| email | VARCHAR(255) | Email (optionnel) |
| password | VARCHAR(255) | Mot de passe (optionnel) |
| isGoogle | BOOLEAN | Compte Google (true/false) |
| createdAt | DATETIME | Date de création |
| updatedAt | DATETIME | Date de mise à jour |

### Personnages (characters)
| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER | Clé primaire auto-incrémentée |
| name | VARCHAR(255) | Nom du personnage |
| class | VARCHAR(255) | Classe du personnage |
| level | INTEGER | Niveau du personnage |
| server | VARCHAR(255) | Serveur du personnage |
| accountId | INTEGER | Clé étrangère vers accounts |
| createdAt | DATETIME | Date de création |
| updatedAt | DATETIME | Date de mise à jour |

### Métiers (jobs)
| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER | Clé primaire auto-incrémentée |
| name | VARCHAR(255) | Nom du métier |
| level | INTEGER | Niveau du métier |
| currentXP | INTEGER | XP actuelle |
| icon | VARCHAR(255) | Emoji du métier |
| characterId | INTEGER | Clé étrangère vers characters |
| createdAt | DATETIME | Date de création |
| updatedAt | DATETIME | Date de mise à jour |

## Maintenance

### Sauvegarde

Pour sauvegarder la base de données :
```bash
mysqldump -u dofus_user -p dofus_metiers > backup.sql
```

### Restauration

Pour restaurer une sauvegarde :
```bash
mysql -u dofus_user -p dofus_metiers < backup.sql
```

### Migration

Pour mettre à jour le schéma :
```bash
npm run db:migrate
```

## Requêtes Courantes

### Obtenir tous les personnages d'un compte
```sql
SELECT * FROM characters 
WHERE accountId = :accountId;
```

### Obtenir tous les métiers d'un personnage
```sql
SELECT * FROM jobs 
WHERE characterId = :characterId;
```

### Mettre à jour l'XP d'un métier
```sql
UPDATE jobs 
SET currentXP = currentXP + :xp 
WHERE id = :jobId;
```