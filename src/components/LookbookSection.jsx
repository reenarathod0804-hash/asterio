import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { EDITORIAL_LOOKBOOK } from '../data/footwearData';
import { sounds } from '../utils/soundEffects';

export function LookbookSection({ onSelectProductById }) {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 border-b border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 pb-4 border-b border-[rgba(255,255,255,0.06)]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-xs font-tech text-[#9eb8a8] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9eb8a8]" />
              <span>EDITORIAL LOOKBOOK // 2026 ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
              STREET ARCHIVE
            </h2>
          </div>
          <p className="font-tech text-xs text-[#8c919d] tracking-wider uppercase max-w-sm">
            Documented on 35mm film across Tokyo, Berlin, and Paris. Curated street styling with Asterio silhouettes.
          </p>
        </div>

        {/* 4-Item Lookbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {EDITORIAL_LOOKBOOK.map((look) => (
            <div 
              key={look.id}
              className="glass-panel overflow-hidden group flex flex-col cursor-pointer border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.22)] transition-all duration-500 bg-[rgba(15,16,21,0.65)]"
              onClick={() => {
                sounds.playClick();
                onSelectProductById(look.shoeId);
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#101217]">
                <img 
                  src={look.image} 
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25 pointer-events-none" />

                {/* City Tag */}
                <div className="absolute top-3 left-3 bg-[rgba(11,12,15,0.7)] backdrop-blur-md px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center gap-1.5 text-[10px] font-tech text-[#cbd0dc]">
                  <MapPin size={10} className="text-[#9eb8a8]" />
                  <span>{look.location}</span>
                </div>

                {/* Model Handle */}
                <div className="absolute top-3 right-3 text-[10px] font-tech text-[#8c919d]">
                  {look.model}
                </div>

                {/* Hover Action Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="btn btn-primary text-xs py-2 px-4 shadow-xl flex items-center gap-1.5 font-medium">
                    <span>VIEW LOOK</span>
                    <ArrowUpRight size={13} />
                  </span>
                </div>

                {/* Bottom Shoe Banner */}
                <div className="absolute bottom-3 inset-x-3 bg-[rgba(15,16,21,0.85)] backdrop-blur-md p-2.5 rounded-xl border border-[rgba(255,255,255,0.09)]">
                  <div className="text-[9px] font-tech text-[#8c919d] uppercase tracking-wider">
                    FEATURED SILHOUETTE:
                  </div>
                  <div className="font-display font-bold text-xs text-white truncate mt-0.5">
                    {look.shoeName}
                  </div>
                </div>

              </div>

              {/* Fit Details & Style Tags */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-display font-bold text-sm text-white mb-2 group-hover:text-[#f4f4f2] transition-colors">
                  {look.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {look.fitTags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] font-tech bg-[rgba(255,255,255,0.04)] text-[#8c919d] px-2 py-0.5 rounded-full border border-[rgba(255,255,255,0.05)]"
                    >
                      #{tag.toLowerCase().replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default LookbookSection;
