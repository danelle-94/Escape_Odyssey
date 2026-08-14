import React from 'react';
import { VISA_SERVICES } from '../data/websiteData';
import { Luggage, Briefcase, Users, ArrowRight, CheckCircle, Clock, ShieldAlert } from 'lucide-react';
import type { VisaService } from '../types';
import { trackVisitorEvent } from '../lib/analytics';

interface VisaServicesProps {
  onOpenModal: (visaType: string) => void;
}

export const VisaServices: React.FC<VisaServicesProps> = ({ onOpenModal }) => {
  const getIcon = (type: VisaService['iconName']) => {
    switch (type) {
      case 'Tourist':
        return <Luggage className="w-8 h-8 text-gold-500" />;
      case 'Business':
        return <Briefcase className="w-8 h-8 text-gold-500" />;
      case 'Family':
        return <Users className="w-8 h-8 text-gold-500" />;
      default:
        return <Luggage className="w-8 h-8 text-gold-500" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-navy-950">
      
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-navy-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-gold-500/30">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span className="text-xs font-bold text-gold-300 uppercase tracking-widest">
              PRIMARY SPECIALIZATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white font-cinzel">
            Our Visa Services
          </h2>
          <p className="text-gold-gradient text-xl sm:text-2xl font-script tracking-wide">
            Your journey starts with the right visa.
          </p>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            From vacation visas to urgent corporate business entry, our team ensures 100% compliant document preparation and high success rates.
          </p>
        </div>

        {/* 3 Large Premium Visa Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {VISA_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-navy-card rounded-2xl p-8 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden shadow-navy-card hover:shadow-gold-glow"
            >
              {/* Card Top Gold Accent Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent group-hover:h-1.5 transition-all" />

              <div>
                {/* Header Badge & Recreated White Circle Icon from Flyer */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-gold-400 group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>

                  <span className="px-3 py-1 rounded-full bg-navy-950 text-gold-300 border border-gold-500/30 text-xs font-semibold">
                    {service.badge}
                  </span>
                </div>

                {/* Service Titles */}
                <h3 className="text-2xl font-bold text-white font-cinzel mb-2 group-hover:text-gold-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-gold-400 mb-4">
                  {service.subtitle}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-navy-950/80 rounded-xl border border-slate-800 text-xs mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400">Processing</div>
                      <div className="font-semibold text-slate-200">{service.processingTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400">Validity</div>
                      <div className="font-semibold text-slate-200">{service.validity}</div>
                    </div>
                  </div>
                </div>

                {/* Requirements Preview */}
                <div className="space-y-2 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Included Assistance:
                  </div>
                  {service.keyRequirements.slice(0, 3).map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  trackVisitorEvent('visa_service_viewed', { visaType: service.title });
                  onOpenModal(service.title);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-navy-950 hover:bg-gold-gradient text-white hover:text-navy-950 font-bold text-sm border border-gold-500/40 hover:border-transparent transition-all flex items-center justify-center gap-2 group-hover:shadow-gold-glow"
              >
                <span>Explore {service.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
