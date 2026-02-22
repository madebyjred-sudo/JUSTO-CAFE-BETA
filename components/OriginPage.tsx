import React from 'react';
import { Button } from './Button';
import { MapPin, Mountain, ThermometerSun, Truck } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product, ProductVariant } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface OriginPageProps {
    onAddToCart?: (product: Product, variant?: ProductVariant) => void;
    onQuickView?: (product: Product) => void;
}

export const OriginPage: React.FC<OriginPageProps> = ({ onAddToCart, onQuickView }) => {
    const kitProduct = PRODUCTS.find(p => p.id === 'kit-experiencia') || PRODUCTS[0];

    return (
        <div className="min-h-screen bg-[#F5F1E8] relative z-10">

            {/* 1. HERO SECTION WITH VIDEO */}
            <section className="relative h-screen w-full overflow-hidden bg-justo-dark">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        poster="/images/origin-poster.jpg"
                        className="w-full h-full object-cover scale-105"
                        onError={(e) => {
                            const video = e.currentTarget;
                            video.style.display = 'none';
                            const fallback = video.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'block';
                        }}
                    >
                        <source src="/videos/origin-plantation.mp4" type="video/mp4" />
                    </video>
                    {/* Fallback background image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center hidden"
                        style={{ backgroundImage: 'url(/images/origin-poster.jpg)' }}
                    />
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6">
                    <RevealOnScroll delay={100}>
                        <span className="font-body text-justo-beige uppercase tracking-[0.3em] text-sm md:text-base mb-4 block">
                            San Isidro, Cauca
                        </span>
                        <h1 className="font-heading text-6xl md:text-8xl text-justo-cream mb-8 drop-shadow-lg leading-[0.9]">
                            Tierra de Café y Flores
                        </h1>
                        <p className="font-sans text-white/90 text-lg max-w-xl leading-relaxed mx-auto">
                            Un viaje al corazón de la montaña colombiana, donde manos expertas cultivan la excelencia.
                        </p>
                    </RevealOnScroll>

                    <div className="absolute bottom-10 animate-bounce text-white/50">
                        <span className="text-[10px] uppercase tracking-widest">Descubre el viaje</span>
                    </div>
                </div>
            </section>

            {/* 2. THE SOURCE (San Isidro) */}
            <section className="py-24 md:py-32 px-6 relative overflow-hidden">
                {/* Background Texture & Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-justo-brown/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 relative">
                            <RevealOnScroll>
                                <div className="aspect-[4/5] rounded-t-full rounded-b-golden-xl overflow-hidden shadow-2xl relative z-10">
                                    <img
                                        src="/images/origin-family.png"
                                        alt="Familia Cafetera San Isidro"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg">
                                        <div className="flex items-center gap-2 text-justo-dark">
                                            <MapPin size={16} />
                                            <span className="font-body font-bold text-xs uppercase tracking-wider">Vereda San Isidro</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative border */}
                                <div className="absolute inset-0 border-2 border-justo-brown/20 rounded-t-full rounded-b-golden-xl translate-x-4 translate-y-4 -z-0"></div>
                            </RevealOnScroll>
                        </div>

                        <div className="w-full md:w-1/2">
                            <RevealOnScroll delay={200}>
                                <h2 className="font-heading text-5xl text-justo-dark mb-6">El Origen</h2>
                                <div className="w-20 h-1 bg-justo-brown mb-8"></div>
                                <p className="font-sans text-xl text-justo-dark/80 leading-relaxed font-light mb-6">
                                    Nuestro café nace en la vereda San Isidro, en el corazón del Cauca, muy cerca de la ciudad de Piendamó. Allí, rodeado de montañas fértiles, clima ideal y manos expertas, se cultiva un café reconocido por su calidad y por el valor de su gente.
                                </p>
                                <p className="font-sans text-xl text-justo-dark/80 leading-relaxed font-light">
                                    Trabajadores apasionados que han hecho de esta tierra <span className="text-justo-brown font-medium italic">“la tierra del café y las flores”</span>. Son pequeños productores que día a día buscan la excelencia en cada grano.
                                </p>

                                <div className="grid grid-cols-2 gap-6 mt-10">
                                    <div className="flex items-start gap-3 group">
                                        <Mountain className="text-justo-brown shrink-0 transition-transform duration-500 group-hover:-translate-y-1" />
                                        <div>
                                            <h4 className="font-body font-bold text-sm uppercase">Altitud Ideal</h4>
                                            <p className="text-xs text-justo-dark/60">1.700 - 1.900 m.s.n.m</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 group">
                                        <ThermometerSun className="text-justo-brown shrink-0 transition-transform duration-500 group-hover:-translate-y-1" />
                                        <div>
                                            <h4 className="font-body font-bold text-sm uppercase">Microclima</h4>
                                            <p className="text-xs text-justo-dark/60">Volcánico y constante</p>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE JOURNEY (Panamericana) - Full Width Parallax */}
            <section className="relative py-32 bg-justo-dark text-justo-cream overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Carretera de montaña"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-justo-dark via-justo-dark/90 to-transparent"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <RevealOnScroll>
                        <div className="max-w-2xl">
                            <div className="inline-block p-3 rounded-full bg-justo-beige/10 mb-6">
                                <Truck className="text-justo-beige" size={32} />
                            </div>
                            <h2 className="font-heading text-5xl md:text-6xl mb-8">La Travesía</h2>
                            <p className="font-sans text-xl text-white/80 leading-relaxed font-light mb-8">
                                Después de su proceso en finca, el café se empaca en verde y emprende un largo recorrido por la carretera Panamericana hasta Bogotá.
                            </p>
                            <p className="font-sans text-xl text-white/80 leading-relaxed font-light border-l-2 border-justo-beige pl-6">
                                Un viaje que conecta la tradición rural con la innovación urbana, preservando la integridad de la cosecha milla tras milla.
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 4. THE CRAFT (Roasting) */}
            <section className="py-24 md:py-32 px-6 bg-[#F5F1E8] relative">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="flex flex-col-reverse md:flex-row items-center gap-16">

                        <div className="w-full md:w-1/2">
                            <RevealOnScroll>
                                <h2 className="font-heading text-5xl text-justo-dark mb-6">Alquimia y Tostión</h2>
                                <p className="font-sans text-xl text-justo-dark/80 leading-relaxed font-light mb-6">
                                    Aquí analizamos cada detalle del grano y lo llevamos a tostar para transformar y desarrollar sus sabores: notas ácidas, frutales, achocolatadas y aromas complejos que hacen única cada taza.
                                </p>
                                <p className="font-sans text-xl text-justo-dark/80 leading-relaxed font-light mb-10">
                                    Posteriormente es perfilado, empacado y etiquetado para su distribución. Cada paso en Justo está pensado con detalle para que nuestros clientes vivan una experiencia real, auténtica y necesaria.
                                </p>

                                <div className="bg-white p-8 rounded-golden-lg shadow-sm border border-justo-dark/5">
                                    <h3 className="font-body font-bold text-center text-xl uppercase tracking-widest text-justo-brown mb-6">Perfil Sensorial</h3>
                                    <div className="flex justify-between text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">A</div>
                                            <span className="text-xs uppercase font-bold text-justo-dark/60">Ácida</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold">F</div>
                                            <span className="text-xs uppercase font-bold text-justo-dark/60">Frutal</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold">C</div>
                                            <span className="text-xs uppercase font-bold text-justo-dark/60">Choco</span>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>

                        <div className="w-full md:w-1/2 relative">
                            <RevealOnScroll delay={200}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative mt-12">
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="auto"
                                            poster="/images/process-poster.jpg"
                                            className="w-full h-64 object-cover rounded-golden-lg shadow-lg hover:scale-105 transition-transform duration-700"
                                            onError={(e) => {
                                                const video = e.currentTarget;
                                                video.style.display = 'none';
                                            }}
                                        >
                                            <source src="/videos/process.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                    <div className="relative">
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="auto"
                                            poster="/images/roasting-poster.jpg"
                                            className="w-full h-64 object-cover rounded-golden-lg shadow-lg hover:scale-105 transition-transform duration-700"
                                            onError={(e) => {
                                                const video = e.currentTarget;
                                                video.style.display = 'none';
                                            }}
                                        >
                                            <source src="/videos/hero-roasting.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-justo-brown/5 rounded-full blur-3xl"></div>
                            </RevealOnScroll>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. FOOTER CTA */}
            <section className="py-24 bg-[#F5F1E8] text-center relative">
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <RevealOnScroll>
                        <h2 className="font-heading text-5xl md:text-6xl text-justo-dark mb-8">
                            Una experiencia de café Justo <br /><span className="italic text-justo-brown">como debía ser.</span>
                        </h2>

                        <div className="flex justify-center">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => onQuickView && onQuickView(kitProduct)}
                                className="shadow-2xl"
                            >
                                Probar el Origen
                            </Button>
                        </div>

                        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-justo-dark/40">
                            Incluye: {kitProduct.name}
                        </p>
                    </RevealOnScroll>
                </div>
            </section>

        </div>
    );
};