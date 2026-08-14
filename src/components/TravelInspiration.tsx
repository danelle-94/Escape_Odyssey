import React from 'react';
import { Plane, Compass, Sparkles, MapPin } from 'lucide-react';

interface TravelInspirationProps {
  onOpenModal: () => void;
}

export const TravelInspiration: React.FC<TravelInspirationProps> = ({ onOpenModal }) => {
  const mapPins = [
    { name: 'Paris, France', x: '48%', y: '32%', delay: '0s' },
    { name: 'New York, USA', x: '25%', y: '35%', delay: '1s' },
    { name: 'London, UK', x: '46%', y: '28%', delay: '2s' },
    { name: 'Dubai, UAE', x: '62%', y: '45%', delay: '0.5s' },
    { name: 'Tokyo, Japan', x: '85%', y: '38%', delay: '1.5s' },
    { name: 'Sydney, Australia', x: '88%', y: '75%', delay: '2.5s' },
  ];

  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-900 via-navy-950 to-navy-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl bg-navy-card/90 border border-gold-500/30 p-8 sm:p-12 xl:p-16 overflow-hidden shadow-gold-glow-lg text-center space-y-8">
          
          {/* Subtle Dotted World Map Visual Background */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Gold Arc Flight Routes SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
            <path d="M 250 180 Q 480 80 620 220" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 480 80 Q 750 120 850 190" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 620 220 Q 750 350 880 380" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Interactive Pin Popups */}
          {mapPins.map((pin, i) => (
            <div
              key={i}
              className="absolute hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-950/90 border border-gold-500/40 text-[10px] font-bold text-gold-300 shadow-md animate-pulse-glow"
              style={{ left: pin.x, top: pin.y, animationDelay: pin.delay }}
            >
              <MapPin className="w-3 h-3 text-gold-400" />
              <span>{pin.name}</span>
            </div>
          ))}

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-950 border border-gold-500/40 shadow-md">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-bold text-gold-300 uppercase tracking-widest">
              UNLIMITED HORIZONS
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-white font-cinzel leading-tight max-w-4xl mx-auto">
            Where Will Your Journey Take You?
          </h2>

          {/* Quote / Subtext */}
          <p className="text-lg sm:text-2xl text-gold-gradient font-script max-w-2xl mx-auto leading-relaxed">
            "From dream destinations to unforgettable experiences, we're here to help make your journey possible."
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Whether it's your first international vacation or an urgent business flight, Escape Odyssey handles every detail with precision.
          </p>

          {/* CTA */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={onOpenModal}
              className="px-9 py-4 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-navy-950 font-extrabold text-base shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform hover:-translate-y-1 flex items-center gap-3 group"
            >
              <Compass className="w-5 h-5" />
              <span>Plan My Journey</span>
              <Plane className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
