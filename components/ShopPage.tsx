import React from 'react';
import { PRODUCTS } from '../constants';
import { Product, ProductVariant } from '../types';
import { Subscription } from './Subscription';
import { RevealOnScroll } from './RevealOnScroll';
import { ShopProductCard } from './ShopProductCard';
import { ProductCardV2 } from './ProductCardV2';

interface ShopPageProps {
    onAddToCart: (product: Product, variant?: ProductVariant) => void;
    onQuickView: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart, onQuickView }) => {
    return (
        <div className="min-h-screen bg-transparent pt-24 md:pt-32 pb-20 relative z-10">

            {/* Header */}
            <RevealOnScroll>
                <div className="w-full px-8 md:px-24 mb-10">
                    <h1 className="font-heading text-6xl text-justo-dark mb-2">Todos los Cafés</h1>
                    <p className="font-sans text-xl text-justo-dark/80 max-w-2xl font-light">
                        Selección de origen único y blends de especialidad.
                    </p>
                </div>
            </RevealOnScroll>

            {/* Product List */}
            <div className="w-full px-8 md:px-24 mb-24">
                <div className="flex flex-col gap-6">
                    {PRODUCTS.map((product) => (
                        <div key={product.id}>
                            {/* Mobile: New App-Style Card */}
                            <div className="md:hidden">
                                <ProductCardV2 
                                    product={product} 
                                    onAddToCart={onAddToCart} 
                                    onQuickView={onQuickView}
                                />
                            </div>
                            {/* Desktop: Original Horizontal Card */}
                            <div className="hidden md:block">
                                <ShopProductCard 
                                    product={product} 
                                    onAddToCart={onAddToCart} 
                                    onQuickView={onQuickView}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subscription Footer - Dark Variant */}
            <Subscription isOverlay={false} variant="dark" />
        </div>
    );
};
