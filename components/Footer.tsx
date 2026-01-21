import React from 'react';
import { Instagram, Facebook, Mail, MessageCircle } from 'lucide-react';
import { ViewState } from '../types';

interface FooterProps {
  onNavigate?: (view: ViewState) => void;
  currentView?: ViewState;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentView }) => {
  const handleNavigate = (view: ViewState) => {
    onNavigate?.(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mini WhatsApp Floating Button (hidden on subscription page) */}
      {currentView !== 'subscription' && (
        <button
          onClick={() => window.open('https://wa.me/573144628067', '_blank')}
          className="fixed bottom-24 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={24} strokeWidth={2} />
          <span className="absolute right-full mr-3 bg-justo-dark text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ¿Necesitas ayuda?
          </span>
        </button>
      )}

      {/* Footer */}
      <footer className="relative z-50 bg-justo-cream pt-16 pb-10 border-t border-justo-dark/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-1 md:col-span-1">
              <span className="font-heading text-4xl text-justo-dark block mb-6">Justo</span>
              <p className="font-sans text-sm text-justo-dark/70 leading-relaxed font-light">
                Café de especialidad tostado en pequeñas cantidades. Celebrando la tradición colombiana con una visión moderna.
              </p>
            </div>

            {/* Links - Shop */}
            <div className="col-span-1">
              <h4 className="font-body font-bold uppercase tracking-widest text-xs mb-6 text-justo-brown">Comprar</h4>
              <ul className="space-y-3 font-body text-sm text-justo-dark">
                <li>
                  <button onClick={() => handleNavigate('shop')} className="hover:underline hover:text-justo-brown transition-colors">
                    Café
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('subscription')} className="hover:underline hover:text-justo-brown transition-colors">
                    Suscripciones
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('methods')} className="hover:underline hover:text-justo-brown transition-colors">
                    Recetas
                  </button>
                </li>
              </ul>
            </div>

            {/* Links - About */}
            <div className="col-span-1">
              <h4 className="font-body font-bold uppercase tracking-widest text-xs mb-6 text-justo-brown">Nosotros</h4>
              <ul className="space-y-3 font-body text-sm text-justo-dark">
                <li>
                  <button onClick={() => handleNavigate('origin')} className="hover:underline hover:text-justo-brown transition-colors">
                    Nuestro Origen
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('origin')} className="hover:underline hover:text-justo-brown transition-colors">
                    Impacto Social
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('home')} className="hover:underline hover:text-justo-brown transition-colors">
                    Inicio
                  </button>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="col-span-1">
              <h4 className="font-body font-bold uppercase tracking-widest text-xs mb-6 text-justo-brown">Síguenos</h4>
              <div className="flex space-x-4 mb-8">
                <Instagram className="w-5 h-5 text-justo-dark hover:text-justo-brown cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-justo-dark hover:text-justo-brown cursor-pointer transition-colors" />
                <Mail className="w-5 h-5 text-justo-dark hover:text-justo-brown cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-justo-dark/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <span className="font-sans text-xs text-justo-dark/50 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Justo Café SAS. Todos los derechos reservados.
            </span>

            <div className="flex items-center space-x-4 grayscale opacity-70">
              {/* Simple CSS Logos simulating PayU/Cards */}
              <div className="h-6 px-2 border border-gray-400 rounded-golden-sm flex items-center text-[10px] font-bold font-body">VISA</div>
              <div className="h-6 px-2 border border-gray-400 rounded-golden-sm flex items-center text-[10px] font-bold font-body">MC</div>
              <div className="h-6 px-2 border border-gray-400 rounded-golden-sm flex items-center text-[10px] font-bold text-blue-800 font-body">PSE</div>
              <div className="h-6 px-2 border border-gray-400 rounded-golden-sm flex items-center text-[10px] font-bold font-body">PayU</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};