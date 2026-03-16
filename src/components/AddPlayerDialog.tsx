import { useState } from 'react';
import { Search, UserPlus, Loader2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { minecraftAPI } from '@/lib/minecraft-api';
import { playerService } from '@/lib/supabase';

interface AddPlayerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayerAdded: () => void;
}

export function AddPlayerDialog({ isOpen, onClose, onPlayerAdded }: AddPlayerDialogProps) {
  const [username, setUsername] = useState('');
  const [region, setRegion] = useState<'NA' | 'EU' | 'AS' | 'SA' | 'OC' | 'AF'>('NA');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Check if player already exists in database
      const existingPlayer = await playerService.getPlayerByUsername(username);
      if (existingPlayer) {
        setError(`Player "${username}" is already on the leaderboard!`);
        setIsLoading(false);
        return;
      }

      // Create player via Minecraft API
      const playerData = await minecraftAPI.createPlayer(username.trim(), region);
      
      // Add to Supabase database
      const newPlayer = await playerService.addPlayer(playerData);
      
      if (!newPlayer) {
        throw new Error('Failed to add player to database');
      }

      // Recalculate ranks
      await playerService.recalculateRanks();
      
      setSuccess(`Successfully added ${username} to the leaderboard!`);
      setUsername('');
      
      // Notify parent
      onPlayerAdded();
      
      // Close dialog after a short delay
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add player');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUsername('');
    setError(null);
    setSuccess(null);
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-full bg-[#161b22] border-[#30363d]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#fbbf24]" />
            Add Player
          </DialogTitle>
          <DialogDescription className="text-[#8b949e] text-sm">
            Enter a Minecraft username to add them to the global leaderboard.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#c9d1d9]">Minecraft Username</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e7681]" />
              <Input
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="pl-9 bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#6e7681] h-9
                           focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
              />
            </div>
          </div>

          {/* Region Select */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#c9d1d9] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Region
            </label>
            <Select value={region} onValueChange={(v) => setRegion(v as any)} disabled={isLoading}>
              <SelectTrigger className="bg-[#0d1117] border-[#30363d] text-white h-9">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="bg-[#161b22] border-[#30363d]">
                <SelectItem value="NA" className="text-[#c9d1d9] hover:bg-[#21262d] focus:bg-[#21262d]">North America</SelectItem>
                <SelectItem value="EU" className="text-[#c9d1d9] hover:bg-[#21262d] focus:bg-[#21262d]">Europe</SelectItem>
                <SelectItem value="AS" className="text-[#c9d1d9] hover:bg-[#21262d] focus:bg-[#21262d]">Asia</SelectItem>
                <SelectItem value="SA" className="text-[#c9d1d9] hover:bg-[#21262d] focus:bg-[#21262d]">South America</SelectItem>
                <SelectItem value="OC" className="text-[#c9d1d9] hover:bg-[#21262d] focus:bg-[#21262d]">Oceania</SelectItem>
                <SelectItem value="AF" className="text-[#c9d1d9] hover:bg-[#21262d] focus:bg-[#21262d]">Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-2.5 bg-[#da3633]/10 border border-[#da3633]/30 rounded-md">
              <p className="text-xs text-[#f85149]">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-2.5 bg-[#238636]/10 border border-[#238636]/30 rounded-md">
              <p className="text-xs text-[#3fb950]">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#0d1117] font-semibold h-9
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding Player...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Add to Leaderboard
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
