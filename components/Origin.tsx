import React from 'react';
import { Button } from './Button';
import { RevealOnScroll } from './RevealOnScroll';
import { MapPin, Mountain, ThermometerSun } from 'lucide-react';
import { ViewState } from '../types';

interface OriginProps {
  onNavigate?: (view: ViewState) => void;
}

export const Origin: React.FC<OriginProps> = ({ onNavigate }) => {
  return (
    // Added -mt-12 and relative z-40 to overlap ProductGrid section
    <section className="relative z-40 -mt-12 bg-[#F5F1E8] text-justo-dark py-20 md:py-32 rounded-t-[2.5rem]">
      <div className="container mx-auto px-6">
        {/* Background Texture & Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-justo-brown/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row items-center gap-16">
              {/* Image Side with Arched Window Mask */}
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/5] rounded-t-full rounded-b-golden-xl overflow-hidden shadow-2xl relative z-10">
                  <img
                    src="/images/origin-family.png"
                    alt="Familia Cafetera San Isidro"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Location Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2 text-justo-dark">
                      <MapPin size={16} />
                      <span className="font-body font-bold text-xs uppercase tracking-wider">Vereda San Isidro</span>
                    </div>
                  </div>
                </div>
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-justo-brown/20 rounded-t-full rounded-b-golden-xl translate-x-4 translate-y-4 -z-0"></div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="font-body text-justo-brown uppercase tracking-[0.2em] text-sm mb-4">
                  Nuestro Origen
                </span>
                <h2 className="font-heading text-5xl md:text-6xl text-justo-dark mb-6 leading-tight">
                  El Origen
                </h2>
                <div className="w-20 h-1 bg-justo-brown mb-8"></div>
                <p className="font-sans text-xl text-justo-dark/80 leading-relaxed font-light mb-6">
                  Nuestro café nace en la vereda San Isidro, en el corazón del Cauca, muy cerca de la ciudad de Piendamó. Allí, rodeado de montañas fértiles, clima ideal y manos expertas, se cultiva un café reconocido por su calidad y por el valor de su gente.
                </p>
                <p className="font-sans text-xl text-justo-dark/80 leading-relaxed font-light mb-10">
                  Trabajadores apasionados que han hecho de esta tierra <span className="text-justo-brown font-medium italic">"la tierra del café y las flores"</span>. Son pequeños productores que día a día buscan la excelencia en cada grano.
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-6 mb-10">
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

                <div className="flex">
                  <Button
                    variant="primary"
                    onClick={() => {
                      onNavigate?.('origin');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Conoce Más
                  </Button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};