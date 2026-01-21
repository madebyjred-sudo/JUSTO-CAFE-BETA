import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { CartItem } from '../types';
import { Button } from './Button';
import { formatCurrency } from '../services/cartService';
import { createCheckoutAndRedirect } from '../services/shopifyClient';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Focus trap management could go here, but strict "aria-modal" helps screen readers immediately.
  useEffect(() => {
    if (isOpen) {
        // Move focus to sidebar when opened
        sidebarRef.current?.focus();
    }
  }, [isOpen]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await createCheckoutAndRedirect(items);
    setIsCheckingOut(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#F5F1E8] z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col md:rounded-l-golden-xl overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1} // Allow programmatic focus
      >
        
        {/* Header */}
        <div className="p-6 border-b border-justo-dark/10 flex justify-between items-center bg-white">
          <h2 id="cart-title" className="font-heading text-3xl text-justo-dark">Tu Carrito</h2>
          <button 
            onClick={onClose} 
            className="text-justo-dark hover:text-justo-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-justo-brown rounded-full p-1"
            aria-label="Cerrar carrito"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-justo-dark/50">
              <ShoppingBag size={48} className="mb-4 opacity-50" aria-hidden="true" />
              <p className="font-body uppercase tracking-wider">Tu carrito está vacío</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-gray-200 overflow-hidden shrink-0 rounded-golden-md">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-body font-bold text-justo-dark uppercase">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.weight} • {item.roastLevel}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-justo-dark">{formatCurrency(item.price)} x {item.quantity}</span>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-red-900/50 hover:text-red-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-sm"
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-justo-dark/10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body uppercase tracking-wider text-sm">Subtotal</span>
              <span className="font-bold text-xl text-justo-dark">{formatCurrency(subtotal)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6 text-center">Impuestos y envío calculados al finalizar.</p>
            
            <Button 
                fullWidth 
                variant="primary" 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="flex items-center justify-center gap-2"
                aria-busy={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                    <Loader2 className="animate-spin" size={20} aria-hidden="true" />
                    Procesando...
                </>
              ) : (
                'Finalizar Compra en Shopify'
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};