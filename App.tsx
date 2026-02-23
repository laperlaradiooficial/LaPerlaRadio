import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ReleasesSection } from './components/ReleasesSection';
import { FavoritesSection } from './components/FavoritesSection';
import { SpotifySection } from './components/SpotifySection';
import { NewsSection } from './components/NewsSection';
import { CommentsSection } from './components/CommentsSection';
import { Player } from './components/Player';
import { Footer } from './components/Footer';
import { PLAYLIST_DATA } from './data/playlist';
import { Song } from './types';
import { Heart, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  // Inicializamos la playlist SOLO con tracks que tengan audioUrl (quitando el visual del álbum)
  // De esta forma, las 7 canciones (que tienen audioUrl y isHidden: true) SÍ están, 
  // pero el container del álbum (sin audioUrl) NO está.
  const [playlist, setPlaylist] = useState<Song[]>(() => PLAYLIST_DATA.filter(s => s.audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notification, setNotification] = useState<{message: string, type: 'add' | 'remove'} | null>(null);
  
  // Global filter state for artist
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [isReleasesExpanded, setIsReleasesExpanded] = useState(false);

  // Initialize and load favorites
  useEffect(() => {
    const savedFavs = localStorage.getItem('laperla_favs');
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error("Error loading favorites", e);
      }
    }
  }, []);

  // Save favorites on change
  useEffect(() => {
    localStorage.setItem('laperla_favs', JSON.stringify(favorites));
  }, [favorites]);

  // Toast Timer
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if (event.code === 'Space') {
        event.preventDefault(); 
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  const handleNext = () => {
    if (playlist.length === 0) return;
    if (isShuffle) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentTrackIndex && playlist.length > 1);
      setCurrentTrackIndex(nextIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleTrackSelect = (index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const handleToggleFavorite = (id: string) => {
    const song = PLAYLIST_DATA.find(s => s.id === id);
    if (favorites.includes(id)) {
      setFavorites(prev => prev.filter(favId => favId !== id));
      setNotification({ message: `Quitado de Mi Perla Mix`, type: 'remove' });
    } else {
      setFavorites(prev => [...prev, id]);
      setNotification({ message: `¡Agregado a tu Mi Perla Mix!`, type: 'add' });
    }
  };

  const handlePlayFavorites = () => {
    const favSongs = PLAYLIST_DATA.filter(song => favorites.includes(song.id) && song.audioUrl);
    if (favSongs.length > 0) {
      setPlaylist(favSongs);
      setCurrentTrackIndex(0);
      setIsPlaying(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetToGlobal = () => {
    // Restaurar playlist global (filtrando los items sin audio)
    setPlaylist(PLAYLIST_DATA.filter(s => s.audioUrl));
    setCurrentTrackIndex(0);
    setIsPlaying(true);
    setNotification({ message: 'Escuchando Radio Global', type: 'add' });
  };

  const handleArtistSelectFromPlayer = useCallback((artist: string) => {
    setSelectedArtist(artist);
    setIsReleasesExpanded(true);
    // Smooth scroll to the releases section
    const section = document.getElementById('lanzamientos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setNotification({ message: `Filtrando por: ${artist}`, type: 'add' });
  }, []);

  const handleReorderPlaylist = (newPlaylist: Song[]) => {
    if (playlist.length > 0) {
      const currentSongId = playlist[currentTrackIndex]?.id;
      setPlaylist(newPlaylist);
      
      const newIndex = newPlaylist.findIndex(s => s.id === currentSongId);
      
      if (newIndex !== -1) {
        setCurrentTrackIndex(newIndex);
      } else {
        if (newPlaylist.length > 0) {
           setCurrentTrackIndex(0);
        }
      }
    } else {
      setPlaylist(newPlaylist);
    }
  };

  // Función para reproducir un álbum o EP específico desde el modal
  const handlePlayAlbum = (albumTracks: Song[], startIndex: number = 0) => {
    // Buscamos la canción seleccionada en la playlist global actual
    const targetTrackId = albumTracks[startIndex].id;
    const globalIndex = playlist.findIndex(s => s.id === targetTrackId);
    
    if (globalIndex !== -1) {
      // Si ya está en la playlist actual, saltamos a ella
      setCurrentTrackIndex(globalIndex);
      setIsPlaying(true);
    } else {
      // Si no está (ej: estamos en favoritos), volvemos a global y buscamos
      const globalPlaylist = PLAYLIST_DATA.filter(s => s.audioUrl);
      setPlaylist(globalPlaylist);
      const newGlobalIndex = globalPlaylist.findIndex(s => s.id === targetTrackId);
      if (newGlobalIndex !== -1) {
        setCurrentTrackIndex(newGlobalIndex);
        setIsPlaying(true);
      }
    }
    
    setNotification({ message: 'Reproduciendo...', type: 'add' });
  };

  return (
    <div className="min-h-screen bg-urban-black text-zinc-200 text-lg selection:bg-urban-gold selection:text-black">
      <Header />
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
           <div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl backdrop-blur-md border ${notification.type === 'add' ? 'bg-urban-gold/90 text-black border-urban-gold' : 'bg-zinc-800/90 text-white border-zinc-700'}`}>
              {notification.type === 'add' ? <CheckCircle2 size={18} /> : <Heart size={18} className="text-urban-red" />}
              <span className="text-sm font-bold uppercase tracking-widest">{notification.message}</span>
           </div>
        </div>
      )}

      <main className="pt-16 md:pt-20 pb-20">
        <Hero 
          onStartRadio={() => { 
            if (isPlaying) {
              setIsPlaying(false);
            } else {
              const globalPlaylist = PLAYLIST_DATA.filter(s => s.audioUrl);
              setPlaylist(globalPlaylist);
              // Reproducir aleatorio
              const randomIndex = Math.floor(Math.random() * globalPlaylist.length);
              setCurrentTrackIndex(randomIndex);
              setIsPlaying(true);
              setNotification({ message: 'Sintonizando Aleatorio...', type: 'add' });
            }
          }} 
          isPlaying={isPlaying} 
        />
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <FavoritesSection 
            favorites={favorites}
            onPlayFavorites={handlePlayFavorites}
            onRemoveFavorite={handleToggleFavorite}
            onResetGlobal={handleResetToGlobal}
          />
        </div>

        <ReleasesSection 
          onPlayTrack={(trackId) => {
             // Buscamos el ID directamente en la playlist ACTIVA
             const playerIndex = playlist.findIndex(s => s.id === trackId);
            
             if (playerIndex !== -1) {
                // Si la canción está en la lista actual (ej: Radio Global), la reproducimos
                handleTrackSelect(playerIndex);
             } else {
                // Si no está (ej: estamos en 'Mi Mix' y damos click en 'Lanzamientos' a una canción que no es fav),
                // cambiamos a playlist GLOBAL y la buscamos ahí.
                const globalPlaylist = PLAYLIST_DATA.filter(s => s.audioUrl);
                setPlaylist(globalPlaylist);
                
                const newIndex = globalPlaylist.findIndex(s => s.id === trackId);
                if (newIndex !== -1) {
                   setCurrentTrackIndex(newIndex);
                   setIsPlaying(true);
                }
             }
          }} 
          onPlayAlbum={handlePlayAlbum}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          selectedArtist={selectedArtist}
          onArtistSelect={setSelectedArtist}
          isExpanded={isReleasesExpanded}
          onToggleExpand={setIsReleasesExpanded}
        />
        
        <SpotifySection />

        <div className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
             <NewsSection />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
               <CommentsSection />
            </div>
          </div>
        </div>

        {/* APOYA Section */}
        <section id="apoya" className="py-12 bg-zinc-900 border-t border-zinc-800">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-urban-gold display-font">APOYA</h3>
            </div>

            <div className="flex items-center justify-center gap-12 flex-wrap">
              <div className="flex flex-col items-center gap-3">
                <a href="https://www.instagram.com/adorartepereira/" target="_blank" rel="noopener noreferrer" aria-label="Adorarte Instagram" className="transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
                  <img src="https://i.imgur.com/8I1glAC.png" alt="Adorarte" className="h-32 md:h-40 lg:h-48 object-contain" />
                </a>
                <span className="text-base text-zinc-200">Adorarte</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <a href="https://www.instagram.com/ar.recordsco/" target="_blank" rel="noopener noreferrer" aria-label="Ar Records Instagram" className="transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
                  <img src="https://i.imgur.com/y8pQaYL.png" alt="Ar Records" className="h-32 md:h-40 lg:h-48 object-contain" />
                </a>
                <span className="text-base text-zinc-200">Ar Records</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <a
                  href="https://www.instagram.com/v13.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="v13 Studio Instagram"
                  className="transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center h-32 md:h-40 lg:h-48">
                    <span
                      className="text-4xl md:text-5xl text-white tracking-[0.15em] uppercase"
                      style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' }}
                    >
                      V13
                    </span>
                  </div>
                </a>
                <span className="text-base text-zinc-200">v13 Studio</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Player 
        currentTrack={{
          title: currentTrack?.title || "La Perla Radio",
          artist: currentTrack?.artist || "Pereira",
          cover: currentTrack?.coverUrl || "https://i.imgur.com/dNgPbIo.jpeg"
        }}
        audioUrl={currentTrack?.audioUrl}
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
        playlist={playlist}
        currentTrackIndex={currentTrackIndex}
        onSelectTrack={handleTrackSelect}
        isShuffle={isShuffle}
        onToggleShuffle={() => setIsShuffle(!isShuffle)}
        onReorderPlaylist={handleReorderPlaylist}
        onArtistClick={handleArtistSelectFromPlayer}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
      
      <Footer />
    </div>
  );
};

export default App;