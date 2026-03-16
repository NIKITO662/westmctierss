// WestTiers - Minecraft PvP Leaderboard Types

export type TierLevel = 'HT1' | 'HT2' | 'HT3' | 'HT4' | 'HT5' | 'LT1' | 'LT2' | 'LT3' | 'LT4' | 'LT5' | 'N/A';

export interface PlayerTier {
  category: string;
  tier: TierLevel;
  points: number;
}

export interface PlayerStats {
  kills: number;
  deaths: number;
  wins: number;
  losses: number;
  playtime: number;
  winRate: number;
}

export interface Player {
  id: string;
  username: string;
  uuid: string;
  rank: number;
  rankTitle: string;
  points: number;
  region: 'NA' | 'EU' | 'AS' | 'SA' | 'OC' | 'AF';
  tiers: PlayerTier[];
  stats: PlayerStats;
  avatar?: string;
  skinUrl?: string;
  isNew?: boolean;
  joinedAt: string;
  lastUpdated: string;
}

export type GameCategory = 
  | 'overall' 
  | 'ltms' 
  | 'vanilla' 
  | 'uhc' 
  | 'pot' 
  | 'nethop' 
  | 'smp' 
  | 'sword' 
  | 'axe' 
  | 'mace';

// Tier colors - exact from mctiers.com
export const TIER_COLORS: Record<string, string> = {
  'HT1': '#fbbf24',
  'HT2': '#f59e0b',
  'HT3': '#ef4444',
  'HT4': '#8b5cf6',
  'HT5': '#6b7280',
  'LT1': '#10b981',
  'LT2': '#3b82f6',
  'LT3': '#06b6d4',
  'LT4': '#84cc16',
  'LT5': '#9ca3af',
  'N/A': '#4b5563',
};

// Rank titles based on points
export const RANK_TITLES = [
  { min: 1000, title: 'Combat Legend' },
  { min: 800, title: 'Combat Grandmaster' },
  { min: 600, title: 'Combat Master' },
  { min: 450, title: 'Combat Expert' },
  { min: 300, title: 'Combat Ace' },
  { min: 200, title: 'Combat Veteran' },
  { min: 100, title: 'Combat Warrior' },
  { min: 50, title: 'Combatant' },
  { min: 0, title: 'Novice' },
];

export function getRankTitle(points: number): string {
  for (const rank of RANK_TITLES) {
    if (points >= rank.min) return rank.title;
  }
  return 'Novice';
}

// Category icons mapping
export const CATEGORY_ICONS: Record<string, string> = {
  sword: 'sword',
  axe: 'axe',
  uhc: 'heart',
  pot: 'potion',
  vanilla: 'diamond',
  nethop: 'ghost',
  smp: 'eye',
  mace: 'mace',
  ltms: 'swords',
  overall: 'trophy',
};
