import React, { useState, useEffect } from 'react';
import { PhoneCall, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { DISPLAY_PHONE, WHATSAPP_LINK } from '../data/websiteData';
import { trackVisitorEvent } from '../lib/analytics';

interface NavbarProps {
  onOpenModal: (visaType?: string, destination?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Visa Services', href: '#services' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'About Us', href: '#about' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-blue-100 py-3 shadow-md' 
          : 'bg-gradient-to-b from-white/95 via-white/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#home" className="flex items-center flex-shrink-0">
          <BrandLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-slate-700 hover:text-[#015da5] transition-colors relative group whitespace-nowrap"
            >
              {link.name}
              <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#015da5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center space-x-3 xl:space-x-4 flex-shrink-0">
          {/* Direct Phone / WhatsApp link */}
          <a
            href={`tel:${DISPLAY_PHONE}`}
            onClick={() => trackVisitorEvent('phone_clicked')}
            className="flex items-center gap-2 text-slate-700 hover:text-[#015da5] text-xs xl:text-sm font-semibold transition-colors group whitespace-nowrap"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#015da5] group-hover:bg-[#015da5] group-hover:text-white transition-all shadow-sm flex-shrink-0">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-xs xl:text-sm whitespace-nowrap">{DISPLAY_PHONE}</span>
          </a>

          {/* Primary CTA */}
          <button
            onClick={() => onOpenModal()}
            className="px-5 py-2.5 rounded-full bg-[#015da5] hover:bg-[#01477f] text-white font-bold text-xs xl:text-sm shadow-[0_4px_18px_rgba(1,93,165,0.3)] transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
          >
            <span className="whitespace-nowrap">Get Visa Assistance</span>
            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-500 text-white text-xs flex items-center gap-1 font-semibold shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-700 hover:text-[#015da5] bg-white/90 border border-slate-200 rounded-xl shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-blue-100 px-4 pt-4 pb-6 space-y-4 animate-fadeIn shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#015da5] hover:bg-blue-50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <a
              href={`tel:${DISPLAY_PHONE}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-50 border border-blue-200 text-[#015da5] font-mono font-semibold text-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#015da5]" />
              Call / WhatsApp: {DISPLAY_PHONE}
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal();
              }}
              className="w-full py-3 rounded-xl bg-[#015da5] hover:bg-[#01477f] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <span>Get Visa Assistance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
