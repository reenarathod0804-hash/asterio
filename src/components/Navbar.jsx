import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  ArrowRight,
  Globe,
  ChevronDown
} from 'lucide-react';
import { AsterioLogo } from './AsterioLogo';
import { sounds } from '../utils/soundEffects';

export function Navbar({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenSearch, 
  activeCategory, 
  onSelectCategory,
  currency,
  onCurrencyChange,
  soundEnabled,
  onToggleSound
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'all', label: 'All Archive' },
    { id: 'retro', label: 'Retro Courts' },
    { id: 'minimalist', label: 'Minimalist Calfskin' },
    { id: 'loafers', label: 'Luxury Loafers' },
    { id: 'pastels', label: 'Dusty Suede' },
    { id: 'terrace', label: 'Terrace Heritage' },
  ];

  const handleNavClick = (id) => {
    sounds.playClick();
    onSelectCategory(id);
    setMobileMenuOpen(false);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Minimalist Studio Ticker */}
      <div className="bg-[#08090b] border-b border-[rgba(255,255,255,0.06)] py-1.5 text-[11px] font-tech tracking-wider overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content text-[#8c919d] uppercase flex items-center">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9eb8a8]" />
              COLLECTION 004 // WINTER-SPRING ARCHIVE NOW OPEN
            </span>
            <span className="text-[#3a3e4a]">•</span>
            <span>WORLDWIDE ARCHIVE DISPATCH</span>
            <span className="text-[#3a3e4a]">•</span>
            <span>ENCRYPTED NFC PHYSICAL-TO-DIGITAL TAG</span>
            <span className="text-[#3a3e4a]">•</span>
            <span className="text-white">LIMITED TO 500 NUMBERED PAIRS PER SILHOUETTE</span>
            <span className="text-[#3a3e4a]">•</span>
            <span>TOKYO // BERLIN // PARIS // NEW YORK</span>
            <span className="text-[#3a3e4a]">•</span>
            <span className="text-[#9eb8a8]">USE CODE &lsquo;ASTERIO20&rsquo; FOR INITIAL ARCHIVE ACCESS</span>
            <span className="text-[#3a3e4a]">•</span>
            {/* Duplication for seamless infinite roll */}
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9eb8a8]" />
              COLLECTION 004 // WINTER-SPRING ARCHIVE NOW OPEN
            </span>
            <span className="text-[#3a3e4a]">•</span>
            <span>WORLDWIDE ARCHIVE DISPATCH</span>
            <span className="text-[#3a3e4a]">•</span>
            <span>ENCRYPTED NFC PHYSICAL-TO-DIGITAL TAG</span>
            <span className="text-[#3a3e4a]">•</span>
            <span className="text-white">LIMITED TO 500 NUMBERED PAIRS PER SILHOUETTE</span>
            <span className="text-[#3a3e4a]">•</span>
          </div>
        </div>
      </div>

      {/* Main Minimalist Navigation Header */}
      <nav className="backdrop-blur-2xl bg-[rgba(11,12,15,0.82)] border-b border-[rgba(255,255,255,0.07)] px-3 sm:px-6 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Minimalist Asterio Vector Logo */}
          <div 
            className="flex items-center cursor-pointer group flex-shrink-0"
            onClick={() => { sounds.playClick(); onSelectCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <AsterioLogo size="md" showWordmark={true} showSubtext={false} />
          </div>

          {/* Desktop Minimalist Links */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[rgba(15,16,21,0.7)] border border-[rgba(255,255,255,0.08)] p-1 rounded-full backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  onMouseEnter={() => sounds.playHover()}
                  className={`px-4 py-1.5 rounded-full text-xs font-tech tracking-wider transition-all duration-300 border ${
                    isActive 
                      ? 'bg-[rgba(255,255,255,0.16)] text-white font-semibold border-[rgba(255,255,255,0.36)] shadow-sm' 
                      : 'bg-[rgba(255,255,255,0.045)] text-[#cbd0dc] border-[rgba(255,255,255,0.09)] hover:text-white hover:bg-[rgba(255,255,255,0.09)] hover:border-[rgba(255,255,255,0.22)]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Search Pill (Icon on small mobile, pill with label and ⌘K on desktop) */}
            <button
              onClick={() => { sounds.playClick(); onOpenSearch(); }}
              className="flex items-center justify-center gap-2 w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-xs text-[#9aa0ad] hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-all flex-shrink-0"
              title="Search Archive (⌘K)"
            >
              <Search size={14} />
              <span className="hidden md:inline font-tech">Search</span>
              <kbd className="hidden md:inline text-[9px] px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] text-[#727785] border border-[rgba(255,255,255,0.08)]">
                ⌘K
              </kbd>
            </button>

            {/* Currency Selector (Desktop) */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.22)] transition-all flex-shrink-0">
              <Globe size={12} className="text-[#8c919d] pointer-events-none flex-shrink-0" />
              <div className="relative flex items-center">
                <select
                  value={currency}
                  onChange={(e) => { sounds.playClick(); onCurrencyChange(e.target.value); }}
                  className="bg-transparent text-xs font-tech text-[#cbd0dc] cursor-pointer border-0 outline-none pr-3.5 focus:outline-none"
                  title="Select Currency"
                >
                  <option value="USD" className="bg-[#101217] text-white">USD ($)</option>
                  <option value="EUR" className="bg-[#101217] text-white">EUR (€)</option>
                  <option value="GBP" className="bg-[#101217] text-white">GBP (£)</option>
                  <option value="JPY" className="bg-[#101217] text-white">JPY (¥)</option>
                </select>
                <ChevronDown size={10} className="absolute right-0 text-[#727785] pointer-events-none" />
              </div>
            </div>

            {/* Tactile Sound Toggle (Desktop & Tablet; also available in mobile drawer) */}
            <button
              onClick={onToggleSound}
              className="hidden sm:flex btn-icon w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0"
              title={soundEnabled ? "Mute Tactile Sound" : "Enable Tactile Sound"}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} className="text-[#5a5f6d]" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => { sounds.playClick(); onOpenWishlist(); }}
              className="btn-icon w-8 h-8 sm:w-9 sm:h-9 relative flex-shrink-0"
              title="View Wishlist"
            >
              <Heart size={14} className={wishlistCount > 0 ? "fill-white text-white" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f4f4f0] text-[#0b0c0f] text-[9px] font-tech font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Capsule Button */}
            <button
              onClick={() => { sounds.playClick(); onOpenCart(); }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:pl-3 sm:pr-3.5 py-1.5 rounded-full bg-white text-[#0b0c0f] hover:bg-[#e4e4e7] transition-all duration-300 font-tech text-xs font-medium shadow-[0_4px_16px_rgba(255,255,255,0.12)] active:scale-95 flex-shrink-0"
            >
              <ShoppingBag size={14} />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0b0c0f] text-white text-[9px] sm:text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden btn-icon w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-[rgba(255,255,255,0.08)] mt-3 flex flex-col gap-1.5 animate-fadeIn">
            <div className="text-[10px] font-tech text-[#6c7280] uppercase tracking-wider px-3 mb-1">
              Select Archive Category
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3.5 py-3 rounded-xl text-xs font-tech tracking-wider flex items-center justify-between min-h-[44px] transition-colors ${
                  activeCategory === link.id
                    ? 'bg-[rgba(255,255,255,0.09)] text-white font-semibold border border-[rgba(255,255,255,0.15)]'
                    : 'text-[#9aa0ad] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight size={13} className="text-[#5a5f6d]" />
              </button>
            ))}

            {/* Mobile Drawer Settings: Tactile Sound & Currency */}
            <div className="pt-3 mt-2 border-t border-[rgba(255,255,255,0.06)] flex flex-col gap-2.5 px-3">
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-tech text-[#8c919d]">Tactile Sound</span>
                <button
                  onClick={onToggleSound}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] text-xs font-tech text-white"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 size={13} className="text-[#9eb8a8]" />
                      <span>Audio On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX size={13} className="text-[#5a5f6d]" />
                      <span className="text-[#8c919d]">Muted</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-tech text-[#8c919d]">Currency</span>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
                  <Globe size={12} className="text-[#8c919d] pointer-events-none flex-shrink-0" />
                  <div className="relative flex items-center">
                    <select
                      value={currency}
                      onChange={(e) => onCurrencyChange(e.target.value)}
                      className="bg-transparent text-xs font-tech text-white outline-none cursor-pointer border-0 pr-3.5 focus:outline-none"
                    >
                      <option value="USD" className="bg-[#101217] text-white">USD ($)</option>
                      <option value="EUR" className="bg-[#101217] text-white">EUR (€)</option>
                      <option value="GBP" className="bg-[#101217] text-white">GBP (£)</option>
                      <option value="JPY" className="bg-[#101217] text-white">JPY (¥)</option>
                    </select>
                    <ChevronDown size={10} className="absolute right-0 text-[#727785] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
