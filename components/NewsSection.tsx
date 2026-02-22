import React from 'react';
import { Calendar, Sparkles, Music2 } from 'lucide-react';

export const NewsSection: React.FC = () => {
  return (
    <section id="noticias" className="py-20 bg-zinc-950 scroll-mt-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-urban-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-urban-red/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white display-font tracking-tight mb-2">
            EVENTO <span className="text-urban-gold">DESTACADO</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-urban-gold to-urban-red rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 p-12 md:p-16 rounded-2xl border border-zinc-800 backdrop-blur-sm text-center relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-urban-gold/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-urban-gold/20 flex items-center justify-center border-2 border-urban-gold/40">
                  <Calendar size={32} className="text-urban-gold" />
                </div>
                <div className="w-16 h-16 rounded-full bg-urban-red/20 flex items-center justify-center border-2 border-urban-red/40">
                  <Music2 size={32} className="text-urban-red" />
                </div>
                <div className="w-16 h-16 rounded-full bg-urban-gold/20 flex items-center justify-center border-2 border-urban-gold/40">
                  <Sparkles size={32} className="text-urban-gold" />
                </div>
              </div>

              <span className="inline-block bg-urban-red/20 text-urban-red border border-urban-red/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Estamos preparando algo grande
              </span>

              <h3 className="text-5xl md:text-7xl font-bold text-white display-font leading-none mb-6 uppercase">
                Próximamente
              </h3>
              
              <p className="text-xl md:text-2xl text-zinc-400 font-light uppercase tracking-wide mb-8 max-w-2xl mx-auto">
                Un evento que no te puedes perder. Música, fiesta y la mejor vibra de la ciudad.
              </p>

              <p className="text-zinc-500 text-sm md:text-base font-medium uppercase tracking-widest mb-2">
                Síguenos en redes para ser el primero en enterarte
              </p>
              <div className="inline-flex items-center gap-2 text-urban-gold font-bold uppercase tracking-widest text-sm">
                <Sparkles size={16} className="animate-pulse" />
                Muy pronto revelamos todo
                <Sparkles size={16} className="animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
