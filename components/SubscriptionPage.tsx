import React, { useState } from 'react';
import { Coffee, Filter, Beaker, Check, RefreshCcw, Package, Info, Truck, PiggyBank, Calendar, Star, ChevronDown, ChevronUp, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { Product, ProductVariant } from '../types';
import { PRODUCTS } from '../constants';
import { formatCurrency } from '../services/cartService';
import { CoffeeLoader } from './CoffeeLoader';
import { RevealOnScroll } from './RevealOnScroll';
import { ProductCardV2 } from './ProductCardV2';

interface SubscriptionPageProps {
    onAddToCart: (product: Product, variant?: ProductVariant) => void;
}

// Quiz Steps (Intro is now the Full Landing Page)
type Step = 'landing' | 'method' | 'preference' | 'frequency' | 'result';

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onAddToCart }) => {
    const [step, setStep] = useState<Step>('landing');
    const [answers, setAnswers] = useState({
        method: '',
        preference: '',
        frequency: 'Cada 2 Semanas'
    });
    const [cupsPerDay, setCupsPerDay] = useState<number>(2);
    const [matchedProductId, setMatchedProductId] = useState<string>('');
    const [isThinking, setIsThinking] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // --- Logic to match answers to existing products ---
    const calculateMatch = (pref: string) => {
        setIsThinking(true);
        setTimeout(() => {
            let pid = 'kit-experiencia'; // Default fallback

            if (pref === 'bright') pid = 'bourbon-rosa';      // Floral/Bright
            if (pref === 'balanced') pid = 'castillo';        // Chocolate/Nutty
            if (pref === 'complex') pid = 'tabi';             // Fruity/Caramel
            if (pref === 'bold') pid = 'castillo';            // Strong
            if (pref === 'explore') pid = 'kit-experiencia';  // Variety

            setMatchedProductId(pid);
            setStep('result');
            setIsThinking(false);
        }, 2500);
    };

    const matchedProduct = PRODUCTS.find(p => p.id === matchedProductId) || PRODUCTS[0];

    const handleMethodSelect = (method: string) => {
        setAnswers(prev => ({ ...prev, method }));
        setStep('preference');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePreferenceSelect = (pref: string) => {
        setAnswers(prev => ({ ...prev, preference: pref }));
        setStep('frequency');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFrequencySelect = (freq: string) => {
        setAnswers(prev => ({ ...prev, frequency: freq }));
        calculateMatch(answers.preference);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // --- CALCULATOR LOGIC ---
    const getRecommendation = (cups: number) => {
        const gramsPerDay = cups * 20;
        const gramsPer2Weeks = gramsPerDay * 14;
        const bagsPer2Weeks = Math.ceil(gramsPer2Weeks / 250);
        const gramsPer4Weeks = gramsPerDay * 28;
        const bagsPer4Weeks = Math.ceil(gramsPer4Weeks / 250);

        let text = '';
        let subText = '';
        let bags = 1;
        let frequency = 'Cada 4 Semanas';

        if (bagsPer4Weeks <= 1) {
            text = "1 Bolsa";
            frequency = "Cada 4 Semanas";
            bags = 1;
        } else {
            text = `${bagsPer2Weeks} Bolsa${bagsPer2Weeks > 1 ? 's' : ''}`;
            frequency = "Cada 2 Semanas";
            bags = bagsPer2Weeks;
        }

        return {
            daysPerBag: Math.floor((250 / gramsPerDay) * 10) / 10,
            recText: text,
            recFreq: frequency,
            bags
        };
    };

    const recommendation = getRecommendation(cupsPerDay);

    // --- LANDING PAGE SECTIONS ---

    const renderLanding = () => (
        <div className="w-full space-y-24 md:space-y-32">

            {/* 1. HERO SECTION */}
            <section className="text-center max-w-4xl mx-auto px-4 pt-10">
                <RevealOnScroll>
                    <div className="inline-block mb-6 px-4 py-1 rounded-full border border-justo-brown/30 bg-justo-brown/5">
                        <span className="font-body uppercase tracking-widest text-xs font-bold text-justo-brown flex items-center gap-2">
                            <Star size={12} fill="currentColor" /> Club de Suscripción Justo
                        </span>
                    </div>
                    <h1 className="font-heading text-6xl md:text-8xl text-justo-dark mb-6 leading-[0.9]">
                        Tu ritual, en <br /><span className="text-justo-brown italic">piloto automático.</span>
                    </h1>
                    <p className="font-sans text-xl md:text-2xl text-justo-dark/70 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
                        Recibe el café más fresco de Colombia, tostado exclusivamente para ti. Ahorra dinero, tiempo y nunca te quedes sin tu taza de la mañana.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="primary" size="lg" onClick={() => { setStep('method'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                            Diseñar mi Plan
                        </Button>
                        <p className="text-xs font-bold uppercase tracking-widest text-justo-dark/40 mt-2 sm:mt-0">
                            Cancela en cualquier momento
                        </p>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 2. HOW IT WORKS (3 STEPS) */}
            <section className="container mx-auto px-6">
                <RevealOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-justo-dark/10 -z-10"></div>

                        {[
                            { icon: Filter, title: "1. Personaliza", text: "Responde nuestro quiz para encontrar los granos ideales para tu método." },
                            { icon: Calendar, title: "2. Programa", text: "Elige la frecuencia y cantidad. Nosotros tostamos justo antes de enviar." },
                            { icon: Coffee, title: "3. Disfruta", text: "Recibe frescura absoluta en tu puerta. Ajusta, pausa o cancela con un clic." }
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center group">
                                <div className="w-24 h-24 bg-[#F5F1E8] border border-justo-dark/10 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                                    <step.icon size={32} className="text-justo-dark group-hover:text-justo-brown transition-colors" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-body font-bold text-2xl uppercase text-justo-dark mb-3">{step.title}</h3>
                                <p className="font-sans text-justo-dark/60 leading-relaxed max-w-xs">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </section>

            {/* 3. VALUE PROPS (BENEFITS) */}
            <section className="bg-justo-dark text-justo-cream rounded-[2.5rem] py-20 px-6 md:px-20 relative overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                    {[
                        { icon: PiggyBank, title: "Ahorra 10%", text: "En todos tus envíos recurrentes, de por vida." },
                        { icon: RefreshCcw, title: "Control Total", text: "Pausa, salta o cancela desde tu cuenta sin penalidad." },
                        { icon: Truck, title: "Envíos Gratis", text: "Incluido en todas las suscripciones nacionales." },
                        { icon: Package, title: "First Dibs", text: "Acceso anticipado a lotes exóticos y limitados." }
                    ].map((benefit, idx) => (
                        <RevealOnScroll key={idx} delay={idx * 100}>
                            <div className="flex flex-col items-start space-y-4">
                                <benefit.icon size={40} className="text-justo-beige" strokeWidth={1} />
                                <div>
                                    <h4 className="font-body font-bold text-xl uppercase tracking-wider mb-2">{benefit.title}</h4>
                                    <p className="font-sans text-white/70 font-light leading-relaxed text-sm">{benefit.text}</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </section>

            {/* 4. SOCIAL PROOF */}
            <section className="container mx-auto px-6 text-center max-w-4xl">
                <RevealOnScroll>
                    <h2 className="font-heading text-5xl text-justo-dark mb-12">Lo que dicen nuestros suscriptores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-golden-lg shadow-sm border border-justo-dark/5 text-left">
                            <div className="flex gap-1 text-justo-brown mb-4">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="font-sans text-justo-dark/80 italic mb-6">"Llevo 6 meses suscrito y es increíble la diferencia en frescura comparado con el supermercado. El Bourbon Rosa es mi favorito."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Usuario" />
                                </div>
                                <div>
                                    <span className="block font-body font-bold text-sm uppercase text-justo-dark">Santiago M.</span>
                                    <span className="block text-xs text-gray-500">Suscriptor Mensual</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-golden-lg shadow-sm border border-justo-dark/5 text-left">
                            <div className="flex gap-1 text-justo-brown mb-4">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="font-sans text-justo-dark/80 italic mb-6">"Me encanta no tener que preocuparme por comprar café. Llega puntual y el empaque es hermoso. 100% recomendado."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                    <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Usuario" />
                                </div>
                                <div>
                                    <span className="block font-body font-bold text-sm uppercase text-justo-dark">Camila R.</span>
                                    <span className="block text-xs text-gray-500">Suscriptor Quincenal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 5. FAQ Accordion */}
            <section className="max-w-3xl mx-auto px-6 pb-12">
                <RevealOnScroll>
                    <h2 className="font-heading text-5xl text-center text-justo-dark mb-10">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: "¿Puedo cancelar en cualquier momento?", a: "Sí, absolutamente. No hay contratos a largo plazo. Puedes cancelar, pausar o saltar un envío desde tu perfil de usuario." },
                            { q: "¿Cuánto cuesta el envío?", a: "¡Nada! El envío es gratuito para todas las suscripciones activas dentro de Colombia." },
                            { q: "¿El café viene molido o en grano?", a: "Recomendamos en grano para mayor frescura, pero puedes seleccionar tu molienda preferida al configurar tu plan." },
                            { q: "¿Cómo se cobra la suscripción?", a: "El cobro se realiza automáticamente en tu tarjeta de crédito registrada cada vez que se procesa tu orden (según la frecuencia que elijas)." }
                        ].map((item, idx) => (
                            <div key={idx} className="border-b border-justo-dark/10">
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
                                >
                                    <span className="font-body font-bold text-lg uppercase text-justo-dark">{item.q}</span>
                                    {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                                    <p className="font-sans text-justo-dark/70 leading-relaxed">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </section>

            {/* 6. WhatsApp Contact */}
            <section className="container mx-auto px-6 pb-20 text-center">
                <RevealOnScroll>
                    <div className="flex flex-col items-center">
                        <button
                            onClick={() => window.open('https://wa.me/573144628067', '_blank')}
                            className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-bold text-xl px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform uppercase tracking-widest"
                        >
                            <MessageCircle size={24} strokeWidth={2} />
                            HABLA CON UN HUMANO
                        </button>
                        <span className="mt-4 text-[10px] uppercase tracking-widest text-justo-dark/40 font-bold">
                            Respuesta promedio: 2 minutos
                        </span>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Sticky Mobile CTA */}
            <div className="md:hidden fixed bottom-32 left-6 right-6 z-40">
                <Button variant="primary" fullWidth size="lg" className="shadow-2xl" onClick={() => { setStep('method'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Empezar Suscripción
                </Button>
            </div>
        </div>
    );

    const renderMethod = () => (
        <div className="w-full max-w-5xl mx-auto animate-fade-in-up">
            <div className="mb-8 text-center">
                <button onClick={() => setStep('landing')} className="text-xs font-bold uppercase tracking-widest text-justo-dark/40 hover:text-justo-brown mb-4 p-2">← Volver al inicio</button>
                <h2 className="font-heading text-4xl md:text-5xl text-justo-dark mb-4">¿Cómo preparas tu café?</h2>
                <p className="font-sans text-justo-dark/60 mb-8 md:mb-12">Elige tu método favorito.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[
                    { id: 'espresso', label: 'Espresso', icon: Coffee },
                    { id: 'pour-over', label: 'Filtrado', icon: Filter },
                    { id: 'french', label: 'Prensa', icon: Beaker },
                    { id: 'auto', label: 'Cafetera', icon: RefreshCcw },
                    { id: 'cold', label: 'Cold Brew', icon: Package },
                    { id: 'instant', label: 'Sin equipos', icon: Coffee },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleMethodSelect(item.id)}
                        className="group relative flex flex-col items-center justify-center p-6 md:p-10 bg-white border border-justo-dark/10 rounded-golden-lg hover:border-justo-brown hover:shadow-xl active:scale-95 transition-all duration-300 md:hover:-translate-y-1"
                    >
                        <div className="mb-4 md:mb-6 text-justo-dark/40 group-hover:text-justo-brown transition-colors">
                            <item.icon size={32} className="md:w-12 md:h-12" strokeWidth={1} />
                        </div>
                        <span className="font-body font-bold text-sm md:text-lg uppercase tracking-wider text-justo-dark text-center">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderPreference = () => (
        <div className="w-full max-w-6xl mx-auto animate-fade-in-up">
            <button onClick={() => setStep('method')} className="block mx-auto text-xs font-bold uppercase tracking-widest text-justo-dark/40 hover:text-justo-brown mb-8 p-2">← Volver</button>
            <h2 className="font-heading text-4xl md:text-5xl text-center text-justo-dark mb-4">¿Qué perfil prefieres?</h2>
            <p className="font-sans text-center text-justo-dark/60 mb-8 md:mb-12">Elige la imagen que más te atraiga.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <button onClick={() => handlePreferenceSelect('bright')} className="group text-left active:scale-95 transition-transform">
                    <div className="aspect-square overflow-hidden rounded-golden-lg mb-3 md:mb-4 relative">
                        <img src="https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Frutas" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-yellow-500/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <h3 className="font-body font-bold text-lg md:text-2xl uppercase text-justo-dark mb-1">Brillante</h3>
                    <p className="font-sans text-xs md:text-sm text-justo-dark/60 leading-tight">Vibrante, cítrico y delicado.</p>
                </button>

                <button onClick={() => handlePreferenceSelect('complex')} className="group text-left active:scale-95 transition-transform">
                    <div className="aspect-square overflow-hidden rounded-golden-lg mb-3 md:mb-4 relative">
                        <img src="https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Caramelo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-orange-500/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <h3 className="font-body font-bold text-lg md:text-2xl uppercase text-justo-dark mb-1">Complejo</h3>
                    <p className="font-sans text-xs md:text-sm text-justo-dark/60 leading-tight">Frutos rojos, caramelo y cuerpo.</p>
                </button>

                <button onClick={() => handlePreferenceSelect('balanced')} className="group text-left active:scale-95 transition-transform">
                    <div className="aspect-square overflow-hidden rounded-golden-lg mb-3 md:mb-4 relative">
                        <img src="https://images.pexels.com/photos/885021/pexels-photo-885021.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Chocolate" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-amber-900/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <h3 className="font-body font-bold text-lg md:text-2xl uppercase text-justo-dark mb-1">Clásico</h3>
                    <p className="font-sans text-xs md:text-sm text-justo-dark/60 leading-tight">Chocolate oscuro y nueces.</p>
                </button>

                <button onClick={() => handlePreferenceSelect('explore')} className="group text-left active:scale-95 transition-transform">
                    <div className="aspect-square overflow-hidden rounded-golden-lg mb-3 md:mb-4 relative">
                        <img src="https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Mix" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <h3 className="font-body font-bold text-lg md:text-2xl uppercase text-justo-dark mb-1">Sorpresa</h3>
                    <p className="font-sans text-xs md:text-sm text-justo-dark/60 leading-tight">Orígenes rotativos.</p>
                </button>
            </div>
        </div>
    );

    const renderFrequency = () => (
        <div className="w-full max-w-3xl mx-auto text-center animate-fade-in-up pb-12">
            <button onClick={() => setStep('preference')} className="text-xs font-bold uppercase tracking-widest text-justo-dark/40 hover:text-justo-brown mb-8">← Volver</button>
            <h2 className="font-heading text-5xl text-justo-dark mb-4">Frecuencia de envío</h2>
            <p className="font-sans text-justo-dark/60 mb-12">Ajusta según tu consumo. Puedes cambiarlo cuando quieras.</p>

            <div className="space-y-4 mb-24">
                {['Cada 2 Semanas', 'Cada 3 Semanas', 'Cada 4 Semanas'].map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleFrequencySelect(opt)}
                        className="w-full p-6 bg-white border border-justo-dark/10 rounded-golden-md flex items-center justify-between group hover:border-justo-dark active:scale-95 transition-all"
                    >
                        <span className="font-body text-xl font-bold uppercase tracking-wider text-justo-dark">{opt}</span>
                        <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all text-justo-brown">
                            <Check />
                        </span>
                    </button>
                ))}
            </div>

            <div className="pt-16 border-t border-justo-dark/10 relative">
                <div className="text-center mb-10">
                    <span className="font-body font-bold uppercase tracking-[0.2em] text-xs text-justo-brown block mb-3">
                        Calculadora de Consumo
                    </span>
                    <h3 className="font-heading text-4xl text-justo-dark">¿Cuántas tazas tomas al día?</h3>
                </div>

                <div className="max-w-xl mx-auto mb-16 relative px-8">
                    <div className="relative h-12 mb-2 select-none flex items-center">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={cupsPerDay}
                            onChange={(e) => setCupsPerDay(parseInt(e.target.value))}
                            className="absolute w-full h-full opacity-0 cursor-pointer z-30 top-0 left-0"
                        />
                        <div className="absolute left-0 w-full h-[2px] bg-justo-dark/20 z-10"></div>
                        <div
                            className="absolute w-8 h-8 bg-justo-brown rounded-full shadow-lg z-20 pointer-events-none transition-all duration-150 ease-out flex items-center justify-center transform -translate-x-1/2"
                            style={{ left: `${((cupsPerDay - 1) / 4) * 100}%` }}
                        >
                            <div className="absolute -top-12 bg-justo-brown text-white text-lg font-body font-bold w-10 h-10 flex items-center justify-center rounded-lg shadow-md after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-t-justo-brown after:border-transparent">
                                {cupsPerDay}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between text-lg font-body font-bold text-justo-dark/40 mt-2">
                        <span>1</span>
                        <span>5+</span>
                    </div>
                </div>

                <div className="bg-white border border-justo-dark/10 rounded-golden-lg p-8 flex flex-col md:flex-row items-center justify-center gap-8 max-w-2xl mx-auto shadow-sm">
                    <div className="flex items-center justify-center gap-2 relative">
                        <div className="relative">
                            <Package size={64} strokeWidth={1} className="text-justo-dark fill-justo-beige/30" />
                            <span className="absolute -top-2 -right-2 bg-justo-brown text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                                {recommendation.bags}
                            </span>
                        </div>
                        {recommendation.bags > 1 && (
                            <Package size={48} strokeWidth={1} className="text-justo-dark/50 absolute -right-6 -z-10" />
                        )}
                    </div>
                    <div className="text-center md:text-left">
                        <span className="block text-xs font-bold uppercase tracking-widest text-justo-dark/40 mb-2">
                            Te Recomendamos
                        </span>
                        <h4 className="font-heading text-4xl text-justo-dark mb-1">
                            {recommendation.recText}
                        </h4>
                        <p className="font-body text-lg font-bold uppercase tracking-wider text-justo-brown">
                            {recommendation.recFreq}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderResult = () => (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up">
            <span className="font-body uppercase tracking-[0.2em] text-justo-brown text-sm font-bold mb-6">
                Tu Match Perfecto
            </span>

            {/* Mobile View: ProductCardV2 */}
            <div className="md:hidden w-full px-2">
                <ProductCardV2 
                    product={matchedProduct} 
                    onAddToCart={onAddToCart} 
                    onQuickView={() => {}} 
                />
                <button
                    onClick={() => setStep('landing')}
                    className="w-full mt-6 text-xs font-bold uppercase tracking-widest text-justo-dark/40 hover:text-justo-dark transition-colors text-center py-4"
                >
                    Volver al inicio
                </button>
            </div>

            {/* Desktop View: Detailed Landscape Card */}
            <div className="hidden md:flex w-full bg-justo-dark/10 backdrop-blur-md border border-justo-dark/10 rounded-[1.5rem] overflow-hidden flex-col md:flex-row shadow-sm group">
                <div className="w-full md:w-1/2 bg-[#EBE5D9] relative h-[400px] md:h-auto">
                    <img
                        src={matchedProduct.image}
                        alt={matchedProduct.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Hover Image (Bag Effect) */}
                    {matchedProduct.hoverImage && (
                        <>
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                <img
                                    src={matchedProduct.hoverImage}
                                    alt={`${matchedProduct.name} Bag`}
                                    className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-105 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </>
                    )}

                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <span className="px-2 py-1 bg-justo-dark/10 text-justo-dark text-[10px] font-body uppercase font-bold tracking-wider rounded-sm backdrop-blur-sm">
                            Mejor Valor
                        </span>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="font-body font-bold text-4xl md:text-5xl text-justo-dark uppercase leading-[0.9] tracking-tight mb-4">
                        {matchedProduct.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {matchedProduct.tastingNotes.map(n => (
                            <span key={n} className="px-2 py-1 border border-justo-dark/20 text-justo-dark text-[10px] font-body uppercase font-bold tracking-wider rounded-sm">
                                {n}
                            </span>
                        ))}
                    </div>
                    <p className="font-sans text-justo-dark/70 text-lg mb-8 font-light leading-relaxed">
                        {matchedProduct.description || "Un café seleccionado meticulosamente para coincidir con tu perfil de sabor. Tostado bajo pedido para garantizar frescura absoluta."}
                    </p>
                    <div className="flex items-end gap-4 mb-8 border-t border-justo-dark/10 pt-6">
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-justo-dark/60 mb-1">
                                Precio Suscripción
                            </span>
                            <span className="font-body font-bold text-4xl text-justo-dark">
                                {formatCurrency(matchedProduct.price * 0.9)}
                            </span>
                        </div>
                        <div className="pb-2">
                            <span className="text-xs text-justo-brown font-bold uppercase tracking-wider">
                                Ahorras 10%
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button variant="primary" size="lg" onClick={() => onAddToCart(matchedProduct)} fullWidth>
                            Suscribirme {answers.frequency.replace('Cada ', 'c/ ')}
                        </Button>
                        <button
                            onClick={() => setStep('landing')}
                            className="text-xs font-bold uppercase tracking-widest text-justo-dark/40 hover:text-justo-dark transition-colors text-center"
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLoader = () => (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <p className="font-heading text-4xl text-justo-dark animate-pulse">Analizando tus respuestas...</p>
            <p className="font-sans text-sm text-justo-dark/50 mt-2">Buscando tu perfil ideal</p>
            <div className="mt-8 opacity-60">
                <CoffeeLoader />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F1E8] pt-24 md:pt-32 pb-48 px-4 md:px-6 relative z-10">

            {/* Progress Bar (Only inside quiz steps) */}
            {step !== 'landing' && step !== 'result' && !isThinking && (
                <div className="max-w-xl mx-auto mb-12 flex gap-2">
                    {['method', 'preference', 'frequency'].map((s, idx) => {
                        const stepIdx = ['method', 'preference', 'frequency'].indexOf(step);
                        return (
                            <div key={s} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${idx <= stepIdx ? 'bg-justo-brown' : 'bg-justo-dark/10'}`} />
                        );
                    })}
                </div>
            )}

            {/* Content Switcher */}
            <div className="transition-all duration-500 ease-in-out">
                {step === 'landing' && renderLanding()}
                {step === 'method' && renderMethod()}
                {step === 'preference' && renderPreference()}
                {step === 'frequency' && !isThinking && renderFrequency()}
                {isThinking && renderLoader()}
                {step === 'result' && !isThinking && renderResult()}
            </div>
        </div>
    );
};