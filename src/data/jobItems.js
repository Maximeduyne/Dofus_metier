// Base de données des items par métier
export const JOB_ITEMS = {
  Alchimiste: {
    harvests: [
      { id: 1, name: "Ortie", baseXP: 10, minLevel: 1 },
      { id: 2, name: "Sauge", baseXP: 15, minLevel: 20 },
      { id: 3, name: "Menthe", baseXP: 25, minLevel: 40 }
    ],
    crafts: [
      { id: 4, name: "Potion de Rappel", baseXP: 20, minLevel: 1 },
      { id: 5, name: "Potion de Cité", baseXP: 30, minLevel: 20 },
      { id: 6, name: "Potion de Foyer", baseXP: 50, minLevel: 40 }
    ]
  },
  Paysan: {
    harvests: [
      { id: 7, name: "Blé", baseXP: 10, minLevel: 1 },
      { id: 8, name: "Houblon", baseXP: 15, minLevel: 20 },
      { id: 9, name: "Orge", baseXP: 25, minLevel: 40 }
    ],
    crafts: [
      { id: 10, name: "Pain", baseXP: 20, minLevel: 1 },
      { id: 11, name: "Pain d'Orge", baseXP: 30, minLevel: 20 },
      { id: 12, name: "Pain au Houblon", baseXP: 50, minLevel: 40 }
    ]
  },
  Bûcheron: {
    harvests: [
      { id: 13, name: "Frêne", baseXP: 10, minLevel: 1 },
      { id: 14, name: "Chêne", baseXP: 15, minLevel: 20 },
      { id: 15, name: "Érable", baseXP: 25, minLevel: 40 }
    ],
    crafts: []
  },
  Mineur: {
    harvests: [
      { id: 16, name: "Fer", baseXP: 10, minLevel: 1 },
      { id: 17, name: "Cuivre", baseXP: 15, minLevel: 20 },
      { id: 18, name: "Bronze", baseXP: 25, minLevel: 40 }
    ],
    crafts: []
  }
};