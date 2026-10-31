import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ShoeCard } from './components/ShoeCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { LookbookSection } from './components/LookbookSection';
import { TechSpecsBento } from './components/TechSpecsBento';
import { SearchModal, WishlistModal, CheckoutSuccessModal } from './components/Modals';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/footwearData';
import { sounds } from './utils/soundEffects';

const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 154.5
};

export function App() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('hype');

  // Filter chips
  const [filterUnder250, setFilterUnder250] = useState(false);
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterGrailsOnly, setFilterGrailsOnly] = useState(false);

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [checkoutOrderData, setCheckoutOrderData] = useState(null);

  // Currency & Sound
  const [currency, setCurrency] = useState('USD');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Cart & Wishlist state with initial default items for high-engagement demo
  const [cartItems, setCartItems] = useState([
    {
      ...PRODUCTS[0],
      selectedSize: 10,
      selectedColor: PRODUCTS[0].colorways[0].name,
      selectedImage: PRODUCTS[0].images[0],
      quantity: 1
    }
  ]);

  const [wishlist, setWishlist] = useState([PRODUCTS[1], PRODUCTS[2]]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sound toggle handler
  const handleToggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
    showToast(newState ? "🔊 Tactile Sound Enabled" : "🔇 Sound Muted");
  };

  // Keyboard shortcut ⌘K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(q);
        const matchesTag = product.tag.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesTag && !matchesDesc) {
          return false;
        }
      }
      // Quick chip filters
      if (filterUnder250 && product.price > 250) {
        return false;
      }
      if (filterInStock && !product.inStock) {
        return false;
      }
      if (filterGrailsOnly && !product.isGrail) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'hype') return b.hypeMeter - a.hypeMeter;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy, filterUnder250, filterInStock, filterGrailsOnly]);

  // Cart operations
  const handleAddToCart = (productToAdd) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item =>
        item.id === productToAdd.id &&
        item.selectedSize === productToAdd.selectedSize &&
        item.selectedColor === productToAdd.selectedColor
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += (productToAdd.quantity || 1);
        return updated;
      } else {
        return [...prev, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
      }
    });
    showToast(`Added ${productToAdd.name} (US ${productToAdd.selectedSize}) to bag`);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    showToast("Item removed from bag");
  };

  // Wishlist operations
  const handleToggleWishlist = (product) => {
    const isSaved = wishlist.some(item => item.id === product.id);
    if (isSaved) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed from saved grails`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Bookmarked ${product.name} to vault`);
    }
  };

  const handleCheckoutSuccess = (orderData) => {
    setCheckoutOrderData(orderData);
    setIsCartOpen(false);
    setCartItems([]);
  };

  const handleSelectProductById = (id) => {
    const found = PRODUCTS.find(p => p.id === id);
    if (found) {
      setSelectedProduct(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090b] text-[#f4f4f2]">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[rgba(18,20,26,0.92)] border border-[rgba(255,255,255,0.14)] text-white px-4 py-2.5 rounded-full font-tech text-xs shadow-2xl backdrop-blur-xl flex items-center gap-2.5 max-w-[calc(100vw-2rem)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9eb8a8] flex-shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Navbar with Marquee, Branding, Sound toggle, Wishlist & Cart */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        currency={currency}
        onCurrencyChange={setCurrency}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Hero Section featuring Drop 004 & Campaign Photography */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onQuickViewHero={(id) => handleSelectProductById(id)}
      />

      {/* Main Footwear Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">

        {/* Category Selector Tabs & Filter Controls */}
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterUnder250={filterUnder250}
          onToggleUnder250={() => setFilterUnder250(!filterUnder250)}
          filterInStock={filterInStock}
          onToggleInStock={() => setFilterInStock(!filterInStock)}
          filterGrailsOnly={filterGrailsOnly}
          onToggleGrailsOnly={() => setFilterGrailsOnly(!filterGrailsOnly)}
          totalResults={filteredProducts.length}
        />

        {/* Shoes Grid */}
        <div className="py-6 sm:py-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 sm:p-8">
              <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2">NO SILHOUETTES MATCH YOUR CRITERIA</h3>
              <p className="font-body text-xs text-[#8c94a6] max-w-sm mx-auto mb-6">
                Try clearing your search query or reset active filters to explore the full Asterio archive.
              </p>
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory('all');
                  setSearchQuery('');
                  setFilterUnder250(false);
                  setFilterInStock(false);
                  setFilterGrailsOnly(false);
                }}
                className="btn btn-primary text-xs py-2 px-5 font-tech font-bold"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ShoeCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  currencyRates={CURRENCY_RATES}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                  isWishlisted={wishlist.some(item => item.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}
        </div>

      </main>

      {/* Community Fit Check / Lookbook Section */}
      <LookbookSection
        onSelectProductById={handleSelectProductById}
      />

      {/* Technical Innovations Bento Grid */}
      <TechSpecsBento
        onExploreTechClick={() => {
          showToast("Loading Asterio Material Archive...");
          setSelectedProduct(PRODUCTS[1]); // Opens Astrum Terra-X with Vibram & Cordura
        }}
      />

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        currency={currency}
        currencyRates={CURRENCY_RATES}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Detailed Product Quick View / Inspection Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          currency={currency}
          currencyRates={CURRENCY_RATES}
          isWishlisted={wishlist.some(item => item.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allProducts={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        currency={currency}
        currencyRates={CURRENCY_RATES}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(i => i.id !== id))}
        onAddToCart={handleAddToCart}
        currency={currency}
        currencyRates={CURRENCY_RATES}
      />

      {/* Order Confirmed Celebratory Modal */}
      <CheckoutSuccessModal
        orderData={checkoutOrderData}
        onClose={() => setCheckoutOrderData(null)}
      />

    </div>
  );
}

export default App;
