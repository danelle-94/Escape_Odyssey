import React from 'react';
import { MessageSquare, PhoneCall, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_LINK } from '../data/websiteData';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF9F5] relative overflow-hidden">
      
      {/* Background Gradient & Light Flares */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/50 via-[#FAF9F5] to-[#FAF9F5] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 p-8 sm:p-12 lg:p-16 text-center space-y-8 shadow-[0_15px_45px_rgba(124,58,237,0.25)] relative overflow-hidden text-white">
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-tl-full pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              IMMEDIATE VISA CONSULTATION
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel leading-tight max-w-3xl mx-auto">
            Ready to Start Your Journey?
          </h2>

          {/* Subtext */}
          <p className="text-purple-50 text-base sm:text-xl max-w-2xl mx-auto font-medium">
            Let our experts make your visa process simple, clear and stress-free.
          </p>

          {/* Buttons: WhatsApp Primary, Call Secondary */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/* WhatsApp Primary CTA */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-base shadow-xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Us Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Direct Call Button */}
            <a
              href={`tel:${DISPLAY_PHONE}`}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-purple-50 text-purple-900 font-extrabold text-base shadow-xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              <PhoneCall className="w-5 h-5 text-purple-700" />
              <span>Call {DISPLAY_PHONE}</span>
            </a>

          </div>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-purple-100 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-amber-200" /> Fast Response Guaranteed
            </span>
            <span>•</span>
            <span>No Hidden Consultation Fees</span>
          </div>

        </div>
      </div>
    </section>
  );
};
