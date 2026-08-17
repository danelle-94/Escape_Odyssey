import React from 'react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface TravelInspirationProps {
  onOpenModal?: () => void;
}

const ARTICLES = [
  {
    id: 1,
    title: 'How to Avoid Schengen Visa Rejection: 7 Key Tips for Indian Travelers',
    snippet: 'Learn how to present rock-solid financial proof, itinerary details, and cover letters that guarantee embassy confidence.',
    category: 'Schengen Tips',
    readTime: '4 min read',
    date: 'Aug 12, 2026',
    author: 'Aditi Kulkarni',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'US B1/B2 Visa Interview Questions & Model Answers for 2026',
    snippet: 'Master your consulate interview with proven answers regarding tie-backs to India, trip funding, and travel history.',
    category: 'US Visa Guide',
    readTime: '6 min read',
    date: 'Aug 08, 2026',
    author: 'Escape Odyssey Desk',
    image: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Top 10 Easy-Visa Nations for Indian Passport Holders',
    snippet: 'Discover stunning destinations with e-Visas or visa-on-arrival processes that promise hassle-free approval.',
    category: 'Destination Guide',
    readTime: '5 min read',
    date: 'Aug 02, 2026',
    author: 'Rohan Sharma',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800'
  }
];

export const TravelInspiration: React.FC<TravelInspirationProps> = () => {
  return (
    <section className="py-24 bg-[#FAF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest px-3.5 py-1 rounded-full bg-white border border-blue-200 shadow-sm">
            INSIGHTS & GUIDES
          </span>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 font-cinzel">
            Travel & Visa Inspiration
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Pro tips, Embassy guidelines, and travel inspiration to help you prepare for seamless international journeys.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(1,93,165,0.12)]"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#015da5] text-white border border-blue-300 shadow-sm">
                    {article.category}
                  </span>

                  {/* Read Time Tag */}
                  <span className="absolute bottom-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/90 text-slate-800 border border-slate-200 backdrop-blur-md shadow-sm flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#015da5]" />
                    {article.readTime}
                  </span>
                </div>

                {/* Article Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#015da5]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span>By {article.author}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-cinzel group-hover:text-[#015da5] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                    {article.snippet}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="p-6 pt-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#015da5] hover:text-[#01477f] transition-colors group/link"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
