import React, { useState, useEffect } from 'react';
import { Music2, X, ChevronLeft, ChevronRight, Clock3, Volume2, VolumeX, Instagram } from 'lucide-react';

type NewsMediaItem = {
  type: 'image' | 'video';
  url: string;
  alt: string;
};

type NewsItem = {
  id: string;
  title: string;
  date: string;
  shortText: string;
  fullText: string[];
  media: NewsMediaItem[];
  actions?: Array<{
    label: string;
    url: string;
  }>;
};

const newsTimeline: NewsItem[] = [
  {
    id: 'ar-sessions-gala-2026',
    title: 'AR SESSIONS GALA 2026',
    date: '25 de febrero de 2026',
    shortText: 'Un momento que supero todas las expectativas. La gala de las AR SESSIONS reunio artistas, managers, productores y parte clave de la industria urbana de Pereira.',
    fullText: [
      'Un momento que supero todas las expectativas. La gala de las AR SESSIONS reunio artistas, managers, productores y una parte importante de la industria musical urbana de Pereira y la region.',
      'Agradecemos tambien a la Camara de Comercio de Pereira por el apoyo, a todos los asistentes y claramente a los artistas de la noche: @pereiranboy @is_akiraaa @felim.v13 @sello_rap @isdajere @lebrondelghetto @echebb @_el.tomas_ @cashlouki @bryanbuenob2. Muy tesos todos.'
    ],
    media: [
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395197/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_5_rhifj5.jpg',
        alt: 'AR SESSIONS GALA 2026 - foto 1'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395197/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_4_tnh1kr.jpg',
        alt: 'AR SESSIONS GALA 2026 - foto 2'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395198/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_3_onqmut.jpg',
        alt: 'AR SESSIONS GALA 2026 - foto 3'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395199/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_2_xx9fkw.jpg',
        alt: 'AR SESSIONS GALA 2026 - foto 4'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395199/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_1_ach9ew.jpg',
        alt: 'AR SESSIONS GALA 2026 - foto 5'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1772395201/Un_momento_que_super%C3%B3_todas_las_expectativas_La_gala_de_las_AR_SESSIONS_reuni%C3%B3_Artistas_Manag_fgxdwp.jpg',
        alt: 'AR SESSIONS GALA 2026 - foto 6'
      }
    ],
    actions: [
      {
        label: 'Instagram AR Records',
        url: 'https://www.instagram.com/ar.recordsco/'
      }
    ]
  },
  {
    id: 'party-en-mi-barrio-2',
    title: 'Party en mi Barrio 2.0',
    date: '14 de marzo de 2026',
    shortText: 'Party en mi Barrio 2.0 convirtio las calles en un punto de encuentro para la musica urbana local y dejo claro que en Pereira hay talento, identidad y movimiento.',
    fullText: [
      'Pereira vivio una de esas noches que no se olvidan. Party en mi Barrio 2.0 convirtio las calles en un punto de encuentro para la musica urbana local, reuniendo a una comunidad que no solo fue a escuchar, sino a cantar, respaldar y demostrar que en la ciudad hay talento de sobra.',
      'El evento dejo claro que el movimiento sigue creciendo. Artistas y publico conectaron en una misma energia, impulsando canciones como Traje Perreo RMX y reafirmando el sonido que se esta construyendo desde La Perla.',
      'Detras del ambiente de fiesta tambien quedo un mensaje contundente: el talento pereirano esta presente, esta activo y esta moviendo gente. No se trata solo de estar pegados en cifras o plataformas, sino de llenar cuadras, discotecas y eventos, como ya esta ocurriendo.',
      'Sin embargo, tambien se abre una reflexion dentro de la escena: la importancia de representar el origen. En una industria donde muchos logran visibilidad fuera de la ciudad, surge la pregunta sobre por que no siempre se reconoce de donde vienen. Para quienes estan construyendo este movimiento, la respuesta es clara: cada oportunidad es un espacio para decir quienes somos y de donde venimos.',
      'La nueva generacion lo tiene como tarea. No solo hacer musica, sino posicionar a Pereira como una plaza con identidad, con nivel y con una cultura urbana que sigue tomando fuerza.',
      'Esto apenas comienza.'
    ],
    media: [
      {
        type: 'video',
        url: 'https://res.cloudinary.com/dwahbaa1r/video/upload/v1774229316/Party_en_mi_Barrio_2.0Una_noche_para_la_historia_en_Pereira_Agradecido_con_Dios_por_las_pers_ohmqtv.mp4',
        alt: 'Party en mi Barrio 2.0 - video principal'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774229316/Party_en_mi_Barrio_2.0Una_noche_para_la_historia_en_Pereira_Agradecido_con_Dios_por_las_pers_n3fn7l.jpg',
        alt: 'Party en mi Barrio 2.0 - foto 1'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774229314/Party_en_mi_Barrio_2.0Una_noche_para_la_historia_en_Pereira_Agradecido_con_Dios_por_las_pers_1_nmtnb4.jpg',
        alt: 'Party en mi Barrio 2.0 - foto 2'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774229314/Party_en_mi_Barrio_2.0Una_noche_para_la_historia_en_Pereira_Agradecido_con_Dios_por_las_pers_2_fe9pag.jpg',
        alt: 'Party en mi Barrio 2.0 - foto 3'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774229313/Party_en_mi_Barrio_2.0Una_noche_para_la_historia_en_Pereira_Agradecido_con_Dios_por_las_pers_3_ylt6dl.jpg',
        alt: 'Party en mi Barrio 2.0 - foto 4'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774229312/En_Pereira_s%C3%AD_hay_nivel_es_imposible_negarloPero_c%C3%B3mo_queremos_que_nuestra_gente_reconozca_el_2_jxztpc.jpg',
        alt: 'Party en mi Barrio 2.0 - foto 5'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774229311/En_Pereira_s%C3%AD_hay_nivel_es_imposible_negarloPero_c%C3%B3mo_queremos_que_nuestra_gente_reconozca_el_1_y5zx4e.jpg',
        alt: 'Party en mi Barrio 2.0 - foto 6'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774229310/Se_hizo_m%C3%A1s_que_real_en_el_barrio._El_combo_con_la_Z_Gracias_a_todos_los_que_hicieron_p_wmues7.jpg',
        alt: 'Party en mi Barrio 2.0 - foto 7'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774229310/Se_hizo_m%C3%A1s_que_real_en_el_barrio._El_combo_con_la_Z_Gracias_a_todos_los_que_hicieron_p_1_mrl7ls.jpg',
        alt: 'Party en mi Barrio 2.0 - foto 8'
      }
    ],
    actions: [
      {
        label: 'Instagram Cris JP',
        url: 'https://www.instagram.com/cris_jp_oficial/'
      }
    ]
  },
  {
    id: 'dele-ka-foster',
    title: 'DELE - K.A x FOSTER x NATH x DFZM',
    date: '20 de marzo de 2026',
    shortText: 'Desde Pereira para Colombia, K.A y FOSTER soltaron DELE junto a NATH y DFZM. Un lanzamiento historico con sello de Medellin, Buenaventura y La Perla.',
    fullText: [
      'El productor pereirano K.A, en compania del compositor FOSTER, quien tambien ha hecho parte de temas como Se Supone junto a BLESSD, acaban de firmar un lanzamiento historico.',
      'Esta vez unieron fuerzas con artistas de Medellin y Buenaventura como NATH y DFZM para soltar DELE, una cancion que mezcla calle, melodia y una vibra internacional sin perder la esencia del barrio.',
      'No fue solo un estreno mas. Fue una jugada seria que pone a Pereira en la conversacion grande de la musica urbana, demostrando que aqui hay vision, produccion y nivel para competir de frente.',
      'La energia que se siente en DELE confirma que la nueva camada viene con hambre y disciplina: cada verso, cada arreglo y cada colaboracion hablan de un movimiento que ya no pide permiso.',
      'Cuando se conectan talento, identidad y trabajo real, pasan cosas como esta. Y este capitulo apenas abre una etapa mas fuerte para La Perla.'
    ],
    media: [
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774232722/Dele_oh382v.jpg',
        alt: 'DELE - portada oficial'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774233061/Seguimos_so%C3%B1ando_porque_se_nos_va_a_dar_con_Dios_primero_---_char_ls10_ub00kb.jpg',
        alt: 'DELE - post promocional 1'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dwahbaa1r/image/upload/v1774233135/SE_SUPONE_1_en_Colombia_con_los_Masters_blessd_deezyoff_prime.msm_dimelojara_gloria_a_Dio_dgopku.jpg',
        alt: 'DELE - post promocional 2'
      }
    ],
    actions: [
      {
        label: 'Escucha en Spotify',
        url: 'https://open.spotify.com/intl-es/track/0Tewtp6lzM3rF3JLwIiuG9?si=7fa47ed6fb02415d'
      },
      {
        label: 'Instagram Foster',
        url: 'https://www.instagram.com/fosteroficial_/'
      },
      {
        label: 'Instagram K.A',
        url: 'https://www.instagram.com/ka_prod_/'
      }
    ]
  }
];

export const NewsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [featuredMediaIndex, setFeaturedMediaIndex] = useState(0);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const latestNewsIndex = newsTimeline.length - 1;
  const [selectedNewsIndex, setSelectedNewsIndex] = useState(latestNewsIndex);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [mutedMedia, setMutedMedia] = useState<Record<string, boolean>>({});

  const featuredNews = newsTimeline[latestNewsIndex];
  const selectedNews = newsTimeline[selectedNewsIndex];
  const featuredInstagramUrl = featuredNews.actions?.find((action) => action.label.toLowerCase().includes('instagram'))?.url
    ?? featuredNews.actions?.[0]?.url
    ?? 'https://www.instagram.com/cris_jp_oficial/';
  const isInstagramLink = (label: string) => label.toLowerCase().includes('instagram');
  const isSpotifyLink = (label: string) => label.toLowerCase().includes('spotify');

  useEffect(() => {
    if (featuredNews.media.length <= 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setFeaturedMediaIndex((prevIndex) => (prevIndex + 1) % featuredNews.media.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [featuredNews.media.length]);

  useEffect(() => {
    setSelectedMediaIndex(0);
  }, [selectedNewsIndex]);

  useEffect(() => {
    if (!isTimelineOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isTimelineOpen]);

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

  const handlePrevFeaturedMedia = () => {
    setFeaturedMediaIndex((prevIndex) => (prevIndex - 1 + featuredNews.media.length) % featuredNews.media.length);
  };

  const handleNextFeaturedMedia = () => {
    setFeaturedMediaIndex((prevIndex) => (prevIndex + 1) % featuredNews.media.length);
  };

  const handlePrevSelectedMedia = () => {
    setSelectedMediaIndex((prevIndex) => (prevIndex - 1 + selectedNews.media.length) % selectedNews.media.length);
  };

  const handleNextSelectedMedia = () => {
    setSelectedMediaIndex((prevIndex) => (prevIndex + 1) % selectedNews.media.length);
  };

  const isMediaMuted = (media: NewsMediaItem) => mutedMedia[media.url] ?? false;

  const toggleMediaMuted = (media: NewsMediaItem) => {
    setMutedMedia((prevState) => ({
      ...prevState,
      [media.url]: !(prevState[media.url] ?? false)
    }));
  };

  const renderMediaSlide = (media: NewsMediaItem, className: string, showMuteButton = false) => {
    if (media.type === 'video') {
      return (
        <div className="relative w-full h-full">
          <video
            src={media.url}
            controls
            playsInline
            muted={isMediaMuted(media)}
            className={className}
          >
            Tu navegador no soporta video HTML5.
          </video>

          {showMuteButton && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleMediaMuted(media);
              }}
              className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm hover:bg-black/85"
              aria-label={isMediaMuted(media) ? 'Activar sonido' : 'Silenciar video'}
            >
              {isMediaMuted(media) ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMediaMuted(media) ? 'Mute' : 'Audio'}</span>
            </button>
          )}
        </div>
      );
    }

    return (
      <img
        src={media.url}
        alt={media.alt}
        className={className}
      />
    );
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

        <div className="grid gap-6">
          {/* NOTICIAS */}
          <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm overflow-hidden relative">
            <div className="flex flex-col relative z-10">
              {/* Carrusel de imágenes */}
              <div className="aspect-video relative group overflow-hidden bg-black">
                {renderMediaSlide(
                  featuredNews.media[featuredMediaIndex],
                  'w-full h-full object-contain shadow-none transition-opacity duration-700',
                  true
                )}
                
                {/* Gradiente oscuro sobre la imagen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* Botones de navegación */}
                <button
                  onClick={handlePrevFeaturedMedia}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={handleNextFeaturedMedia}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicadores de página */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {featuredNews.media.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFeaturedMediaIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === featuredMediaIndex 
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
                  {featuredNews.title}
                </h4>

                <p className="text-zinc-400 font-medium tracking-wide mb-6 line-clamp-2">
                  {featuredNews.shortText}
                </p>

                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-zinc-500 mb-2">
                  <Clock3 size={14} className="text-urban-red" />
                  <span>{newsTimeline.length} historias en la linea de tiempo</span>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={() => setIsTimelineOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-urban-red text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap text-sm"
                  >
                    Ver más
                  </button>

                  <a
                    href={featuredInstagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full font-bold uppercase tracking-widest transition-transform hover:scale-[1.02] whitespace-nowrap text-sm text-white border border-fuchsia-300/30 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-orange-500 shadow-[0_8px_28px_rgba(236,72,153,0.35)]"
                  >
                    <Instagram size={16} />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTimelineOpen && (
        <div className="fixed inset-0 z-[200]">
          <button
            onClick={() => setIsTimelineOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Cerrar panel de noticias"
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
            <div className="flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-950/95 shadow-2xl">
              <div className="border-b border-zinc-800 px-6 py-5 md:px-8 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-urban-red mb-2">Archivo vivo</p>
                  <h2 className="text-2xl md:text-4xl font-bold text-white display-font uppercase">
                    Linea de tiempo
                  </h2>
                </div>
                <button
                  onClick={() => setIsTimelineOpen(false)}
                  className="text-white hover:text-urban-red transition-colors p-2 hover:bg-zinc-900 rounded-full"
                  aria-label="Cerrar"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="grid h-full md:grid-cols-[340px,1fr] overflow-hidden">
                <aside className="border-b md:border-b-0 md:border-r border-zinc-800 overflow-y-auto px-6 py-6 md:px-5 bg-zinc-950">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-[0.35em] mb-6">
                    <Clock3 size={14} className="text-urban-gold" />
                    <span>{newsTimeline.length} noticias</span>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute left-[9px] top-1 bottom-1 w-px bg-gradient-to-b from-urban-gold via-zinc-700 to-urban-red"></div>

                    <div className="space-y-5">
                      {newsTimeline.map((item, index) => {
                        const isActive = index === selectedNewsIndex;

                        return (
                          <button
                            key={item.id}
                            onClick={() => setSelectedNewsIndex(index)}
                            className={`relative w-full text-left rounded-2xl border px-4 py-4 transition-all ${
                              isActive
                                ? 'bg-zinc-900 border-urban-red shadow-[0_0_0_1px_rgba(220,38,38,0.2)]'
                                : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/80'
                            }`}
                          >
                            <span className={`absolute -left-[22px] top-5 h-4 w-4 rounded-full border-4 ${
                              isActive ? 'border-zinc-950 bg-urban-red' : 'border-zinc-950 bg-zinc-700'
                            }`}></span>
                            <p className="text-[11px] uppercase tracking-[0.3em] text-urban-gold mb-2">{item.date}</p>
                            <h3 className="text-white font-bold uppercase tracking-wide leading-snug mb-2">{item.title}</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">{item.shortText}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </aside>

                <div className="overflow-y-auto px-6 py-6 md:px-8 md:py-8">
                  <div className="max-w-5xl">
                    <span className="inline-flex items-center gap-2 bg-urban-gold/15 text-urban-gold border border-urban-gold/25 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                      {selectedNews.date}
                    </span>

                    <h3 className="text-3xl md:text-5xl font-bold text-white display-font uppercase leading-tight mb-4">
                      {selectedNews.title}
                    </h3>

                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
                      {selectedNews.shortText}
                    </p>

                    <div className="relative group rounded-[28px] overflow-hidden bg-black border border-zinc-800 mb-5 aspect-video">
                      {renderMediaSlide(
                        selectedNews.media[selectedMediaIndex],
                        'w-full h-full object-contain bg-black',
                        true
                      )}

                      {selectedNews.media.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevSelectedMedia}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Media anterior"
                          >
                            <ChevronLeft size={24} />
                          </button>

                          <button
                            onClick={handleNextSelectedMedia}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Siguiente media"
                          >
                            <ChevronRight size={24} />
                          </button>
                        </>
                      )}
                    </div>

                    {selectedNews.media.length > 1 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
                        {selectedNews.media.map((media, index) => {
                          const isActive = index === selectedMediaIndex;

                          if (media.type === 'video') {
                            return (
                              <div
                                key={`${selectedNews.id}-${media.url}`}
                                className={`relative aspect-square overflow-hidden rounded-2xl border bg-zinc-900 ${
                                  isActive ? 'border-urban-red' : 'border-zinc-800'
                                }`}
                              >
                                <video
                                  src={media.url}
                                  controls
                                  playsInline
                                  muted={isMediaMuted(media)}
                                  preload="metadata"
                                  className="w-full h-full object-cover bg-black"
                                  onPlay={() => setSelectedMediaIndex(index)}
                                >
                                  Tu navegador no soporta video HTML5.
                                </video>
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    toggleMediaMuted(media);
                                  }}
                                  className="absolute top-2 right-2 z-20 inline-flex items-center justify-center rounded-full border border-white/15 bg-black/70 p-2 text-white backdrop-blur-sm hover:bg-black/85"
                                  aria-label={isMediaMuted(media) ? 'Activar sonido' : 'Silenciar video'}
                                >
                                  {isMediaMuted(media) ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                </button>
                                <div className="pointer-events-none absolute top-2 left-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                                  Video
                                </div>
                              </div>
                            );
                          }

                          return (
                            <button
                              key={`${selectedNews.id}-${media.url}`}
                              onClick={() => setSelectedMediaIndex(index)}
                              className={`relative aspect-square overflow-hidden rounded-2xl border bg-zinc-900 ${
                                isActive ? 'border-urban-red' : 'border-zinc-800 hover:border-zinc-600'
                              }`}
                              aria-label={`Abrir media ${index + 1}`}
                            >
                              <img src={media.url} alt={media.alt} className="w-full h-full object-cover" />
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <div className="space-y-5 mb-8">
                      {selectedNews.fullText.map((paragraph) => (
                        <p key={paragraph} className="text-zinc-300 text-base md:text-lg leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                      {(selectedNews.actions && selectedNews.actions.length > 0 ? selectedNews.actions : [
                        {
                          label: 'Seguir en Instagram',
                          url: 'https://www.instagram.com/cris_jp_oficial/'
                        }
                      ]).map((action, index) => (
                        <a
                          key={`${selectedNews.id}-${action.url}`}
                          href={action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold uppercase tracking-widest transition-transform hover:scale-105 ${
                            isInstagramLink(action.label)
                              ? 'text-white border border-fuchsia-300/30 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-orange-500 shadow-[0_8px_28px_rgba(236,72,153,0.35)]'
                              : isSpotifyLink(action.label)
                              ? 'text-white bg-[#1DB954] border border-[#34d26f] shadow-[0_8px_28px_rgba(29,185,84,0.35)] hover:bg-[#1aa34a]'
                              : index === 0
                              ? 'bg-urban-red text-white'
                              : 'border border-zinc-700 text-white hover:bg-zinc-900'
                          }`}
                        >
                          {isInstagramLink(action.label) && <Instagram size={16} />}
                          {action.label}
                        </a>
                      ))}

                      <button
                        onClick={() => setIsTimelineOpen(false)}
                        className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-white px-5 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-900 transition-transform"
                      >
                        Cerrar panel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
