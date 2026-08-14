import React, { useState } from 'react';
import { DOCUMENT_CHECKLISTS } from '../data/websiteData';
import { CheckCircle2, FileText, ShieldAlert, ArrowRight, BookOpen, CreditCard, Plane, Briefcase, Heart } from 'lucide-react';

interface DocumentChecklistProps {
  onOpenModal: () => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ onOpenModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'tourist' | 'business' | 'family'>('all');

  const filteredCategories = activeTab === 'all'
    ? DOCUMENT_CHECKLISTS
    : DOCUMENT_CHECKLISTS.filter(cat => cat.visaType === 'all' || cat.visaType === activeTab);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-gold-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-gold-400" />;
      case 'Plane': return <Plane className="w-5 h-5 text-gold-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-gold-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-gold-400" />;
      default: return <FileText className="w-5 h-5 text-gold-400" />;
    }
  };

  return (
    <section className="py-24 bg-navy-900 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest px-3.5 py-1 rounded-full bg-navy-950 border border-gold-500/30">
            EMBASSY PREPARATION
          </span>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white font-cinzel">
            Prepare With Confidence
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Review standard embassy document requirements to ensure zero rejections and smooth filing.
          </p>

          {/* Visa Type Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Essential Documents' },
              { id: 'tourist', label: 'Tourist Visa' },
              { id: 'business', label: 'Business Visa' },
              { id: 'family', label: 'Family Visit Visa' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold-gradient text-navy-950 shadow-gold-glow'
                    : 'bg-navy-950 text-slate-300 hover:text-gold-300 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-navy-950 rounded-2xl p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all shadow-navy-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-card border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-cinzel">{cat.title}</h3>
                    <p className="text-[11px] text-slate-400">{cat.description}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 my-4">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[10px] text-gold-400 font-semibold flex items-center gap-1">
                <span>Verified by Escape Odyssey Document Auditors</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer & CTA Card */}
        <div className="bg-navy-card rounded-2xl p-6 sm:p-8 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-gold-glow">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" /> Important Document Notice
            </div>
            <p className="text-xs text-slate-300 max-w-2xl">
              * Note: Exact document specifications (such as bank balance thresholds, photo dimensions, and invitation templates) vary depending on your target destination country, citizenship, and visa stream.
            </p>
          </div>

          <button
            onClick={onOpenModal}
            className="px-8 py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-navy-950 font-bold text-sm shadow-gold-glow flex items-center gap-2 flex-shrink-0"
          >
            <span>Check My Documents</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
