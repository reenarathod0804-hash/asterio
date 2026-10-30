import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Info,
  Cpu,
  ShoppingBag,
  Heart,
  Share2,
  ShieldCheck
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export function ProductModal({
  product,
  onClose,
  onAddToCart,
  currency,
  currencyRates,
  isWishlisted,
  onToggleWishlist
}) {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[3] || product.sizes[0]);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // overview | specs | nfc
  const [nfcScanned, setNfcScanned] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Currency Converter Helper
  const formatPrice = (amount) => {
    const rate = currencyRates[currency] || 1;
    const converted = Math.round(amount * rate);
    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
    return `${symbols[currency] || '$'}${converted.toLocaleString()}`;
  };

  const handleAddToCart = () => {
    sounds.playBagAdd();
    setAddedSuccess(true);
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor: product.colorways[selectedColorIdx]?.name || 'Standard',
      selectedImage: product.images[activeImageIdx] || product.primaryImage,
      quantity
    });

    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  const handleSimulateNfc = () => {
    sounds.playChime();
    setNfcScanned(true);
    setTimeout(() => {
      setNfcScanned(false);
    }, 4000);
  };

  const handleShare = () => {
    sounds.playClick();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper to format colorway pill names so they do not all repeat "White"
  const formatColorwayLabel = (fullName) => {
    if (!fullName) return '';
    if (!fullName.includes('/')) return fullName;
    const parts = fullName.split('/').map(s => s.trim());
    const genericBases = ['white', 'pure white', 'pristine white', 'crisp white', 'off-white', 'sail', 'bone', 'chalk white'];
    if (genericBases.includes(parts[0].toLowerCase()) && parts[1]) {
      return parts[1];
    }
    return parts[0];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="product-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header Bar with Title & Close Button */}
        <div className="product-modal-header">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="w-2 h-2 rounded-full bg-[#9eb8a8] flex-shrink-0" />
            <span className="font-tech text-xs tracking-wider text-white uppercase font-medium truncate">
              {product.name}
            </span>
            <span className="hidden sm:inline font-tech text-[10px] text-[#727785] tracking-widest uppercase flex-shrink-0">
              // {product.sku}
            </span>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="btn-icon w-8 h-8 sm:w-9 sm:h-9 text-[#cbd0dc] hover:text-white flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Middle Body */}
        <div className="product-modal-body scrollbar-thin">
          <div className="product-modal-grid">

            {/* Left Column: Gallery & View Angle Selector */}
            <div className="product-modal-col-left gap-3 sm:gap-4">
              {/* Main Stage Image - 100% clean unobstructed photography, zero text overlays */}
              <div className="product-modal-image-stage group">
                <img
                  src={product.images[activeImageIdx] || product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* Thumbnail Navigation */}
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { sounds.playClick(); setActiveImageIdx(idx); }}
                    className={`h-16 sm:h-20 rounded-xl overflow-hidden border transition-all ${activeImageIdx === idx
                      ? 'border-white ring-2 ring-white/20'
                      : 'border-[rgba(255,255,255,0.08)] opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Fit Guarantee & Drop Batch */}
              <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.06)] p-3 rounded-xl flex items-center gap-3">
                <Info size={16} className="text-[#9eb8a8] flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-tech text-white font-medium">FIT ASSIST: </span>
                  <span className="text-[#9aa0ad]">{product.fitInfo}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Spec Details, Size Picker & Tabs */}
            <div className="product-modal-col-right justify-between">
              <div>
                {/* Top Subtitle & Sku & Tag */}
                <div className="flex items-center justify-between text-xs font-tech text-[#727785] mb-2">
                  <div className="flex items-center gap-2">
                    <span>SKU: {product.sku}</span>
                    {product.tag && (
                      <span className="badge badge-hero text-[10px] py-0.5 px-2">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-[#9eb8a8]">DROP 004 SPEC</span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white uppercase tracking-tight mb-2 sm:mb-3">
                  {product.name}
                </h2>

                {/* Price Row */}
                <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                  <span className="text-2xl font-tech font-bold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm font-tech text-[#5a5f6d] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="badge badge-hero text-[10px]">
                    COMPLIMENTARY SHIPPING
                  </span>
                </div>

                {/* Colorway Selection */}
                <div className="mb-4 sm:mb-5">
                  <div className="flex items-center justify-between text-xs font-tech text-[#8c919d] mb-2">
                    <span className="uppercase">CHOOSE COLORWAY:</span>
                    <span className="text-white font-medium">{product.colorways[selectedColorIdx]?.name}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.colorways.map((col, idx) => (
                      <button
                        key={col.name}
                        onClick={() => { sounds.playClick(); setSelectedColorIdx(idx); }}
                        className={`modal-colorway-btn ${selectedColorIdx === idx ? 'active' : ''}`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: col.hex }} />
                        <span>{formatColorwayLabel(col.name)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* US Size Selector */}
                <div className="mb-4 sm:mb-5">
                  <div className="flex items-center justify-between text-xs font-tech text-[#8c919d] mb-2">
                    <span className="uppercase">SELECT US MENS SIZE:</span>
                    <span className="text-white font-medium">SIZE {selectedSize}</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => { sounds.playClick(); setSelectedSize(size); }}
                        className={`py-2 rounded-xl font-tech text-xs border transition-all ${selectedSize === size
                          ? 'bg-white text-[#0b0c0f] border-white font-medium shadow-sm'
                          : 'bg-[rgba(255,255,255,0.035)] text-white border-[rgba(255,255,255,0.08)] hover:border-white'
                          }`}
                      >
                        US {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Selector: Overview / Technical Specs / NFC Chip */}
                <div className="modal-tabs-grid">
                  <button
                    onClick={() => { sounds.playClick(); setActiveTab('overview'); }}
                    className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  >
                    <span>Overview</span>
                  </button>
                  <button
                    onClick={() => { sounds.playClick(); setActiveTab('specs'); }}
                    className={`modal-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                  >
                    <span>Specs</span>
                    <span className="modal-tab-badge">
                      {product.specs.length}
                    </span>
                  </button>
                  <button
                    onClick={() => { sounds.playClick(); setActiveTab('nfc'); }}
                    className={`modal-tab-btn ${activeTab === 'nfc' ? 'active' : ''}`}
                  >
                    <Cpu size={13} className={activeTab === 'nfc' ? 'text-[#0b0c0f]' : 'text-[#9eb8a8]'} />
                    <span>NFC Pass</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="min-h-[80px] mb-4">
                  {activeTab === 'overview' && (
                    <p className="font-body text-xs sm:text-sm text-[#9aa0ad] leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  {activeTab === 'specs' && (
                    <ul className="space-y-1.5">
                      {product.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-tech text-[#cbd0dc]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9eb8a8]" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'nfc' && (
                    <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.07)] p-3 rounded-xl flex flex-col gap-2.5">
                      <div className="flex items-center justify-between text-xs font-tech">
                        <span className="text-white font-medium flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-[#9eb8a8]" /> NFC CERTIFICATION
                        </span>
                        <button
                          onClick={handleSimulateNfc}
                          className="btn btn-secondary text-[10px] py-1 px-3 rounded-full"
                        >
                          SIMULATE NFC TAP
                        </button>
                      </div>
                      <p className="text-[11px] text-[#8c919d] leading-relaxed">
                        Every Asterio silhouette embeds a passive 13.56 MHz encrypted micro-transponder linking directly to its digital atelier certificate.
                      </p>
                      {nfcScanned && (
                        <div className="bg-[rgba(158,184,168,0.15)] border border-[rgba(158,184,168,0.3)] text-[#d6e4dc] p-2 rounded-lg text-xs font-tech flex items-center gap-2">
                          <Check size={14} className="text-[#9eb8a8]" /> NFC VERIFIED: [AST-TOKEN-{product.sku}-AUTHENTIC]
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar - Always docked & accessible on mobile & desktop */}
        <div className="product-modal-footer">
          {/* Quantity Selector */}
          <div className="flex items-center bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-full flex-shrink-0">
            <button
              onClick={() => { sounds.playClick(); setQuantity(Math.max(1, quantity - 1)); }}
              className="px-3 py-2 text-xs text-white hover:text-[#9eb8a8]"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-2 font-tech text-xs text-white font-medium">{quantity}</span>
            <button
              onClick={() => { sounds.playClick(); setQuantity(quantity + 1); }}
              className="px-3 py-2 text-xs text-white hover:text-[#9eb8a8]"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Main Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 min-w-[130px] btn btn-primary py-2.5 sm:py-3 flex items-center justify-center gap-2 text-xs font-tech font-medium"
          >
            <ShoppingBag size={15} />
            <span>{addedSuccess ? 'ADDED TO BAG ✓' : `ADD TO BAG • ${formatPrice(product.price * quantity)}`}</span>
          </button>

          {/* Wishlist Heart */}
          <button
            onClick={() => { sounds.playClick(); onToggleWishlist(product); }}
            className="btn-icon w-9 h-9 flex-shrink-0"
            title="Wishlist"
          >
            <Heart size={16} className={isWishlisted ? "fill-white text-white" : "text-[#9aa0ad]"} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="btn-icon w-9 h-9 flex-shrink-0"
            title="Share Grail"
          >
            <Share2 size={15} className={copiedLink ? "text-[#9eb8a8]" : "text-[#9aa0ad]"} />
          </button>
        </div>

        {copiedLink && (
          <div className="bg-[#9eb8a8]/20 text-[#d6e4dc] text-[11px] font-tech text-center py-1">
            Archival link copied to clipboard.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductModal;
