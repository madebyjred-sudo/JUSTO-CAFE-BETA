import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
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

  return (
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

          {/* Mobile Menu Trigger - Custom Animated Burger */}
          <button
            className={`md:hidden group flex flex-col items-end gap-[5px] p-2 mr-4 cursor-pointer focus:outline-none ${finalTextColor}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="block w-6 h-[2px] bg-current rounded-full transition-all duration-300 ease-out group-hover:w-4"></span>
            <span className="block w-4 h-[2px] bg-current rounded-full transition-all duration-300 ease-out group-hover:w-6"></span>
            <span className="block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ease-out group-hover:w-3"></span>
          </button>

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
              className="h-16 md:h-20 w-auto"
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

      {/* Mobile Menu Drawer - Slide-In Effect */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] flex justify-end md:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
      >
        {/* Backdrop with Fade */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Content with Slide */}
        <div className={`
            relative w-[85%] max-w-sm h-full bg-justo-dark text-justo-cream shadow-2xl flex flex-col p-8
            transform transition-transform duration-500 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex justify-between items-center mb-16">
            <img
              src="/images/Logo.png"
              alt="Justo Café"
              className="h-16 w-auto"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-justo-cream hover:text-justo-beige focus:outline-none focus-visible:ring-2 focus-visible:ring-justo-beige rounded-full p-1"
              aria-label="Cerrar menú"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <nav className="flex flex-col space-y-8 pl-4 border-l border-justo-cream/10">
            <button onClick={() => handleNavClick('shop')} className="text-left font-body text-3xl uppercase tracking-widest hover:text-justo-beige transition-colors focus:outline-none">
              Tienda
            </button>
            <button onClick={() => handleNavClick('subscription')} className="text-left font-body text-3xl uppercase tracking-widest hover:text-justo-beige transition-colors focus:outline-none">
              Suscripción
            </button>
            <button onClick={() => handleNavClick('origin')} className="text-left font-body text-3xl uppercase tracking-widest hover:text-justo-beige transition-colors focus:outline-none">
              Nuestro Origen
            </button>
            <button onClick={() => handleNavClick('methods')} className="text-left font-body text-3xl uppercase tracking-widest hover:text-justo-beige transition-colors focus:outline-none">
              Métodos
            </button>
          </nav>

          <div className="mt-auto pt-8 border-t border-justo-cream/10">
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-body uppercase tracking-widest text-justo-cream/60 hover:text-justo-cream transition-colors block mb-4">
              Iniciar Sesión
            </a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-body uppercase tracking-widest text-justo-cream/60 hover:text-justo-cream transition-colors block">
              Ayuda & Contacto
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};