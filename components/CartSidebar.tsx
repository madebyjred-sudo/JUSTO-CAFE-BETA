import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, ShoppingBag, Loader2, Minus, Plus, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../services/cartService';
import { createCheckoutAndRedirect } from '../services/shopifyClient';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove,
  onUpdateQuantity 
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [promoCode, setPromoCode] = useState('');

  // Focus trap management
  useEffect(() => {
    if (isOpen) {
        sidebarRef.current?.focus();
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => {
        document.body.style.overflow = '';
    };
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
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* SidebarContainer */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-[100dvh] w-full md:w-[450px] bg-[#F9F9F9] z-[70] shadow-2xl flex flex-col transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
      >
        
        {/* Header */}
        <div className="pt-8 pb-4 px-8 flex justify-between items-start bg-[#F9F9F9]">
          <div>
            <button 
                onClick={onClose} 
                className="group flex items-center gap-2 text-justo-dark mb-4 hover:opacity-70 transition-opacity"
            >
                <span className="text-2xl">←</span>
                <span className="font-heading text-2xl font-bold">Cart</span>
            </button>
            <h2 id="cart-title" className="font-heading text-4xl text-justo-dark leading-none">
              My <br />
              <span className="font-light">Cart List</span>
            </h2>
          </div>
          
          <div className="mt-2">
            <img 
              src="/images/LOGO negro.png" 
              alt="Logo" 
              className="w-12 h-12 object-contain opacity-20"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-2 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-justo-dark/50 space-y-4">
              <div className="p-6 bg-white rounded-full shadow-sm">
                <ShoppingBag size={48} className="opacity-30" />
              </div>
              <p className="font-body text-lg">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="text-sm border-b border-justo-dark/30 pb-0.5 hover:border-justo-dark transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6 pb-20">
              {items.map((item, index) => (
                <li 
                    key={item.id} 
                    className="group bg-white p-4 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-4 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-[#F5F1E8] rounded-2xl overflow-hidden shrink-0 relative">
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg text-justo-dark truncate pr-2">{item.name}</h3>
                    <p className="text-sm text-gray-400 font-medium mb-1">{formatCurrency(item.price)}</p>
                    {item.selectedVariant && (
                        <p className="text-xs text-gray-400">{item.selectedVariant.weight} • {item.selectedVariant.roastLevel}</p>
                    )}
                  </div>

                  {/* Vertical Quantity Controls */}
                  <div className="flex flex-col items-center gap-1">
                    <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-6 flex items-center justify-center text-gray-400 hover:text-justo-dark transition-colors"
                        aria-label="Increase quantity"
                    >
                        <Plus size={14} />
                    </button>
                    
                    <div className="w-8 h-8 bg-black text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg">
                        {item.quantity}
                    </div>

                    <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-6 flex items-center justify-center text-gray-400 hover:text-justo-dark transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Area */}
        {items.length > 0 && (
            <div className="bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-8 pb-10 z-20 relative transform translate-y-0 transition-transform duration-300">
                {/* Discount Code */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 p-4 bg-[#F9F9F9] rounded-2xl border border-transparent focus-within:border-black/5 transition-colors">
                        <Tag size={18} className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Do you have any discount code?" 
                            className="bg-transparent w-full text-sm outline-none text-justo-dark placeholder:text-gray-400"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                    </div>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-end mb-8">
                    <span className="font-heading text-xl text-justo-dark">Subtotal</span>
                    <span className="font-heading text-2xl font-bold text-justo-dark">{formatCurrency(subtotal)}</span>
                </div>

                {/* Dotted Line */}
                <div className="w-full border-t border-dashed border-gray-300 mb-8" />
                
                {/* Total */}
                <div className="flex justify-between items-end mb-8">
                    <span className="font-heading text-2xl text-justo-dark">Total</span>
                    <span className="font-heading text-3xl font-bold text-justo-dark">{formatCurrency(subtotal)}</span>
                </div>

                {/* Checkout Button */}
                <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-black text-white py-5 rounded-[1.5rem] font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                    {isCheckingOut ? (
                        <>
                            <Loader2 className="animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <span className="relative z-10">Checkout</span>
                            <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0" />
                        </>
                    )}
                </button>
            </div>
        )}
      </div>
    </>
  );
};
