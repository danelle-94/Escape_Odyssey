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
        return <Luggage className="w-8 h-8 text-purple-600" />;
      case 'Business':
        return <Briefcase className="w-8 h-8 text-purple-600" />;
      case 'Family':
        return <Users className="w-8 h-8 text-purple-600" />;
      default:
        return <Luggage className="w-8 h-8 text-purple-600" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-[#F8F6F0]">
      
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span className="text-xs font-bold text-purple-900 uppercase tracking-widest">
              PRIMARY SPECIALIZATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 font-cinzel">
            Our Visa Services
          </h2>
          <p className="bg-gradient-to-r from-purple-700 via-pink-600 to-amber-600 bg-clip-text text-transparent text-xl sm:text-2xl font-script tracking-wide">
            Your journey starts with the right visa.
          </p>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            From vacation visas to urgent corporate business entry, our team ensures 100% compliant document preparation and high success rates.
          </p>
        </div>

        {/* 3 Large Premium Visa Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {VISA_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl p-8 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.12)]"
            >
              {/* Card Top Accent Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 transition-all" />

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center shadow-md border-2 border-purple-200 group-hover:scale-110 group-hover:bg-purple-100 transition-transform">
                    {getIcon(service.iconName)}
                  </div>

                  <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold">
                    {service.badge}
                  </span>
                </div>

                {/* Service Titles */}
                <h3 className="text-2xl font-bold text-slate-900 font-cinzel mb-2 group-hover:text-purple-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-bold text-purple-600 mb-4">
                  {service.subtitle}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-purple-50/70 rounded-xl border border-purple-100 text-xs mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500">Processing</div>
                      <div className="font-semibold text-slate-800">{service.processingTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500">Validity</div>
                      <div className="font-semibold text-slate-800">{service.validity}</div>
                    </div>
                  </div>
                </div>

                {/* Requirements Preview */}
                <div className="space-y-2 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Included Assistance:
                  </div>
                  {service.keyRequirements.slice(0, 3).map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
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
                className="w-full py-3.5 px-6 rounded-xl bg-purple-50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 text-purple-900 hover:text-white font-bold text-sm border border-purple-200 hover:border-transparent transition-all flex items-center justify-center gap-2 shadow-sm"
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
