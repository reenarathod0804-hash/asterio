import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Heart, 
  Trash2, 
  ShoppingBag, 
  CheckCircle, 
  ShieldCheck
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

// Search Modal
export function SearchModal({
  isOpen,
  onClose,
  allProducts,
  onSelectProduct,
  currency,
  currencyRates
}) {
  if (!isOpen) return null;

  const [term, setTerm] = useState('');

  const trendingTags = [
    'Chrome Runner',
    'Vibram Megagrip',
    'Titanium Mule',
    'Cordura Ripstop',
    'Drop 004',
    'Retro Court'
  ];

  const formatPrice = (amount) => {
    const rate = currencyRates[currency] || 1;
    const converted = Math.round(amount * rate);
    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
    return `${symbols[currency] || '$'}${converted.toLocaleString()}`;
  };

  const filtered = term.trim() === '' ? [] : allProducts.filter(p => 
    p.name.toLowerCase().includes(term.toLowerCase()) ||
    p.categoryLabel.toLowerCase().includes(term.toLowerCase()) ||
    p.description.toLowerCase().includes(term.toLowerCase()) ||
    p.tag.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content w-full max-w-2xl bg-[#0c0d11] border border-[rgba(255,255,255,0.12)] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2.5 text-white font-display font-bold text-sm sm:text-base">
            <Search size={16} className="text-[#9eb8a8]" />
            <span>SEARCH ARCHIVE</span>
          </div>
          <button onClick={() => { sounds.playClick(); onClose(); }} className="btn-icon w-8 h-8">
            <X size={15} />
          </button>
        </div>

        {/* Input */}
        <div className="relative mt-3.5 sm:mt-4">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#727785]" />
          <input
            type="text"
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Type silhouette, category, or spec..."
            className="w-full bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] rounded-xl sm:rounded-2xl pl-10 pr-4 py-2.5 sm:py-3 text-xs font-tech text-white placeholder-[#525662] focus:outline-none focus:border-[rgba(255,255,255,0.25)]"
          />
        </div>

        {/* Trending Tags */}
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] font-tech text-[#727785] uppercase">TRENDING:</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => { sounds.playClick(); setTerm(tag); }}
              className="text-[10px] sm:text-[11px] font-tech bg-[rgba(255,255,255,0.03)] hover:bg-white hover:text-[#0b0c0f] border border-[rgba(255,255,255,0.07)] text-[#cbd0dc] px-2.5 sm:px-3 py-1 rounded-full transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="mt-4 sm:mt-6 max-h-[350px] overflow-y-auto space-y-2">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => { sounds.playClick(); onSelectProduct(item); onClose(); }}
                className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-[#101217] border border-[rgba(255,255,255,0.08)] flex-shrink-0">
                    <img src={item.primaryImage} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-xs text-white uppercase truncate">{item.name}</h4>
                    <span className="text-[10px] font-tech text-[#8c919d] truncate block">{item.categoryLabel} &bull; {item.tag}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-tech text-xs font-bold text-white">{formatPrice(item.price)}</span>
                </div>
              </div>
            ))
          ) : term.trim() !== '' ? (
            <div className="text-center py-8 text-xs font-tech text-[#8c919d]">
              No silhouettes found matching &ldquo;{term}&rdquo;. Explore categories.
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}

// Wishlist Modal
export function WishlistModal({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart,
  currency,
  currencyRates
}) {
  if (!isOpen) return null;

  const formatPrice = (amount) => {
    const rate = currencyRates[currency] || 1;
    const converted = Math.round(amount * rate);
    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
    return `${symbols[currency] || '$'}${converted.toLocaleString()}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#0c0d11] border border-[rgba(255,255,255,0.12)] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2 text-white font-display font-bold text-sm sm:text-base">
            <Heart size={16} className="text-white fill-white" />
            <span>SAVED SILHOUETTES ({wishlistItems.length})</span>
          </div>
          <button onClick={() => { sounds.playClick(); onClose(); }} className="btn-icon w-8 h-8">
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mt-4 space-y-2.5">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12 text-[#8c919d]">
              <Heart size={28} className="mx-auto mb-2 text-[#525662]" />
              <p className="font-display font-bold text-white text-sm mb-1">NO SAVED SILHOUETTES</p>
              <p className="text-xs font-body text-[#8c919d]">Bookmark silhouettes to save them to your personal archive.</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between gap-2.5 p-3 rounded-2xl bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl overflow-hidden bg-[#101217] border border-[rgba(255,255,255,0.08)] flex-shrink-0">
                    <img src={item.primaryImage} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-xs text-white uppercase truncate">{item.name}</h4>
                    <span className="font-tech text-xs text-white font-medium">{formatPrice(item.price)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      sounds.playBagAdd();
                      onAddToCart({
                        ...item,
                        selectedSize: item.sizes[0],
                        selectedColor: item.colorways[0]?.name || 'Standard',
                        selectedImage: item.primaryImage,
                        quantity: 1
                      });
                    }}
                    className="btn btn-primary text-xs py-1.5 px-2.5 sm:px-3.5 font-tech font-medium flex items-center gap-1 sm:gap-1.5"
                  >
                    <ShoppingBag size={12} />
                    <span>ADD TO BAG</span>
                  </button>

                  <button
                    onClick={() => { sounds.playClick(); onRemoveFromWishlist(item.id); }}
                    className="btn-icon w-8 h-8 text-[#727785] hover:text-white"
                    title="Remove"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Checkout Confirmed Modal
export function CheckoutSuccessModal({ orderData, onClose }) {
  if (!orderData) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content w-full max-w-lg bg-[#0c0d11] border border-[rgba(255,255,255,0.15)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-full bg-[rgba(158,184,168,0.15)] border border-[rgba(158,184,168,0.3)] text-[#9eb8a8] flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={26} />
        </div>

        <span className="badge badge-hero text-xs mb-2">
          ACQUISITION CONFIRMED // ENCRYPTED
        </span>

        <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-2">
          ORDER ACQUIRED
        </h2>

        <p className="font-body text-xs sm:text-sm text-[#9aa0ad] mb-6 leading-relaxed">
          Your Asterio footwear is being prepared in our Paris atelier. Packaged in archival storage cases with tamper-proof security seals.
        </p>

        {/* Digital Holographic Card Box */}
        <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] p-4 rounded-2xl text-left font-tech text-xs space-y-2 mb-6">
          <div className="flex justify-between text-[#8c919d]">
            <span>ORDER REFERENCE:</span>
            <span className="text-white font-medium">{orderData.orderId}</span>
          </div>
          <div className="flex justify-between text-[#8c919d]">
            <span>TOTAL AUTHORIZED:</span>
            <span className="text-white font-bold">{orderData.total}</span>
          </div>
          <div className="flex justify-between text-[#8c919d]">
            <span>ESTIMATED DELIVERY:</span>
            <span className="text-white">2-3 Business Days via Express</span>
          </div>
          <div className="pt-2 border-t border-[rgba(255,255,255,0.05)] flex items-center gap-2 text-[10px] text-[#9eb8a8]">
            <ShieldCheck size={13} />
            <span>NFC AUTHENTICITY CERTIFICATE DISPATCHED TO EMAIL</span>
          </div>
        </div>

        <button
          onClick={() => { sounds.playClick(); onClose(); }}
          className="w-full btn btn-primary py-3 font-tech font-medium text-xs"
        >
          RETURN TO ARCHIVE
        </button>
      </div>
    </div>
  );
}
