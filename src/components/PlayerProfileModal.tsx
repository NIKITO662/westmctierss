import { useState } from 'react';
import { X, Crown, ExternalLink, Trophy, Swords, Target, Clock, TrendingUp } from 'lucide-react';
import type { Player } from '@/types';
import { TIER_COLORS } from '@/types';
import { minecraftAPI } from '@/lib/minecraft-api';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface PlayerProfileModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
}

// Tier icons
const TierIcon = ({ category }: { category: string }) => {
  const icons: Record<string, React.ReactElement> = {
    sword: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M14.5 13.5L11 17l-4-4 3.5-3.5L6 7l1-1 7 7-1 1-4.5-4.5L11 14l3.5-3.5 7 7-1 1-6.5-6.5z"/>
      </svg>
    ),
    axe: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M4 4l4 4-4 4 2 2 4-4 4 4 2-2-4-4 4-4-2-2-4 4-4-4-2 2zm12 12l4 4-4 4 2 2 4-4 4 4 2-2-4-4 4-4-2-2-4 4-4-4-2 2z"/>
      </svg>
    ),
    uhc: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    pot: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M9 3v2H7v2h2v2H7v2h2v2H7v2h2v2H7v2h2v2h6v-2h2v-2h-2v-2h2v-2h-2v-2h2V9h-2V7h2V5h-2V3H9zm2 2h2v2h-2V5zm0 4h2v2h-2V9zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
      </svg>
    ),
    vanilla: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
      </svg>
    ),
    nethop: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    ),
    smp: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    ),
    mace: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M2 20h20v2H2v-2zm2-4h2v2H4v-2zm4 0h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM2 12h2v2H2v-2zm4 0h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
      </svg>
    ),
  };
  
  return icons[category] || icons.sword;
};

// Format playtime
const formatPlaytime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  }
  return `${hours}h`;
};

// Get region name
const getRegionName = (region: string): string => {
  const regions: Record<string, string> = {
    NA: 'North America',
    EU: 'Europe',
    AS: 'Asia',
    SA: 'South America',
    OC: 'Oceania',
    AF: 'Africa',
  };
  return regions[region] || region;
};

export function PlayerProfileModal({ player, isOpen, onClose }: PlayerProfileModalProps) {
  const [imageError, setImageError] = useState(false);

  if (!player) return null;

  // Get 3D full body render
  const skinUrl = player.uuid && !imageError
    ? minecraftAPI.get3DSkinUrl(player.uuid)
    : null;

  const namemcUrl = minecraftAPI.getNameMCUrl(player.username);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-sm w-full bg-[#161b22] border-[#30363d] p-0 overflow-hidden"
        aria-describedby="player-profile-description"
      >
        <DialogTitle className="sr-only">
          {player.username} - Player Profile
        </DialogTitle>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-1.5 rounded-full bg-[#21262d] 
                     text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div id="player-profile-description" className="sr-only">
          Profile details for {player.username}, ranked {player.rank} with {player.points} points
        </div>

        {/* Header with 3D Skin */}
        <div className="relative bg-gradient-to-b from-[#21262d] to-transparent pt-6 pb-4">
          {/* 3D Skin Display */}
          <div className="flex justify-center">
            <div className="relative w-28 h-36">
              {skinUrl ? (
                <img
                  src={skinUrl}
                  alt={`${player.username}'s skin`}
                  className="w-full h-full object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-[#21262d] rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#484f58]">
                    {player.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Username */}
          <h2 className="text-xl font-bold text-white text-center mt-2">
            {player.username}
          </h2>

          {/* Rank Badge */}
          <div className="flex justify-center mt-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#da3633]/20 rounded-full border border-[#da3633]/30">
              <Crown className="w-3.5 h-3.5 text-[#f85149]" />
              <span className="text-xs font-semibold text-[#f85149]">{player.rankTitle}</span>
            </div>
          </div>

          {/* Region */}
          <p className="text-center text-[#6e7681] text-xs mt-1.5">
            {getRegionName(player.region)}
          </p>

          {/* NameMC Link */}
          <div className="flex justify-center mt-3">
            <a
              href={namemcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] 
                         rounded-md text-xs text-[#8b949e] hover:text-white transition-colors border border-[#30363d]"
            >
              <ExternalLink className="w-3 h-3" />
              NameMC
            </a>
          </div>
        </div>

        {/* Position Section */}
        <div className="px-4 py-3 border-t border-[#21262d]">
          <h3 className="text-[10px] font-semibold text-[#6e7681] uppercase tracking-wider mb-2">
            Position
          </h3>
          <div className="flex items-center gap-3 bg-[#0d1117] rounded-lg p-3 border border-[#30363d]">
            <div className="flex items-center justify-center w-10 h-10 bg-[#21262d] rounded-md">
              <span className="text-lg font-black text-white">{player.rank}.</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#fbbf24]" />
                <span className="text-sm font-bold text-white">OVERALL</span>
              </div>
              <p className="text-xs text-[#6e7681]">({player.points} points)</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-4 py-3 border-t border-[#21262d]">
          <h3 className="text-[10px] font-semibold text-[#6e7681] uppercase tracking-wider mb-2">
            Statistics
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#0d1117] rounded-lg p-2.5 border border-[#30363d]">
              <div className="flex items-center gap-1.5 text-[#6e7681] mb-1">
                <Swords className="w-3 h-3" />
                <span className="text-[10px]">Kills</span>
              </div>
              <p className="text-base font-bold text-white">{player.stats.kills.toLocaleString()}</p>
            </div>
            <div className="bg-[#0d1117] rounded-lg p-2.5 border border-[#30363d]">
              <div className="flex items-center gap-1.5 text-[#6e7681] mb-1">
                <Target className="w-3 h-3" />
                <span className="text-[10px]">Deaths</span>
              </div>
              <p className="text-base font-bold text-white">{player.stats.deaths.toLocaleString()}</p>
            </div>
            <div className="bg-[#0d1117] rounded-lg p-2.5 border border-[#30363d]">
              <div className="flex items-center gap-1.5 text-[#6e7681] mb-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-[10px]">Win Rate</span>
              </div>
              <p className="text-base font-bold text-[#3fb950]">{player.stats.winRate.toFixed(1)}%</p>
            </div>
            <div className="bg-[#0d1117] rounded-lg p-2.5 border border-[#30363d]">
              <div className="flex items-center gap-1.5 text-[#6e7681] mb-1">
                <Clock className="w-3 h-3" />
                <span className="text-[10px]">Playtime</span>
              </div>
              <p className="text-base font-bold text-white">{formatPlaytime(player.stats.playtime)}</p>
            </div>
          </div>
        </div>

        {/* Tiers Section */}
        <div className="px-4 py-3 border-t border-[#21262d]">
          <h3 className="text-[10px] font-semibold text-[#6e7681] uppercase tracking-wider mb-2">
            Tiers
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {player.tiers.map((tier, index) => (
              <div key={`${tier.category}-${index}`} className="flex flex-col items-center flex-shrink-0">
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0d1117] border border-[#30363d]"
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
      </DialogContent>
    </Dialog>
  );
}
