import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_LINK } from '../data/websiteData';
import { trackVisitorEvent } from '../lib/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Optional Interactive Tooltip Bubble */}
      {tooltipVisible && (
        <div className="bg-navy-950/95 text-white border border-gold-500/40 p-3 rounded-2xl shadow-gold-glow-lg max-w-xs text-xs animate-fadeIn relative">
          <button
            onClick={() => setTooltipVisible(false)}
            className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-gold-400">Visa Expert Online</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Need fast visa assistance? Chat with Escape Odyssey team on WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={WHATSAPP_LINK}
        onClick={() => trackVisitorEvent('whatsapp_clicked')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Escape Odyssey Travel & Tours"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white"
      >
        <MessageSquare className="w-7 h-7 fill-white text-emerald-500" />
        
        {/* Pulsing Green Halo */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/50 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />

        {/* Hover Label */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-navy-950 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gold-500/30 shadow-md">
          Chat: {DISPLAY_PHONE}
        </span>
      </a>
    </div>
  );
};
