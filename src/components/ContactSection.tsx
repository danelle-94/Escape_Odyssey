import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { DISPLAY_PHONE, BUSINESS_EMAIL, WHATSAPP_LINK } from '../data/websiteData';
import { trackVisitorEvent } from '../lib/analytics';
import { getVisitorId } from '../lib/fingerprint';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    destination: 'Schengen Europe',
    visaType: 'Tourist Visa',
    travelDate: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const visitorId = await getVisitorId();

    trackVisitorEvent('contact_form_submitted', {
      visaType: formData.visaType,
      destination: formData.destination,
      meta: {
        visitorId,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        travelDate: formData.travelDate,
      }
    });

    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    trackVisitorEvent('whatsapp_clicked', {
      visaType: formData.visaType,
      destination: formData.destination,
    });
    const text = encodeURIComponent(
      `Hello Escape Odyssey Travel & Tours,\n\nI would like to inquire about visa assistance:\n` +
      `• Name: ${formData.fullName || 'Traveler'}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Destination: ${formData.destination}\n` +
      `• Visa Type: ${formData.visaType}\n` +
      `• Travel Date: ${formData.travelDate || 'Flexible'}\n` +
      `• Notes: ${formData.message || 'None'}`
    );
    window.open(`https://wa.me/918796815817?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-[#F8F6F0] relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-purple-900 uppercase tracking-widest px-3.5 py-1 rounded-full bg-white border border-purple-200 shadow-sm">
            GET IN TOUCH WITH OUR EXPERTS
          </span>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 font-cinzel">
            Let's Plan Your Journey
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Reach out today for personalized visa guidance, eligibility evaluation, and document assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Brand Card (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-8 border border-purple-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
              
              <h3 className="text-xl font-bold text-slate-900 font-cinzel border-b border-slate-100 pb-4">
                Direct Contact Information
              </h3>

              {/* Call / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-sm">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-purple-800 tracking-wider">Call / WhatsApp</div>
                  <a 
                    href={`tel:${DISPLAY_PHONE}`}
                    className="text-lg font-bold font-mono text-slate-900 hover:text-purple-700 transition-colors block"
                  >
                    {DISPLAY_PHONE}
                  </a>
                  <p className="text-xs text-slate-500 font-medium">Available Mon - Sat (9:00 AM - 8:00 PM IST)</p>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-purple-800 tracking-wider">Official Email</div>
                  <a 
                    href={`mailto:${BUSINESS_EMAIL}`}
                    className="text-sm font-semibold text-slate-900 hover:text-purple-700 transition-colors font-mono block"
                  >
                    {BUSINESS_EMAIL}
                  </a>
                  <p className="text-xs text-slate-500 font-medium">Fast response within 2 business hours</p>
                </div>
              </div>

              {/* Office Address Placeholder */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-purple-800 tracking-wider">Office Location</div>
                  <div className="text-sm font-semibold text-slate-900">[Office Address]</div>
                  <p className="text-xs text-slate-500 font-medium">In-person consultations by appointment</p>
                </div>
              </div>

            </div>

            {/* Instant WhatsApp Quick Box */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 flex items-center justify-between gap-4 shadow-sm">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Prefer instant chatting?</h4>
                <p className="text-xs text-slate-600 font-medium">Message our senior counselor on WhatsApp right now.</p>
              </div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
            </div>

          </div>

          {/* Right Column: Contact Form (Cols 6-12) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-purple-100 shadow-[0_10px_35px_rgba(139,92,246,0.08)]">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-cinzel">Request Submitted Successfully!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto font-medium">
                  Thank you <span className="text-purple-700 font-semibold">{formData.fullName}</span>. Our visa specialist will review your request and get back to you at <span className="text-slate-900 font-mono font-bold">{formData.phone}</span> shortly.
                </p>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" /> Send Request via WhatsApp
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-cinzel border-b border-slate-100 pb-3">
                  Request Visa Assistance
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditi Kulkarni"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 8796815817"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Country</label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl text-sm text-slate-800 focus:outline-none transition-colors"
                    >
                      <option value="Schengen Europe">Schengen Europe</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Dubai / UAE">Dubai / UAE</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Japan">Japan</option>
                      <option value="Other">Other Destination</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Visa Category</label>
                    <select
                      value={formData.visaType}
                      onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl text-sm text-slate-800 focus:outline-none transition-colors"
                    >
                      <option value="Tourist Visa">Tourist Visa</option>
                      <option value="Business Visa">Business Visa</option>
                      <option value="Family Visa">Family Visa</option>
                      <option value="Documentation Only">Visa Documentation</option>
                      <option value="Appointment Support">Appointment Assistance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Travel Date</label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl text-sm text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message / Travel Plans</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your trip details, number of applicants, or specific embassy queries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 hover:from-purple-700 hover:to-pink-600 text-white font-extrabold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" /> Request Visa Assistance
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
