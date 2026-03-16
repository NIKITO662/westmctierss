import { useState } from 'react';
import { Crown } from 'lucide-react';
import type { Player, GameCategory } from '@/types';
import { TIER_COLORS } from '@/types';
import { minecraftAPI } from '@/lib/minecraft-api';

interface LeaderboardRowProps {
  player: Player;
  onClick: (player: Player) => void;
  categoryFilter?: GameCategory;
}

// Tier icons as SVG components for exact matching
const TierIcon = ({ category }: { category: string }) => {
  const icons: Record<string, React.ReactElement> = {
    sword: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M14.5 13.5L11 17l-4-4 3.5-3.5L6 7l1-1 7 7-1 1-4.5-4.5L11 14l3.5-3.5 7 7-1 1-6.5-6.5z"/>
      </svg>
    ),
    axe: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M4 4l4 4-4 4 2 2 4-4 4 4 2-2-4-4 4-4-2-2-4 4-4-4-2 2zm12 12l4 4-4 4 2 2 4-4 4 4 2-2-4-4 4-4-2-2-4 4-4-4-2 2z"/>
      </svg>
    ),
    uhc: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    pot: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M9 3v2H7v2h2v2H7v2h2v2H7v2h2v2H7v2h2v2h6v-2h2v-2h-2v-2h2v-2h-2v-2h2V9h-2V7h2V5h-2V3H9zm2 2h2v2h-2V5zm0 4h2v2h-2V9zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
      </svg>
    ),
    vanilla: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
      </svg>
    ),
    nethop: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    ),
    smp: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    ),
    mace: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M2 20h20v2H2v-2zm2-4h2v2H4v-2zm4 0h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM2 12h2v2H2v-2zm4 0h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
      </svg>
    ),
  };
  
  return icons[category] || icons.sword;
};

// Get rank color
const getRankColor = (rank: number): string => {
  switch (rank) {
    case 1: return '#fbbf24'; // Gold
    case 2: return '#9ca3af'; // Silver
    case 3: return '#b45309'; // Bronze
    default: return '#374151'; // Dark gray
  }
};

// Get rank text color
const getRankTextColor = (rank: number): string => {
  return rank <= 3 ? '#000000' : '#9ca3af';
};

// Region colors
const getRegionStyle = (region: string): string => {
  switch (region) {
    case 'NA': return 'bg-[#da3633]/20 text-[#f85149] border-[#da3633]/30';
    case 'EU': return 'bg-[#238636]/20 text-[#3fb950] border-[#238636]/30';
    case 'AS': return 'bg-[#1f6feb]/20 text-[#58a6ff] border-[#1f6feb]/30';
    case 'SA': return 'bg-[#d29922]/20 text-[#e3b341] border-[#d29922]/30';
    case 'OC': return 'bg-[#8957e5]/20 text-[#a371f7] border-[#8957e5]/30';
    case 'AF': return 'bg-[#fb8500]/20 text-[#ffa500] border-[#fb8500]/30';
    default: return 'bg-[#30363d] text-[#8b949e] border-[#30363d]';
  }
};

export function LeaderboardRow({ player, onClick, categoryFilter }: LeaderboardRowProps) {
  const [imageError, setImageError] = useState(false);
  
  const rankColor = getRankColor(player.rank);
  const rankTextColor = getRankTextColor(player.rank);
  const regionStyle = getRegionStyle(player.region);

  // Get 3D bust render URL
  const skinUrl = player.uuid && !imageError
    ? minecraftAPI.get3DBustUrl(player.uuid)
    : null;

  // Filter tiers if category specified
  const displayTiers = categoryFilter && categoryFilter !== 'overall'
    ? player.tiers.filter(t => t.category === categoryFilter)
    : player.tiers;

  return (
    <div
      onClick={() => onClick(player)}
      className="group relative flex items-center w-full bg-[#161b22] hover:bg-[#21262d] 
                 rounded-lg overflow-hidden cursor-pointer transition-colors duration-150
                 border border-[#30363d] hover:border-[#484f58]"
    >
      {/* Rank Block with Slanted Edge */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center w-12 h-16"
        style={{
          backgroundColor: rankColor,
          clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0 100%)',
        }}
      >
        <span 
          className="text-lg font-black"
          style={{ color: rankTextColor }}
        >
          {player.rank}.
        </span>
      </div>

      {/* 3D Skin Avatar */}
      <div className="flex-shrink-0 -ml-1 relative z-10">
        <div className="w-12 h-16 relative overflow-hidden">
          {skinUrl ? (
            <img
              src={skinUrl}
              alt={`${player.username}'s skin`}
              className="w-full h-full object-contain object-center scale-125"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-[#21262d] flex items-center justify-center">
              <span className="text-lg font-bold text-[#484f58]">
                {player.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Player Info */}
      <div className="flex-1 min-w-0 px-3 py-2">
        <h3 className="text-sm font-bold text-[#c9d1d9] truncate">
          {player.username}
        </h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Crown className="w-3 h-3 text-[#fbbf24]" />
          <span className="text-xs text-[#8b949e]">
            {player.rankTitle} ({player.points} points)
          </span>
        </div>
      </div>

      {/* Region Tag */}
      <div className="flex-shrink-0 px-2">
        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${regionStyle}`}>
          {player.region}
        </span>
      </div>

      {/* Tiers */}
      <div className="flex-shrink-0 px-3 hidden sm:flex items-center gap-2">
        {(displayTiers.length > 0 ? displayTiers : player.tiers.slice(0, 8)).map((tier, index) => (
          <div key={`${tier.category}-${index}`} className="flex flex-col items-center">
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center bg-[#0d1117] border border-[#30363d]"
              title={tier.category}
            >
              <TierIcon category={tier.category} />
            </div>
            <span 
              className="text-[9px] font-bold mt-0.5"
              style={{ color: TIER_COLORS[tier.tier] || '#9ca3af' }}
            >
              {tier.tier}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
