import React, { useState } from 'react';
import { Calendar, Sparkles, Music2 } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const shareEvent = async () => {
    const shareData = {
      title: 'PARTY EN MI BARRIO 2.0',
      text: 'PARTY EN MI BARRIO 2.0 — Cris JP, ESTEBAN ZG, Felim, 4Five',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData as any);
      } else {
        await navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} ${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

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
          <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-0 relative z-10">
              <div className="aspect-[4/3] md:aspect-auto md:min-h-[400px] relative">
                <img
                  src="https://i.imgur.com/0MNXct7.jpeg"
                  alt="Evento en JUPITER Dosquebradas"
                  className="w-full h-full object-cover shadow-none"
                />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6">
                  <span className="inline-block bg-urban-gold text-zinc-950 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                    Entrada GRATIS
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-urban-gold/20 flex items-center justify-center border-2 border-urban-gold/40">
                    <Calendar size={24} className="text-urban-gold" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-urban-red/20 flex items-center justify-center border-2 border-urban-red/40">
                    <Music2 size={24} className="text-urban-red" />
                  </div>
                </div>

                <span className="inline-block bg-urban-red/20 text-urban-red border border-urban-red/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit mx-auto md:mx-0">
                  14 de Marzo
                </span>

                <h3 className="text-3xl md:text-4xl font-bold text-white display-font leading-tight mb-4 uppercase">
                  PARTY EN MI BARRIO 2.0
                </h3>

                <p className="text-zinc-400 font-medium uppercase tracking-wide mb-2">
                  Artistas: Cris JP, ESTEBAN ZG, Felim, 4Five
                </p>
                <p className="text-urban-gold text-lg md:text-xl font-bold uppercase tracking-widest mb-6">
                  6:00 PM · Entrada GRATIS
                </p>

                <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">
                  <Sparkles size={14} className="inline mr-1 align-middle" />
                  Música, fiesta y la mejor vibra
                </p>

                <div className="mt-6 flex flex-col items-center md:items-start gap-4">
                  <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                    <a
                      href="https://wa.me/573157279288"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-urban-gold text-black px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap max-w-full"
                    >
                      Información
                    </a>

                    <a
                      href="https://maps.app.goo.gl/5ekP6Gaj1r5kdsJX8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-zinc-700 text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-transform whitespace-nowrap max-w-full"
                    >
                      ¿Cómo llegar?
                    </a>
                  </div>

                  <div className="w-full flex justify-center md:justify-start">
                    <button
                      onClick={shareEvent}
                      className="inline-flex items-center gap-2 border border-zinc-700 text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-transform whitespace-nowrap"
                    >
                      {copied ? 'Copiado' : 'Compartir'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
