import type { Player } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const DB_KEY = 'westtiers_players';
const NEW_PLAYERS_THRESHOLD_DAYS = 7;

// Initial seed data with real Minecraft usernames
const INITIAL_PLAYERS: Player[] = [
  {
    id: uuidv4(),
    username: 'Marlowww',
    uuid: '069a79f4-44e9-4726-a5be-fca90e38aaf5',
    rank: 1,
    rankTitle: 'Combat Grandmaster',
    points: 450,
    region: 'NA',
    tiers: [
      { category: 'sword', tier: 'HT1', points: 95 },
      { category: 'axe', tier: 'HT1', points: 92 },
      { category: 'uhc', tier: 'HT1', points: 88 },
      { category: 'pot', tier: 'LT1', points: 75 },
      { category: 'vanilla', tier: 'HT1', points: 90 },
      { category: 'nethop', tier: 'HT1', points: 85 },
      { category: 'smp', tier: 'LT1', points: 70 },
      { category: 'mace', tier: 'LT1', points: 65 },
    ],
    stats: { kills: 1250, deaths: 320, wins: 890, losses: 180, playtime: 3600, winRate: 83.2 },
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
  {
    id: uuidv4(),
    username: 'ItzRealMe',
    uuid: '61699b2e-d327-4a01-825f-8913b8a15e7d',
    rank: 2,
    rankTitle: 'Combat Master',
    points: 330,
    region: 'NA',
    tiers: [
      { category: 'sword', tier: 'HT3', points: 85 },
      { category: 'axe', tier: 'HT1', points: 90 },
      { category: 'uhc', tier: 'HT1', points: 87 },
      { category: 'pot', tier: 'HT1', points: 82 },
      { category: 'vanilla', tier: 'LT2', points: 68 },
      { category: 'nethop', tier: 'LT2', points: 65 },
      { category: 'smp', tier: 'LT2', points: 62 },
      { category: 'mace', tier: 'LT2', points: 60 },
    ],
    stats: { kills: 980, deaths: 280, wins: 720, losses: 150, playtime: 2800, winRate: 82.8 },
    joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
  {
    id: uuidv4(),
    username: 'coldified',
    uuid: '7d7f5f41-3b6e-4b9b-9f1e-8c5d7a3b2f1e',
    rank: 3,
    rankTitle: 'Combat Master',
    points: 296,
    region: 'EU',
    tiers: [
      { category: 'sword', tier: 'LT1', points: 72 },
      { category: 'axe', tier: 'LT1', points: 70 },
      { category: 'uhc', tier: 'LT1', points: 75 },
      { category: 'pot', tier: 'HT2', points: 80 },
      { category: 'vanilla', tier: 'HT2', points: 78 },
      { category: 'nethop', tier: 'LT3', points: 58 },
      { category: 'smp', tier: 'HT1', points: 85 },
      { category: 'mace', tier: 'LT2', points: 64 },
    ],
    stats: { kills: 850, deaths: 310, wins: 640, losses: 170, playtime: 2400, winRate: 79.0 },
    joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
  {
    id: uuidv4(),
    username: 'Swight',
    uuid: '8e5f4d3c-2b1a-4f6e-9d8c-7b6a5f4e3d2c',
    rank: 4,
    rankTitle: 'Combat Expert',
    points: 275,
    region: 'NA',
    tiers: [
      { category: 'sword', tier: 'LT2', points: 68 },
      { category: 'axe', tier: 'LT2', points: 66 },
      { category: 'uhc', tier: 'HT3', points: 82 },
      { category: 'pot', tier: 'LT1', points: 70 },
      { category: 'vanilla', tier: 'LT2', points: 65 },
      { category: 'nethop', tier: 'HT1', points: 88 },
      { category: 'smp', tier: 'LT3', points: 55 },
      { category: 'mace', tier: 'LT1', points: 72 },
    ],
    stats: { kills: 720, deaths: 290, wins: 580, losses: 160, playtime: 2100, winRate: 78.4 },
    joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
  {
    id: uuidv4(),
    username: 'janekv',
    uuid: '9f6e5d4c-3b2a-5f7e-0e9d-8c7b6a5f4e3d',
    rank: 5,
    rankTitle: 'Combat Ace',
    points: 230,
    region: 'EU',
    tiers: [
      { category: 'sword', tier: 'LT1', points: 74 },
      { category: 'axe', tier: 'LT2', points: 66 },
      { category: 'uhc', tier: 'LT2', points: 64 },
      { category: 'pot', tier: 'HT3', points: 78 },
      { category: 'vanilla', tier: 'LT3', points: 58 },
      { category: 'nethop', tier: 'LT3', points: 56 },
      { category: 'smp', tier: 'HT4', points: 48 },
      { category: 'mace', tier: 'HT1', points: 86 },
    ],
    stats: { kills: 650, deaths: 280, wins: 520, losses: 140, playtime: 1800, winRate: 78.8 },
    joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
  {
    id: uuidv4(),
    username: 'Notch',
    uuid: '069a79f4-44e9-4726-a5be-fca90e38aaf5',
    rank: 6,
    rankTitle: 'Combat Veteran',
    points: 195,
    region: 'EU',
    tiers: [
      { category: 'sword', tier: 'LT3', points: 58 },
      { category: 'axe', tier: 'LT3', points: 56 },
      { category: 'uhc', tier: 'LT2', points: 62 },
      { category: 'pot', tier: 'LT2', points: 64 },
      { category: 'vanilla', tier: 'LT3', points: 55 },
      { category: 'nethop', tier: 'LT2', points: 66 },
      { category: 'smp', tier: 'LT2', points: 60 },
      { category: 'mace', tier: 'LT3', points: 54 },
    ],
    stats: { kills: 520, deaths: 250, wins: 420, losses: 130, playtime: 1500, winRate: 76.4 },
    joinedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
  {
    id: uuidv4(),
    username: 'Dream',
    uuid: '1c4c6b6c-6b6c-4c1c-8c8c-8c8c8c8c8c8c',
    rank: 7,
    rankTitle: 'Combat Warrior',
    points: 165,
    region: 'NA',
    tiers: [
      { category: 'sword', tier: 'LT4', points: 48 },
      { category: 'axe', tier: 'LT3', points: 54 },
      { category: 'uhc', tier: 'LT3', points: 52 },
      { category: 'pot', tier: 'LT3', points: 56 },
      { category: 'vanilla', tier: 'LT4', points: 46 },
      { category: 'nethop', tier: 'LT3', points: 58 },
      { category: 'smp', tier: 'LT3', points: 50 },
      { category: 'mace', tier: 'LT2', points: 62 },
    ],
    stats: { kills: 480, deaths: 240, wins: 380, losses: 120, playtime: 1350, winRate: 76.0 },
    joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
  {
    id: uuidv4(),
    username: 'Technoblade',
    uuid: '2d5d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f',
    rank: 8,
    rankTitle: 'Combatant',
    points: 120,
    region: 'NA',
    tiers: [
      { category: 'sword', tier: 'LT5', points: 38 },
      { category: 'axe', tier: 'LT4', points: 44 },
      { category: 'uhc', tier: 'LT4', points: 42 },
      { category: 'pot', tier: 'LT4', points: 46 },
      { category: 'vanilla', tier: 'LT5', points: 36 },
      { category: 'nethop', tier: 'LT4', points: 48 },
      { category: 'smp', tier: 'LT4', points: 40 },
      { category: 'mace', tier: 'LT4', points: 44 },
    ],
    stats: { kills: 350, deaths: 200, wins: 280, losses: 100, playtime: 1000, winRate: 73.7 },
    joinedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
  {
    id: uuidv4(),
    username: 'xNestorio',
    uuid: '3e6e8f9a-0b1c-2d3e-4f5a-6b7c8d9e0f1a',
    rank: 9,
    rankTitle: 'Combatant',
    points: 95,
    region: 'EU',
    tiers: [
      { category: 'sword', tier: 'LT5', points: 35 },
      { category: 'axe', tier: 'LT5', points: 38 },
      { category: 'uhc', tier: 'LT5', points: 36 },
      { category: 'pot', tier: 'LT5', points: 40 },
      { category: 'vanilla', tier: 'LT5', points: 34 },
      { category: 'nethop', tier: 'LT5', points: 42 },
      { category: 'smp', tier: 'LT5', points: 32 },
      { category: 'mace', tier: 'LT5', points: 38 },
    ],
    stats: { kills: 280, deaths: 180, wins: 220, losses: 90, playtime: 800, winRate: 71.0 },
    joinedAt: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
  {
    id: uuidv4(),
    username: 'Fruitberries',
    uuid: '4f7f8f9b-0c1d-2e3f-4a5b-6c7d8e9f0a1b',
    rank: 10,
    rankTitle: 'Novice',
    points: 75,
    region: 'NA',
    tiers: [
      { category: 'sword', tier: 'N/A', points: 25 },
      { category: 'axe', tier: 'LT5', points: 32 },
      { category: 'uhc', tier: 'LT5', points: 30 },
      { category: 'pot', tier: 'LT5', points: 35 },
      { category: 'vanilla', tier: 'LT5', points: 28 },
      { category: 'nethop', tier: 'LT5', points: 38 },
      { category: 'smp', tier: 'LT5', points: 26 },
      { category: 'mace', tier: 'LT5', points: 32 },
    ],
    stats: { kills: 220, deaths: 150, wins: 170, losses: 80, playtime: 650, winRate: 68.0 },
    joinedAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date().toISOString(),
    isNew: false,
  },
];

class Database {
  private players: Player[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(DB_KEY);
      if (stored) {
        this.players = JSON.parse(stored);
      } else {
        this.players = [...INITIAL_PLAYERS];
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
      this.players = [...INITIAL_PLAYERS];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.players));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  getAllPlayers(): Player[] {
    return [...this.players].sort((a, b) => a.rank - b.rank);
  }

  getPlayerById(id: string): Player | undefined {
    return this.players.find(p => p.id === id);
  }

  getPlayerByUsername(username: string): Player | undefined {
    return this.players.find(p => p.username.toLowerCase() === username.toLowerCase());
  }

  getNewPlayers(): Player[] {
    const threshold = Date.now() - (NEW_PLAYERS_THRESHOLD_DAYS * 24 * 60 * 60 * 1000);
    return this.players
      .filter(p => new Date(p.joinedAt).getTime() > threshold || p.isNew)
      .sort((a, b) => a.rank - b.rank);
  }

  addPlayer(playerData: Partial<Player> & { username: string; region: Player['region'] }): Player {
    const existingPlayer = this.getPlayerByUsername(playerData.username);
    if (existingPlayer) {
      return existingPlayer;
    }

    const maxRank = Math.max(...this.players.map(p => p.rank), 0);
    const newPlayer: Player = {
      id: uuidv4(),
      rank: maxRank + 1,
      username: playerData.username,
      uuid: playerData.uuid || '',
      rankTitle: playerData.rankTitle || 'Novice',
      points: playerData.points || 0,
      region: playerData.region,
      tiers: playerData.tiers || [],
      stats: playerData.stats || { kills: 0, deaths: 0, wins: 0, losses: 0, playtime: 0, winRate: 0 },
      avatar: playerData.avatar,
      skinUrl: playerData.skinUrl,
      isNew: true,
      joinedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    this.players.push(newPlayer);
    this.saveToStorage();
    return newPlayer;
  }

  updatePlayer(id: string, updates: Partial<Player>): Player | undefined {
    const index = this.players.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    this.players[index] = {
      ...this.players[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    this.saveToStorage();
    return this.players[index];
  }

  updatePlayerStats(id: string, stats: Partial<Player['stats']>): Player | undefined {
    const player = this.getPlayerById(id);
    if (!player) return undefined;

    const updatedStats = { ...player.stats, ...stats };
    // Recalculate win rate
    const totalGames = updatedStats.wins + updatedStats.losses;
    updatedStats.winRate = totalGames > 0 ? (updatedStats.wins / totalGames) * 100 : 0;

    return this.updatePlayer(id, { stats: updatedStats });
  }

  recalculateRanks(): void {
    this.players.sort((a, b) => b.points - a.points);
    this.players.forEach((player, index) => {
      player.rank = index + 1;
    });
    this.saveToStorage();
  }

  searchPlayers(query: string): Player[] {
    const lowerQuery = query.toLowerCase();
    return this.players
      .filter(p => p.username.toLowerCase().includes(lowerQuery))
      .sort((a, b) => a.rank - b.rank);
  }

  clearAllData(): void {
    this.players = [];
    localStorage.removeItem(DB_KEY);
  }

  resetToInitial(): void {
    this.players = [...INITIAL_PLAYERS];
    this.saveToStorage();
  }
}

// Singleton instance
export const db = new Database();

// Export for testing
export { Database };
