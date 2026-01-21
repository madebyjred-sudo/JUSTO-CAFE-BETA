import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ViewState } from '../types';

interface Announcement {
    id: number;
    text: string;
    icon: string;
    action: () => void;
    destination: ViewState | 'download' | 'waitlist';
}

interface AnnouncementBarProps {
    onNavigate?: (view: ViewState) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Define the 5 announcement statements
    const announcements: Announcement[] = [
        {
            id: 1,
            text: 'Nuevo lote Tabí disponible — Edición limitada de 50 unidades',
            icon: '🚀',
            destination: 'shop',
            action: () => {
                onNavigate?.('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        {
            id: 2,
            text: 'Envío gratis en suscripciones — Recibe café fresco cada mes',
            icon: '📦',
            destination: 'subscription',
            action: () => {
                onNavigate?.('subscription');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        {
            id: 3,
            text: 'Guía gratis: Cómo preparar el V60 perfecto — Descarga ahora',
            icon: '☕',
            destination: 'methods',
            action: () => {
                onNavigate?.('methods');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        {
            id: 4,
            text: 'Primer pedido con 15% OFF — Código: BIENVENIDO',
            icon: '🎁',
            destination: 'shop',
            action: () => {
                onNavigate?.('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Could trigger discount code application here
                localStorage.setItem('discount_code', 'BIENVENIDO');
            }
        },
        {
            id: 5,
            text: 'Próximo lote Bourbon Rosa en 5 días — Únete a la lista de espera',
            icon: '🔔',
            destination: 'subscription',
            action: () => {
                onNavigate?.('subscription');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    ];

    // Auto-rotation logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % announcements.length);
                setIsTransitioning(false);
            }, 150); // Half of transition duration for smoother effect
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, announcements.length]);

    const handlePrevious = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
            setIsTransitioning(false);
        }, 150);
    };

    const handleNext = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length);
            setIsTransitioning(false);
        }, 150);
    };

    const handleClick = () => {
        announcements[currentIndex].action();

        // Analytics tracking
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'announcement_bar_click', {
                statement_number: currentIndex + 1,
                statement_text: announcements[currentIndex].text,
                destination: announcements[currentIndex].destination
            });
        }
    };

    return (
        <div
            className="relative bg-justo-dark text-justo-cream h-[42px] flex items-center justify-center overflow-hidden border-b border-justo-dark/50 z-50"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors duration-200 hidden md:flex items-center justify-center group"
                aria-label="Anuncio anterior"
            >
                <ChevronLeft size={16} className="text-justo-cream/60 group-hover:text-justo-cream transition-colors" />
            </button>

            {/* Statement Content */}
            <button
                onClick={handleClick}
                className="flex items-center justify-center gap-2 px-12 md:px-20 w-full h-full hover:bg-white/5 transition-all duration-200 group cursor-pointer"
            >
                <span
                    className={`text-sm md:text-[13px] font-medium tracking-wide transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                        }`}
                >
                    <span className="inline-block mr-2 text-base" role="img" aria-hidden="true">
                        {announcements[currentIndex].icon}
                    </span>
                    <span className="group-hover:underline underline-offset-4 decoration-justo-beige/50">
                        {announcements[currentIndex].text}
                    </span>
                </span>
            </button>

            {/* Next Button */}
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors duration-200 hidden md:flex items-center justify-center group"
                aria-label="Siguiente anuncio"
            >
                <ChevronRight size={16} className="text-justo-cream/60 group-hover:text-justo-cream transition-colors" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {announcements.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setIsTransitioning(true);
                            setTimeout(() => {
                                setCurrentIndex(index);
                                setIsTransitioning(false);
                            }, 150);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-4 bg-justo-beige'
                                : 'w-1.5 bg-white/30 hover:bg-white/50'
                            }`}
                        aria-label={`Ir al anuncio ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
