import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { formatCurrency } from '../services/cartService';
import { RevealOnScroll } from './RevealOnScroll';
import { ScaChart } from './ScaChart';
import {
    Package,
    Gift,
    Star,
    Flame,
    Droplet,
    Bean,
    Leaf,
    Sun,
    Flower,
    Sparkles,
    Eye,
    Award
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    package: Package,
    gift: Gift,
    star: Star,
    flame: Flame,
    droplet: Droplet,
    bean: Bean,
    leaf: Leaf,
    sun: Sun,
    flower: Flower,
    sparkles: Sparkles
};

export const ShopProductCard: React.FC<{ 
    product: Product, 
    onAddToCart: (p: Product, v?: ProductVariant) => void,
    onQuickView: (p: Product) => void 
}> = ({ product, onAddToCart, onQuickView }) => {
    // Default to the first variant if available, else null
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
        product.variants ? product.variants[0] : undefined
    );

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;

    return (
        <RevealOnScroll>
            <div className="w-full bg-[#F5F1E8] rounded-[1.5rem] overflow-hidden flex flex-col lg:flex-row shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">

                {/* 1. PRODUCT PHOTO */}
                <div 
                    className="w-full lg:w-[40%] bg-[#F5F1E8] relative h-64 lg:h-auto min-h-[300px] flex items-center justify-center cursor-pointer"
                    onClick={() => onQuickView(product)}
                >
                    {/* Score Badge */}
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

                    {/* Quick View Indicator - All devices */}
                    <div className="absolute bottom-3 left-3 z-20">
                         <div className="bg-white/90 text-justo-dark p-2 rounded-full shadow-md backdrop-blur-sm">
                            <Eye size={16} />
                         </div>
                    </div>

                    {product.isKit && product.kitImages ? (
                        <div className="w-full h-full flex items-center justify-center gap-3 px-6">
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
                            className="w-[90%] h-[90%] lg:w-[60%] lg:h-[60%] object-contain drop-shadow-[6px_4px_20px_rgba(44,36,32,0.25)]"
                        />
                    )}
                </div>

                {/* 2. INFO & ACTIONS WRAPPER */}
                <div className="flex-1 flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-10 bg-[#F5F1E8]">

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
                                        <span className="px-2 py-1 bg-justo-dark/20 text-justo-dark text-[10px] font-body uppercase font-bold tracking-wider rounded-sm">
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
                            <p className="font-sans text-justo-dark/90 text-base leading-relaxed mb-6 max-w-md font-light">
                                {product.description || `Un perfil excepcional con notas a ${product.tastingNotes.join(', ').toLowerCase()}. Ideal para métodos de filtrado.`}
                            </p>

                            {/* Features Icons */}
                            {product.features && (
                                <div className="flex flex-wrap gap-6 mb-6">
                                    {product.features.map((feature, index) => {
                                        const Icon = iconMap[feature.icon] || Star;
                                        return (
                                            <div key={index} className="flex items-center gap-2 text-justo-dark/80 group/icon">
                                                <div className="p-1.5 rounded-full bg-justo-dark/5 group-hover/icon:bg-justo-dark/10 transition-colors">
                                                    <Icon size={16} strokeWidth={1.5} />
                                                </div>
                                                <span className="text-xs font-body font-bold uppercase tracking-wider">
                                                    {feature.text}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
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
                            <label className="text-[10px] font-body font-bold text-justo-dark/80 uppercase tracking-wider mb-1 block">
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
                                <label className="text-[10px] font-body font-bold text-justo-dark/80 uppercase tracking-wider mb-1 block">
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
                                                : 'text-justo-dark/80 hover:text-justo-dark'
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
