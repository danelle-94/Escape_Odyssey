import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, PhoneCall } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/websiteData';
import { trackVisitorEvent } from '../lib/analytics';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'General & Services',
    question: 'What visa services does Escape Odyssey Travel & Tours provide?',
    answer: 'Escape Odyssey provides end-to-end assistance for Tourist Visas, Business Visas, and Family Visit Visas across 150+ countries. We handle document verification, DS-160 filling, VFS/TLS appointment scheduling, travel insurance, customized itineraries, and dummy flight/hotel booking vouchers.'
  },
  {
    category: 'Schengen & Europe',
    question: 'How long does a Schengen Visa application take to process?',
    answer: 'Schengen visa applications typically take between 5 to 15 business days following biometrics submission at VFS or TLS centers. We advise applying 3 to 4 weeks prior to your planned departure date to ensure ample time for consulate review.'
  },
  {
    category: 'United States (USA)',
    question: 'Can Escape Odyssey help with US B1/B2 Visa DS-160 and interview prep?',
    answer: 'Yes! We specialize in comprehensive US Visa assistance: DS-160 error-free application filing, fee payment guidance, priority appointment slot tracking, and 1-on-1 mock interview preparation tailored to your profile.'
  },
  {
    category: 'Documents & Approval',
    question: 'Do I need non-refundable flight tickets before getting my visa approved?',
    answer: 'No, we strongly recommend NOT purchasing non-refundable flight tickets before your visa is approved. We provide verifiable flight reservations and hotel booking vouchers specifically formatted to satisfy consulate submission requirements.'
  },
  {
    category: 'Contact & Process',
    question: 'How do I start my visa application with Escape Odyssey?',
    answer: 'Starting is quick and easy! Simply call or WhatsApp us at +91 8587992757, or fill out our online visa inquiry form. Our dedicated visa consultant will review your profile, provide a customized document checklist, and guide you step-by-step.'
  }
];

export const FAQSection: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    const isExpanding = openIndex !== index;
    setOpenIndex(isExpanding ? index : null);
    if (isExpanding) {
      trackVisitorEvent('visa_service_viewed', {
        destination: FAQS[index].question
      });
    }
  };

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50/80 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#015da5] text-xs font-bold uppercase tracking-wider border border-blue-100">
            <HelpCircle className="w-4 h-4" /> Got Questions? We Have Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-cinzel tracking-tight">
            Frequently Asked <span className="text-[#015da5]">Visa Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about international tourist, business, and family visa applications with Escape Odyssey.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#015da5] bg-blue-50/30 shadow-md ring-1 ring-[#015da5]/20'
                    : 'border-slate-200 bg-white hover:border-blue-200'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg flex items-center gap-3 font-cinzel">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#015da5] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#015da5] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-blue-100/60 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#015da5] to-[#01477f] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h3 className="text-lg font-bold font-cinzel">Have a specific visa question?</h3>
            <p className="text-xs text-blue-100">Talk directly with our senior visa advisor today.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>
            <button
              onClick={onOpenModal}
              className="px-4 py-2.5 rounded-xl bg-white text-[#015da5] hover:bg-blue-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm w-full sm:w-auto"
            >
              <PhoneCall className="w-4 h-4" /> Request Call
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
