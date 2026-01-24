import React, { useState, useEffect } from 'react';
import { ShoppingBag, Home, Store, Repeat, MapPin, Coffee } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (view: ViewState) => void;
  variant?: 'home' | 'shop' | 'subscription' | 'origin' | 'methods';
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  onNavigate,
  variant = 'home'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logic for "Negative" header
  // Origin page has a dark video hero, so it starts light text (dark theme) until scrolled
  // Methods page now also has dark video, so it should start with light text
  const shouldUseDarkText = (variant === 'shop' || variant === 'subscription') && !isScrolled;

  const textColorClass = shouldUseDarkText ? 'text-justo-dark' : 'text-justo-cream';
  const hoverColorClass = shouldUseDarkText ? 'hover:text-justo-brown' : 'hover:text-justo-beige';

  // Override for scrolled state
  const finalTextColor = isScrolled ? 'text-justo-cream' : textColorClass;
  const finalHoverColor = isScrolled ? 'hover:text-justo-beige' : hoverColorClass;

  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'shop', icon: Store, label: 'Tienda' },
    { id: 'subscription', icon: Repeat, label: 'Suscripción' },
    { id: 'origin', icon: MapPin, label: 'Origen' },
    { id: 'methods', icon: Coffee, label: 'Métodos' },
  ];

  return (
    <>
      <header
        className={`fixed w-full ${variant === 'home' && !isScrolled ? 'top-[42px]' : 'top-0'} z-50 transition-all duration-300 ${isScrolled
          ? 'bg-justo-dark/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
          }`}
      >
        {/* Container */}
        <div className="w-full px-8 md:px-24 flex justify-between items-center">

          {/* LEFT SIDE: Logo + Navigation */}
          <div className="flex items-center gap-12">

            {/* Logo */}
            <div
              onClick={() => handleNavClick('home')}
              className="cursor-pointer transition-opacity hover:opacity-80"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavClick('home'); }}
              aria-label="Justo Café - Volver al inicio"
            >
              <img
                src={!isScrolled && shouldUseDarkText ? "/images/LOGO negro.png" : "/images/Logo.png"}
                alt="Justo Café"
                className="h-16 md:h-28 w-auto transition-all duration-300"
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 pt-1" role="navigation" aria-label="Menú principal">
              <button
                onClick={() => handleNavClick('shop')}
                className={`font-body uppercase tracking-widest text-sm transition-colors font-bold bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 rounded-sm ${finalTextColor} ${finalHoverColor}`}
              >
                Tienda
              </button>
              <button
                onClick={() => handleNavClick('subscription')}
                className={`font-body uppercase tracking-widest text-sm transition-colors font-bold bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 rounded-sm ${finalTextColor} ${finalHoverColor}`}
              >
                Suscripción
              </button>
              <button
                onClick={() => handleNavClick('origin')}
                className={`font-body uppercase tracking-widest text-sm transition-colors font-bold bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 rounded-sm ${finalTextColor} ${finalHoverColor}`}
              >
                Nuestro Origen
              </button>
              <button
                onClick={() => handleNavClick('methods')}
                className={`font-body uppercase tracking-widest text-sm transition-colors font-bold bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 rounded-sm ${finalTextColor} ${finalHoverColor}`}
              >
                Métodos
              </button>
            </nav>
          </div>

          {/* RIGHT SIDE: Icons */}
          <div className="flex items-center space-x-4">
            <button
              className={`relative transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full p-1 ${finalTextColor} ${finalHoverColor}`}
              onClick={onCartClick}
              aria-label={`Carrito de compras, ${cartCount} productos`}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-justo-beige text-justo-dark text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Island */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] md:hidden w-auto max-w-[95vw]">
        <div className="flex items-center gap-1 bg-justo-dark/90 backdrop-blur-xl border border-justo-cream/10 rounded-full px-4 py-3 shadow-2xl">
           {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = variant === item.id;
             return (
               <button
                 key={item.id}
                 onClick={() => handleNavClick(item.id as ViewState)}
                 className={`
                   relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                   ${isActive ? 'bg-justo-cream/10 text-justo-beige' : 'text-justo-cream/60 hover:text-justo-cream'}
                 `}
                 aria-label={item.label}
               >
                 <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                 {isActive && (
                    <span className="absolute -bottom-1 w-1 h-1 bg-justo-beige rounded-full animate-fade-in"></span>
                 )}
               </button>
             );
           })}
        </div>
      </div>
    </>
  );
};
