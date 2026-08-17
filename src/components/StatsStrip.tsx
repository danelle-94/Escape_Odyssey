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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white/95 backdrop-blur-xl border border-purple-100 rounded-2xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(139,92,246,0.08)]">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className={`flex items-start gap-4 p-3 rounded-xl transition-all hover:bg-blue-50/60 ${
                idx !== stats.length - 1 ? 'lg:border-r lg:border-slate-100' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0074B5] flex-shrink-0 shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel tracking-tight">
                  <span className="text-[#0074B5]">{stat.number}</span>
                </div>
                <div className="text-sm font-bold text-slate-800">{stat.label}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
