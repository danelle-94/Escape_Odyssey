import React from 'react';
import { FEATURES } from '../data/websiteData';
import { UserCheck, Zap, ShieldCheck, Globe, Eye, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-gold-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-gold-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-gold-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-gold-400" />;
      case 'Eye': return <Eye className="w-6 h-6 text-gold-400" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-gold-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-gold-400" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-navy-900 relative overflow-hidden">
      
      {/* Background Subtle Map Silhouette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-800/40 via-navy-900 to-navy-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest px-3.5 py-1 rounded-full bg-navy-950 border border-gold-500/30">
            THE ODYSSEY ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white font-cinzel">
            Why Choose Escape Odyssey?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            We combine international visa expertise with personal dedication, taking the uncertainty out of your embassy applications.
          </p>
        </div>

        {/* 6 Grid Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="p-8 rounded-2xl bg-navy-950/80 border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1.5 glass-navy-hover group"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-navy-card border border-gold-500/30 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all shadow-md">
                {getFeatureIcon(feature.icon)}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white font-cinzel mb-3 group-hover:text-gold-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-card to-navy-950 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white font-cinzel">Have specific visa questions or complex travel cases?</h4>
            <p className="text-xs text-slate-300">Speak directly with our senior documentation specialists.</p>
          </div>
          <a
            href="https://wa.me/918796815817?text=Hello%20Escape%20Odyssey%2C%20I%20have%20a%20specific%20visa%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gold-gradient text-navy-950 font-bold text-xs sm:text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all flex-shrink-0"
          >
            Consult an Expert
          </a>
        </div>

      </div>
    </section>
  );
};
