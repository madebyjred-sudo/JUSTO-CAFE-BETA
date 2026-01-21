import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Values } from './components/Values';
import { ProductGrid } from './components/ProductGrid';
import { Origin } from './components/Origin';
import { Subscription } from './components/Subscription';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { ShopPage } from './components/ShopPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { OriginPage } from './components/OriginPage';
import { MethodsPage } from './components/MethodsPage';
import { AmbientBackground } from './components/AmbientBackground';
import { ProductModal } from './components/ProductModal';
import { CoffeeLoader } from './components/CoffeeLoader';
import { AnnouncementBar } from './components/AnnouncementBar';
import { CartItem, Product, ProductVariant, ViewState } from './types';
import { addToCartLogic, removeFromCartLogic } from './services/cartService';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Optimized loading time for better UX (2.4s is the sweet spot between "premium feel" and "waiting")
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product, variant?: ProductVariant) => {
    setCartItems(prev => addToCartLogic(prev, product, variant));
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => removeFromCartLogic(prev, id));
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Home Page Component Composition
  const HomeView = () => (
    <>
      <Hero onNavigate={setCurrentView} />
      <Values />
      <ProductGrid
        onAddToCart={handleAddToCart}
        onQuickView={handleQuickView}
        onViewAll={() => {
          setCurrentView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      <Origin onNavigate={setCurrentView} />
      <Subscription isOverlay={true} onNavigate={setCurrentView} />
    </>
  );

  return (
    <>
      {/* Splash Screen Overlay - ELEGANT VERSION */}
      <div
        className={`
                fixed inset-0 z-[100] bg-[#F5F1E8] flex flex-col items-center justify-center 
                transition-all duration-1000 ease-in-out pointer-events-none 
                ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 scale-105'}
            `}
      >
        {/* Title & Subtitle First */}
        <div className="text-center mb-6">
          <h2 className="font-heading text-5xl md:text-6xl text-justo-dark animate-fade-in-up mb-3">
            Justo Café
          </h2>
          <div className="overflow-hidden">
            <span className="block font-body text-xs uppercase tracking-[0.4em] text-justo-brown animate-fade-in-up">
              Origen Consciente
            </span>
          </div>
        </div>

        {/* Minimalist Dots Loader Below */}
        <div className="animate-fade-in opacity-50">
          <CoffeeLoader />
        </div>
      </div>

      <div className={`min-h-screen flex flex-col bg-[#F5F1E8] relative transition-opacity duration-1000 delay-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Effects */}
        <AmbientBackground />

        {currentView === 'home' && <AnnouncementBar onNavigate={setCurrentView} />}

        <Header
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
          onNavigate={setCurrentView}
          variant={currentView}
        />

        <main className="flex-grow relative z-10">
          {currentView === 'home' && <HomeView />}
          {currentView === 'shop' && <ShopPage onAddToCart={handleAddToCart} />}
          {currentView === 'subscription' && <SubscriptionPage onAddToCart={handleAddToCart} />}
          {currentView === 'origin' && (
            <OriginPage
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
            />
          )}
          {currentView === 'methods' && <MethodsPage onAddToCart={handleAddToCart} onQuickView={handleQuickView} />}
        </main>

        <Footer onNavigate={setCurrentView} currentView={currentView} />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemove={handleRemoveFromCart}
        />

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </>
  );
}

export default App;