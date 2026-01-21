import React, { useEffect, useState, useRef } from 'react';
import { X, Check } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { Button } from './Button';
import { formatCurrency } from '../services/cartService';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // State for selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants ? product.variants[0] : undefined
  );

  // Reset variant when product changes (if modal reuses component instance)
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants ? product.variants[0] : undefined);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the modal for accessibility
      setTimeout(() => modalRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  if (!isOpen) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentWeight = selectedVariant ? selectedVariant.weight : product.weight;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-justo-dark/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={`
          relative w-full max-w-5xl bg-[#F5F1E8] rounded-golden-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]
          transform transition-all duration-300 ease-out outline-none
          ${isClosing ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}
        `}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-justo-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-justo-brown"
          aria-label="Cerrar ventana"
        >
          <X size={24} />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto md:min-h-[500px] bg-[#EBE5D9] relative overflow-hidden group">
          <img
            src={product.image}
            alt={`Foto de ${product.name}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-135 group-hover:scale-150"
          />

          {/* Hover Image (Bag Effect) */}
          {product.hoverImage && (
            <>
              {/* Glassmorphism Layer */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />

              {/* Bag Image with Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                <img
                  src={product.hoverImage}
                  alt={`${product.name} Bag`}
                  className="w-[70%] h-[70%] object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-100 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </>
          )}
          {/* Badge Overlay */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-30" aria-hidden="true">
            {product.isKit ? (
              <span className="px-3 py-1 bg-justo-dark text-justo-cream text-xs font-body uppercase font-bold tracking-wider rounded-sm shadow-md">
                Kit Especial
              </span>
            ) : (
              <span className="px-3 py-1 bg-justo-brown text-white text-xs font-body uppercase font-bold tracking-wider rounded-sm shadow-md">
                {product.roastLevel} Roast
              </span>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
          <div className="mb-auto">
            <h2 id="modal-product-title" className="font-heading text-5xl md:text-6xl text-justo-dark mb-2 leading-none">
              {product.name}
            </h2>
            <p className="font-body text-justo-brown text-2xl font-bold mb-6 transition-all duration-300">
              {formatCurrency(currentPrice)}
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-body text-xs font-bold uppercase tracking-widest text-justo-dark/50 mb-2">Descripción</h3>
                <p className="font-sans text-justo-dark/80 leading-relaxed font-light text-lg">
                  {product.description || `Café de especialidad con un perfil de taza excepcional. Cultivado con prácticas sostenibles y tostado artesanalmente para resaltar sus notas de ${product.tastingNotes.join(', ').toLowerCase()}.`}
                </p>
              </div>

              <div>
                <h3 className="font-body text-xs font-bold uppercase tracking-widest text-justo-dark/50 mb-3">Notas de Cata</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tastingNotes.map((note, idx) => (
                    <span key={idx} className="px-3 py-1 border border-justo-dark/20 rounded-full text-justo-dark text-sm font-sans">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {!product.isKit && (
                <div className="flex flex-col gap-4 border-t border-justo-dark/10 pt-6 mt-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-justo-dark/50 mb-1">Molienda</span>
                      <span className="font-body text-lg text-justo-dark">Grano Entero</span>
                    </div>

                    {/* Variant Selector */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="flex-1">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-justo-dark/50 mb-1">Presentación</span>
                        <div className="flex gap-2" role="radiogroup" aria-label="Seleccionar presentación">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariant(v)}
                              role="radio"
                              aria-checked={selectedVariant?.id === v.id}
                              className={`px-3 py-1 border rounded-md text-sm font-body font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-justo-brown ${selectedVariant?.id === v.id
                                ? 'bg-justo-dark text-white border-justo-dark'
                                : 'text-justo-dark border-justo-dark/20 hover:border-justo-dark'
                                }`}
                            >
                              {v.weight}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Fallback Presentation Display */}
                    {(!product.variants || product.variants.length === 0) && (
                      <div className="flex-1">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-justo-dark/50 mb-1">Presentación</span>
                        <span className="font-body text-lg text-justo-dark">{product.weight}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-justo-dark/10">
            <Button
              fullWidth
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2"
              aria-label={`Agregar ${product.name} al carrito, precio ${formatCurrency(currentPrice)}`}
            >
              {showSuccess ? (
                <>
                  <Check size={20} aria-hidden="true" /> Agregado
                </>
              ) : (
                `Agregar ${currentWeight} • ${formatCurrency(currentPrice)}`
              )}
            </Button>
            <p className="text-center text-xs text-justo-dark/40 mt-3 font-sans">
              Envío calculado al finalizar la compra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};