import React from 'react';
import { 
  Search, 
  X,
  Sparkles,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '../data/footwearData';
import { sounds } from '../utils/soundEffects';

export function CategoryFilter({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterUnder250,
  onToggleUnder250,
  filterInStock,
  onToggleInStock,
  filterGrailsOnly,
  onToggleGrailsOnly,
  totalResults
}) {
  return (
    <div id="catalog-section" className="w-full pt-10 pb-6 border-b border-[rgba(255,255,255,0.06)]">
      
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9eb8a8]" />
            <span className="text-[10px] font-tech uppercase tracking-[0.2em] text-[#8c919d]">
              ARCHIVE DIRECTORY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight flex items-center gap-2.5">
            FOOTWEAR ARCHIVE 
            <span className="text-sm font-tech font-normal text-[#9aa0ad] tracking-normal">
              ({totalResults} silhouettes)
            </span>
          </h2>
        </div>
      </div>

      {/* Horizontal Minimalist Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none mb-6 touch-scroll">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { sounds.playClick(); onSelectCategory(cat.id); }}
              onMouseEnter={() => sounds.playHover()}
              className={`flex-shrink-0 flex items-center gap-2.5 font-tech text-xs uppercase tracking-wider px-3.5 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'bg-[#f4f4f0] text-[#0b0c0f] border-white font-semibold shadow-sm'
                  : 'bg-[rgba(255,255,255,0.05)] text-[#d4d8e3] border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] hover:text-white hover:bg-[rgba(255,255,255,0.08)]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                isActive 
                  ? 'bg-[#0b0c0f] text-white' 
                  : 'bg-[rgba(255,255,255,0.18)] text-white border border-[rgba(255,255,255,0.18)] shadow-sm'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar: Search, Sort & Quick Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-[rgba(15,16,21,0.6)] border border-[rgba(255,255,255,0.06)] p-2.5 sm:p-3 rounded-2xl backdrop-blur-md">
        
        {/* Instant Search Bar */}
        <div className="relative w-full sm:flex-1 sm:min-w-[220px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#727785]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search silhouettes, materials, tags..."
            className="w-full bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.07)] rounded-full pl-9 pr-8 py-2 text-xs font-tech text-white placeholder-[#636875] focus:outline-none focus:border-[rgba(255,255,255,0.3)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => { sounds.playClick(); onSearchChange(''); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c919d] hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Filter Quick Chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          <button
            onClick={() => { sounds.playClick(); onToggleGrailsOnly(); }}
            className={`font-tech text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
              filterGrailsOnly
                ? 'bg-[rgba(255,255,255,0.14)] text-white border-[rgba(255,255,255,0.35)] shadow-sm'
                : 'bg-[rgba(255,255,255,0.03)] text-[#8c919d] border-[rgba(255,255,255,0.07)] hover:text-white'
            }`}
          >
            <Sparkles size={12} className={filterGrailsOnly ? "text-[#9eb8a8]" : "text-[#727785]"} />
            <span>GRAILS ONLY</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onToggleUnder250(); }}
            className={`font-tech text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
              filterUnder250
                ? 'bg-[rgba(255,255,255,0.14)] text-white border-[rgba(255,255,255,0.35)] shadow-sm'
                : 'bg-[rgba(255,255,255,0.03)] text-[#8c919d] border-[rgba(255,255,255,0.07)] hover:text-white'
            }`}
          >
            <span>UNDER $250</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onToggleInStock(); }}
            className={`font-tech text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
              filterInStock
                ? 'bg-[rgba(255,255,255,0.14)] text-white border-[rgba(255,255,255,0.35)] shadow-sm'
                : 'bg-[rgba(255,255,255,0.03)] text-[#8c919d] border-[rgba(255,255,255,0.07)] hover:text-white'
            }`}
          >
            <span>IN STOCK</span>
          </button>

        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start pt-1 sm:pt-0 border-t sm:border-t-0 border-[rgba(255,255,255,0.05)]">
          <span className="font-tech text-xs text-[#727785]">SORT:</span>
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => { sounds.playClick(); onSortChange(e.target.value); }}
              className="bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-[#cbd0dc] text-xs font-tech rounded-full pl-3 pr-7 py-1.5 outline-none cursor-pointer hover:border-[rgba(255,255,255,0.2)] transition-all"
            >
              <option value="hype" className="bg-[#101217]">Curated Priority</option>
              <option value="price-asc" className="bg-[#101217]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#101217]">Price: High to Low</option>
              <option value="rating" className="bg-[#101217]">Collector Rating</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 text-[#727785] pointer-events-none" />
          </div>
        </div>

      </div>

    </div>
  );
}

export default CategoryFilter;
