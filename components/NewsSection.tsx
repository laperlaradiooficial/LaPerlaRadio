import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, Music2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  const newsImages = [
    'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395197/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_5_rhifj5.jpg',
    'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395197/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_4_tnh1kr.jpg',
    'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395198/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_3_onqmut.jpg',
    'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395199/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_2_xx9fkw.jpg',
    'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395199/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_1_ach9ew.jpg',
    'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395201/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_fgxdwp.jpg'
  ];

  const newsContent = {
    title: 'AR SESSIONS GALA 2026',
    shortText: 'Un momento que superó todas las expectativas!! La gala de las AR SESSIONS reunió Artistas, Managers, productores...,',
    fullText: 'Un momento que superó todas las expectativas!! La gala de las AR SESSIONS reunió Artistas, Managers, productores y una parte importante de la industria musical urbana de Pereira y la región.\n\nAgradecemos también a la @camarapereira por el apoyo, a todos los asistentes y claramente a los artistas de la noche\n@pereiranboy @is_akiraaa @felim.v13 @sello_rap @isdajere @lebrondelghetto @echebb @_el.tomas_ @cashlouki @bryanbuenob2 muy tesos todos!!! 🔥🔥🔥'
  };

  // Carrusel automático
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % newsImages.length);
    }, 4000); // Cambiar imagen cada 4 segundos

    return () => clearInterval(intervalId);
  }, []);

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

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + newsImages.length) % newsImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % newsImages.length);
  };

  return (
    <section id="noticias" className="py-20 bg-zinc-950 scroll-mt-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-urban-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-urban-red/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white display-font tracking-tight mb-2">
            EVENTOS Y <span className="text-urban-gold">NOTICIAS</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-urban-gold to-urban-red rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* EVENTOS CARD */}
          <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm overflow-hidden relative">
            <div className="flex flex-col relative z-10">
              <div className="aspect-[4/3] relative">
                <img
                  src="https://i.imgur.com/0MNXct7.jpeg"
                  alt="Evento en JUPITER Dosquebradas"
                  className="w-full h-full object-cover shadow-none"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-urban-gold text-zinc-950 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                    Entrada GRATIS
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-start">
                <h3 className="text-lg md:text-xl font-bold text-urban-gold uppercase tracking-widest mb-4">
                  📅 Eventos de La Perla
                </h3>

                <div className="flex justify-start gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-urban-gold/20 flex items-center justify-center border-2 border-urban-gold/40">
                    <Calendar size={24} className="text-urban-gold" />
                  </div>
                </div>

                <span className="inline-block bg-urban-red/20 text-urban-red border border-urban-red/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit">
                  14 de Marzo
                </span>

                <h4 className="text-2xl md:text-3xl font-bold text-white display-font leading-tight mb-4 uppercase">
                  PARTY EN MI BARRIO 2.0
                </h4>

                <p className="text-zinc-400 font-medium uppercase tracking-wide mb-2">
                  Artistas: Cris JP, ESTEBAN ZG, Felim, 4Five
                </p>
                <p className="text-urban-gold text-base md:text-lg font-bold uppercase tracking-widest mb-6">
                  6:00 PM · Entrada GRATIS
                </p>

                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href="https://wa.me/573157279288"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-urban-gold text-black px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap text-sm"
                  >
                    Información
                  </a>

                  <a
                    href="https://maps.app.goo.gl/5ekP6Gaj1r5kdsJX8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-transform whitespace-nowrap text-sm"
                  >
                    ¿Cómo llegar?
                  </a>

                  <button
                    onClick={shareEvent}
                    className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-transform whitespace-nowrap text-sm"
                  >
                    {copied ? 'Copiado' : 'Compartir'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* NOTICIAS CARD CON CARRUSEL */}
          <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm overflow-hidden relative">
            <div className="flex flex-col relative z-10">
              {/* Carrusel de imágenes */}
              <div className="aspect-video relative group overflow-hidden bg-black">
                <img
                  src={newsImages[currentImageIndex]}
                  alt={`Noticia ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain shadow-none transition-opacity duration-700"
                />
                
                {/* Gradiente oscuro sobre la imagen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* Botones de navegación */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicadores de página */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {newsImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex 
                          ? 'bg-urban-gold w-6' 
                          : 'bg-white/40 w-2 hover:bg-white/60'
                      }`}
                      aria-label={`Ir a imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-start">
                <h3 className="text-lg md:text-xl font-bold text-urban-red uppercase tracking-widest mb-4">
                  📰 Noticias de La Perla
                </h3>

                <div className="flex justify-start gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-urban-red/20 flex items-center justify-center border-2 border-urban-red/40">
                    <Music2 size={24} className="text-urban-red" />
                  </div>
                </div>

                <span className="inline-block bg-urban-gold/20 text-urban-gold border border-urban-gold/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit">
                  Últimas Noticias
                </span>

                <h4 className="text-2xl md:text-3xl font-bold text-white display-font leading-tight mb-4 uppercase">
                  {newsContent.title}
                </h4>

                <p className="text-zinc-400 font-medium tracking-wide mb-6 line-clamp-2">
                  {newsContent.shortText}
                </p>

                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={() => setIsNewsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-urban-red text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap text-sm"
                  >
                    Ver más
                  </button>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-transform whitespace-nowrap text-sm"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE NOTICIA COMPLETA */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[200]">
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="sticky top-0 bg-zinc-900/95 border-b border-zinc-800 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white display-font uppercase">
                {newsContent.title}
              </h2>
              <button
                onClick={() => setIsNewsModalOpen(false)}
                className="text-white hover:text-urban-red transition-colors p-2 hover:bg-zinc-800 rounded-full"
                aria-label="Cerrar"
              >
                <X size={28} />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 md:p-8">
              {/* Carrusel de imágenes en el modal */}
              <div className="mb-6 relative group rounded-xl overflow-hidden aspect-video bg-black">
                <img
                  src={newsImages[currentImageIndex]}
                  alt={`Noticia ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {newsImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex 
                          ? 'bg-urban-red w-6' 
                          : 'bg-white/40 w-2 hover:bg-white/60'
                      }`}
                      aria-label={`Ir a imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Texto completo de la noticia */}
              <div className="space-y-4">
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {newsContent.fullText}
                </p>
              </div>

              {/* Botones de acción */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-urban-red text-white px-4 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Seguir en Instagram
                </a>

                <button
                  onClick={() => setIsNewsModalOpen(false)}
                  className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-white px-4 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-transform"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
