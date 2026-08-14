import React from 'react';
import { MessageSquare, PhoneCall, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_LINK } from '../data/websiteData';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-navy-950 relative overflow-hidden">
      
      {/* Background Gradient & Light Flares */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-navy-card to-navy-950 border-2 border-gold-500/40 p-8 sm:p-12 lg:p-16 text-center space-y-8 shadow-gold-glow-lg relative overflow-hidden">
          
          {/* Decorative Corner Gold Accents */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gold-500/10 rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gold-500/10 rounded-tl-full pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-950 border border-gold-500/40 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-bold text-gold-300 uppercase tracking-widest">
              IMMEDIATE VISA CONSULTATION
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel leading-tight max-w-3xl mx-auto">
            Ready to Start Your Journey?
          </h2>

          {/* Subtext */}
          <p className="text-slate-200 text-base sm:text-xl max-w-2xl mx-auto font-medium">
            Let our experts make your visa process simple, clear and stress-free.
          </p>

          {/* Buttons: WhatsApp Primary, Call Secondary */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/* WhatsApp Primary CTA */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Us Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Direct Call Button */}
            <a
              href={`tel:${DISPLAY_PHONE}`}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-navy-950 font-extrabold text-base shadow-gold-glow hover:shadow-gold-glow-lg transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              <PhoneCall className="w-5 h-5 text-navy-950" />
              <span>Call {DISPLAY_PHONE}</span>
            </a>

          </div>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-gold-400" /> Fast Response Guaranteed
            </span>
            <span>•</span>
            <span>No Hidden Consultation Fees</span>
          </div>

        </div>
      </div>
    </section>
  );
};
