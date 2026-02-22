import React, { useRef, useState } from 'react';
import { Button } from './Button';
import { RevealOnScroll } from './RevealOnScroll';
import { ChevronDown } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate?: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const islandRef = useRef<HTMLDivElement>(null);
  const [islandPos, setIslandPos] = useState({ x: 0, y: 0 });

  const handleIslandMove = (e: React.MouseEvent) => {
    if (!islandRef.current) return;
    const { left, top, width, height } = islandRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) / 60;
    const y = (e.clientY - (top + height / 2)) / 60;
    setIslandPos({ x, y });
  };

  const handleIslandLeave = () => {
    setIslandPos({ x: 0, y: 0 });
  };

  const scrollToContent = () => {
    // Scroll to the Values section (just below Hero)
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-justo-dark">

      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* IMPROVED OVERLAYS: More depth, better text legibility */}
        <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-justo-dark via-justo-dark/40 to-black/30 z-10" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 mix-blend-overlay"></div>

        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          className="w-full h-full object-cover scale-105"
          onError={(e) => {
            // Fallback: hide video and show background image
            const video = e.currentTarget;
            video.style.display = 'none';
            const fallback = video.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
          }}
        >
          <source src="/videos/hero-roasting.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        {/* Fallback background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center hidden"
          style={{ backgroundImage: 'url(/images/hero-poster.jpg)' }}
        />
      </div>

      {/* Content Container */}
      {/* Kept the perfect padding from previous iteration: pb-72 desktop */}
      <div className="absolute inset-0 z-40 flex flex-col justify-center px-8 md:px-24 pb-40 md:pb-72 pointer-events-none">
        <RevealOnScroll>
          <div className="max-w-4xl relative pointer-events-auto">

            {/* Location Text */}
            <span className="font-body text-justo-beige uppercase tracking-[0.3em] text-xs md:text-sm mb-4 block font-bold animate-fade-in drop-shadow-md">
              Colombia - Bogotá - Cauca
            </span>

            {/* Title */}
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-justo-cream mb-6 drop-shadow-2xl leading-[0.9]">
              Tostado con <br />
              <span className="italic text-white/95">Intención.</span>
            </h1>

            {/* Paragraph */}
            <p className="font-sans text-justo-cream/90 text-base md:text-xl font-light mb-8 max-w-lg leading-relaxed drop-shadow-lg border-l border-justo-cream/30 pl-6">
              Cultivando relaciones justas y sabores excepcionales, directamente desde la finca hasta tu taza.
            </p>

            {/* Buttons */}
            <div className="relative inline-flex flex-col sm:flex-row gap-5">
              <Button
                variant="cream"
                size="lg"
                className="shadow-2xl shadow-justo-beige/10"
                onClick={() => {
                  onNavigate?.('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Comprar Café
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="!border-justo-cream !text-justo-cream hover:!bg-justo-cream hover:!text-justo-dark backdrop-blur-sm"
                onClick={() => {
                  onNavigate?.('subscription');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Suscripción
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* INTERACTIVE ISLAND SCROLL INDICATOR */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <div
          ref={islandRef}
          onMouseMove={handleIslandMove}
          onMouseLeave={handleIslandLeave}
          onClick={scrollToContent}
          style={{
            transform: `translate3d(${islandPos.x}px, ${islandPos.y}px, 0)`,
          }}
          className="p-6 -m-6 cursor-pointer transition-transform duration-300 ease-out will-change-transform group tap-highlight-transparent"
          aria-label="Deslizar hacia abajo"
        >
          <div className="w-32 h-1 bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:border-white/20 transition-colors">
            {/* The "Charge" - Moving light */}
            <div className="h-full bg-justo-cream/80 w-1/3 rounded-full animate-[drift_2s_ease-in-out_infinite_alternate] group-hover:w-1/2 transition-all duration-500"></div>
          </div>

          {/* Subtle Chevron - Always visible on mobile to guide users, hover on desktop */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 text-justo-cream/50">
            <ChevronDown size={16} className="animate-bounce" />
          </div>
        </div>
      </div>

    </section>
  );
};