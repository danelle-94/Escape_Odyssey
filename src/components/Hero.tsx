import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Globe2, Sparkles, Plane, Clock, Award } from 'lucide-react';
import { DISPLAY_PHONE } from '../data/websiteData';

interface HeroProps {
  onOpenModal: (visaType?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-[#FAF9F5]">
      
      {/* Background Ambient Pastel Glows & Light Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/60 via-[#FAF9F5] to-[#FAF9F5] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />
      
      {/* Flight Arc Dotted Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
        <path d="M -100 200 Q 400 50 900 350 T 1900 200" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="8 8" className="animate-flight-path" />
        <path d="M 100 600 Q 600 300 1200 700" fill="none" stroke="#F472B6" strokeWidth="1" strokeDasharray="6 6" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small Label Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200 shadow-[0_4px_16px_rgba(1,93,165,0.12)] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#015da5] animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-900 uppercase">
                TRAVEL • VISA • TOURS
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 font-cinzel leading-tight tracking-tight">
                Visa Made Easy.
              </h1>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-script text-[#015da5] font-normal tracking-wide transform -rotate-1 py-1">
                Journeys Made Possible!
              </h2>
            </div>

            {/* Supporting Badge Banner */}
            <div className="inline-block bg-blue-50/90 border-l-4 border-[#015da5] border-y border-r border-blue-200/70 px-4 py-2 rounded-r-xl shadow-sm">
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                We make your <span className="text-[#015da5] font-bold uppercase tracking-wider">VISA PROCESS SIMPLE & STRESS-FREE</span>
              </p>
            </div>

            {/* Paragraph Description */}
            <p className="text-slate-600 text-sm sm:text-base xl:text-lg max-w-2xl leading-relaxed font-medium">
              Make your international travel plans easier with professional visa assistance, document verification support, and personalized end-to-end guidance from certified experts.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                onClick={() => onOpenModal()}
                className="px-8 py-4 rounded-full bg-[#015da5] hover:bg-[#01477f] text-white font-extrabold text-sm sm:text-base shadow-[0_8px_25px_rgba(1,93,165,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                <span>Start Your Visa Process</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="px-7 py-4 rounded-full bg-white hover:bg-blue-50 border border-blue-200 text-slate-800 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 hover:border-[#015da5] shadow-sm"
              >
                <Compass className="w-4 h-4 text-[#015da5]" />
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* Trust Statement Bar */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-left">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[#015da5] flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">150+ Countries</div>
                  <div className="text-[10px] text-slate-500 font-medium">Worldwide Support</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#015da5] flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Expert Guidance</div>
                  <div className="text-[10px] text-slate-500 font-medium">High Success Rate</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#015da5] flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Fast & Reliable</div>
                  <div className="text-[10px] text-slate-500 font-medium">End-to-End Support</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Composition (Cols 8-12) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Main Interactive Visual Frame */}
            <div className="relative w-full max-w-md xl:max-w-lg aspect-square">
              
              {/* Back Soft Pastel Ring */}
              <div className="absolute inset-0 rounded-full border border-blue-200/60 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-4 rounded-full border border-dashed border-sky-300/60 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

              {/* Central Premium Travel Artwork Composition */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white p-3 border border-blue-200 shadow-[0_20px_50px_rgba(1,93,165,0.15)] group">
                
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1000"
                  alt="International Passport and World Landmarks"
                  className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent rounded-2xl" />

                {/* Animated Floating Airplane Badge */}
                <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 bg-white border-2 border-blue-200 p-3 sm:p-4 rounded-2xl shadow-xl animate-float-slow flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#015da5] flex items-center justify-center text-white font-bold shadow-md">
                    <Plane className="w-6 h-6 transform rotate-45" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">99% Approval</div>
                    <div className="text-[10px] text-[#015da5] font-semibold">Fast Embassy Filing</div>
                  </div>
                </div>

                {/* Floating Landmark Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-blue-100 shadow-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#015da5] uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#015da5]" /> Global Visa Assistance
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    Schengen • USA • UK • Dubai • Canada • Australia & 150+ Destinations
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>Call/WhatsApp:</span>
                    <span className="font-mono text-[#015da5] font-bold">{DISPLAY_PHONE}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
