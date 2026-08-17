import React from 'react';
import { FEATURES } from '../data/websiteData';
import { UserCheck, Zap, ShieldCheck, Globe, Eye, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 'Zap': return <Zap className="w-6 h-6 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 'Globe': return <Globe className="w-6 h-6 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 'Eye': return <Eye className="w-6 h-6 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-[#0074B5] group-hover:text-white transition-colors" />;
      default: return <ShieldCheck className="w-6 h-6 text-[#0074B5] group-hover:text-white transition-colors" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-[#FAF9F5] relative overflow-hidden">
      
      {/* Background Subtle Map Silhouette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-[#FAF9F5] to-[#FAF9F5] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest px-3.5 py-1 rounded-full bg-white border border-blue-200 shadow-sm">
            THE ODYSSEY ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 font-cinzel">
            Why Choose Escape Odyssey?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            We combine international visa expertise with personal dedication, taking the uncertainty out of your embassy applications.
          </p>
        </div>

        {/* 6 Grid Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="p-8 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,116,181,0.1)] group"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 group-hover:bg-[#0074B5] transition-all shadow-sm">
                {getFeatureIcon(feature.icon)}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 font-cinzel mb-3 group-hover:text-[#0074B5] transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900 font-cinzel">Have specific visa questions or complex travel cases?</h4>
            <p className="text-xs text-slate-600 font-medium">Speak directly with our senior documentation specialists.</p>
          </div>
          <a
            href="https://wa.me/918796815817?text=Hello%20Escape%20Odyssey%2C%20I%20have%20a%20specific%20visa%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#0074B5] hover:bg-[#005C91] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex-shrink-0"
          >
            Consult an Expert
          </a>
        </div>

      </div>
    </section>
  );
};
