import { useState } from 'react';
import { Home, Trophy, MessageCircle, FileText, Search, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ onSearch, searchQuery, setSearchQuery }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d1117] border-b border-[#21262d]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-xl font-black tracking-tight">
              <span className="text-[#fbbf24]">WEST</span>
              <span className="text-[#d97706]">TIERS</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#8b949e] hover:text-white rounded-md hover:bg-[#21262d] transition-colors">
              <Home className="w-4 h-4" />
              Home
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-[#21262d] rounded-md">
              <Trophy className="w-4 h-4" />
              Rankings
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#8b949e] hover:text-white rounded-md hover:bg-[#21262d] transition-colors">
              <MessageCircle className="w-4 h-4" />
              Discords
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#8b949e] hover:text-white rounded-md hover:bg-[#21262d] transition-colors">
              <FileText className="w-4 h-4" />
              API Docs
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6e7681]" />
              <Input
                type="text"
                placeholder="Search player..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-8 pr-3 py-1.5 h-8 bg-[#0d1117] border-[#30363d] text-sm text-[#c9d1d9] placeholder:text-[#6e7681] rounded-md focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
              />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#8b949e] hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#21262d]">
            <nav className="flex flex-col gap-1">
              <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-[#8b949e] hover:text-white rounded-md hover:bg-[#21262d]">
                <Home className="w-4 h-4" />
                Home
              </a>
              <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-[#21262d] rounded-md">
                <Trophy className="w-4 h-4" />
                Rankings
              </a>
              <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-[#8b949e] hover:text-white rounded-md hover:bg-[#21262d]">
                <MessageCircle className="w-4 h-4" />
                Discords
              </a>
              <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-[#8b949e] hover:text-white rounded-md hover:bg-[#21262d]">
                <FileText className="w-4 h-4" />
                API Docs
              </a>
            </nav>
            <form onSubmit={handleSearch} className="mt-3 px-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6e7681]" />
                <Input
                  type="text"
                  placeholder="Search player..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 h-8 bg-[#0d1117] border-[#30363d] text-sm text-[#c9d1d9] placeholder:text-[#6e7681] rounded-md"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
