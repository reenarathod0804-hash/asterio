import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Eye, 
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { AsterioLogo } from './AsterioLogo';
import { sounds } from '../utils/soundEffects';

export function Hero({ onExploreClick, onQuickViewHero }) {
  // Live Drop Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section className="relative w-full overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-24 border-b border-[rgba(255,255,255,0.06)]">
      {/* Subtle Ambient Depth (No harsh fluorescent glows) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Drop Header Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="badge badge-hero flex items-center gap-1.5 text-[10px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9eb8a8]" />
              DROP 004 // LIVE ARCHIVE
            </span>
            <span className="font-tech text-xs text-[#8c919d] tracking-wider hidden sm:inline">
              LIMITED 500 PIECES // TOKYO &bull; PARIS &bull; NYC
            </span>
          </div>

          {/* Understated Minimalist Countdown */}
          <div className="flex items-center gap-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] px-3.5 py-1.5 rounded-full w-fit">
            <span className="text-[10px] sm:text-[11px] font-tech text-[#8c919d] uppercase tracking-wider">
              VAULT CLOSES:
            </span>
            <div className="font-tech text-xs text-white tracking-widest flex items-center gap-1 font-medium">
              <span className="text-[#f4f4f2]">{formatNumber(timeLeft.hours)}h</span>:
              <span className="text-[#f4f4f2]">{formatNumber(timeLeft.minutes)}m</span>:
              <span className="text-[#f4f4f2]">{formatNumber(timeLeft.seconds)}s</span>
            </div>
          </div>
        </div>

        {/* Hero Grid: Editorial Typography + Cinematic Lookbook Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] w-fit mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9eb8a8]" />
              <span className="font-tech text-[10px] sm:text-[11px] uppercase tracking-widest text-[#cbd0dc]">
                ASTERIO ARCHITECTURAL FOOTWEAR
              </span>
            </div>

            <h1 
              className="text-3xl sm:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-display font-black tracking-tight leading-[1.05] sm:leading-[0.98] text-white uppercase mb-4 sm:mb-6"
              style={{
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
                hyphens: 'none',
                WebkitHyphens: 'none'
              }}
            >
              SCULPTED FOR <br className="hidden sm:inline" />
              <span className="text-chrome">THE SILENT FUTURE.</span>
            </h1>

            <p className="font-body text-[#9aa0ad] text-sm sm:text-base lg:text-lg max-w-xl mb-7 sm:mb-9 leading-relaxed font-normal">
              Engineered at the intersection of brutalist minimalism, bio-based polymers, and Vibram® trail armor. Silhouettes sculpted for night walkers, avant-garde pioneers, and post-digital stylists.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-8 sm:mb-11">
              <button
                onClick={() => { sounds.playClick(); onExploreClick(); }}
                onMouseEnter={() => sounds.playHover()}
                className="btn btn-primary text-xs px-6 py-3.5 flex items-center justify-center gap-2 group font-tech w-full sm:w-auto"
              >
                <span>EXPLORE ARCHIVE</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => { sounds.playClick(); onQuickViewHero('ast-01'); }}
                onMouseEnter={() => sounds.playHover()}
                className="btn btn-secondary text-xs px-5 py-3.5 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Eye size={15} className="text-[#9aa0ad]" />
                <span>INSPECT GAT-01 RETRO</span>
              </button>
            </div>

            {/* Clean Technical Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-5 sm:pt-6 border-t border-[rgba(255,255,255,0.07)]">
              <div>
                <div className="font-display font-bold text-sm sm:text-lg text-white">VIBRAM®</div>
                <div className="font-tech text-[9px] sm:text-[11px] text-[#8c919d] tracking-wider uppercase mt-0.5">Megagrip Outsole</div>
              </div>
              <div>
                <div className="font-display font-bold text-sm sm:text-lg text-[#f4f4f2]">BIO-EVA</div>
                <div className="font-tech text-[9px] sm:text-[11px] text-[#8c919d] tracking-wider uppercase mt-0.5">Kinetic Rebound</div>
              </div>
              <div>
                <div className="font-display font-bold text-sm sm:text-lg text-[#9eb8a8]">NFC CIPHER</div>
                <div className="font-tech text-[9px] sm:text-[11px] text-[#8c919d] tracking-wider uppercase mt-0.5">Encrypted Origin</div>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual Card */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div 
              className="relative rounded-3xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] group bg-[#0e1015]"
              style={{
                borderRadius: '28px',
                overflow: 'hidden',
                isolation: 'isolate',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)'
              }}
            >
              
              {/* Campaign Editorial Photograph */}
              <img 
                src="/assets/hero-editorial.jpg" 
                alt="Asterio Streetwear Footwear Campaign on Wet Asphalt"
                className="w-full h-[340px] sm:h-[480px] lg:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                style={{ borderRadius: '28px' }}
              />

              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-transparent to-black/30 pointer-events-none" />

              {/* Floating Top Label */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                <div className="bg-[rgba(11,12,15,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9eb8a8]" />
                  <span className="font-tech text-[10px] sm:text-xs text-[#cbd0dc] tracking-wider">
                    STREET ARCHIVE // SHOT IN TOKYO
                  </span>
                </div>
              </div>

              {/* Floating Minimal Product Card at Bottom */}
              <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-10 bg-[rgba(15,17,22,0.88)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-[rgba(255,255,255,0.15)] bg-[#13151b] flex items-center justify-center flex-shrink-0">
                    <AsterioLogo size="sm" showWordmark={false} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="font-display font-bold text-xs sm:text-sm text-white truncate">GAT-01 RETRO</span>
                      <span className="badge badge-hero text-[8px] sm:text-[9px] py-0.5">ARCHIVE HERO</span>
                    </div>
                    <p className="font-tech text-[11px] sm:text-xs text-white font-medium mt-0.5">
                      $220 USD <span className="text-[#6d7280] line-through font-normal text-[10px] sm:text-[11px] ml-1.5">$260</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => { sounds.playClick(); onQuickViewHero('ast-01'); }}
                  onMouseEnter={() => sounds.playHover()}
                  className="btn btn-chrome text-xs py-1.5 px-3 sm:py-2 sm:px-4 flex items-center gap-1 sm:gap-1.5 flex-shrink-0"
                >
                  <span>INSPECT</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>

            </div>

            {/* Corner Minimal Tech Spec */}
            <div className="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-2 bg-[#121319] border border-[rgba(255,255,255,0.12)] px-3 py-1 rounded text-[10px] font-tech text-[#8c919d]">
              <span>AST-ARCHIVE-004</span>
              <span>//</span>
              <span className="text-[#9eb8a8]">VERIFIED ARCHIVE</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
