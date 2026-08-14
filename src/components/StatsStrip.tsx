import React from 'react';
import { Globe, UserCheck, Zap, ShieldCheck } from 'lucide-react';

export const StatsStrip: React.FC = () => {
  const stats = [
    {
      number: '150+',
      label: 'Countries Supported',
      subtext: 'Global embassy filing coverage',
      icon: Globe,
    },
    {
      number: 'Expert',
      label: 'Visa Guidance',
      subtext: 'Tailored document preparation',
      icon: UserCheck,
    },
    {
      number: 'Fast & Reliable',
      label: 'Service Delivery',
      subtext: 'Express appointment scheduling',
      icon: Zap,
    },
    {
      number: 'End-to-End',
      label: 'Visa Support',
      subtext: 'From filing to passport delivery',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-navy-card/95 backdrop-blur-xl border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-gold-glow-lg">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className={`flex items-start gap-4 p-3 rounded-xl transition-all hover:bg-navy-800/50 ${
                idx !== stats.length - 1 ? 'lg:border-r lg:border-slate-800/80' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-navy-950 border border-gold-500/40 flex items-center justify-center text-gold-400 flex-shrink-0 shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-cinzel tracking-tight">
                  <span className="text-gold-gradient">{stat.number}</span>
                </div>
                <div className="text-sm font-bold text-slate-200">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
