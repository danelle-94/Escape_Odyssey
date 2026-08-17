import React from 'react';
import { PROCESS_STEPS } from '../data/websiteData';
import { MessageSquare, FileCheck, FileText, CalendarCheck, Activity, PlaneTakeoff } from 'lucide-react';

export const VisaProcess: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0: return <MessageSquare className="w-5 h-5 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 1: return <FileCheck className="w-5 h-5 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 2: return <FileText className="w-5 h-5 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 3: return <CalendarCheck className="w-5 h-5 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 4: return <Activity className="w-5 h-5 text-[#0074B5] group-hover:text-white transition-colors" />;
      case 5: return <PlaneTakeoff className="w-5 h-5 text-[#0074B5] group-hover:text-white transition-colors" />;
      default: return <FileCheck className="w-5 h-5 text-[#0074B5] group-hover:text-white transition-colors" />;
    }
  };

  return (
    <section className="py-24 bg-[#F8F6F0] relative overflow-hidden">
      
      {/* Flight Arc Line Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 300 Q 600 100 1200 500" stroke="#0074B5" strokeWidth="2" fill="none" strokeDasharray="10 10" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest px-3.5 py-1 rounded-full bg-white border border-blue-200 shadow-sm">
            6-STEP SIMPLE ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 font-cinzel">
            Your Visa Journey, Simplified
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            We guide you step-by-step through every embassy milestone so you never worry about missing details or appointment deadlines.
          </p>
        </div>

        {/* Steps Grid with Connecting Timeline Line */}
        <div className="relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#0074B5]/30 transform -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {PROCESS_STEPS.map((item, idx) => (
              <div 
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,116,181,0.1)]"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-[#0074B5] font-cinzel">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:bg-[#0074B5] transition-colors">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 font-cinzel mb-2 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3 font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Sub Detail */}
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
