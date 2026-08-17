import React from 'react';
import { BrandLogo } from './BrandLogo';
import { PhoneCall, ArrowUp, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { DISPLAY_PHONE, BUSINESS_EMAIL, WHATSAPP_LINK, FACEBOOK_LINK, INSTAGRAM_LINK } from '../data/websiteData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-slate-700 border-t border-blue-100 relative z-20 overflow-hidden">
      
      {/* Top Gradient Line Accent */}
      <div className="h-1 w-full bg-[#015da5]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Identity Column (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo size="lg" />
            <p className="text-[#015da5] font-script text-2xl font-normal">
              Visa Made Easy. Journeys Made Possible.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-medium">
              Escape Odyssey Travel & Tours provides professional tourist, business and family visa assistance with documentation support, appointment assistance and dedicated visa follow-up.
            </p>

            {/* Call / WhatsApp Banner */}
            <div className="pt-2">
              <a
                href={`tel:${DISPLAY_PHONE}`}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#015da5] font-mono text-xs hover:border-blue-400 transition-colors shadow-sm font-bold"
              >
                <PhoneCall className="w-4 h-4 text-[#015da5]" />
                <span>Call / WhatsApp: {DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-blue-900 font-cinzel uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#home" className="text-slate-600 hover:text-[#015da5] transition-colors">Home</a></li>
              <li><a href="#services" className="text-slate-600 hover:text-[#015da5] transition-colors">Visa Services</a></li>
              <li><a href="#destinations" className="text-slate-600 hover:text-[#015da5] transition-colors">Popular Destinations</a></li>
              <li><a href="#why-us" className="text-slate-600 hover:text-[#015da5] transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="text-slate-600 hover:text-[#015da5] transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#015da5] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#015da5] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Visa Services Column (Cols 8-10) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-blue-900 font-cinzel uppercase tracking-wider">
              Visa Offerings
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#015da5]" /> Tourist Visa Assistance</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#015da5]" /> Business Visa Expedited</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#015da5]" /> Family Visit Visa</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#015da5]" /> Cover Letter & Itinerary Preparation</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#015da5]" /> VFS / TLS Slot Booking Support</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#015da5]" /> Application Tracking & Follow-Up</li>
            </ul>
          </div>

          {/* Office & Socials (Cols 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-blue-900 font-cinzel uppercase tracking-wider">
              Connect With Us
            </h4>
            <div className="space-y-2 text-xs font-medium">
              <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-2 text-slate-600 hover:text-[#015da5] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#015da5] flex-shrink-0" />
                <span className="truncate">{BUSINESS_EMAIL}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-[#015da5]" /> [Office Address]
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2">
              {[
                { label: 'FB', href: FACEBOOK_LINK, title: 'Facebook' },
                { label: 'IG', href: INSTAGRAM_LINK, title: 'Instagram' },
                { label: 'WA', href: WHATSAPP_LINK, title: 'WhatsApp' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 hover:bg-[#015da5] hover:text-white text-[#015da5] flex items-center justify-center text-[10px] font-bold transition-all shadow-sm"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 p-2.5 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 text-[#015da5] flex items-center gap-2 text-xs font-bold transition-colors shadow-sm"
            >
              <ArrowUp className="w-4 h-4 text-[#015da5]" /> Top of Page
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Privacy Notice */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="space-y-1 text-center sm:text-left font-medium">
            <p>© 2026 Escape Odyssey Travel & Tours. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-400">
              🔒 Confidential & Secure Application Processing. All personal details are protected under standard privacy standards.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <p className="flex items-center gap-1.5 text-slate-600 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Licensed Travel & Visa Consultancy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
