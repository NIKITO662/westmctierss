import { Trophy, Target, Zap, Star, Crown, Sword, Shield, Flame } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Get your first kill in PvP',
    icon: Sword,
    rarity: 'common',
  },
  {
    id: 'veteran',
    name: 'Veteran',
    description: 'Play for over 100 hours',
    icon: Crown,
    rarity: 'rare',
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Win 10 matches in a row',
    icon: Flame,
    rarity: 'epic',
  },
  {
    id: 'legend',
    name: 'PvP Legend',
    description: 'Reach HT1 in any category',
    icon: Trophy,
    rarity: 'legendary',
  },
  {
    id: 'sharpshooter',
    name: 'Sharpshooter',
    description: 'Achieve 80% win rate',
    icon: Target,
    rarity: 'epic',
  },
  {
    id: 'speedster',
    name: 'Speedster',
    description: 'Win a match in under 30 seconds',
    icon: Zap,
    rarity: 'rare',
  },
  {
    id: 'defender',
    name: 'Iron Defender',
    description: 'Block 1000 damage',
    icon: Shield,
    rarity: 'common',
  },
  {
    id: 'rising_star',
    name: 'Rising Star',
    description: 'Reach top 100 on the leaderboard',
    icon: Star,
    rarity: 'epic',
  },
];

const rarityColors = {
  common: 'from-gray-600 to-gray-700 text-gray-300',
  rare: 'from-blue-600 to-blue-700 text-blue-300',
  epic: 'from-purple-600 to-purple-700 text-purple-300',
  legendary: 'from-yellow-600 to-yellow-700 text-yellow-300',
};

const rarityBorders = {
  common: 'border-gray-700',
  rare: 'border-blue-700/50',
  epic: 'border-purple-700/50',
  legendary: 'border-yellow-600/50',
};

export function AchievementsSection() {
  return (
    <section className="w-full py-8">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-white">Achievements</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`group relative p-4 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 
                         border ${rarityBorders[achievement.rarity]} 
                         hover:scale-105 transition-all duration-300 cursor-pointer
                         hover:shadow-lg hover:shadow-${achievement.rarity === 'legendary' ? 'yellow' : achievement.rarity === 'epic' ? 'purple' : 'gray'}-900/20`}
            >
              {/* Rarity Glow */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${rarityColors[achievement.rarity]} 
                              opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${rarityColors[achievement.rarity]} 
                              flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-sm font-bold text-white mb-1">{achievement.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{achievement.description}</p>

              {/* Rarity Badge */}
              <div className="mt-3">
                <span className={`text-xs font-semibold uppercase tracking-wider 
                                  ${achievement.rarity === 'legendary' ? 'text-yellow-500' : 
                                    achievement.rarity === 'epic' ? 'text-purple-400' :
                                    achievement.rarity === 'rare' ? 'text-blue-400' : 'text-gray-500'}`}>
                  {achievement.rarity}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
