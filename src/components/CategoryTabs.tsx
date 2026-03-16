import type { GameCategory } from '@/types';

interface CategoryTabsProps {
  activeCategory: GameCategory | 'new';
  onCategoryChange: (category: GameCategory | 'new') => void;
}

const categories: { id: GameCategory; name: string; icon: string }[] = [
  { id: 'overall', name: 'Overall', icon: '🏆' },
  { id: 'ltms', name: 'LTMs', icon: '⚔️' },
  { id: 'vanilla', name: 'Vanilla', icon: '💎' },
  { id: 'uhc', name: 'UHC', icon: '❤️' },
  { id: 'pot', name: 'Pot', icon: '🧪' },
  { id: 'nethop', name: 'NethOP', icon: '👻' },
  { id: 'smp', name: 'SMP', icon: '👁️' },
  { id: 'sword', name: 'Sword', icon: '⚔️' },
  { id: 'axe', name: 'Axe', icon: '🪓' },
  { id: 'mace', name: 'Mace', icon: '🔨' },
];

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold
            transition-all duration-150
            ${activeCategory === cat.id 
              ? 'bg-[#21262d] text-white border border-[#30363d]' 
              : 'bg-[#161b22] text-[#8b949e] border border-transparent hover:bg-[#21262d] hover:text-[#c9d1d9]'
            }
          `}
        >
          <span>{cat.icon}</span>
          {cat.name}
        </button>
      ))}
      <button
        onClick={() => onCategoryChange('new')}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold
          transition-all duration-150
          ${activeCategory === 'new'
            ? 'bg-[#238636] text-white border border-[#2ea043]' 
            : 'bg-[#161b22] text-[#8b949e] border border-transparent hover:bg-[#21262d] hover:text-[#c9d1d9]'
          }
        `}
      >
        <span>👤</span>
        New Players
      </button>
    </div>
  );
}
