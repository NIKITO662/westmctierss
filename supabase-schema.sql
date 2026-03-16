-- Supabase Schema for WestTiers Leaderboard

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL UNIQUE,
  uuid TEXT NOT NULL,
  rank INTEGER NOT NULL DEFAULT 0,
  rank_title TEXT NOT NULL DEFAULT 'Novice',
  points INTEGER NOT NULL DEFAULT 0,
  region TEXT NOT NULL CHECK (region IN ('NA', 'EU', 'AS', 'SA', 'OC', 'AF')),
  tiers JSONB NOT NULL DEFAULT '[]',
  stats JSONB NOT NULL DEFAULT '{"kills": 0, "deaths": 0, "wins": 0, "losses": 0, "playtime": 0, "winRate": 0}',
  skin_url TEXT,
  avatar_url TEXT,
  is_new BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_players_rank ON players(rank);
CREATE INDEX IF NOT EXISTS idx_players_username ON players(username);
CREATE INDEX IF NOT EXISTS idx_players_points ON players(points DESC);
CREATE INDEX IF NOT EXISTS idx_players_created_at ON players(created_at);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to all users" ON players
  FOR SELECT USING (true);

CREATE POLICY "Allow insert for authenticated users" ON players
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for all users" ON players
  FOR UPDATE USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
