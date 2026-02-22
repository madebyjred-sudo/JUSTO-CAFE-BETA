import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
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

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name-az' | 'sca-high';
type RoastFilter = 'all' | 'Claro' | 'Medio' | 'Medio-Alto' | 'Oscuro';

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart, onQuickView }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [roastFilter, setRoastFilter] = useState<RoastFilter>('all');
    const [showFilters, setShowFilters] = useState(false);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...PRODUCTS];

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.tastingNotes.some(note => note.toLowerCase().includes(query)) ||
                product.roastLevel.toLowerCase().includes(query) ||
                (product.description && product.description.toLowerCase().includes(query))
            );
        }

        // Apply roast level filter
        if (roastFilter !== 'all') {
            result = result.filter(product => product.roastLevel === roastFilter);
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-az':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'sca-high':
                result.sort((a, b) => (b.scaScore || 0) - (a.scaScore || 0));
                break;
            case 'featured':
            default:
                // Keep original order (Kit first, then by SCA score)
                result.sort((a, b) => {
                    if (a.isKit && !b.isKit) return -1;
                    if (!a.isKit && b.isKit) return 1;
                    return (b.scaScore || 0) - (a.scaScore || 0);
                });
                break;
        }

        return result;
    }, [searchQuery, sortBy, roastFilter]);

    const hasActiveFilters = searchQuery || roastFilter !== 'all';

    const clearFilters = () => {
        setSearchQuery('');
        setRoastFilter('all');
        setSortBy('featured');
    };

    return (
        <div className="min-h-screen bg-transparent pt-24 md:pt-32 pb-20 relative z-10">

            {/* Header */}
            <RevealOnScroll>
                <div className="w-full px-8 md:px-24 mb-6">
                    <h1 className="font-heading text-6xl text-justo-dark mb-2">Todos los Cafés</h1>
                    <p className="font-sans text-xl text-justo-dark/80 max-w-2xl font-light">
                        Selección de origen único y blends de especialidad.
                    </p>
                </div>
            </RevealOnScroll>

            {/* Search & Filter Bar */}
            <RevealOnScroll delay={100}>
                <div className="w-full px-8 md:px-24 mb-8">
                    {/* Top Row: Search right-aligned with title */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        {/* Empty space left to align with title */}
                        <div className="hidden md:block md:flex-1" />
                        
                        {/* Search Input - Right aligned */}
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-justo-dark/40" />
                            <input
                                type="text"
                                placeholder="Buscar café, notas de cata, tostión..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-10 py-3 bg-white border border-justo-dark/10 rounded-full font-sans text-justo-dark placeholder:text-justo-dark/40 focus:outline-none focus:ring-2 focus:ring-justo-brown/50 focus:border-transparent transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-justo-dark/40 hover:text-justo-dark transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Filter Toggle (Mobile) */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`md:hidden flex items-center justify-center gap-2 px-6 py-3 rounded-full font-body font-bold uppercase tracking-wider transition-all ${showFilters || hasActiveFilters
                                ? 'bg-justo-dark text-white'
                                : 'bg-white border border-justo-dark/10 text-justo-dark'
                                }`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filtros
                            {hasActiveFilters && (
                                <span className="w-5 h-5 bg-justo-brown text-white text-xs rounded-full flex items-center justify-center">
                                    {(searchQuery ? 1 : 0) + (roastFilter !== 'all' ? 1 : 0)}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Filters Row */}
                    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 ${showFilters ? 'block' : 'hidden md:flex'}`}>
                        {/* Roast Level Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-sans text-justo-dark/60 mr-2">Tostión:</span>
                            {(['all', 'Claro', 'Medio', 'Medio-Alto', 'Oscuro'] as RoastFilter[]).map((roast) => (
                                <button
                                    key={roast}
                                    onClick={() => setRoastFilter(roast)}
                                    className={`px-4 py-2 rounded-full text-xs font-body font-bold uppercase tracking-wider transition-all ${roastFilter === roast
                                        ? 'bg-justo-dark text-white'
                                        : 'bg-white border border-justo-dark/10 text-justo-dark hover:border-justo-dark/30'
                                        }`}
                                >
                                    {roast === 'all' ? 'Todos' : roast}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-sans text-justo-dark/60">Ordenar:</span>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="appearance-none bg-white border border-justo-dark/10 rounded-full pl-4 pr-10 py-2 font-body font-bold text-sm text-justo-dark uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-justo-brown/50 cursor-pointer"
                                >
                                    <option value="featured">Destacados</option>
                                    <option value="price-low">Precio: Menor a Mayor</option>
                                    <option value="price-high">Precio: Mayor a Menor</option>
                                    <option value="name-az">Nombre: A-Z</option>
                                    <option value="sca-high">Puntaje SCA</option>
                                </select>
                                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-justo-dark/40 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Summary */}
                    {hasActiveFilters && (
                        <div className="flex items-center gap-2 mt-4">
                            <span className="text-sm font-sans text-justo-dark/60">
                                {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''}
                            </span>
                            <span className="text-justo-dark/20">|</span>
                            <button
                                onClick={clearFilters}
                                className="text-sm font-body font-bold text-justo-brown hover:text-justo-dark underline transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </div>
            </RevealOnScroll>

            {/* Product List */}
            <div className="w-full px-8 md:px-24 mb-24">
                {filteredProducts.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {filteredProducts.map((product) => (
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
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-justo-dark/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-justo-dark/30" />
                        </div>
                        <h3 className="font-heading text-3xl text-justo-dark mb-2">No encontramos resultados</h3>
                        <p className="font-sans text-justo-dark/60 mb-6">
                            Intenta con otros términos de búsqueda o filtros diferentes.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-justo-dark text-white rounded-full font-body font-bold uppercase tracking-wider hover:bg-justo-brown transition-colors"
                        >
                            Ver todos los productos
                        </button>
                    </div>
                )}
            </div>

            {/* Subscription Footer - Dark Variant */}
            <Subscription isOverlay={false} variant="dark" />
        </div>
    );
};
