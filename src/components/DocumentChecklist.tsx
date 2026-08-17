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
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-purple-600" />;
      case 'Plane': return <Plane className="w-5 h-5 text-purple-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-purple-600" />;
      case 'Heart': return <Heart className="w-5 h-5 text-purple-600" />;
      default: return <FileText className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <section className="py-24 bg-[#FAF9F5] relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold text-purple-900 uppercase tracking-widest px-3.5 py-1 rounded-full bg-white border border-purple-200 shadow-sm">
            EMBASSY PREPARATION
          </span>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 font-cinzel">
            Prepare With Confidence
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
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
                    ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:text-purple-700 border border-slate-200 shadow-sm'
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
              className="bg-white rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(139,92,246,0.1)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-cinzel">{cat.title}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{cat.description}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium my-4">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[10px] text-purple-700 font-semibold flex items-center gap-1">
                <span>Verified by Escape Odyssey Document Auditors</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer & CTA Card */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50/50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-purple-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-purple-800 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-purple-600" /> Important Document Notice
            </div>
            <p className="text-xs text-slate-600 font-medium max-w-2xl">
              * Note: Exact document specifications (such as bank balance thresholds, photo dimensions, and invitation templates) vary depending on your target destination country, citizenship, and visa stream.
            </p>
          </div>

          <button
            onClick={onOpenModal}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-sm shadow-md flex items-center gap-2 flex-shrink-0"
          >
            <span>Check My Documents</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
