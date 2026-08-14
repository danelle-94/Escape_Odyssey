import React from 'react';
import { BrandLogo } from './BrandLogo';
import { PhoneCall, ArrowUp, ShieldCheck, Mail, MapPin, Fingerprint } from 'lucide-react';
import { DISPLAY_PHONE, BUSINESS_EMAIL, WHATSAPP_LINK } from '../data/websiteData';
import { trackVisitorEvent } from '../lib/analytics';

interface FooterProps {
  onOpenAdminDrawer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminDrawer }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-gold-500/20 relative z-20 overflow-hidden">
      
      {/* Top Gold Line Accent */}
      <div className="h-1 w-full bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Identity Column (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo size="lg" />
            <p className="text-gold-gradient font-script text-2xl">
              Visa Made Easy. Journeys Made Possible.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Escape Odyssey Travel & Tours provides professional tourist, business and family visa assistance with documentation support, appointment assistance and dedicated visa follow-up.
            </p>

            {/* Call / WhatsApp Banner */}
            <div className="pt-2">
              <a
                href={`tel:${DISPLAY_PHONE}`}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-navy-card border border-gold-500/30 text-white font-mono text-xs hover:border-gold-500 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-gold-400" />
                <span>Call / WhatsApp: {DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white font-cinzel uppercase tracking-wider text-gold-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#home" className="hover:text-gold-300 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-gold-300 transition-colors">Visa Services</a></li>
              <li><a href="#destinations" className="hover:text-gold-300 transition-colors">Popular Destinations</a></li>
              <li><a href="#why-us" className="hover:text-gold-300 transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-gold-300 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-gold-300 transition-colors text-slate-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold-300 transition-colors text-slate-500">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Visa Services Column (Cols 8-10) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white font-cinzel uppercase tracking-wider text-gold-400">
              Visa Offerings
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-400" /> Tourist Visa Assistance</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-400" /> Business Visa Expedited</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-400" /> Family Visit Visa</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-400" /> Cover Letter & Itinerary Preparation</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-400" /> VFS / TLS Slot Booking Support</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-400" /> Application Tracking & Follow-Up</li>
            </ul>
          </div>

          {/* Office Placeholders & Socials (Cols 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white font-cinzel uppercase tracking-wider text-gold-400">
              Connect With Us
            </h4>
            <div className="space-y-2 text-xs">
              <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-2 text-slate-400 hover:text-gold-300 transition-colors">
                <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span className="truncate">{BUSINESS_EMAIL}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-gold-400" /> [Office Address]
              </div>
            </div>

            {/* Social Placeholders */}
            <div className="pt-2 flex items-center gap-2">
              {['FB', 'IG', 'LN', 'WA'].map((platform) => (
                <a
                  key={platform}
                  href={platform === 'WA' ? WHATSAPP_LINK : '#'}
                  target={platform === 'WA' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-navy-card border border-slate-700 hover:border-gold-400 text-slate-300 hover:text-gold-400 flex items-center justify-center text-[10px] font-bold transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 p-2.5 rounded-xl bg-navy-card border border-gold-500/30 hover:border-gold-500 text-gold-400 flex items-center gap-2 text-xs font-semibold transition-colors"
            >
              <ArrowUp className="w-4 h-4" /> Top of Page
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Privacy Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p>© 2026 Escape Odyssey Travel & Tours. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-400">
              🔒 Privacy Policy Notice: Escape Odyssey uses anonymous browser fingerprinting (<code className="text-gold-400 font-mono">@fingerprintjs/fingerprintjs</code>) to prevent form abuse, optimize visitor journeys, and attach session metrics to visa inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {onOpenAdminDrawer && (
              <button
                onClick={() => {
                  trackVisitorEvent('page_view');
                  onOpenAdminDrawer();
                }}
                className="px-3 py-1.5 rounded-lg bg-navy-card border border-gold-500/30 text-gold-300 hover:text-white text-[11px] font-medium flex items-center gap-1.5 transition-colors"
                title="View FingerprintJS Visitor ID & Session Log"
              >
                <Fingerprint className="w-3.5 h-3.5" /> FingerprintJS Portal
              </button>
            )}

            <p className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-gold-400" /> Licensed Travel & Visa Consultancy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
