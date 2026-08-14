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
          ? 'bg-navy-950/90 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl' 
          : 'bg-gradient-to-b from-navy-950/95 via-navy-950/70 to-transparent py-4'
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
              className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium text-slate-200 hover:text-gold-400 transition-colors relative group whitespace-nowrap"
            >
              {link.name}
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center space-x-3 xl:space-x-4 flex-shrink-0">
          {/* Direct Phone / WhatsApp link */}
          <a
            href={`tel:${DISPLAY_PHONE}`}
            onClick={() => trackVisitorEvent('phone_clicked')}
            className="flex items-center gap-2 text-slate-200 hover:text-gold-400 text-xs xl:text-sm font-semibold transition-colors group whitespace-nowrap"
          >
            <div className="w-8 h-8 rounded-full bg-navy-card border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all shadow-sm flex-shrink-0">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-xs xl:text-sm whitespace-nowrap">{DISPLAY_PHONE}</span>
          </a>

          {/* Primary CTA */}
          <button
            onClick={() => onOpenModal()}
            className="px-4 py-2.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-navy-950 font-bold text-xs xl:text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
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
            className="p-2 rounded-lg bg-emerald-600/90 text-white text-xs flex items-center gap-1 font-semibold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-300 hover:text-gold-400 bg-navy-card/80 border border-slate-700/60 rounded-xl"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900/98 backdrop-blur-xl border-b border-gold-500/30 px-4 pt-4 pb-6 space-y-4 animate-fadeIn shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-gold-400 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <a
              href={`tel:${DISPLAY_PHONE}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-navy-card border border-gold-500/30 text-white font-mono font-semibold text-sm"
            >
              <PhoneCall className="w-4 h-4 text-gold-400" />
              Call / WhatsApp: {DISPLAY_PHONE}
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal();
              }}
              className="w-full py-3 rounded-xl bg-gold-gradient text-navy-950 font-bold text-sm shadow-gold-glow flex items-center justify-center gap-2"
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
