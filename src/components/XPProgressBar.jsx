import React from 'react';
import { getXPForLevel } from '../data/jobsXP';

export default function XPProgressBar({ currentXP, level }) {
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForLevel(level + 1);
  const xpInCurrentLevel = currentXP - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;
  const progress = (xpInCurrentLevel / xpNeededForNextLevel) * 100;

  const formatXP = (xp) => {
    if (xp >= 1000000) {
      return `${(xp / 1000000).toFixed(2)}M`;
    }
    if (xp >= 1000) {
      return `${(xp / 1000).toFixed(1)}K`;
    }
    return xp.toString();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-lg font-bold">Niveau {level}</span>
          <span className="text-sm text-gray-400 ml-2">
            {Math.floor(progress)}% jusqu'au niveau {level + 1}
          </span>
        </div>
        <div className="text-sm text-gray-400">
          XP Totale: {formatXP(currentXP)}
        </div>
      </div>

      <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-yellow-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-sm mt-2 text-gray-400">
        <span>{formatXP(xpInCurrentLevel)} XP</span>
        <span>{formatXP(xpNeededForNextLevel)} XP requis</span>
      </div>
    </div>
  );
}