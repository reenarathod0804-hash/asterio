import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  currencyRates,
  onCheckoutSuccess
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Currency Converter Helper
  const formatPrice = (amount) => {
    const rate = currencyRates[currency] || 1;
    const converted = Math.round(amount * rate);
    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
    return `${symbols[currency] || '$'}${converted.toLocaleString()}`;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? Math.round(subtotal * appliedPromo.percent) : 0;
  const freeShippingThreshold = 200;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    sounds.playClick();
    if (promoCode.trim().toUpperCase() === 'ASTERIO20' || promoCode.trim().toUpperCase() === 'GENZ20') {
      sounds.playChime();
      setAppliedPromo({ code: promoCode.toUpperCase(), percent: 0.20 });
      setPromoError('');
    } else {
      setPromoError('Invalid code. Use "ASTERIO20" for 20% off.');
    }
  };

  const handleCheckout = () => {
    sounds.playChime();
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
    onCheckoutSuccess({
      itemsCount: cartItems.length,
      total: formatPrice(finalTotal),
      orderId: `AST-${Math.floor(100000 + Math.random() * 900000)}`
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto">
        <div className="w-full sm:w-screen max-w-full sm:max-w-md bg-[#0a0b0e] border-l border-[rgba(255,255,255,0.08)] shadow-2xl flex flex-col justify-between h-full">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={16} className="text-white" />
              <h2 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tight">
                SHOPPING BAG ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="btn-icon w-8 h-8"
              aria-label="Close cart"
            >
              <X size={15} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-4 py-2.5 sm:px-5 sm:py-3 bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between text-xs font-tech mb-1.5">
              <span className="text-[#8c919d] text-[11px] sm:text-xs">
                {subtotal >= freeShippingThreshold 
                  ? 'COMPLIMENTARY EXPRESS SHIPPING UNLOCKED' 
                  : `ADD ${formatPrice(freeShippingThreshold - subtotal)} FOR FREE SHIPPING`}
              </span>
              <span className="text-white font-medium">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-1 bg-[#1a1c24] rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8c919d]">
                <div className="w-14 h-14 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] flex items-center justify-center mb-4">
                  <ShoppingBag size={20} className="text-[#525662]" />
                </div>
                <p className="font-display font-bold text-white text-base mb-1">YOUR BAG IS EMPTY</p>
                <p className="font-body text-xs text-[#8c919d] max-w-xs mb-6">
                  Explore Asterio Drop 004 archive and secure your silhouette before the window closes.
                </p>
                <button
                  onClick={() => { sounds.playClick(); onClose(); }}
                  className="btn btn-primary text-xs py-2.5 px-6 font-tech font-medium"
                >
                  DISCOVER SILHOUETTES
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                  className="flex gap-3 sm:gap-3.5 p-3 rounded-2xl bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-[#101217] flex-shrink-0 border border-[rgba(255,255,255,0.07)]">
                    <img 
                      src={item.selectedImage || item.primaryImage} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display font-bold text-xs text-white uppercase line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => { sounds.playClick(); onRemoveItem(index); }}
                          className="text-[#727785] hover:text-white p-0.5"
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="text-[11px] font-tech text-[#8c919d] mt-0.5 flex flex-wrap gap-2">
                        <span>SIZE: <strong className="text-white">US {item.selectedSize}</strong></span>
                        <span>•</span>
                        <span className="truncate max-w-[120px]">{item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[rgba(255,255,255,0.04)]">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[rgba(255,255,255,0.08)] rounded-full bg-[rgba(255,255,255,0.02)] text-xs">
                        <button
                          onClick={() => { sounds.playClick(); onUpdateQuantity(index, item.quantity - 1); }}
                          className="px-2.5 py-0.5 text-[#8c919d] hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-1.5 font-tech text-white font-medium">{item.quantity}</span>
                        <button
                          onClick={() => { sounds.playClick(); onUpdateQuantity(index, item.quantity + 1); }}
                          className="px-2.5 py-0.5 text-[#8c919d] hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-tech text-xs font-bold text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(11,12,16,0.95)] space-y-3 sm:space-y-3.5">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727785]" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. ASTERIO20)"
                    className="w-full bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] rounded-full pl-8 pr-3 py-1.5 text-xs font-tech text-white placeholder-[#525662] uppercase focus:outline-none focus:border-[rgba(255,255,255,0.25)]"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary text-xs px-3.5 py-1.5 font-tech flex-shrink-0"
                >
                  APPLY
                </button>
              </form>

              {appliedPromo && (
                <div className="text-[11px] font-tech text-[#9eb8a8] flex items-center justify-between">
                  <span>PROMO CODE APPLIED: {appliedPromo.code} (-20%)</span>
                  <button onClick={() => setAppliedPromo(null)} className="text-[#8c919d] hover:text-white underline">
                    Remove
                  </button>
                </div>
              )}

              {promoError && (
                <div className="text-[11px] font-tech text-[#e5977d]">
                  {promoError}
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs font-tech text-[#8c919d] pt-1 border-t border-[rgba(255,255,255,0.05)]">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-[#9eb8a8]">
                    <span>PROMO SAVINGS (20%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>EXPRESS DISPATCH</span>
                  <span className="text-white">
                    {shipping === 0 ? <strong className="text-white font-medium">COMPLIMENTARY</strong> : formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="font-display">ESTIMATED TOTAL</span>
                  <span className="text-white font-tech">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Instant Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full btn btn-primary py-3 sm:py-3.5 flex items-center justify-center gap-2 font-tech font-medium text-xs"
              >
                <span>PROCEED TO ENCRYPTED CHECKOUT</span>
                <ArrowRight size={15} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-tech text-[#727785]">
                <ShieldCheck size={12} className="text-[#9eb8a8]" />
                <span>NFC SOULBOUND TOKEN ISSUED ON PURCHASE</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
