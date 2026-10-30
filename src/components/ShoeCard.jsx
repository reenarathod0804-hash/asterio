import React, { useState } from 'react';
import { 
  Heart, 
  Eye, 
  Check, 
  ArrowUpRight
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export function ShoeCard({
  product,
  currency,
  currencyRates,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [hoveredSize, setHoveredSize] = useState(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Currency Converter Helper
  const formatPrice = (amount) => {
    const rate = currencyRates[currency] || 1;
    const converted = Math.round(amount * rate);
    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
    return `${symbols[currency] || '$'}${converted.toLocaleString()}`;
  };

  const handleQuickAdd = (size, e) => {
    e.stopPropagation();
    sounds.playBagAdd();
    setAddedAnimation(true);
    onAddToCart({
      ...product,
      selectedSize: size,
      selectedColor: product.colorways[selectedColorIdx]?.name || 'Standard',
      selectedImage: product.images[selectedColorIdx] || product.primaryImage
    });

    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const getBadgeClass = (tagType) => {
    switch (tagType) {
      case 'hero': return 'badge-hero';
      case 'exclusive': return 'badge-exclusive';
      case 'luxury': return 'badge-luxury';
      case 'sale': return 'badge-sale';
      default: return 'badge-featured';
    }
  };

  return (
    <div 
      className="product-card group flex flex-col"
      onClick={() => { sounds.playClick(); onQuickView(product); }}
    >
      
      {/* Product Image Section */}
      <div className="product-image-wrap relative aspect-[4/3]">
        
        {/* Main Product Image with subtle zoom on hover */}
        <img 
          src={product.images[selectedColorIdx] || product.primaryImage} 
          alt={product.name}
          loading="lazy"
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Floating Badge & Category Label */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          <span className={`badge ${getBadgeClass(product.tagType)} text-[10px]`}>
            {product.tag}
          </span>
          <span className="font-tech text-[9px] uppercase tracking-widest text-[#9aa0ad] bg-[rgba(11,12,15,0.7)] px-2 py-0.5 rounded-full border border-[rgba(255,255,255,0.06)] backdrop-blur-md">
            {product.categoryLabel}
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playClick();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[rgba(11,12,15,0.65)] border border-[rgba(255,255,255,0.12)] backdrop-blur-md flex items-center justify-center text-white hover:border-[rgba(255,255,255,0.3)] transition-all"
          title="Save to Wishlist"
        >
          <Heart 
            size={14} 
            className={`transition-colors ${isWishlisted ? "fill-white text-white" : "text-[#cbd0dc]"}`} 
          />
        </button>

        {/* Quick View Button on Image Center Hover */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="btn btn-chrome text-xs py-2 px-4 shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye size={13} />
            <span>QUICK VIEW</span>
          </span>
        </div>

        {/* Quick-Add Sizes Overlay on Card Bottom Hover */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0c0d10] via-[rgba(12,13,16,0.95)] to-transparent p-3 pt-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px] font-tech text-[#8c919d] uppercase tracking-wider px-1">
            <span>QUICK ADD US SIZE:</span>
            {addedAnimation && (
              <span className="text-[#9eb8a8] flex items-center gap-1 font-medium">
                <Check size={11} /> ADDED TO BAG
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 6).map((size) => (
              <button
                key={size}
                onClick={(e) => handleQuickAdd(size, e)}
                onMouseEnter={() => setHoveredSize(size)}
                onMouseLeave={() => setHoveredSize(null)}
                className="flex-1 min-w-[32px] py-1 bg-[rgba(255,255,255,0.06)] hover:bg-white hover:text-[#0b0c0f] border border-[rgba(255,255,255,0.08)] text-white text-[11px] font-tech font-medium rounded-full transition-all"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        
        <div>
          {/* Subtle SKU & Tag */}
          <div className="flex items-center justify-between text-[10px] font-tech text-[#727785] mb-1.5">
            <span className="tracking-widest uppercase">{product.sku}</span>
            <span className="text-[#8c919d]">
              COLLECTION 004
            </span>
          </div>

          {/* Model Name */}
          <h3 className="font-display font-bold text-base sm:text-[1.05rem] text-white group-hover:text-[#f4f4f2] transition-colors leading-snug mb-2">
            {product.name}
          </h3>

          {/* Minimalist Colorway Swatch Selectors */}
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[10px] font-tech text-[#727785] mr-1 uppercase">COLOR:</span>
            {product.colorways.map((col, idx) => (
              <button
                key={col.name}
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  setSelectedColorIdx(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIdx === idx 
                    ? 'border-white scale-125 ring-2 ring-white/20' 
                    : 'border-[rgba(255,255,255,0.2)] hover:scale-110'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            <span className="text-[10px] font-tech text-[#727785] truncate max-w-[130px] ml-1">
              {product.colorways[selectedColorIdx]?.name}
            </span>
          </div>
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-tech text-base font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="font-tech text-xs text-[#5a5f6d] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-tech text-[#8c919d]">
              {product.originalPrice > product.price 
                ? `ARCHIVE ARCHIVE RELEASE` 
                : 'DROP 004'}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playClick();
              onQuickView(product);
            }}
            className="btn btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1 group-hover:border-[rgba(255,255,255,0.3)]"
          >
            <span>DETAILS</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

      </div>

    </div>
  );
}

export default ShoeCard;
