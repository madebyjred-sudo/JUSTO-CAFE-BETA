import React from 'react';
import { Button } from './Button';
import { Calendar, Package, Smile } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { ViewState } from '../types';

interface SubscriptionProps {
  isOverlay?: boolean;
  variant?: 'light' | 'dark';
  onNavigate?: (view: ViewState) => void;
}

export const Subscription: React.FC<SubscriptionProps> = ({ isOverlay = true, variant = 'light', onNavigate }) => {
  const containerClasses = isOverlay
    ? "relative z-50 -mt-12 py-24 rounded-t-[2.5rem]"
    : "relative py-24"; // Flat style for Shop page

  // Define colors based on variant
  const isDark = variant === 'dark';

  // Changed light variant from bg-justo-beige/20 to solid bg-[#F5F1E8] (Cream) to ensure no background bleeding from Origin section
  const bgClass = isDark ? "bg-justo-dark" : "bg-[#F5F1E8]";
  const titleClass = isDark ? "text-justo-cream" : "text-justo-dark";
  const descClass = isDark ? "text-justo-cream/70" : "text-justo-dark/70";
  const iconClass = isDark ? "text-justo-beige" : "text-justo-brown";
  const itemTitleClass = isDark ? "text-justo-cream" : "text-justo-dark";
  const itemTextClass = isDark ? "text-justo-cream/60" : "text-gray-600";
  const buttonVariant = isDark ? "cream" : "primary";

  // Hover background colors for the cards
  const hoverBgClass = isDark ? "bg-white/5" : "bg-justo-dark/5";
  const iconBgClass = isDark ? "bg-justo-beige/10 group-hover:bg-justo-beige/20" : "bg-justo-brown/10 group-hover:bg-justo-brown/20";

  // Glow Color
  const glowColor = isDark ? "bg-justo-beige/30" : "bg-justo-brown/30";

  return (
    <section className={`${containerClasses} ${bgClass} overflow-hidden`}>

      {/* Grid Pattern Overlay - Only for light variant */}
      {!isDark && (
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0"></div>
      )}

      <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
        <RevealOnScroll>
          <h2 className={`font-heading text-5xl mb-6 ${titleClass}`}>Nunca te quedes sin café</h2>
          <p className={`font-sans text-xl mb-12 font-light ${descClass} max-w-2xl mx-auto`}>
            Suscríbete y recibe tu café recién tostado con la frecuencia que elijas. Sin compromisos, cancela cuando quieras.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Calendar, title: "Elige tu frecuencia", text: "Cada 1, 2, o 4 semanas." },
              { icon: Package, title: "Envíos Gratis", text: "En todas las suscripciones." },
              { icon: Smile, title: "Ahorra 10%", text: "En cada orden recurrente." }
            ].map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center p-8 rounded-golden-lg transition-all duration-300 hover:-translate-y-2 cursor-default"
              >
                {/* Hidden Hover Background Effect */}
                <div className={`absolute inset-0 rounded-golden-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hoverBgClass}`}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">

                  {/* Icon Container with Glow */}
                  <div className="relative mb-6">
                    {/* The Glow */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-[2.2] transition-all duration-700 ease-out pointer-events-none ${glowColor}`}></div>

                    {/* The Circle */}
                    <div className={`relative z-10 p-4 rounded-full transition-colors duration-300 ${iconBgClass}`}>
                      <item.icon className={`w-8 h-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${iconClass}`} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h4 className={`font-body font-bold uppercase tracking-wider mb-3 text-lg ${itemTitleClass}`}>{item.title}</h4>
                  <p className={`text-sm font-sans font-light ${itemTextClass}`}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant={buttonVariant}
            size="lg"
            onClick={() => {
              onNavigate?.('subscription');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Empezar Suscripción
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
};