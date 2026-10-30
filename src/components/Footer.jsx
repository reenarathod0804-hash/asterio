import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Star
} from 'lucide-react';
import { REVIEWS } from '../data/footwearData';
import { AsterioLogo } from './AsterioLogo';
import { sounds } from '../utils/soundEffects';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    sounds.playChime();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#08090b] border-t border-[rgba(255,255,255,0.06)]">
      
      {/* Customer Reviews Section */}
      <div className="py-10 sm:py-14 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(15,16,21,0.35)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <span className="badge badge-hero text-[10px] sm:text-xs mb-1.5">
                VERIFIED COLLECTOR ARCHIVE
              </span>
              <h3 className="text-lg sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
                TESTED ON GLOBAL PAVEMENT
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-tech text-[#8c919d]">
              <div className="flex text-white">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#ffffff" />
                ))}
              </div>
              <span className="ml-1 text-white font-medium">4.9 / 5.0</span>
              <span className="hidden sm:inline">(&gt;1,200 ARCHIVED REVIEWS)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {REVIEWS.map((rev) => (
              <div 
                key={rev.id} 
                className="glass-panel p-4 sm:p-5 border border-[rgba(255,255,255,0.06)] flex flex-col justify-between bg-[rgba(15,16,21,0.65)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-white">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#ffffff" />
                      ))}
                    </div>
                    <span className="text-[10px] font-tech text-[#727785]">{rev.date}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-white mb-1.5">{rev.title}</h4>
                  <p className="font-body text-xs text-[#9aa0ad] leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
                </div>

                <div className="pt-3.5 sm:pt-4 mt-3.5 sm:mt-4 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between text-[11px] font-tech">
                  <span className="text-white font-medium">{rev.author} <span className="text-[#525662] font-normal">{rev.handle}</span></span>
                  <span className="text-[#9eb8a8] flex items-center gap-1"><ShieldCheck size={12} /> VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Brand Info & Newsletter */}
          <div className="col-span-2 sm:col-span-12 lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            
            <div className="flex items-center cursor-pointer">
              <AsterioLogo size="lg" showWordmark={true} showSubtext={true} />
            </div>

            <p className="font-body text-xs text-[#8c919d] leading-relaxed max-w-sm">
              Architectural footwear engineered for the metropolitan vanguard. Sculpted in Tokyo, finished in Paris, shipped worldwide in archival serial packaging.
            </p>

            {/* Newsletter Pill Input */}
            <div>
              <div className="text-[10px] font-tech uppercase tracking-wider text-[#8c919d] mb-2">
                JOIN THE ARCHIVE (NEXT DROP ALERTS)
              </div>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter your email..."
                  required
                  className="flex-1 bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-2.5 text-xs font-tech text-white placeholder-[#525662] focus:border-[rgba(255,255,255,0.3)] transition-all"
                />
                <button
                  type="submit"
                  className="btn btn-primary text-xs px-4 py-2.5 rounded-full flex-shrink-0"
                >
                  {subscribed ? <Check size={14} /> : <ArrowRight size={14} />}
                </button>
              </form>
              {subscribed && (
                <span className="text-[11px] font-tech text-[#9eb8a8] mt-2 block">
                  ✓ Priority access granted for Drop 005.
                </span>
              )}
            </div>

          </div>

          {/* Links Column 1: Silhouettes */}
          <div className="col-span-1 sm:col-span-4 lg:col-span-2 flex flex-col gap-2.5 sm:gap-3">
            <h4 className="text-xs font-tech font-bold uppercase tracking-widest text-white mb-1.5 sm:mb-2">
              SILHOUETTES
            </h4>
            <a href="#catalog-section" className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors">Cyber Runners</a>
            <a href="#catalog-section" className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors">Gorpcore Hikers</a>
            <a href="#catalog-section" className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors">Avant Mules</a>
            <a href="#catalog-section" className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors">Retro Courts</a>
            <a href="#catalog-section" className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors">Lab Grails</a>
          </div>

          {/* Links Column 2: Studio Lab */}
          <div className="col-span-1 sm:col-span-4 lg:col-span-2 flex flex-col gap-2.5 sm:gap-3">
            <h4 className="text-xs font-tech font-bold uppercase tracking-widest text-white mb-1.5 sm:mb-2">
              STUDIO ARCHIVE
            </h4>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">Drop 004 Dossier</span>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">Vibram® Tech Spec</span>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">NFC Authentication</span>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">Tokyo Atelier</span>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">Sustainability</span>
          </div>

          {/* Links Column 3: Client Care */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-3 flex flex-col gap-2.5 sm:gap-3">
            <h4 className="text-xs font-tech font-bold uppercase tracking-widest text-white mb-1.5 sm:mb-2">
              CLIENT SERVICES
            </h4>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">Shipping & Dispatch</span>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">Size & Fit Assistant</span>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">Vault Concierge</span>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">Returns & Exchanges</span>
            <span className="text-xs font-tech text-[#8c919d] hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 sm:pt-12 mt-8 sm:mt-12 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-tech text-[#5a5f6d] text-center sm:text-left">
          <div>
            &copy; 2026 ASTERIO STUDIOS INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">INSTAGRAM</span>
            <span>//</span>
            <span className="hover:text-white cursor-pointer transition-colors">TIKTOK</span>
            <span>//</span>
            <span className="hover:text-white cursor-pointer transition-colors">DISCORD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
