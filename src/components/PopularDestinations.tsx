import React, { useState } from 'react';
import { POPULAR_DESTINATIONS } from '../data/websiteData';
import { ArrowRight, MapPin } from 'lucide-react';
import { trackVisitorEvent } from '../lib/analytics';

interface PopularDestinationsProps {
  onOpenModal: (visaType?: string, destination?: string) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({ onOpenModal }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'Europe', 'Americas', 'Middle East', 'Asia', 'Oceania'];

  const filteredDestinations = selectedRegion === 'All'
    ? POPULAR_DESTINATIONS
    : POPULAR_DESTINATIONS.filter(d => d.region === selectedRegion);

  return (
    <section id="destinations" className="py-24 bg-navy-900 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest px-3.5 py-1 rounded-full bg-navy-950 border border-gold-500/30">
            GLOBAL DESTINATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white font-cinzel">
            Popular Destinations
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Expert visa processing for top global travel, business, and education hubs worldwide.
          </p>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedRegion === region
                    ? 'bg-gold-gradient text-navy-950 shadow-gold-glow'
                    : 'bg-navy-950 text-slate-300 hover:text-gold-300 border border-slate-800'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative rounded-2xl overflow-hidden bg-navy-950 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-500 hover:-translate-y-2 shadow-navy-card flex flex-col justify-between"
            >
              {/* Card Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={`Visa for ${dest.name}`}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                {/* Country Flag & Region Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-2xl bg-navy-950/80 px-2.5 py-1 rounded-lg backdrop-blur-md border border-slate-700 shadow-md">
                    {dest.flag}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 backdrop-blur-md">
                    {dest.processingTime}
                  </span>
                </div>

                {/* Popular Spot Highlight */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-[11px] text-slate-200 bg-navy-950/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span className="truncate">{dest.popularSpot}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-cinzel group-hover:text-gold-300 transition-colors">
                    Explore {dest.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Available Visa Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {dest.visaTypes.slice(0, 2).map((vt, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-navy-card text-slate-300 border border-slate-800">
                        {vt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    trackVisitorEvent('destination_viewed', { destination: dest.name, visaType: 'Tourist Visa' });
                    onOpenModal('Tourist Visa', dest.name);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-navy-card hover:bg-gold-gradient text-slate-200 hover:text-navy-950 text-xs font-bold border border-gold-500/30 hover:border-transparent transition-all flex items-center justify-center gap-2 group-hover:shadow-gold-glow"
                >
                  <span>Visa Assistance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
