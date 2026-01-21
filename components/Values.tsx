import React, { useRef, useState, useEffect } from 'react';
import { Award, Leaf, Flame, Truck } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const VALUES = [
  { icon: Award, title: 'Calidad Meticulosa', text: 'Selección grano a grano.' },
  { icon: Leaf, title: 'Origen Ético', text: 'Trato directo con caficultores.' },
  { icon: Flame, title: 'Tostión Artesanal', text: 'Perfiles que resaltan el terroir.' },
  { icon: Truck, title: 'Entrega Mismo Día', text: 'Pide y recibe hoy (Bogotá).' },
];

export const Values: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Magnetic Logic
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isMobile) return; // Disable on mobile

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Very subtle effect (divisor 80)
    const x = (e.clientX - (left + width / 2)) / 80;
    const y = (e.clientY - (top + height / 2)) / 80;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    // Reduced negative margin on mobile (-mt-32) to avoid text overlap with Hero if font sizes change
    <section className="relative z-30 -mt-32 md:-mt-96 pb-12 md:pb-24 pointer-events-none perspective-1000">
      
      <div className="container mx-auto px-6 relative z-10">
        <RevealOnScroll>
            {/* Glass Island Container with Magnetic Effect */}
            <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                }}
                className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] pointer-events-auto transition-transform duration-300 ease-out will-change-transform"
            >
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 text-center">
                {VALUES.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-default">
                    
                    {/* Icon Container with Deep State Layer Glow */}
                    <div className="relative mb-6">
                        
                        {/* 1. STATE LAYER (The Glow) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-justo-beige/20 rounded-full blur-xl group-hover:bg-justo-beige/40 group-hover:scale-150 transition-all duration-700 ease-out"></div>
                        
                        {/* 2. GLASS SURFACE (The Button) */}
                        <div className="relative z-10 p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-justo-beige/30 transition-all duration-300 shadow-lg backdrop-blur-sm">
                            <val.icon className="w-8 h-8 text-justo-cream transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:text-justo-beige" strokeWidth={1.5} />
                        </div>
                    </div>

                    <h3 className="font-body text-lg uppercase tracking-wider text-justo-cream mb-2 font-bold relative z-10 drop-shadow-md">
                        {val.title}
                    </h3>
                    <p className="font-sans text-sm text-justo-cream/70 max-w-[150px] relative z-10 font-light leading-snug">
                        {val.text}
                    </p>
                    </div>
                ))}
                </div>
            </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};