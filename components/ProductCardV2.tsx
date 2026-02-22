import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { formatCurrency } from '../services/cartService';
import { RevealOnScroll } from './RevealOnScroll';
import { ScaChart } from './ScaChart';
import {
    Package, Gift, Star, Flame, Droplet, Bean, Leaf, Sun, Flower, Sparkles, 
    Minus, Plus, ShoppingCart, Award
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

export const ProductCardV2: React.FC<{ 
    product: Product, 
    onAddToCart: (p: Product, v?: ProductVariant) => void, 
    onQuickView: (p: Product) => void 
}> = ({ product, onAddToCart, onQuickView }) => {
    const [quantity, setQuantity] = useState(1);
    const [activeFeature, setActiveFeature] = useState<number | null>(null);
    const [showScaTooltip, setShowScaTooltip] = useState(false);
    
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
        product.variants ? product.variants[0] : undefined
    );
    const [isExpanded, setIsExpanded] = useState(false);

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;
    const currentWeight = selectedVariant ? selectedVariant.weight : product.weight;

    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        setQuantity(q => q + 1);
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        setQuantity(q => Math.max(1, q - 1));
    };

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        for(let i=0; i<quantity; i++) {
            onAddToCart(product, selectedVariant);
        }
    };

    const toggleFeature = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setActiveFeature(activeFeature === index ? null : index);
    };

    const toggleSca = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowScaTooltip(!showScaTooltip);
    };

    return (
        <RevealOnScroll>
            <div 
                className={`relative bg-[#F4F4F4] rounded-[2.5rem] p-6 pb-0 overflow-visible shadow-sm transition-all duration-500 ${isExpanded ? '' : 'group'}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                
                {/* Top Section: Features & Image */}
                <div className="relative h-[320px] w-full">
                    
                    {/* Floating Features (Left) */}
                    {product.features && (
                        <div className="absolute left-0 top-4 flex flex-col gap-5 z-20">
                            {product.features.map((feature, idx) => {
                                const Icon = iconMap[feature.icon] || Star;
                                const isActive = activeFeature === idx;
                                
                                return (
                                    <div 
                                        key={idx} 
                                        className="flex flex-col items-center gap-1 cursor-pointer"
                                        onClick={(e) => toggleFeature(e, idx)}
                                    >
                                        <div className={`
                                            w-14 h-14 rounded-[1.2rem] shadow-sm flex items-center justify-center transition-colors duration-300
                                            ${isActive ? 'bg-justo-brown text-white' : 'bg-white text-justo-dark/80'}
                                        `}>
                                            <Icon size={22} strokeWidth={1.5} />
                                        </div>
                                        
                                        {/* Label - Visible on Desktop or when Active on Mobile */}
                                        <div className={`
                                            transition-all duration-300 overflow-hidden
                                            ${isActive ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0 md:max-h-10 md:opacity-100'}
                                        `}>
                                            <span className="text-[10px] font-bold text-justo-dark/60 bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded-full whitespace-nowrap block">
                                                {feature.text}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Image Area */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        {product.isKit && product.kitImages ? (
                            <div className="w-full h-full relative">
                                {/* Left Bag */}
                                <img 
                                    src={product.kitImages[0]} 
                                    alt="Kit Bag 1"
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] object-contain drop-shadow-xl -rotate-6 ${isExpanded ? '' : 'transition-transform duration-500 group-hover:-rotate-12'}`}
                                />
                                {/* Right Bag */}
                                <img 
                                    src={product.kitImages[1]} 
                                    alt="Kit Bag 2"
                                    className={`absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] object-contain drop-shadow-xl rotate-6 ${isExpanded ? '' : 'transition-transform duration-500 group-hover:rotate-12'}`}
                                />
                            </div>
                        ) : (
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className={`w-[85%] h-[85%] object-contain drop-shadow-2xl ${isExpanded ? '' : 'transition-transform duration-500 group-hover:scale-105'}`}
                            />
                        )}
                    </div>

                    {/* Variant Badge (Top Right) */}
                    {product.scaScore && (
                        <div className="absolute top-0 right-0 z-30">
                             <div 
                                onClick={toggleSca}
                                className="w-12 h-12 bg-[#8B7355] rounded-full flex items-center justify-center text-white font-bold font-body shadow-lg cursor-pointer hover:scale-110 transition-transform relative"
                             >
                                {product.scaScore}
                                
                                {/* SCA Tooltip */}
                                <div className={`
                                    absolute top-full right-0 mt-2 w-[260px] bg-[#FDFBF7] p-3 rounded-xl shadow-xl border border-justo-brown/20 
                                    transition-all duration-300 origin-top-right z-50
                                    ${showScaTooltip ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
                                `} onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center gap-2 mb-2 border-b border-justo-dark/5 pb-2">
                                        <Award size={14} className="text-justo-brown" />
                                        <span className="text-[10px] font-bold uppercase text-justo-dark tracking-widest">Perfil de Taza</span>
                                    </div>
                                    <div className="w-full aspect-square">
                                        {product.scaAttributes && <ScaChart attributes={product.scaAttributes} size={240} />}
                                    </div>
                                </div>
                             </div>
                        </div>
                    )}
                </div>

                {/* Bottom Sheet Card */}
                <div className="bg-white rounded-[2rem] p-6 -mx-6 mb-0 relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-1">
                        <div>
                            <h3 className="font-heading text-3xl text-justo-dark leading-none mb-1">{product.name}</h3>
                            <p className="font-sans text-sm text-justo-dark/60 font-medium">
                                {currentWeight}
                            </p>
                        </div>
                        
                        {/* Rating / Reviews */}
                        <div className="flex flex-col items-end">
                            <div className="flex text-justo-brown gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-justo-dark/40 uppercase tracking-wider mt-1">
                                Excelencia
                            </span>
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between mt-6">
                        
                        {/* Price */}
                        <div className="flex flex-col">
                            <span className="font-sans text-[10px] text-justo-dark/40 font-bold uppercase tracking-wider">Precio</span>
                            <span className="font-body text-2xl font-bold text-justo-dark">
                                {formatCurrency(currentPrice).replace(',00', '')}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center bg-[#F5F5F5] rounded-full px-1 py-1 h-12">
                                <button 
                                    onClick={handleDecrement}
                                    className="w-8 h-full flex items-center justify-center text-justo-dark hover:text-justo-brown transition-colors"
                                >
                                    <Minus size={16} strokeWidth={2.5} />
                                </button>
                                <span className="w-6 text-center font-bold font-body text-lg text-justo-dark select-none">
                                    {quantity}
                                </span>
                                <button 
                                    onClick={handleIncrement}
                                    className="w-8 h-full flex items-center justify-center text-justo-dark hover:text-justo-brown transition-colors"
                                >
                                    <Plus size={16} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Add Button */}
                            <button 
                                onClick={handleAdd}
                                className="bg-justo-brown text-white h-12 px-6 rounded-[1.2rem] font-bold font-body uppercase tracking-wider shadow-lg hover:bg-justo-dark hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                            >
                                <span className="hidden md:inline">Agregar</span>
                                <ShoppingCart size={20} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </RevealOnScroll>
    );
};
