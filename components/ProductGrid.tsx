import React, { useState } from 'react';
import { Eye, Plus, ArrowRight, Award } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product, ProductVariant } from '../types';
import { formatCurrency } from '../services/cartService';
import { RevealOnScroll } from './RevealOnScroll';
import { ScaChart } from './ScaChart';

interface ProductGridProps {
    onAddToCart: (product: Product, variant?: ProductVariant) => void;
    onQuickView: (product: Product) => void;
    onViewAll?: () => void;
}

// Separate component for individual card state
const GridProductCard: React.FC<{
    product: Product,
    onAddToCart: (p: Product, v?: ProductVariant) => void,
    onQuickView: (p: Product) => void,
    isWide: boolean
}> = ({ product, onAddToCart, onQuickView, isWide }) => {

    // Default to first variant if exists
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
        product.variants ? product.variants[0] : undefined
    );

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;

    return (
        <div
            className={`
            flex-shrink-0 group 
            bg-[#F5F1E8] border border-justo-dark/5
            rounded-[1.5rem] overflow-hidden hover:shadow-[0_20px_40px_rgba(44,36,32,0.1)] transition-all duration-500 hover:-translate-y-2
            flex
            ${isWide
                    ? 'w-[600px] flex-row h-[380px]'
                    : 'w-[280px] flex-col h-[380px]'
                } 
            relative
        `}
        >
            {/* Score Badge - Outside image to avoid clipping if tooltip expands */}
            {product.scaScore && product.scaAttributes && (
                <div className="absolute top-4 right-4 z-40 group/score flex flex-col items-center gap-0.5">
                    <div className="bg-justo-brown text-white w-9 h-9 flex items-center justify-center rounded-full shadow-lg cursor-help transition-transform hover:scale-110 ring-2 ring-white/20">
                        <span className="font-bold text-[10px] font-body">{product.scaScore}</span>
                    </div>
                    <span className="text-[8px] font-bold text-justo-brown uppercase tracking-widest bg-white/40 backdrop-blur-[2px] px-1.5 rounded-sm shadow-sm">SCA</span>

                    {/* Tooltip */}
                    <div className="absolute top-full right-0 mt-2 w-[260px] bg-[#FDFBF7] p-3 rounded-xl shadow-xl border border-justo-brown/20 opacity-0 invisible group-hover/score:opacity-100 group-hover/score:visible transition-all duration-300 origin-top-right z-50 pointer-events-none">
                        <div className="flex items-center gap-2 mb-2 border-b border-justo-dark/5 pb-2">
                            <Award size={14} className="text-justo-brown" />
                            <span className="text-[10px] font-bold uppercase text-justo-dark tracking-widest">Perfil de Taza</span>
                        </div>
                        <div className="w-full aspect-square">
                            <ScaChart attributes={product.scaAttributes} size={240} />
                        </div>
                    </div>
                </div>
            )}

            {/* Image Section */}
            <button
                type="button"
                className={`
            relative overflow-hidden cursor-pointer bg-[#EBE5D9] text-left p-0 border-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-justo-brown/50 z-10
            ${isWide ? 'w-1/2 h-full' : 'w-full h-[280px]'}
            `}
                onClick={() => onQuickView(product)}
                aria-label={`Ver detalles de ${product.name}`}
            >
                {product.isKit && product.kitImages ? (
                    <div className="w-full h-full flex items-center justify-center gap-2 px-4">
                        <img
                            src={product.kitImages[0]}
                            alt="Bolsa negra"
                            className="w-[45%] h-[80%] object-contain drop-shadow-[6px_4px_20px_rgba(44,36,32,0.25)]"
                        />
                        <img
                            src={product.kitImages[1]}
                            alt="Bolsa blanca"
                            className="w-[45%] h-[80%] object-contain drop-shadow-[6px_4px_20px_rgba(44,36,32,0.25)]"
                        />
                    </div>
                ) : (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-[90%] h-[90%] object-contain mx-auto my-auto drop-shadow-[6px_4px_20px_rgba(44,36,32,0.25)]"
                    />
                )}


                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-30">
                    {product.isKit ? (
                        <span className="bg-justo-dark text-justo-cream border border-justo-dark/20 text-[9px] font-body font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-sm">
                            Kit
                        </span>
                    ) : (
                        <span className="bg-[#F5F1E8] text-justo-dark border border-justo-dark/10 text-[9px] font-body font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-sm">
                            {product.roastLevel}
                        </span>
                    )}
                </div>

                {/* Mini Weight Selector (Overlay bottom right if variants exist) */}
                {!isWide && product.variants && (
                    <div
                        className="absolute bottom-3 right-3 flex bg-white/95 backdrop-blur rounded-lg p-1 gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg z-30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {product.variants.map((v) => (
                            <span
                                key={v.id}
                                onClick={() => setSelectedVariant(v)}
                                className={`px-2 py-1 text-[9px] font-bold font-body uppercase rounded-md transition-colors cursor-pointer ${selectedVariant?.id === v.id
                                    ? 'bg-justo-dark text-white'
                                    : 'text-justo-dark hover:bg-justo-dark/10'
                                    }`}
                            >
                                {v.weight}
                            </span>
                        ))}
                    </div>
                )}
            </button>

            {/* Info Section */}
            <div
                className={`
            flex flex-col bg-[#F5F1E8]
            ${isWide ? 'w-1/2 p-8 justify-center border-l border-justo-dark/5' : 'w-full p-5 justify-center border-t border-justo-dark/5'}
            `}
            >
                <div className="w-full">
                    <div className={`flex ${isWide ? 'flex-col gap-2 mb-4' : 'justify-between items-center w-full'}`}>
                        {/* Title */}
                        <h3 className={`font-body font-bold text-justo-dark uppercase leading-none tracking-tight pb-1 group-hover:text-justo-brown transition-colors duration-300 ${isWide ? 'text-4xl' : 'text-2xl truncate flex-1 pr-4'}`}>
                            {product.name}
                        </h3>
                        {/* Price */}
                        <span className={`font-body font-bold text-justo-dark ${isWide ? 'text-3xl' : 'text-xl whitespace-nowrap'}`}>
                            {formatCurrency(currentPrice)}
                        </span>
                    </div>

                    {/* Description (Wide Only) */}
                    {isWide && (
                        <p className="font-sans font-light text-justo-dark/70 text-base leading-relaxed">
                            {product.description}
                        </p>
                    )}

                    {/* Action Buttons - Moved here for better visibility */}
                    {!isWide && (
                        <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden group-hover:overflow-visible">
                            <div
                                onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                                className="bg-white border border-justo-dark/10 text-justo-dark w-10 h-10 flex items-center justify-center rounded-full hover:bg-justo-dark hover:text-white transition-all duration-300 shadow-sm cursor-pointer hover:scale-105"
                                title="Vista Rápida"
                            >
                                <Eye size={18} strokeWidth={1.5} />
                            </div>
                            <div
                                onClick={(e) => { e.stopPropagation(); onAddToCart(product, selectedVariant); }}
                                className="bg-justo-brown text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-justo-dark transition-all duration-300 shadow-sm cursor-pointer hover:scale-105"
                                title="Agregar al Carrito"
                            >
                                <Plus size={18} strokeWidth={1.5} />
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-justo-dark/40 self-center ml-auto">
                                Vista Rápida
                            </span>
                        </div>
                    )}

                    {/* Wide Card Selector */}
                    {isWide && product.variants && (
                        <div className="mt-4 flex gap-2" role="radiogroup" aria-label="Seleccionar peso">
                            {product.variants.map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => setSelectedVariant(v)}
                                    aria-checked={selectedVariant?.id === v.id}
                                    role="radio"
                                    className={`px-3 py-1 text-xs font-bold font-body uppercase rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-justo-brown ${selectedVariant?.id === v.id
                                        ? 'bg-justo-dark text-white border-justo-dark'
                                        : 'text-justo-dark border-justo-dark/20 hover:border-justo-dark'
                                        }`}
                                >
                                    {v.weight}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Extra Footer (Wide Only) */}
                {isWide && !product.variants && (
                    <div className="mt-6 pt-6 border-t border-justo-dark/10 flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-justo-brown">
                            Incluye envío gratis
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart, onQuickView, onViewAll }) => {
    const carouselItems = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

    return (
        <section id="shop" className="relative z-30 pt-12 pb-24 bg-[#F5F1E8]">

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0"></div>

            <RevealOnScroll>
                <div className="w-full px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end relative z-10">
                    <div>
                        <h2 className="font-heading text-5xl md:text-6xl text-justo-dark mb-2">Favoritos de la Casa</h2>
                        <p className="font-body text-justo-brown uppercase tracking-widest text-sm font-bold">
                            Selección semanal de temporada
                        </p>
                    </div>

                    {/* Right side controls */}
                    <div className="hidden md:flex flex-col items-end gap-1">
                        <button
                            onClick={onViewAll}
                            className="group relative px-6 py-3 overflow-hidden rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-justo-brown bg-white border border-justo-dark/5 hover:border-justo-dark shadow-sm hover:shadow-md"
                            aria-label="Ver todos los productos"
                        >
                            <span className="relative flex items-center gap-2 font-body font-bold text-sm text-justo-dark uppercase tracking-widest z-10">
                                Ver todos los productos
                                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                            </span>
                        </button>
                    </div>
                </div>
            </RevealOnScroll>

            {/* Marquee Container */}
            <RevealOnScroll delay={200}>
                <div className="relative w-full z-10 overflow-hidden" aria-label="Carrusel de productos destacados">

                    {/* Gradient Masks (Decorative) */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F5F1E8] to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#F5F1E8] to-transparent z-10 pointer-events-none" aria-hidden="true"></div>

                    {/* Moving Track */}
                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-8 pl-8 focus-within:[animation-play-state:paused] py-4">
                        {carouselItems.map((product, index) => (
                            <GridProductCard
                                key={`${product.id}-${index}`}
                                product={product}
                                isWide={!!product.isKit}
                                onAddToCart={onAddToCart}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
};