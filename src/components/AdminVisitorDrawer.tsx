import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Fingerprint, Activity, Clock, RefreshCw, Layers } from 'lucide-react';
import { getVisitorId } from '../lib/fingerprint';
import { getStoredVisitorEvents, type AnalyticsEventPayload } from '../lib/analytics';

interface AdminVisitorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminVisitorDrawer: React.FC<AdminVisitorDrawerProps> = ({ isOpen, onClose }) => {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [events, setEvents] = useState<AnalyticsEventPayload[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFingerprint = async () => {
    setLoading(true);
    const id = await getVisitorId();
    setVisitorId(id);
    setEvents(getStoredVisitorEvents());
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchFingerprint();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-navy-900 border-l border-gold-500/30 h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between text-slate-100">
        
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-navy-card border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-cinzel">FingerprintJS Visitor Portal</h3>
                <p className="text-[11px] text-slate-400">Internal Admin & Analytics Inspection</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Visitor ID Card */}
          <div className="bg-navy-950 p-4 rounded-xl border border-gold-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-gold-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Anonymous Visitor Identifier
              </span>
              <button
                onClick={fetchFingerprint}
                disabled={loading}
                className="hover:text-white flex items-center gap-1 transition-colors text-[10px]"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>

            <div className="p-3 bg-navy-card rounded-lg font-mono text-sm text-gold-300 select-all break-all border border-slate-800 flex items-center justify-between">
              <span>{visitorId || 'Generating Fingerprint...'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-sans">
                Active
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Generated client-side via official <code className="text-gold-400">@fingerprintjs/fingerprintjs</code> with <code className="text-gold-400">monitoring: false</code>. Never exposed in public UI or stored as secrets.
            </p>
          </div>

          {/* Real-time Session Journey Log */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-gold-400" /> Recorded Visitor Journey ({events.length})
              </h4>
              <span className="text-[10px] text-slate-400">Session Storage Log</span>
            </div>

            {events.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-navy-950 rounded-xl border border-slate-800">
                No events recorded yet in this session.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {events.slice().reverse().map((ev, idx) => (
                  <div key={idx} className="p-3 bg-navy-950 rounded-xl border border-slate-800 text-xs space-y-1 hover:border-gold-500/30 transition-all">
                    <div className="flex items-center justify-between text-gold-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" /> {ev.eventName}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(ev.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="text-slate-300 text-[11px]">
                      Path: <span className="font-mono text-slate-200">{ev.pagePath}</span>
                    </div>

                    {(ev.destination || ev.visaType) && (
                      <div className="flex flex-wrap gap-2 pt-1 text-[10px]">
                        {ev.visaType && (
                          <span className="px-2 py-0.5 bg-navy-card border border-gold-500/20 rounded text-gold-300">
                            Visa: {ev.visaType}
                          </span>
                        )}
                        {ev.destination && (
                          <span className="px-2 py-0.5 bg-navy-card border border-emerald-500/20 rounded text-emerald-300">
                            Destination: {ev.destination}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 text-center space-y-2">
          <p>🔒 FingerprintJS Integration Specification Compliant</p>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-navy-card hover:bg-slate-800 text-slate-200 font-semibold text-xs transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
