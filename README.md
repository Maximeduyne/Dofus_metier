# Dofus Métiers

Une application de bureau pour gérer vos métiers Dofus et suivre votre progression.

## Fonctionnalités

- 🎮 Gestion des comptes Dofus
- 👥 Gestion des personnages par compte
- 📈 Suivi des métiers par personnage
- 🧮 Calculateur d'XP avec système de récoltes et crafts
- 🎨 Thème clair (Bonta) et sombre (Brâkmar)
- 💾 Sauvegarde locale des données
- 🖥️ Application multi-plateformes (Windows, macOS, Linux)

## Prérequis

- Node.js 18+
- MySQL 8.0+
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-nom/dofus-metiers.git
cd dofus-metiers
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet :
```env
DATABASE_URL="mysql://utilisateur:motdepasse@localhost:3306/dofus_metiers"
```

4. Initialisez la base de données :
```bash
npm run db:migrate
```

5. Lancez l'application :

Pour le développement web :
```bash
npm run dev
```

Pour l'application de bureau :
```bash
npm run electron:dev
```

## Construction

Pour créer l'installateur de l'application :
```bash
npm run electron:build
```

Les fichiers d'installation seront disponibles dans le dossier `dist-electron`.

## Structure du projet

```
dofus-metiers/
├── src/                    # Code source React
│   ├── components/         # Composants réutilisables
│   ├── pages/             # Pages de l'application
│   ├── stores/            # État global (Zustand)
│   ├── hooks/             # Hooks personnalisés
│   ├── utils/             # Utilitaires
│   └── data/              # Données statiques
├── electron/              # Configuration Electron
├── prisma/               # Schéma et migrations
└── build/               # Ressources de build
```

## Technologies utilisées

- ⚛️ React - Interface utilisateur
- 🎨 Tailwind CSS - Styles
- 💾 MySQL - Base de données
- 🔄 Prisma - ORM
- 📦 Electron - Application de bureau
- 🗃️ Zustand - Gestion d'état
- ✨ React Toastify - Notifications
- 📝 Zod - Validation des données

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push sur la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## Licence

MIT - Voir le fichier [LICENSE](LICENSE) pour plus de détails.