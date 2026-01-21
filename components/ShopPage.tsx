import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product, ProductVariant } from '../types';
import { Subscription } from './Subscription';
import { formatCurrency } from '../services/cartService';
import { RevealOnScroll } from './RevealOnScroll';

interface ShopPageProps {
    onAddToCart: (product: Product, variant?: ProductVariant) => void;
}

// Sub-component to handle individual card state (selected weight)
const ShopProductCard: React.FC<{ product: Product, onAddToCart: (p: Product, v?: ProductVariant) => void }> = ({ product, onAddToCart }) => {
    // Default to the first variant if available, else null
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
        product.variants ? product.variants[0] : undefined
    );

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;
    const currentWeight = selectedVariant ? selectedVariant.weight : product.weight;

    return (
        <RevealOnScroll>
            <div className="w-full bg-justo-dark/10 backdrop-blur-md border border-justo-dark/10 rounded-[1.5rem] overflow-hidden flex flex-col lg:flex-row shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group">

                {/* 1. PRODUCT PHOTO */}
                <div className="w-full lg:w-[40%] bg-[#EBE5D9] relative h-64 lg:h-auto min-h-[300px]">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-100 hover:scale-105 transition-transform duration-700"
                    />

                    {/* Hover Image (Bag Effect) */}
                    {product.hoverImage && (
                        <>
                            {/* Glass Overlay */}
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />

                            {/* Bag with Glow */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 scale-100 group-hover:scale-105">
                                <img
                                    src={product.hoverImage}
                                    alt={`${product.name} Bag`}
                                    className="w-[90%] h-[90%] object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* 2. INFO & ACTIONS WRAPPER */}
                <div className="flex-1 flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-10">

                    {/* MIDDLE COLUMN: Info */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            {/* Text */}
                            <h2 className="font-body font-bold text-4xl md:text-5xl text-justo-dark uppercase leading-[0.9] tracking-tight mb-3 break-words">
                                {product.name}
                            </h2>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.isKit ? (
                                    <>
                                        <span className="px-2 py-1 border border-justo-dark/20 text-justo-dark text-[10px] font-body uppercase font-bold tracking-wider rounded-sm">
                                            Doble Experiencia
                                        </span>
                                        <span className="px-2 py-1 bg-justo-dark/10 text-justo-dark text-[10px] font-body uppercase font-bold tracking-wider rounded-sm">
                                            Más Vendido
                                        </span>
                                    </>
                                ) : (
                                    <span className="px-2 py-1 border border-justo-dark/20 text-justo-dark text-[10px] font-body uppercase font-bold tracking-wider rounded-sm">
                                        {product.roastLevel}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="font-sans text-justo-dark/70 text-base leading-relaxed mb-4 max-w-md font-light">
                                {product.description || `Un perfil excepcional con notas a ${product.tastingNotes.join(', ').toLowerCase()}. Ideal para métodos de filtrado.`}
                            </p>
                        </div>

                        <div className="mt-2">
                            <span className="font-body font-bold text-3xl md:text-4xl text-justo-dark">
                                {formatCurrency(currentPrice)}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Controls */}
                    <div className="w-full md:w-[300px] flex flex-col gap-4 pt-1">

                        {/* Molienda Selector (Visual Only) */}
                        <div>
                            <label className="text-[10px] font-body font-bold text-justo-dark/60 uppercase tracking-wider mb-1 block">
                                Molienda
                            </label>
                            <div
                                className="w-full p-2.5 border border-justo-dark/20 bg-justo-dark/5 rounded-lg text-justo-dark flex justify-between items-center cursor-pointer hover:border-justo-dark/40 transition-colors focus:outline-none focus:ring-2 focus:ring-justo-brown"
                                role="button"
                                tabIndex={0}
                                aria-haspopup="listbox"
                                aria-expanded="false"
                                aria-label="Seleccionar molienda (Solo Grano Entero disponible)"
                            >
                                <span className="font-body text-base">Whole Bean</span>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-70" aria-hidden="true">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Weight / Variant Selector */}
                        {product.variants && product.variants.length > 0 && (
                            <div>
                                <label className="text-[10px] font-body font-bold text-justo-dark/60 uppercase tracking-wider mb-1 block">
                                    Peso
                                </label>
                                <div className="flex p-1 bg-justo-dark/5 rounded-lg border border-justo-dark/10" role="radiogroup" aria-label="Seleccionar peso">
                                    {product.variants.map((v) => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariant(v)}
                                            role="radio"
                                            aria-checked={selectedVariant?.id === v.id}
                                            className={`flex-1 py-2 text-xs font-bold font-body uppercase tracking-wider rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-justo-brown ${selectedVariant?.id === v.id
                                                ? 'bg-white text-justo-dark shadow-sm'
                                                : 'text-justo-dark/50 hover:text-justo-dark'
                                                }`}
                                        >
                                            {v.weight}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Bottom Row: Static Size (if no variants) & Add Button */}
                        <div>
                            <div className="flex gap-3 h-12">
                                {/* Static Size Box if no variants */}
                                {!product.variants && (
                                    <div className="w-20 border border-justo-dark/20 rounded-lg flex items-center justify-center text-justo-dark font-body text-lg font-bold">
                                        {product.weight.replace(/[^0-9g]/gi, '')}
                                    </div>
                                )}

                                {/* Add Button */}
                                <button
                                    onClick={() => onAddToCart(product, selectedVariant)}
                                    className="flex-1 bg-justo-dark text-justo-cream rounded-lg font-body font-bold text-xl uppercase tracking-[0.15em] hover:bg-justo-brown transition-colors flex items-center justify-center shadow-lg relative overflow-hidden group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-justo-brown"
                                    aria-label={`Añadir ${product.name} al carrito`}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10">Añadir</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </RevealOnScroll>
    );
};

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart }) => {
    return (
        <div className="min-h-screen bg-transparent pt-32 pb-20 relative z-10">

            {/* Header */}
            <RevealOnScroll>
                <div className="w-full px-8 md:px-24 mb-10">
                    <h1 className="font-heading text-6xl text-justo-dark mb-2">Todos los Cafés</h1>
                    <p className="font-sans text-xl text-justo-dark/60 max-w-2xl font-light">
                        Selección de origen único y blends de especialidad.
                    </p>
                </div>
            </RevealOnScroll>

            {/* Product List */}
            <div className="w-full px-8 md:px-24 mb-24">
                <div className="flex flex-col gap-6">
                    {PRODUCTS.map((product) => (
                        <ShopProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                    ))}
                </div>
            </div>

            {/* Subscription Footer - Dark Variant */}
            <Subscription isOverlay={false} variant="dark" />
        </div>
    );
};