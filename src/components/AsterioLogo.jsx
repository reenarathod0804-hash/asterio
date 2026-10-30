import React from 'react';

/**
 * AsterioLogo - Minimalist High-Fashion Gen-Z Vector Emblem & Wordmark
 * Inspired by architectural silhouettes, celestial geometry, and luxury brutalism.
 */
export function AsterioLogo({ 
  size = 'md', 
  showWordmark = true, 
  showSubtext = false,
  className = '' 
}) {
  // Dimensions based on size preset
  const iconSizes = {
    sm: 22,
    md: 28,
    lg: 38,
    xl: 52
  };

  const dim = iconSizes[size] || 28;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric Celestial Mark */}
      <div 
        className="relative flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ width: dim + 4, height: dim + 4 }}
      >
        <svg
          width={dim}
          height={dim}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-700 group-hover:rotate-45"
        >
          {/* Subtle Outer Precision Alignment Ring */}
          <circle 
            cx="20" 
            cy="20" 
            r="18.5" 
            stroke="currentColor" 
            strokeOpacity="0.18" 
            strokeWidth="0.8" 
            strokeDasharray="2 3"
          />

          {/* Primary Razor-Sharp 4-Point Celestial Cross */}
          <path
            d="M20 2 C20 12 12 20 2 20 C12 20 20 28 20 38 C20 28 28 20 38 20 C28 20 20 12 20 2 Z"
            fill="url(#asterio-chrome-grad)"
            className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.12)]"
          />

          {/* Core Architectural Diamond */}
          <rect
            x="17"
            y="17"
            width="6"
            height="6"
            transform="rotate(45 20 20)"
            fill="#0b0c0e"
          />

          {/* Center Micro Beacon */}
          <circle
            cx="20"
            cy="20"
            r="1"
            fill="#ffffff"
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="asterio-chrome-grad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#e4e4e7" />
              <stop offset="70%" stopColor="#a1a1aa" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typographic Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-[0.22em] font-display font-bold text-white uppercase text-base group-hover:text-[#ffffff] transition-colors">
            <span>ASTERIO</span>
            <span className="text-[9px] font-tech font-normal text-[#9496a1] ml-1 tracking-widest">
              STUDIOS
            </span>
          </div>
          {showSubtext && (
            <span className="text-[8px] font-tech text-[#71717a] tracking-[0.28em] uppercase mt-1">
              PARIS • TOKYO • ARCHIVE
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default AsterioLogo;
