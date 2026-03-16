import { Trophy, Globe, Zap, Shield } from 'lucide-react';

export function WhyWestTiers() {
  const features = [
    {
      icon: Trophy,
      title: 'Accurate Rankings',
      description: 'Real-time tracking across all major PvP servers',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Track players from every region worldwide',
    },
    {
      icon: Zap,
      title: 'Live Updates',
      description: 'Stats update automatically as you play',
    },
    {
      icon: Shield,
      title: 'Anti-Cheat',
      description: 'Advanced detection for fair rankings',
    },
  ];

  return (
    <section className="w-full py-10 border-t border-[#21262d]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            Why Choose <span className="text-[#fbbf24]">WestTiers</span>?
          </h2>
          <p className="text-[#8b949e] text-sm leading-relaxed max-w-2xl mx-auto">
            Established in 2023-2024, WestTiers is the premier, most accurate Minecraft PvP leaderboard. 
            Unlike other trackers, we offer true real-time, cross-server tracking to authentically 
            measure your skills against the best players in the world.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="flex flex-col items-center text-center p-4 bg-[#161b22] rounded-lg border border-[#30363d]"
              >
                <div className="w-10 h-10 rounded-full bg-[#21262d] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-[#8b949e]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
