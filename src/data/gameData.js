// Données des ressources et recettes du jeu
export const resources = [
  // Bûcheron
  {
    name: "Frêne",
    type: "HARVEST",
    jobType: "Bucheron",
    level: 1,
    baseXP: 10,
    icon: "🌳",
    description: "Un bois tendre et flexible"
  },
  {
    name: "Chêne",
    type: "HARVEST",
    jobType: "Bucheron",
    level: 20,
    baseXP: 15,
    icon: "🌳",
    description: "Un bois dur et résistant"
  },
  {
    name: "Bombu",
    type: "HARVEST",
    jobType: "Bucheron",
    level: 40,
    baseXP: 20,
    icon: "🎋",
    description: "Un bambou magique"
  },
  {
    name: "Érable",
    type: "HARVEST",
    jobType: "Bucheron",
    level: 60,
    baseXP: 25,
    icon: "🌳",
    description: "Un bois précieux"
  },

  // Mineur
  {
    name: "Fer",
    type: "HARVEST",
    jobType: "Mineur",
    level: 1,
    baseXP: 10,
    icon: "⛏️",
    description: "Minerai de fer"
  },
  {
    name: "Cuivre",
    type: "HARVEST",
    jobType: "Mineur",
    level: 20,
    baseXP: 15,
    icon: "⛏️",
    description: "Minerai de cuivre"
  },
  {
    name: "Bronze",
    type: "HARVEST",
    jobType: "Mineur",
    level: 40,
    baseXP: 20,
    icon: "⛏️",
    description: "Minerai de bronze"
  },
  {
    name: "Kobalte",
    type: "HARVEST",
    jobType: "Mineur",
    level: 60,
    baseXP: 25,
    icon: "⛏️",
    description: "Minerai de kobalte"
  },

  // Alchimiste
  {
    name: "Ortie",
    type: "HARVEST",
    jobType: "Alchimiste",
    level: 1,
    baseXP: 10,
    icon: "🌿",
    description: "Plante urticante"
  },
  {
    name: "Sauge",
    type: "HARVEST",
    jobType: "Alchimiste",
    level: 20,
    baseXP: 15,
    icon: "🌿",
    description: "Plante médicinale"
  },
  {
    name: "Trèfle",
    type: "HARVEST",
    jobType: "Alchimiste",
    level: 40,
    baseXP: 20,
    icon: "🍀",
    description: "Plante porte-bonheur"
  },

  // Paysan
  {
    name: "Blé",
    type: "HARVEST",
    jobType: "Paysan",
    level: 1,
    baseXP: 10,
    icon: "🌾",
    description: "Céréale de base"
  },
  {
    name: "Orge",
    type: "HARVEST",
    jobType: "Paysan",
    level: 20,
    baseXP: 15,
    icon: "🌾",
    description: "Céréale robuste"
  },
  {
    name: "Avoine",
    type: "HARVEST",
    jobType: "Paysan",
    level: 40,
    baseXP: 20,
    icon: "🌾",
    description: "Céréale nutritive"
  },
  {
    name: "Houblon",
    type: "HARVEST",
    jobType: "Paysan",
    level: 60,
    baseXP: 25,
    icon: "🌿",
    description: "Pour la bière"
  }
];

// Recettes de craft
export const recipes = [
  // Forgeron
  {
    name: "Epée en Fer",
    jobType: "Forgeron",
    level: 1,
    baseXP: 25,
    outputId: 1,
    outputQty: 1,
    inputs: [
      { resourceId: 5, quantity: 5 } // 5 Fer
    ]
  },
  {
    name: "Epée en Bronze",
    jobType: "Forgeron",
    level: 20,
    baseXP: 35,
    outputId: 2,
    outputQty: 1,
    inputs: [
      { resourceId: 7, quantity: 5 } // 5 Bronze
    ]
  },

  // Bijoutier
  {
    name: "Anneau en Cuivre",
    jobType: "Bijoutier",
    level: 1,
    baseXP: 20,
    outputId: 3,
    outputQty: 1,
    inputs: [
      { resourceId: 6, quantity: 2 } // 2 Cuivre
    ]
  }
];

// Packs métiers prédéfinis
export const predefinedPacks = [
  {
    name: "Pack Bûcheron 1-20",
    description: "Pour monter le métier de bûcheron du niveau 1 à 20",
    items: [
      { resourceId: 1, quantity: 100 }, // 100 Frêne
      { resourceId: 2, quantity: 50 }   // 50 Chêne
    ]
  },
  {
    name: "Pack Mineur 1-20",
    description: "Pour monter le métier de mineur du niveau 1 à 20",
    items: [
      { resourceId: 5, quantity: 100 }, // 100 Fer
      { resourceId: 6, quantity: 50 }   // 50 Cuivre
    ]
  },
  {
    name: "Pack Alchimiste 1-20",
    description: "Pour monter le métier d'alchimiste du niveau 1 à 20",
    items: [
      { resourceId: 9, quantity: 100 },  // 100 Ortie
      { resourceId: 10, quantity: 50 }   // 50 Sauge
    ]
  }
];