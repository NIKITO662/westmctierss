import { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, RefreshCw, Users, Trophy, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { CategoryTabs } from '@/components/CategoryTabs';
import { LeaderboardRow } from '@/components/LeaderboardRow';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';
import { AddPlayerDialog } from '@/components/AddPlayerDialog';
import { WhyWestTiers } from '@/components/WhyWestTiers';
import type { Player, GameCategory } from '@/types';
import { playerService } from '@/lib/supabase';

// Stats Card Component
interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

function StatsCard({ icon: Icon, label, value, color }: StatsCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#161b22] rounded-lg border border-[#30363d]">
      <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-[#6e7681] uppercase tracking-wider">{label}</p>
        <p className="text-base font-bold text-white truncate">{value}</p>
      </div>
    </div>
  );
}

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [activeCategory, setActiveCategory] = useState<GameCategory | 'new'>('overall');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  // Load players from Supabase
  const loadPlayers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let loadedPlayers: Player[];
      
      if (activeCategory === 'new') {
        loadedPlayers = await playerService.getNewPlayers();
      } else {
        loadedPlayers = await playerService.getAllPlayers();
      }
      
      setPlayers(loadedPlayers);
      setFilteredPlayers(loadedPlayers);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error loading players:', err);
      setError('Failed to load players. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory]);

  // Initial load
  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  // Filter players based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      playerService.searchPlayers(searchQuery).then(setFilteredPlayers);
    } else {
      setFilteredPlayers(players);
    }
  }, [searchQuery, players]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle player click
  const handlePlayerClick = useCallback((player: Player) => {
    setSelectedPlayer(player);
    setIsProfileOpen(true);
  }, []);

  // Handle player added
  const handlePlayerAdded = useCallback(() => {
    loadPlayers();
  }, [loadPlayers]);

  // Refresh data
  const handleRefresh = useCallback(() => {
    loadPlayers();
  }, [loadPlayers]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalPlayers = players.length;
    const totalKills = players.reduce((sum, p) => sum + p.stats.kills, 0);
    const avgWinRate = totalPlayers > 0 
      ? players.reduce((sum, p) => sum + p.stats.winRate, 0) / totalPlayers 
      : 0;
    const newPlayers = players.filter(p => p.isNew).length;

    return {
      totalPlayers,
      totalKills,
      avgWinRate,
      newPlayers,
    };
  }, [players]);

  // Sort players by rank for display
  const sortedPlayers = useMemo(() => {
    return [...filteredPlayers].sort((a, b) => a.rank - b.rank);
  }, [filteredPlayers]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Header */}
      <Header 
        onSearch={handleSearch} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-white mb-1">
            PvP <span className="text-[#fbbf24]">Leaderboard</span>
          </h1>
          <p className="text-sm text-[#8b949e]">
            Track the best Minecraft PvP players across all game modes
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatsCard
            icon={Users}
            label="Total Players"
            value={stats.totalPlayers.toString()}
            color="bg-[#1f6feb]"
          />
          <StatsCard
            icon={Target}
            label="Total Kills"
            value={stats.totalKills.toLocaleString()}
            color="bg-[#da3633]"
          />
          <StatsCard
            icon={TrendingUp}
            label="Avg Win Rate"
            value={`${stats.avgWinRate.toFixed(1)}%`}
            color="bg-[#238636]"
          />
          <StatsCard
            icon={Trophy}
            label="New Players"
            value={stats.newPlayers.toString()}
            color="bg-[#fbbf24]"
          />
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <CategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="bg-[#161b22] border-[#30363d] text-[#8b949e] hover:bg-[#21262d] hover:text-white h-8 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={() => setIsAddPlayerOpen(true)}
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#0d1117] font-semibold h-8 text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add Player
            </Button>
          </div>
        </div>

        {/* Server Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#161b22] rounded-md border border-[#30363d]">
              <div className="w-1.5 h-1.5 bg-[#3fb950] rounded-full animate-pulse" />
              <span className="text-[10px] text-[#8b949e]">Live</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-[#161b22] rounded-md border border-[#30363d]">
              <span className="text-[10px] text-[#6e7681]">Server:</span>
              <span className="text-[10px] text-[#fbbf24] font-mono">mcpvp.club</span>
            </div>
          </div>
          <p className="text-[10px] text-[#6e7681]">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-[#da3633]/10 border border-[#da3633]/30 rounded-lg">
            <p className="text-xs text-[#f85149]">{error}</p>
          </div>
        )}

        {/* Leaderboard */}
        <div className="space-y-2">
          {isLoading ? (
            // Loading Skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className="w-full h-16 bg-[#161b22] rounded-lg animate-pulse border border-[#30363d]"
              />
            ))
          ) : sortedPlayers.length > 0 ? (
            sortedPlayers.map((player) => (
              <LeaderboardRow
                key={player.id}
                player={player}
                onClick={handlePlayerClick}
                categoryFilter={activeCategory !== 'new' ? activeCategory : undefined}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-[#161b22] rounded-lg border border-[#30363d]">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#21262d] rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-[#484f58]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {searchQuery ? 'No players found' : 'Leaderboard is empty'}
              </h3>
              <p className="text-sm text-[#8b949e] mb-4 max-w-md mx-auto">
                {searchQuery 
                  ? `No players matching "${searchQuery}"` 
                  : activeCategory === 'new' 
                    ? 'No new players in the last 7 days'
                    : 'Be the first to join the global leaderboard! Add your Minecraft profile to get started.'}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => setIsAddPlayerOpen(true)}
                  className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#0d1117] font-semibold h-9 text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add Your Profile
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Why WestTiers Section */}
        <WhyWestTiers />

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-[#21262d]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black">
                <span className="text-[#fbbf24]">WEST</span>
                <span className="text-[#d97706]">TIERS</span>
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#6e7681]">
              <a href="#" className="hover:text-[#c9d1d9] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#c9d1d9] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#c9d1d9] transition-colors">Contact</a>
            </div>
            <p className="text-[10px] text-[#484f58]">
              Not affiliated with Mojang or Microsoft
            </p>
          </div>
        </footer>
      </main>

      {/* Player Profile Modal */}
      <PlayerProfileModal
        player={selectedPlayer}
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setSelectedPlayer(null);
        }}
      />

      {/* Add Player Dialog */}
      <AddPlayerDialog
        isOpen={isAddPlayerOpen}
        onClose={() => setIsAddPlayerOpen(false)}
        onPlayerAdded={handlePlayerAdded}
      />
    </div>
  );
}

export default App;
