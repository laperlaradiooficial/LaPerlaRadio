import React, { useState, useRef, useMemo } from 'react';
import { Play, ChevronDown, ChevronUp, Search, X, Heart, ChevronLeft, ChevronRight, User, Disc, ListMusic } from 'lucide-react';
import { PLAYLIST_DATA } from '../data/playlist';
import { Song } from '../types';

interface ReleasesSectionProps {
  onPlayTrack: (id: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  // New props for external control
  selectedArtist: string | null;
  onArtistSelect: (artist: string | null) => void;
  isExpanded: boolean;
  onToggleExpand: (isExpanded: boolean) => void;
  // Prop para reproducir albums
  onPlayAlbum: (tracks: Song[], startIndex: number) => void;
}

export const ReleasesSection: React.FC<ReleasesSectionProps> = ({ 
  onPlayTrack, 
  favorites, 
  onToggleFavorite,
  selectedArtist,
  onArtistSelect,
  isExpanded,
  onToggleExpand,
  onPlayAlbum
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState<Song | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Improved helper to parse multiple artists from a string
  const parseArtists = (artistStr: string) => {
    return artistStr
      .split(/\s*,\s*|\s+(?:x|Ft\.|ft\.|feat\.|&)\s+/i)
      .map(a => a.trim())
      .filter(Boolean);
  };

  const filteredSongs = useMemo(() => {
    // 1. Creamos una copia del array original para no mutarlo.
    // 2. Usamos .reverse() para que el último item del archivo (el más nuevo) sea el primero en la lista visual.
    const reversedPlaylist = [...PLAYLIST_DATA].reverse();

    return reversedPlaylist.filter(song => {
      const query = searchQuery.toLowerCase();
      const hasActiveFilter = query.length > 0 || !!selectedArtist;

      // CAMBIO IMPORTANTE:
      // Si NO hay filtros activos (vista normal), ocultamos las canciones que son parte de un álbum (isHidden).
      // Si SÍ hay filtros (búsqueda o artista seleccionado), permitimos que se muestren las canciones ocultas si coinciden.
      if (!hasActiveFilter && song.isHidden) return false;

      const matchesSearch = song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query);
      
      if (selectedArtist) {
        const artists = parseArtists(song.artist);
        const matchesArtist = artists.some(a => a.toLowerCase() === selectedArtist.toLowerCase());
        return matchesArtist && matchesSearch;
      }
      
      return matchesSearch;
    });
  }, [searchQuery, selectedArtist]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleArtistClick = (artist: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onArtistSelect(artist);
    onToggleExpand(true); 
    const section = document.getElementById('lanzamientos');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAlbumClick = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    if (song.tracks && song.tracks.length > 0) {
      setSelectedAlbum(song);
    }
  };

  const clearFilters = () => {
    onArtistSelect(null);
    setSearchQuery('');
  };

  const isCarouselMode = !searchQuery && !isExpanded && !selectedArtist;

  return (
    <section id="lanzamientos" className="py-16 bg-urban-black scroll-mt-20 overflow-hidden relative">
      
      {/* ALBUM MODAL */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
              <button 
                onClick={() => setSelectedAlbum(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-urban-red rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Cover Art Side */}
              <div className="w-full md:w-2/5 relative">
                <img src={selectedAlbum.coverUrl} alt={selectedAlbum.title} className="w-full h-64 md:h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
                <div className="absolute bottom-4 left-4 p-4">
                   <h2 className="text-3xl md:text-5xl font-bold text-white display-font uppercase leading-none mb-1">{selectedAlbum.title}</h2>
                   <p className="text-urban-gold font-bold uppercase tracking-widest">{selectedAlbum.artist}</p>
                   <div className="mt-4 flex gap-2">
                      <button 
                        onClick={() => {
                          if (selectedAlbum.tracks) onPlayAlbum(selectedAlbum.tracks, 0);
                          setSelectedAlbum(null);
                        }}
                        className="bg-urban-gold text-black px-6 py-2 rounded-full font-bold uppercase text-xs flex items-center gap-2 hover:scale-105 transition-transform"
                      >
                         <Play size={14} fill="currentColor" /> Reproducir Todo
                      </button>
                   </div>
                </div>
              </div>

              {/* Tracklist Side */}
              <div className="flex-1 p-6 overflow-y-auto bg-zinc-900">
                 <div className="flex items-center gap-2 mb-6 text-zinc-500 text-xs font-bold uppercase tracking-widest border-b border-zinc-800 pb-2">
                    <ListMusic size={14} /> Lista de Canciones
                 </div>
                 <div className="space-y-1">
                    {selectedAlbum.tracks?.map((track, idx) => {
                       // Verificar si el track está en favoritos
                       const isFav = favorites.includes(track.id);
                       
                       return (
                       <div 
                        key={track.id} 
                        onClick={() => {
                          if (selectedAlbum.tracks) onPlayAlbum(selectedAlbum.tracks, idx);
                        }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800 cursor-pointer group transition-colors"
                       >
                          <div className="w-6 text-center text-zinc-600 font-mono text-xs group-hover:text-urban-gold">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                             <h4 className="text-white font-bold text-sm group-hover:text-urban-gold transition-colors">{track.title}</h4>
                             <p className="text-zinc-500 text-xs">{track.artist}</p>
                          </div>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); onToggleFavorite(track.id); }}
                            className={`p-2 transition-colors ${isFav ? 'text-urban-red' : 'text-zinc-600 hover:text-white'}`}
                          >
                            <Heart size={14} fill={isFav ? "currentColor" : "none"} />
                          </button>

                          <button className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-urban-gold group-hover:text-black flex items-center justify-center text-zinc-400 transition-all">
                             <Play size={12} fill="currentColor" />
                          </button>
                       </div>
                    )})}
                 </div>
              </div>
           </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-zinc-800 pb-4 gap-6">
          <div>
             <h2 className="text-4xl md:text-5xl font-bold text-white display-font tracking-tight mb-1">
              LANZAMIENTOS <span className="text-urban-gold uppercase">LOCALES</span>
            </h2>
            <p className="text-zinc-500 uppercase tracking-widest text-sm font-semibold">
              El talento de la ciudad suena aquí
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64 group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-urban-gold transition-colors">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Buscar track o artista..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-full py-2.5 pl-10 pr-10 focus:outline-none focus:border-urban-gold focus:ring-1 focus:ring-urban-gold transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {!searchQuery && !selectedArtist && (
              <button 
                onClick={() => onToggleExpand(!isExpanded)}
                className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-urban-gold text-sm font-bold uppercase transition-colors shrink-0"
              >
                {isExpanded ? 'Ver en carrusel' : 'Ver todo'}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            )}
          </div>
        </div>

        {/* Artist Filter Badge */}
        {selectedArtist && (
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left-4">
            <div className="bg-urban-gold text-black px-4 py-2 rounded-lg flex items-center gap-2 font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              <User size={14} /> Artist: {selectedArtist}
              <button onClick={() => onArtistSelect(null)} className="ml-2 hover:scale-125 transition-transform">
                <X size={14} />
              </button>
            </div>
            <button 
              onClick={clearFilters}
              className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest"
            >
              Limpiar todo
            </button>
          </div>
        )}

        {filteredSongs.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4 text-zinc-500">
               <Search size={32} />
             </div>
             <p className="text-zinc-400 font-bold uppercase tracking-widest">
               No hay resultados {selectedArtist ? `para ${selectedArtist}` : ''} {searchQuery ? `con "${searchQuery}"` : ''}
             </p>
             {(selectedArtist || searchQuery) && (
               <button onClick={clearFilters} className="mt-4 text-urban-gold hover:underline text-sm font-bold uppercase">Mostrar todo el catálogo</button>
             )}
          </div>
        ) : (
          <div className="relative group/carousel">
            {/* CAROUSEL NAVIGATION */}
            {isCarouselMode && (
              <>
                <button 
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-50 w-12 h-12 bg-urban-gold text-black rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all hover:scale-110 active:scale-95 hidden lg:flex"
                >
                  <ChevronLeft size={24} strokeWidth={3} />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-50 w-12 h-12 bg-urban-gold text-black rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all hover:scale-110 active:scale-95 hidden lg:flex"
                >
                  <ChevronRight size={24} strokeWidth={3} />
                </button>
              </>
            )}

            <div 
              ref={scrollRef}
              className={`${
                isCarouselMode 
                ? 'flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4' 
                : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'
              } transition-all duration-500`}
            >
              {filteredSongs.map((song, index) => {
                 const isFav = favorites.includes(song.id);
                 const artists = parseArtists(song.artist);
                 // Check if it's the album container
                 const isAlbum = song.tracks && song.tracks.length > 0;
                 
                 return (
                  <div 
                    key={song.id} 
                    onClick={isAlbum ? (e) => handleAlbumClick(song, e) : undefined}
                    className={`group relative animate-in fade-in duration-500 shrink-0 ${
                      isCarouselMode ? 'w-[180px] md:w-[220px] snap-start' : 'w-full'
                    } ${isAlbum ? 'cursor-pointer' : ''}`}
                  >
                    <div className="aspect-square overflow-hidden rounded-lg bg-zinc-800 mb-3 relative shadow-lg">
                      {/* Album Effect (Stacked Cards) */}
                      {isAlbum && (
                        <div className="absolute top-0 left-0 w-full h-full">
                           <div className="absolute top-0 left-1 right-1 bottom-2 bg-zinc-700 rounded-lg transform translate-y-1 scale-95 opacity-50 z-0"></div>
                           <div className="absolute top-0 left-2 right-2 bottom-4 bg-zinc-600 rounded-lg transform translate-y-2 scale-90 opacity-30 z-0"></div>
                        </div>
                      )}

                      <img 
                        src={song.coverUrl} 
                        alt={song.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100 relative z-10"
                      />
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px] z-20">
                        {isAlbum ? (
                          <button 
                            onClick={(e) => handleAlbumClick(song, e)}
                            className="w-12 h-12 rounded-full bg-urban-gold text-black flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg"
                          >
                             <ListMusic fill="none" size={24} className="ml-0.5" />
                          </button>
                        ) : (
                          <button 
                              onClick={() => onPlayTrack(song.id)}
                              className="w-10 h-10 rounded-full bg-urban-gold text-black flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg"
                          >
                            <Play fill="currentColor" size={18} className="ml-1" />
                          </button>
                        )}

                        {!isAlbum && (
                          <button 
                              onClick={(e) => { e.stopPropagation(); onToggleFavorite(song.id); }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg border ${isFav ? 'bg-urban-red text-white border-urban-red' : 'bg-white/10 text-white border-white/20 hover:bg-urban-red hover:border-urban-red'}`}
                          >
                            <Heart fill={isFav ? "currentColor" : "none"} size={18} />
                          </button>
                        )}
                      </div>
                      
                      <div className={`absolute top-2 right-2 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase z-20 ${isAlbum ? 'bg-urban-gold text-black shadow-lg shadow-yellow-500/50' : 'bg-urban-red'}`}>
                        {song.releaseDate || 'Nuevo'}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight truncate font-['Teko'] uppercase tracking-wide group-hover:text-urban-gold transition-colors">
                        {song.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-1 text-zinc-400 text-xs uppercase font-semibold">
                        {artists.map((artist, i) => (
                          <React.Fragment key={artist}>
                            <button 
                              onClick={(e) => handleArtistClick(artist, e)}
                              className="hover:text-urban-gold hover:underline transition-colors"
                            >
                              {artist}
                            </button>
                            {i < artists.length - 1 && <span>x</span>}
                          </React.Fragment>
                        ))}
                      </div>
                      {isAlbum && (
                        <div className="text-urban-gold text-[10px] font-bold uppercase tracking-widest mt-1">
                          {song.tracks?.length} Canciones
                        </div>
                      )}
                    </div>
                  </div>
                 );
              })}
            </div>
          </div>
        )}
        
        {!searchQuery && !selectedArtist && (
          <button 
            onClick={() => onToggleExpand(!isExpanded)}
            className="mt-8 w-full flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 py-3 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors"
          >
            {isExpanded ? (
              <>Ver en carrusel <ChevronUp size={16} /></>
            ) : (
              <>Ver todo el catálogo <ChevronDown size={16} /></>
            )}
          </button>
        )}
      </div>
    </section>
  );
};