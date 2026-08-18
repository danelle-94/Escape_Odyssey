import React, { useState } from 'react';
import { X, Send, PhoneCall, CheckCircle2, Globe, Calendar, User, Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { DISPLAY_PHONE } from '../data/websiteData';
import { trackVisitorEvent, submitInquiryToDb } from '../lib/analytics';

interface VisaAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVisaType?: string;
  defaultDestination?: string;
}

export const VisaAssistanceModal: React.FC<VisaAssistanceModalProps> = ({
  isOpen,
  onClose,
  defaultVisaType = 'Tourist Visa',
  defaultDestination = 'Schengen Area'
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    destination: defaultDestination,
    visaType: defaultVisaType,
    travelDate: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      trackVisitorEvent('visa_enquiry_started', {
        visaType: formData.visaType,
        destination: formData.destination,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Save inquiry to backend SQLite DB
    try {
      await submitInquiryToDb({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        destination: formData.destination,
        visaType: formData.visaType,
        travelDate: formData.travelDate,
        notes: formData.notes,
      });
    } catch (err) {
      console.warn('[DB Submit] Backend call error, falling back locally', err);
    } finally {
      setIsSubmitting(false);
    }

    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    trackVisitorEvent('whatsapp_clicked', {
      visaType: formData.visaType,
      destination: formData.destination,
    });
    const text = encodeURIComponent(
      `Hello Escape Odyssey Travel & Tours,\n\nI would like visa assistance:\n` +
      `• Name: ${formData.fullName || 'Not provided'}\n` +
      `• Destination: ${formData.destination}\n` +
      `• Visa Type: ${formData.visaType}\n` +
      `• Travel Date: ${formData.travelDate || 'Flexible'}\n` +
      `• Phone: ${formData.phone}`
    );
    window.open(`https://wa.me/918796815817?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-blue-200 rounded-2xl shadow-[0_20px_50px_rgba(1,93,165,0.15)] overflow-hidden text-slate-800">
        
        {/* Top Gradient Border Accent */}
        <div className="h-1.5 w-full bg-[#015da5]" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#015da5] uppercase">
              EXPERT CONSULTATION
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-cinzel">
              Get Instant Visa Assistance
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 font-cinzel">Request Received!</h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto font-medium">
                Thank you <span className="text-[#015da5] font-semibold">{formData.fullName}</span>. Our senior visa consultant will contact you on <span className="text-slate-900 font-mono font-bold">{formData.phone}</span> within 15 minutes.
              </p>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-left text-xs text-slate-700 space-y-2 mt-4 font-medium">
                <div className="flex items-center justify-between text-[#015da5] font-bold">
                  <span>Fastest Response Option:</span>
                  <ShieldCheck className="w-4 h-4 text-[#015da5]" />
                </div>
                <p>Connect directly via WhatsApp to fast-track document checklist verification right away.</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" /> Chat on WhatsApp Now
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-all"
                >
                  Edit Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#015da5] focus:bg-white rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <div className="relative">
                    <PhoneCall className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#015da5] focus:bg-white rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Country</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#015da5] focus:bg-white rounded-xl text-sm text-slate-800 focus:outline-none transition-colors"
                    >
                      <option value="Schengen Area">Schengen Europe (France, Italy, Germany, etc.)</option>
                      <option value="United States">United States (USA)</option>
                      <option value="United Kingdom">United Kingdom (UK)</option>
                      <option value="Dubai / UAE">Dubai / UAE</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Japan">Japan</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Visa Type</label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#015da5] focus:bg-white rounded-xl text-sm text-slate-800 focus:outline-none transition-colors"
                  >
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Business Visa">Business Visa</option>
                    <option value="Family Visa">Family Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Other Assistance">Other Visa Assistance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#015da5] focus:bg-white rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Travel Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#015da5] focus:bg-white rounded-xl text-sm text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Details / Questions</label>
                <textarea
                  rows={2}
                  placeholder="Mention previous travel history, embassy appointment urgency, or special requests..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-3 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                    isSubmitting 
                      ? 'bg-blue-400 cursor-not-allowed opacity-90' 
                      : 'bg-[#015da5] hover:bg-[#01477f] active:scale-98 cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" /> Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Request Visa Guidance
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors text-sm shadow-sm"
                >
                  Quick WhatsApp
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-500 font-medium mt-2">
                🔒 100% Confidential. Or call directly at <a href={`tel:${DISPLAY_PHONE}`} className="text-[#015da5] underline font-mono font-bold">{DISPLAY_PHONE}</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
