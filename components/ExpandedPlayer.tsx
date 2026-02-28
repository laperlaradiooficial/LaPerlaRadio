import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  X, Play, Pause, SkipBack, SkipForward, Shuffle, Volume2, VolumeX, 
  Heart, Music, Trash2, GripVertical, BarChart2, ChevronDown
} from 'lucide-react';
import { Song, StreamStatus } from '../types';

interface ExpandedPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: { title: string; artist: string; cover: string };
  audioUrl?: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  playlist?: Song[];
  currentTrackIndex?: number;
  onSelectTrack?: (index: number) => void;
  isShuffle?: boolean;
  onToggleShuffle?: () => void;
  onReorderPlaylist?: (newPlaylist: Song[]) => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
  status: StreamStatus;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  onArtistClick?: (artist: string) => void;
  onNotification?: (message: string, type: 'add' | 'remove') => void;
}

export const ExpandedPlayer: React.FC<ExpandedPlayerProps> = ({
  isOpen,
  onClose,
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  playlist = [],
  currentTrackIndex = 0,
  onSelectTrack,
  isShuffle = false,
  onToggleShuffle,
  onReorderPlaylist,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  isMuted,
  onMuteToggle,
  status,
  favorites = [],
  onToggleFavorite,
  onArtistClick,
  onNotification,
}) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [isMobileQueueOpen, setIsMobileQueueOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const parseArtists = useCallback((artistStr: string) => {
    return artistStr
      .split(/\s*,\s*|\s+(?:x|Ft\.|ft\.|feat\.|&)\s+/i)
      .map(a => a.trim())
      .filter(Boolean);
  }, []);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null) return;

    // Crear copia de la playlist
    const newPlaylist = [...playlist];
    
    // Remover el item arrastrado
    const [movedItem] = newPlaylist.splice(draggedItemIndex, 1);
    
    // Si se arrastra hacia atrás (índice menor), ajustar la posición de inserción
    const insertIndex = draggedItemIndex < index ? index - 1 : index;
    
    // Insertar en la nueva posición
    newPlaylist.splice(insertIndex, 0, movedItem);

    // Persistir los cambios
    if (onReorderPlaylist) {
      onReorderPlaylist(newPlaylist);
      onNotification?.(`Canción movida a posición ${insertIndex + 1}`, 'add');
    }
    
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  }, [draggedItemIndex, playlist, onReorderPlaylist, onNotification]);

  const handleDragEnd = useCallback(() => {
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  }, []);

  const handleHeartClick = useCallback((id: string) => {
    setIsHeartAnimating(true);
    const isCurrentlyFavorite = favorites.includes(id);
    
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
    
    // Show notification
    if (onNotification) {
      if (isCurrentlyFavorite) {
        onNotification('Quitado de Mi Perla Mix', 'remove');
      } else {
        onNotification('¡Agregado a tu Mi Perla Mix!', 'add');
      }
    }
    
    setTimeout(() => setIsHeartAnimating(false), 300);
  }, [favorites, onToggleFavorite, onNotification]);

  // Memoizar valores calculados
  const artists = useMemo(() => parseArtists(currentTrack.artist), [currentTrack.artist, parseArtists]);
  const progressPercent = useMemo(() => (duration > 0 ? (currentTime / duration) * 100 : 0), [currentTime, duration]);
  const currentSong = useMemo(() => playlist[currentTrackIndex], [playlist, currentTrackIndex]);
  const isCurrentFavorite = useMemo(() => currentSong && favorites.includes(currentSong.id), [currentSong, favorites]);

  // Scroll to current track in queue
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        // Usar requestAnimationFrame para mejor performance
        requestAnimationFrame(() => {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }
    }
  }, [isOpen, currentTrackIndex]);

  // Format time
  const formatTime = useCallback((seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const displayVolume = useMemo(() => (isMuted ? 0 : volume), [isMuted, volume]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ willChange: 'opacity' }}>
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        style={{ touchAction: 'none' }}
      />

      {/* Modal Content */}
      <div className="absolute inset-0 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT SIDE - Cover and Controls (Full width on mobile, half on desktop) */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 md:p-12 relative z-10 bg-gradient-to-br from-zinc-900/50 via-urban-black to-zinc-950/50">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
          >
            <X size={24} />
          </button>

          {/* Album Art - Large and Animated */}
          <div className="w-full max-w-xs md:max-w-sm mb-8 md:mb-12 aspect-square">
            <div 
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
              onClick={() => {}}
              style={{ contain: 'layout style paint' }}
            >
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isPlaying ? 'scale-105 animate-[spin_30s_linear_infinite]' : 'scale-100'
                }`}
                style={{ 
                  willChange: isPlaying ? 'transform' : 'auto',
                  transform: 'translateZ(0)', // Force hardware acceleration
                  backfaceVisibility: 'hidden',
                }}
                loading="eager"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-8 md:mb-12 w-full">
            <h1 className="text-3xl md:text-5xl font-bold text-white display-font tracking-tight mb-2 line-clamp-2">
              {currentTrack.title}
            </h1>
            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              {artists.map((artist, i) => (
                <React.Fragment key={artist}>
                  <button 
                    onClick={() => {
                      onArtistClick?.(artist);
                      // Cerrar reproductor al clickear artista
                      onClose();
                    }}
                    className="text-urban-gold font-bold text-lg md:text-xl uppercase hover:text-white hover:underline transition-colors active:scale-95"
                  >
                    {artist}
                  </button>
                  {i < artists.length - 1 && <span className="text-zinc-500">×</span>}
                </React.Fragment>
              ))}
            </div>
            
            {/* Status */}
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${status === StreamStatus.LIVE ? 'bg-urban-gold animate-pulse' : status === StreamStatus.BUFFERING ? 'bg-urban-red' : 'bg-zinc-600'}`} />
              <span className={`text-sm font-bold tracking-widest uppercase ${status === StreamStatus.LIVE ? 'text-urban-gold' : 'text-zinc-500'}`}>
                {status}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-4">
            <div className="relative w-full h-2 group cursor-pointer hover:h-3 transition-all duration-200 mb-4">
              <div className="absolute inset-0 bg-zinc-800 w-full h-full rounded-full" />
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-urban-gold to-urban-red rounded-full pointer-events-none z-10 transition-all duration-100"
                style={{ 
                  width: `${progressPercent}%`,
                  willChange: 'width',
                  transform: 'translateZ(0)'
                }}
              />
              <input
                type="range"
                min="0"
                max={String(duration || 100)}
                value={String(currentTime)}
                onChange={(e) => {
                  try {
                    const newTime = parseFloat(e.target.value);
                    if (!isNaN(newTime) && newTime !== currentTime) {
                      onSeek(newTime);
                    }
                  } catch (err) {
                    console.warn("Seek error:", err);
                  }
                }}
                onPointerDown={(e) => e.currentTarget.focus()}
                onTouchStart={(e) => {
                  e.currentTarget.focus();
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                step="0.1"
                style={{ touchAction: 'none' }}
              />
            </div>
            <div className="flex justify-between text-sm text-zinc-500 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full flex flex-col gap-6">
            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <button
                onClick={onToggleShuffle}
                className={`p-2 rounded-full transition-all active:scale-95 ${
                  isShuffle 
                    ? 'text-urban-gold bg-urban-gold/10' 
                    : 'text-zinc-600 hover:text-zinc-400'
                }`}
                style={{ touchAction: 'manipulation', transform: 'translateZ(0)' }}
              >
                <Shuffle size={24} />
              </button>

              <button
                onClick={onPrev}
                className="p-3 rounded-full text-zinc-400 hover:text-urban-gold transition-colors hover:bg-zinc-800 active:scale-95"
                style={{ touchAction: 'manipulation', transform: 'translateZ(0)' }}
              >
                <SkipBack size={28} fill="currentColor" />
              </button>

              <button
                onClick={onTogglePlay}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-urban-red to-red-700 text-white flex items-center justify-center hover:from-red-600 hover:to-red-800 transition-all active:scale-90 shadow-xl border border-white/10"
                style={{ 
                  touchAction: 'manipulation', 
                  transform: 'translateZ(0)',
                  willChange: 'transform'
                }}
              >
                {isPlaying ? (
                  <Pause fill="currentColor" size={32} />
                ) : (
                  <Play fill="currentColor" size={32} className="ml-1" />
                )}
              </button>

              <button
                onClick={onNext}
                className="p-3 rounded-full text-zinc-400 hover:text-urban-gold transition-colors hover:bg-zinc-800 active:scale-95"
                style={{ touchAction: 'manipulation', transform: 'translateZ(0)' }}
              >
                <SkipForward size={28} fill="currentColor" />
              </button>

              <button
                onClick={() => {
                  if (currentSong && onToggleFavorite) {
                    handleHeartClick(currentSong.id);
                  }
                }}
                className="group/heart relative p-2 rounded-full transition-all"
              >
                <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${isCurrentFavorite ? 'bg-urban-red/40 opacity-100' : 'opacity-0'}`} />
                <Heart
                  size={24}
                  className={`relative z-10 transition-all duration-300 ${
                    isCurrentFavorite
                      ? 'text-urban-red fill-urban-red scale-110'
                      : 'text-zinc-600 hover:text-white hover:scale-110'
                  } ${isHeartAnimating ? 'scale-125' : ''}`}
                />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-4 justify-center max-w-xs mx-auto w-full">
              <button
                onClick={onMuteToggle}
                className="text-zinc-400 hover:text-urban-gold transition-colors p-2 shrink-0"
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <div className="relative flex-1 h-2 group cursor-pointer hover:h-3 transition-all duration-200">
                <div className="absolute inset-0 bg-zinc-800 w-full h-full rounded-full" />
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-urban-gold to-urban-red rounded-full pointer-events-none"
                  style={{ width: `${displayVolume}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
              </div>
              <span className="text-xs text-zinc-500 font-mono w-8 text-right">{displayVolume}%</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Queue (Hidden on mobile, visible on desktop) */}
        <div className="hidden md:flex flex-col w-1/2 bg-gradient-to-br from-black/60 via-zinc-950 to-black/60 border-l border-zinc-800/50 overflow-hidden">
          {/* Queue Header */}
          <div className="p-6 border-b border-zinc-800/50 bg-black/40 backdrop-blur">
            <div className="flex items-center gap-2 mb-2">
              <Music className="text-urban-gold" size={20} />
              <h2 className="text-white font-bold display-font tracking-widest text-lg uppercase">
                Cola de Reproducción
              </h2>
            </div>
            <p className="text-sm text-zinc-500">{playlist.length} canción{playlist.length !== 1 ? 'es' : ''}</p>
          </div>

          {/* Queue List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent p-4">
            {playlist.length > 0 ? (
              <div className="space-y-1" ref={scrollContainerRef}>
                {playlist.map((song, index) => {
                  const isActive = index === currentTrackIndex;
                  const isDragging = draggedItemIndex === index;
                  const isDragOver = dragOverIndex === index;

                  return (
                    <div
                      key={song.id + index}
                      data-active={isActive}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      onClick={() => onSelectTrack && onSelectTrack(index)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all group border ${
                        isActive
                          ? 'bg-urban-gold/15 border-urban-gold/30 shadow-lg'
                          : 'hover:bg-zinc-800/40 border-transparent'
                      } ${isDragging ? 'opacity-50 border-dashed border-zinc-600' : ''} ${
                        isDragOver && !isDragging ? 'border-t-2 border-t-urban-gold pt-4' : ''
                      }`}
                    >
                      <div className="text-zinc-700 cursor-grab active:cursor-grabbing hover:text-zinc-500">
                        <GripVertical size={16} />
                      </div>

                      <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden bg-zinc-800">
                        <img
                          src={song.coverUrl}
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <BarChart2 size={16} className="text-urban-gold animate-bounce" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-bold truncate ${isActive ? 'text-urban-gold' : 'text-zinc-200'}`}>
                          {song.title}
                        </h4>
                        <p className="text-xs text-zinc-500 truncate">{song.artist}</p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (playlist.length > 1 && onReorderPlaylist) {
                            const newPlaylist = playlist.filter((_, i) => i !== index);
                            onReorderPlaylist(newPlaylist);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-urban-red p-1.5 transition-all shrink-0"
                        title="Eliminar de la cola"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                <Music size={40} className="mb-4 opacity-30" />
                <p className="text-center text-sm">No hay canciones en la cola</p>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SHEET - Queue on Mobile */}
        <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-br from-black/80 via-zinc-950 to-black/80 border-t border-zinc-800 rounded-t-2xl overflow-hidden z-20 transition-all duration-300 ${
          isMobileQueueOpen ? 'max-h-[80vh]' : 'max-h-[60px]'
        }`}>
          {/* Mobile Queue Header - Clickable */}
          <button
            onClick={() => setIsMobileQueueOpen(!isMobileQueueOpen)}
            className="w-full p-4 border-b border-zinc-800/50 bg-black/40 backdrop-blur flex items-center justify-between hover:bg-black/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Music className="text-urban-gold" size={18} />
              <h2 className="text-white font-bold tracking-widest text-sm uppercase">
                Cola ({playlist.length})
              </h2>
            </div>
            <ChevronDown 
              size={20} 
              className={`text-zinc-500 transition-transform duration-300 ${isMobileQueueOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* Mobile Queue List */}
          {isMobileQueueOpen && (
            <div className="overflow-y-auto max-h-[calc(80vh-60px)] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent p-3" ref={scrollContainerRef}>
              {playlist.length > 0 ? (
                <div className="space-y-1">
                  {playlist.map((song, index) => {
                    const isActive = index === currentTrackIndex;

                    return (
                      <div
                        key={song.id + index}
                        draggable
                        onDragStart={(e) => {
                          setDraggedItemIndex(index);
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOverIndex(index);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (draggedItemIndex === null) return;
                          
                          const newPlaylist = [...playlist];
                          const [movedItem] = newPlaylist.splice(draggedItemIndex, 1);
                          
                          // Si se arrastra hacia atrás (índice menor), ajustar la posición
                          const insertIndex = draggedItemIndex < index ? index - 1 : index;
                          newPlaylist.splice(insertIndex, 0, movedItem);
                          
                          // Persistir los cambios
                          if (onReorderPlaylist) {
                            onReorderPlaylist(newPlaylist);
                            onNotification?.(`Canción movida a posición ${insertIndex + 1}`, 'add');
                          }
                          setDraggedItemIndex(null);
                          setDragOverIndex(null);
                        }}
                        onDragEnd={() => {
                          setDraggedItemIndex(null);
                          setDragOverIndex(null);
                        }}
                        onClick={() => onSelectTrack && onSelectTrack(index)}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all border text-sm ${
                          isActive
                            ? 'bg-urban-gold/15 border-urban-gold/30'
                            : 'hover:bg-zinc-800/40 border-transparent'
                        } ${draggedItemIndex === index ? 'opacity-50' : ''} ${dragOverIndex === index ? 'border-t-2 border-t-urban-gold pt-3' : ''}`}
                      >
                        <div className="text-zinc-700 cursor-grab active:cursor-grabbing hover:text-zinc-500">
                          <GripVertical size={14} />
                        </div>
                        <div className="relative w-10 h-10 shrink-0 rounded bg-zinc-800 overflow-hidden">
                          <img
                            src={song.coverUrl}
                            alt={song.title}
                            className="w-full h-full object-cover"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <BarChart2 size={12} className="text-urban-gold" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-xs font-bold truncate ${isActive ? 'text-urban-gold' : 'text-zinc-200'}`}>
                            {song.title}
                          </h4>
                          <p className="text-xs text-zinc-500 truncate">{song.artist}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-sm text-zinc-500 py-4">No hay canciones en la cola</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
