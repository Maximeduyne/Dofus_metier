// Données de base pour les métiers
export const JOB_TYPES = {
  HARVEST: 'HARVEST',
  CRAFT: 'CRAFT'
};

// XP nécessaire par niveau
export const XP_PER_LEVEL = {
  1: 0,
  2: 110,
  3: 240,
  4: 390,
  5: 560,
  6: 750,
  7: 960,
  8: 1190,
  9: 1440,
  10: 1710,
  20: 4960,
  30: 10210,
  40: 17460,
  50: 26710,
  60: 37960,
  70: 51210,
  80: 66460,
  90: 83710,
  100: 102960,
  110: 124210,
  120: 147460,
  130: 172710,
  140: 199960,
  150: 229210,
  160: 260460,
  170: 293710,
  180: 328960,
  190: 366210,
  200: 405460
};

// Fonction pour obtenir l'XP exacte d'un niveau
export const getXPForLevel = (level) => {
  if (level <= 1) return 0;
  if (level >= 200) return XP_PER_LEVEL[200];
  
  if (XP_PER_LEVEL[level]) return XP_PER_LEVEL[level];
  
  const lowerLevel = Math.floor(level / 10) * 10;
  const upperLevel = lowerLevel + 10;
  const lowerXP = XP_PER_LEVEL[lowerLevel];
  const upperXP = XP_PER_LEVEL[upperLevel];
  const ratio = (level - lowerLevel) / 10;
  
  return Math.round(lowerXP + (upperXP - lowerXP) * ratio);
};

// Fonction pour calculer le niveau en fonction de l'XP
export const getLevelFromXP = (xp) => {
  let level = 1;
  while (level < 200 && getXPForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
};

// Fonction pour calculer l'XP restante jusqu'au prochain niveau
export const getXPToNextLevel = (currentXP) => {
  const currentLevel = getLevelFromXP(currentXP);
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  return nextLevelXP - currentXP;
};