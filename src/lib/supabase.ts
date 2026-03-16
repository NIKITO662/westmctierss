import { createClient } from '@supabase/supabase-js';
import type { Player, PlayerTier, PlayerStats } from '@/types';

// Supabase configuration
// Using a public Supabase project for the leaderboard
const SUPABASE_URL = 'https://cmdrlnekwtlchcyvfeuf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHJsbmVrd3RsY2hjeXZmZXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjA4NDcsImV4cCI6MjA4OTIzNjg0N30.XkK4i_3XmwZEndvdP-w5OZuSy6xGhu_MxzLwXsQqWy8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database types
export interface DatabasePlayer {
  id: string;
  username: string;
  uuid: string;
  rank: number;
  rank_title: string;
  points: number;
  region: 'NA' | 'EU' | 'AS' | 'SA' | 'OC' | 'AF';
  tiers: PlayerTier[];
  stats: PlayerStats;
  skin_url: string | null;
  avatar_url: string | null;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

// Convert database player to app player
export function dbToPlayer(dbPlayer: DatabasePlayer): Player {
  return {
    id: dbPlayer.id,
    username: dbPlayer.username,
    uuid: dbPlayer.uuid,
    rank: dbPlayer.rank,
    rankTitle: dbPlayer.rank_title,
    points: dbPlayer.points,
    region: dbPlayer.region,
    tiers: dbPlayer.tiers,
    stats: dbPlayer.stats,
    skinUrl: dbPlayer.skin_url || undefined,
    avatar: dbPlayer.avatar_url || undefined,
    isNew: dbPlayer.is_new,
    joinedAt: dbPlayer.created_at,
    lastUpdated: dbPlayer.updated_at,
  };
}

// Player service
export const playerService = {
  // Get all players sorted by rank
  async getAllPlayers(): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('rank', { ascending: true });
    
    if (error) {
      console.error('Error fetching players:', error);
      return [];
    }
    
    return (data || []).map(dbToPlayer);
  },

  // Get player by username
  async getPlayerByUsername(username: string): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .ilike('username', username)
      .single();
    
    if (error || !data) return null;
    return dbToPlayer(data);
  },

  // Get new players (last 7 days)
  async getNewPlayers(): Promise<Player[]> {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .or(`created_at.gte.${sevenDaysAgo},is_new.eq.true`)
      .order('rank', { ascending: true });
    
    if (error) {
      console.error('Error fetching new players:', error);
      return [];
    }
    
    return (data || []).map(dbToPlayer);
  },

  // Add new player
  async addPlayer(playerData: {
    username: string;
    uuid: string;
    rank_title: string;
    points: number;
    region: 'NA' | 'EU' | 'AS' | 'SA' | 'OC' | 'AF';
    tiers: PlayerTier[];
    stats: PlayerStats;
    skin_url: string | null;
    avatar_url: string | null;
  }): Promise<Player | null> {
    // Get current max rank
    const { data: maxRankData } = await supabase
      .from('players')
      .select('rank')
      .order('rank', { ascending: false })
      .limit(1);
    
    const newRank = (maxRankData?.[0]?.rank || 0) + 1;

    const { data, error } = await supabase
      .from('players')
      .insert({
        ...playerData,
        rank: newRank,
        is_new: true,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error adding player:', error);
      return null;
    }
    
    return data ? dbToPlayer(data) : null;
  },

  // Update player stats
  async updatePlayerStats(playerId: string, stats: PlayerStats): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .update({ 
        stats,
        updated_at: new Date().toISOString(),
      })
      .eq('id', playerId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating player stats:', error);
      return null;
    }
    
    return data ? dbToPlayer(data) : null;
  },

  // Recalculate all ranks based on points
  async recalculateRanks(): Promise<void> {
    const { data: players, error } = await supabase
      .from('players')
      .select('id, points')
      .order('points', { ascending: false });
    
    if (error || !players) return;

    // Update ranks in batch
    const updates = players.map((player, index) => ({
      id: player.id,
      rank: index + 1,
      updated_at: new Date().toISOString(),
    }));

    for (const update of updates) {
      await supabase
        .from('players')
        .update({ rank: update.rank, updated_at: update.updated_at })
        .eq('id', update.id);
    }
  },

  // Search players
  async searchPlayers(query: string): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .ilike('username', `%${query}%`)
      .order('rank', { ascending: true });
    
    if (error) {
      console.error('Error searching players:', error);
      return [];
    }
    
    return (data || []).map(dbToPlayer);
  },
};
