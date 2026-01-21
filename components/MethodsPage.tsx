import React, { useState } from 'react';
import { Clock, Users, ChefHat, X, CheckCircle, ArrowRight, Share2, Heart, ShoppingBag, Droplet } from 'lucide-react';
import { Button } from './Button';
import { RevealOnScroll } from './RevealOnScroll';
import { Recipe, Product, ProductVariant } from '../types';
import { PRODUCTS } from '../constants';

// --- MOCK DATA ---
const RECIPES: Recipe[] = [
    {
        id: 'olleta',
        title: 'Olleta: Tradición Colombiana',
        category: 'Inmersión',
        difficulty: 'Fácil',
        totalTime: '8 min',
        yield: '4 Tazas',
        image: '/images/Olleta.png',
        description: 'La forma más tradicional y hogareña de preparar café en Colombia. Un método de inmersión que produce una taza con cuerpo, dulzura y nostalgia.',
        ingredients: ['40g de Café Justo (Molienda Media-Gruesa)', '600ml de Agua', 'Panela (Opcional)'],
        steps: [
            { time: '0:00', instruction: 'Pon el agua a calentar en la olleta a fuego medio-alto.' },
            { time: '3:00', instruction: 'Justo antes de hervir, agrega el café y apaga el fuego inmediatamente.' },
            { time: '3:30', instruction: 'Revuelve suavemente y deja reposar tapado por 5 minutos.' },
            { time: '8:30', instruction: 'Sirve con cuidado ("Ladino") para no mover los sedimentos del fondo.' }
        ],
        author: 'Abuela Justo',
        recommendedProductId: 'castillo'
    },
    {
        id: 'v60-clasico',
        title: 'V60: La Técnica Japonesa',
        category: 'Filtrados',
        difficulty: 'Medio',
        totalTime: '4 min',
        yield: '1 Taza (300ml)',
        image: '/images/v60.png',
        description: 'Un método icónico que resalta la acidez y las notas florales de nuestros cafés lavados. La claridad en taza es inigualable.',
        ingredients: ['20g de Café Justo (Molienda Media)', '320ml de Agua a 93°C', 'Filtro de papel V60'],
        steps: [
            { time: '0:00', instruction: 'Coloca el filtro y enjuágalo con agua caliente para quitar sabor a papel y calentar la jarra.' },
            { time: '0:30', instruction: 'Agrega los 20g de café y haz un "Bloom" con 40ml de agua. Espera 30 segundos.' },
            { time: '1:00', instruction: 'Vierte suavemente en círculos hasta llegar a 150ml.' },
            { time: '1:45', instruction: 'Vierte el resto del agua hasta los 320ml. Deja drenar completamente.' }
        ],
        author: 'Justo Team',
        recommendedProductId: 'bourbon-rosa'
    },
    {
        id: 'prensa-francesa',
        title: 'Prensa Francesa',
        category: 'Inmersión',
        difficulty: 'Fácil',
        totalTime: '5 min',
        yield: '2 Tazas',
        image: '/images/prensa francesa.png',
        description: 'Un clásico por excelencia. Extrae todos los aceites naturales del café dando como resultado una taza con mucho cuerpo y sabor intenso.',
        ingredients: ['30g de Café Justo (Molienda Gruesa)', '500ml de Agua a 93°C', 'Prensa Francesa'],
        steps: [
            { time: '0:00', instruction: 'Precalienta la prensa con agua caliente y deséchala.' },
            { time: '0:30', instruction: 'Agrega el café molido y vierte toda el agua asegurando que todo el café se moje.' },
            { time: '1:00', instruction: 'Pon la tapa sin bajar el émbolo y espera 4 minutos.' },
            { time: '5:00', instruction: 'Baja el émbolo suavemente y sirve inmediatamente para detener la extracción.' }
        ],
        author: 'Justo Team',
        recommendedProductId: 'tabi'
    }
];


// --- RECIPE MODAL COMPONENT ---
interface RecipeModalProps {
    recipe: Recipe;
    onClose: () => void;
    onAddToCart: (product: Product, variant?: ProductVariant) => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose, onAddToCart }) => {
    const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
    const [addedToCart, setAddedToCart] = useState(false);

    const toggleStep = (idx: number) => {
        setCheckedSteps(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    // Find recommended product
    const recommendedProduct = PRODUCTS.find(p => p.id === recipe.recommendedProductId);

    const handleQuickAdd = () => {
        if (recommendedProduct) {
            onAddToCart(recommendedProduct);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Content Drawer/Sheet */}
            <div className="relative w-full md:w-[600px] lg:w-[800px] h-full bg-[#F5F1E8] shadow-2xl overflow-y-auto animate-drift-in-right flex flex-col">

                {/* Close & Share Header */}
                <div className="sticky top-0 z-20 flex justify-between items-center p-6 bg-[#F5F1E8]/90 backdrop-blur border-b border-justo-dark/5">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-justo-dark/10 transition-colors"
                    >
                        <X size={24} className="text-justo-dark" />
                    </button>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full hover:bg-justo-dark/10 transition-colors text-justo-dark">
                            <Heart size={20} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-justo-dark/10 transition-colors text-justo-dark">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="w-full h-64 md:h-80 relative shrink-0">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1E8] to-transparent"></div>
                    <div className="absolute bottom-4 left-6 md:left-10">
                        {/* Tag inside Modal also updated style */}
                        <span className="px-3 py-1 bg-justo-brown text-white text-xs font-body font-bold uppercase tracking-wider rounded-sm shadow-sm mb-2 inline-block">
                            {recipe.category}
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl text-justo-dark leading-none drop-shadow-sm">{recipe.title}</h2>
                    </div>
                </div>

                {/* Content Body */}
                <div className="px-6 md:px-10 pb-20">

                    {/* Metadata Bar */}
                    <div className="flex flex-wrap gap-6 py-6 border-b border-justo-dark/10 text-justo-dark/70">
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span className="font-sans font-medium">{recipe.totalTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={18} />
                            <span className="font-sans font-medium">{recipe.yield}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ChefHat size={18} />
                            <span className="font-sans font-medium">{recipe.difficulty}</span>
                        </div>
                    </div>

                    <p className="py-6 font-sans text-lg text-justo-dark/80 leading-relaxed font-light">
                        {recipe.description}
                    </p>

                    {/* COMMERCE: Recommended Coffee Card - PRICE REMOVED AS REQUESTED */}
                    {recommendedProduct && (
                        <div className="mb-10 bg-justo-dark/5 border border-justo-dark/10 rounded-golden-lg p-5 flex items-center gap-5 relative overflow-hidden group">
                            {/* Accent Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-justo-beige/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="w-20 h-20 bg-white rounded-golden-md overflow-hidden shrink-0 shadow-sm z-10 relative">
                                <img src={recommendedProduct.image} alt={recommendedProduct.name} className="w-full h-full object-cover" />
                                {recommendedProduct.hoverImage && (
                                    <>
                                        {/* Glass Overlay for small card */}
                                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                            <img
                                                src={recommendedProduct.hoverImage}
                                                alt="Bag"
                                                className="w-full h-full object-contain p-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex-1 z-10">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-justo-brown mb-1">
                                    El Café Perfecto
                                </span>
                                <h4 className="font-heading text-2xl text-justo-dark leading-none mb-1">
                                    {recommendedProduct.name}
                                </h4>
                                <p className="text-xs text-justo-dark/60 font-sans line-clamp-1">
                                    Notas: {recommendedProduct.tastingNotes.join(', ')}
                                </p>
                            </div>

                            <div className="z-10">
                                {/* Button contains ONLY the icon, no text, no price */}
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={handleQuickAdd}
                                    className="w-12 h-12 flex items-center justify-center p-0 rounded-full"
                                    title="Añadir al carrito"
                                >
                                    {addedToCart ? (
                                        <CheckCircle size={20} />
                                    ) : (
                                        <ShoppingBag size={20} />
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Ingredients Card */}
                    <div className="bg-white p-6 rounded-golden-lg shadow-sm border border-justo-dark/5 mb-10">
                        <h3 className="font-body font-bold text-xl uppercase tracking-widest text-justo-dark mb-4">Ingredientes & Equipo</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {recipe.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-start gap-2 font-sans text-justo-dark/80 text-sm">
                                    <span className="w-1.5 h-1.5 bg-justo-brown rounded-full mt-2 shrink-0"></span>
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Steps */}
                    <div className="space-y-8">
                        <h3 className="font-body font-bold text-2xl uppercase tracking-widest text-justo-dark">Preparación</h3>

                        <div className="relative border-l-2 border-justo-dark/10 ml-3 space-y-10">
                            {recipe.steps.map((step, idx) => {
                                const isChecked = checkedSteps.includes(idx);
                                return (
                                    <div
                                        key={idx}
                                        className={`relative pl-8 transition-all duration-300 ${isChecked ? 'opacity-50 grayscale' : 'opacity-100'}`}
                                    >
                                        {/* Timeline Dot */}
                                        <button
                                            onClick={() => toggleStep(idx)}
                                            className={`absolute -left-[11px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-[#F5F1E8] z-10 ${isChecked
                                                ? 'border-green-600 text-green-600'
                                                : 'border-justo-brown text-transparent hover:border-justo-dark'
                                                }`}
                                        >
                                            <CheckCircle size={14} fill={isChecked ? "currentColor" : "none"} />
                                        </button>

                                        <div className="flex flex-col gap-1">
                                            {step.time && (
                                                <span className="text-xs font-bold font-body uppercase tracking-wider text-justo-brown">
                                                    {step.time}
                                                </span>
                                            )}
                                            <p className={`font-sans text-lg text-justo-dark leading-relaxed ${isChecked ? 'line-through' : ''}`}>
                                                {step.instruction}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 pt-8 border-t border-justo-dark/10 text-center">
                        <p className="font-heading text-2xl text-justo-dark mb-4">¿Te gustó esta receta?</p>
                        <Button variant="primary" onClick={onClose}>
                            Ver más Métodos
                        </Button>
                    </div>

                </div>
            </div>
            <style>
                {`
                  @keyframes drift-in-right {
                    0% { transform: translateX(100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                  }
                  .animate-drift-in-right {
                    animation: drift-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                  }
                `}
            </style>
        </div>
    );
};

interface MethodsPageProps {
    onAddToCart?: (product: Product, variant?: ProductVariant) => void;
    onQuickView?: (product: Product) => void;
}

// --- MAIN PAGE COMPONENT ---
export const MethodsPage: React.FC<MethodsPageProps> = ({ onAddToCart, onQuickView }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

    const categories = ['Todos', ...Array.from(new Set(RECIPES.map(r => r.category)))];

    const filteredRecipes = selectedCategory === 'Todos'
        ? RECIPES
        : RECIPES.filter(r => r.category === selectedCategory);

    // Placeholder handler if prop is missing (safe access)
    const handleAddToCart = onAddToCart || ((p) => console.log('Add to cart:', p.name));

    return (
        <div className="min-h-screen bg-[#F5F1E8] relative z-10">
            {/* 1. HERO HEADER */}
            <section className="relative h-[60vh] md:h-[500px] w-full overflow-hidden flex items-center justify-center bg-justo-dark">
                <div className="absolute inset-0 opacity-50">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/videos/methods-hero.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-justo-dark/30 via-justo-dark/60 to-[#F5F1E8]"></div>

                <div className="relative z-10 text-center px-6">
                    <RevealOnScroll>
                        <h1 className="font-heading text-6xl md:text-8xl text-justo-cream mb-4 drop-shadow-xl">
                            Rituales de Extracción
                        </h1>
                        <p className="font-sans text-xl text-justo-cream/90 font-light max-w-xl mx-auto mb-8">
                            Guías paso a paso para honrar cada grano. Desde el espresso matutino hasta el cold brew de verano.
                        </p>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 2. FILTER & CONTENT - INCREASED SPACING FOR AESTHETICS */}
            <section className="container mx-auto px-6 py-24 -mt-20 relative z-20">

                {/* Filters - Increased bottom margin */}
                <RevealOnScroll delay={100}>
                    <div className="flex flex-wrap justify-center gap-3 mb-20">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                                    px-6 py-2 rounded-full font-body font-bold text-sm uppercase tracking-wider transition-all duration-300 border
                                    ${selectedCategory === cat
                                        ? 'bg-justo-dark text-justo-cream border-justo-dark shadow-lg scale-105'
                                        : 'bg-white/80 backdrop-blur text-justo-dark border-justo-dark/10 hover:border-justo-dark hover:bg-white'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Grid - Increased gap-y */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {filteredRecipes.map((recipe, idx) => {
                        // Find the recommended product to show name
                        const recProduct = PRODUCTS.find(p => p.id === recipe.recommendedProductId);

                        return (
                            <RevealOnScroll key={recipe.id} delay={idx * 100}>
                                <div
                                    onClick={() => setActiveRecipe(recipe)}
                                    // CHANGED: Background to bg-justo-dark/10, border color matches ShopPage
                                    className="group relative bg-justo-dark/10 backdrop-blur-md border border-justo-dark/10 rounded-golden-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer h-[450px] flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="h-3/5 overflow-hidden relative">
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            {/* CHANGED: Tag Font Style */}
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-body font-bold uppercase tracking-wider text-justo-dark rounded-sm">
                                                {recipe.category}
                                            </span>
                                        </div>
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <span className="font-body font-bold uppercase tracking-wider text-sm">Ver Receta</span>
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-heading text-4xl text-justo-dark leading-none">{recipe.title}</h3>
                                            </div>
                                            <p className="font-sans text-sm text-justo-dark/60 line-clamp-2 mb-4">
                                                {recipe.description}
                                            </p>
                                        </div>

                                        {/* Updated Bottom Bar with Product Rec */}
                                        <div className="flex items-center justify-between pt-4 border-t border-justo-dark/10 text-justo-dark/60 text-xs font-bold uppercase tracking-wider font-body">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} /> {recipe.totalTime}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ChefHat size={14} /> {recipe.difficulty}
                                                </div>
                                            </div>

                                            {/* Product Tag - Interactive Button */}
                                            {recProduct && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent opening recipe
                                                        if (onQuickView) onQuickView(recProduct);
                                                    }}
                                                    className="flex items-center gap-1.5 text-justo-brown hover:bg-justo-brown hover:text-white px-2 py-1 rounded-md transition-all duration-300 transform hover:scale-105 z-20 group/tag"
                                                    title={`Ver detalles de ${recProduct.name}`}
                                                >
                                                    <Droplet size={14} fill="currentColor" className="group-hover/tag:fill-white" />
                                                    <span className="hidden sm:inline">{recProduct.name}</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        )
                    })}
                </div>

                {/* Community Call to Action */}
                <RevealOnScroll delay={200}>
                    <div className="mt-24 p-12 bg-justo-dark rounded-golden-xl text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="font-heading text-5xl text-justo-cream mb-4">¿Tienes un ritual único?</h2>
                            <p className="font-sans text-justo-cream/80 max-w-xl mx-auto mb-8 font-light">
                                La comunidad Justo crece con cada taza. Comparte tu receta con nosotros y podrías aparecer en este blog.
                            </p>
                            <Button variant="cream">
                                Compartir mi Receta
                            </Button>
                        </div>
                    </div>
                </RevealOnScroll>

            </section>

            {/* RECIPE DETAIL MODAL */}
            {activeRecipe && (
                <RecipeModal recipe={activeRecipe} onClose={() => setActiveRecipe(null)} onAddToCart={handleAddToCart} />
            )}

        </div>
    );
};