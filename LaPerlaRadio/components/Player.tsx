import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Shuffle, ListMusic, X, BarChart2, Trash2, GripVertical, Heart } from 'lucide-react';
import { StreamStatus, Song } from '../types';

interface PlayerProps {
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
  onArtistClick?: (artist: string) => void;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  onOpenExpanded?: () => void;
  onUpdateTime?: (time: number) => void;
  onUpdateDuration?: (duration: number) => void;
  onUpdateStatus?: (status: StreamStatus) => void;
  volume?: number;
  onVolumeChange?: (volume: number) => void;
  isMuted?: boolean;
  onMuteToggle?: () => void;
  seekIntentRef?: React.MutableRefObject<boolean>;
  onAudioRefReady?: (ref: HTMLAudioElement | null) => void;
}

export const Player: React.FC<PlayerProps> = ({ 
  currentTrack, 
  audioUrl, 
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
  onArtistClick,
  favorites = [],
  onToggleFavorite,
  onOpenExpanded,
  onUpdateTime,
  onUpdateDuration,
  onUpdateStatus,
  volume: externalVolume,
  onVolumeChange,
  isMuted: externalIsMuted,
  onMuteToggle,
  seekIntentRef,
  onAudioRefReady,
}) => {
  const [localVolume, setLocalVolume] = useState(externalVolume ?? 80);
  const [localIsMuted, setLocalIsMuted] = useState(externalIsMuted ?? false);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState<StreamStatus>(StreamStatus.OFFLINE);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  
  // Drag and drop state
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Memoized helpers
  const parseArtists = useCallback((artistStr: string) => {
    return artistStr
      .split(/\s*,\s*|\s+(?:x|Ft\.|ft\.|feat\.|&)\s+/i)
      .map(a => a.trim())
      .filter(Boolean);
  }, []);

  const artists = useMemo(() => parseArtists(currentTrack.artist), [currentTrack.artist, parseArtists]);
  const currentSong = useMemo(() => playlist[currentTrackIndex], [playlist, currentTrackIndex]);
  const isCurrentFavorite = useMemo(() => currentSong && favorites.includes(currentSong.id), [currentSong, favorites]);
  const progressPercent = useMemo(() => (duration > 0 ? (currentTime / duration) * 100 : 0), [currentTime, duration]);
  const volumeToUse = useMemo(() => externalVolume ?? localVolume, [externalVolume, localVolume]);
  const isMutedToUse = useMemo(() => externalIsMuted ?? localIsMuted, [externalIsMuted, localIsMuted]);
  const displayVolume = useMemo(() => (isMutedToUse ? 0 : volumeToUse), [isMutedToUse, volumeToUse]);

  // Inicializar audio una sola vez
  if (!audioRef.current) {
    audioRef.current = new Audio();
    audioRef.current.crossOrigin = "anonymous";
    audioRef.current.preload = "metadata";
  }

  useEffect(() => {
    const audio = audioRef.current!;
    
    const handlePlay = () => {
      setStatus(StreamStatus.LIVE);
      onUpdateStatus?.(StreamStatus.LIVE);
    };
    const handlePause = () => {
      setStatus(StreamStatus.OFFLINE);
      onUpdateStatus?.(StreamStatus.OFFLINE);
    };
    const handleWaiting = () => {
      setStatus(StreamStatus.BUFFERING);
      onUpdateStatus?.(StreamStatus.BUFFERING);
    };
    const handleError = () => {
      setStatus(StreamStatus.OFFLINE);
      onUpdateStatus?.(StreamStatus.OFFLINE);
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      onUpdateTime?.(audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      onUpdateDuration?.(audio.duration);
    };
    const handleEnded = () => { if (onNext) onNext(); };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNext, onUpdateTime, onUpdateDuration, onUpdateStatus]);

  // Sincronizar URL
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      const isSameSource = audioRef.current.src === audioUrl;
      if (!isSameSource) {
        // Pausar antes de cambiar la src para evitar problemas en mobile
        audioRef.current.pause();
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        
        // Esperar a que el audio esté listo antes de reproducir
        const playAudio = () => {
          if (isPlaying) {
            audioRef.current?.play().catch(e => console.warn("Playback prevented", e));
          }
          audioRef.current?.removeEventListener('canplay', playAudio);
        };
        
        audioRef.current.addEventListener('canplay', playAudio);
        
        // Timeout por si no hay evento canplay
        const timeout = setTimeout(() => {
          if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.warn("Playback prevented", e));
          }
        }, 100);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [audioUrl, isPlaying]);

  // Sincronizar Play/Pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Intentar reproducir con mejor manejo de errores
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Reproducción exitosa
          })
          .catch(error => {
            console.warn("Autoplay failed:", error);
            setStatus(StreamStatus.OFFLINE);
          });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Sincronizar Volumen
  useEffect(() => {
    if (audioRef.current) {
      const volumeToUse = externalVolume !== undefined ? externalVolume : localVolume;
      const isMutedToUse = externalIsMuted !== undefined ? externalIsMuted : localIsMuted;
      audioRef.current.volume = isMutedToUse ? 0 : volumeToUse / 100;
    }
  }, [externalVolume, localVolume, externalIsMuted, localIsMuted]);

  // Ref para rastrear seeks intencionales (desde ExpandedPlayer)
  const isIntentionalSeekRef = useRef<boolean>(false);

  // Notificar a App cuando audioRef esté listo
  useEffect(() => {
    onAudioRefReady?.(audioRef.current);
  }, [onAudioRefReady]);

  // Sincronizar seek cuando el tiempo cambia externamente (desde ExpandedPlayer)
  useEffect(() => {
    if (!audioRef.current) return;
    
    // Si hay una ref compartida de intención, usarla
    if (seekIntentRef?.current) {
      try {
        audioRef.current.currentTime = currentTime;
      } catch (err) {
        // Silenciar errores
      }
      seekIntentRef.current = false; // Reset
      return;
    }
    
    // Si no, usar la ref local
    if (isIntentionalSeekRef.current) {
      try {
        audioRef.current.currentTime = currentTime;
      } catch (err) {
        // Silenciar errores
      }
      isIntentionalSeekRef.current = false; // Reset el flag
    }
  }, [currentTime, seekIntentRef]);

  // Media Session API: configurar metadata y handlers para controles del sistema (play/pause/next/prev/seek)
  useEffect(() => {
    const ms = (navigator as any).mediaSession;
    if (!ms) return;

    try {
      ms.metadata = new (window as any).MediaMetadata({
        title: currentTrack.title || 'La Perla Radio',
        artist: currentTrack.artist || 'La Perla',
        artwork: [
          { src: currentTrack.cover || '', sizes: '96x96',   type: 'image/png' },
          { src: currentTrack.cover || '', sizes: '128x128', type: 'image/png' },
          { src: currentTrack.cover || '', sizes: '192x192', type: 'image/png' },
          { src: currentTrack.cover || '', sizes: '256x256', type: 'image/png' },
          { src: currentTrack.cover || '', sizes: '384x384', type: 'image/png' },
        ]
      });
    } catch (err) {
      // Some browsers might throw if MediaMetadata constructor isn't available
    }

    ms.playbackState = isPlaying ? 'playing' : 'paused';

    const safeSet = (action: string, handler: any) => {
      try { ms.setActionHandler(action, handler); } catch (e) {}
    };

    safeSet('play', onTogglePlay);
    safeSet('pause', onTogglePlay);
    safeSet('previoustrack', onPrev || (() => {}));
    safeSet('nexttrack', onNext || (() => {}));

    // seekto: if the user seeks to end (or very near to duration), treat as nexttrack
    safeSet('seekto', (details: any) => {
      if (!audioRef.current) return;
      const seekTime = details && typeof details.seekTime === 'number' ? details.seekTime : null;
      if (seekTime === null) return;

      // if seeking to (nearly) the end, interpret as 'next track'
      if (duration && seekTime >= Math.max(0, duration - 2)) {
        if (onNext) onNext();
        return;
      }

      audioRef.current.currentTime = Math.min(Math.max(0, seekTime), duration || seekTime);
    });

    // handle seekforward / seekbackward if provided by platform
    safeSet('seekforward', (details: any) => {
      if (!audioRef.current) return;
      const offset = details && typeof details.seekOffset === 'number' ? details.seekOffset : 10;
      const newTime = Math.min((audioRef.current.currentTime || 0) + offset, duration || Infinity);
      audioRef.current.currentTime = newTime;
    });

    safeSet('seekbackward', (details: any) => {
      if (!audioRef.current) return;
      const offset = details && typeof details.seekOffset === 'number' ? details.seekOffset : 10;
      const newTime = Math.max((audioRef.current.currentTime || 0) - offset, 0);
      audioRef.current.currentTime = newTime;
    });

    return () => {
      const actions = ['play','pause','previoustrack','nexttrack','seekto','seekforward','seekbackward'];
      actions.forEach(a => { try { ms.setActionHandler(a, null); } catch (e) {} });
    };
  }, [currentTrack, isPlaying, onNext, onPrev, onTogglePlay, duration]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  }, []);

  // Drag and Drop Handlers
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
    if (draggedItemIndex === null || !onReorderPlaylist) return;

    const newPlaylist = [...playlist];
    const [movedItem] = newPlaylist.splice(draggedItemIndex, 1);
    newPlaylist.splice(index, 0, movedItem);

    onReorderPlaylist(newPlaylist);
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  }, [draggedItemIndex, playlist, onReorderPlaylist]);

  const handleDragEnd = useCallback(() => {
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  }, []);

  const handleHeartClick = useCallback((id: string) => {
    if (onToggleFavorite) {
      setIsHeartAnimating(true);
      onToggleFavorite(id);
      setTimeout(() => setIsHeartAnimating(false), 300);
    }
  }, [onToggleFavorite]);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50" style={{ contain: 'layout style' }}>
      {/* COLA DE REPRODUCCIÓN */}
      <div className={`absolute bottom-full right-0 md:right-4 mb-2 w-full md:w-[400px] bg-zinc-900/98 backdrop-blur-xl border border-zinc-700 rounded-t-xl md:rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform origin-bottom ${isQueueOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`} style={{ willChange: isQueueOpen ? 'transform, opacity' : 'auto' }}>
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <ListMusic className="text-urban-gold" size={18} />
            <h3 className="text-white font-bold display-font tracking-wide text-lg uppercase">COLA DE REPRODUCCIÓN</h3>
          </div>
          <button onClick={() => setIsQueueOpen(false)} className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded-full">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[50vh] md:max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
          {playlist.map((song, index) => {
            const isActive = index === currentTrackIndex;
            const isDragging = draggedItemIndex === index;
            const isDragOver = dragOverIndex === index;
            
            return (
              <div 
                key={song.id + index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => onSelectTrack && onSelectTrack(index)} 
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all group relative border
                  ${isActive ? 'bg-urban-gold/10 border-urban-gold/20 shadow-inner' : 'hover:bg-zinc-800/50 border-transparent'}
                  ${isDragging ? 'opacity-50 border-dashed border-zinc-600 bg-zinc-800' : ''}
                  ${isDragOver && !isDragging ? 'border-t-2 border-t-urban-gold pt-3' : ''}
                `}
              >
                <div className="text-zinc-600 px-1 cursor-grab active:cursor-grabbing hover:text-zinc-300">
                  <GripVertical size={16} />
                </div>
                <div className="relative w-10 h-10 shrink-0">
                  <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover rounded bg-zinc-800 pointer-events-none" />
                  {isActive && <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded"><BarChart2 size={16} className="text-urban-gold animate-bounce" /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-bold truncate ${isActive ? 'text-urban-gold' : 'text-zinc-200'}`}>{song.title}</h4>
                  <p className="text-xs text-zinc-500 truncate pointer-events-none">{song.artist}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); if (playlist.length > 1 && onReorderPlaylist) onReorderPlaylist(playlist.filter((_, i) => i !== index)); }} className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-urban-red p-1.5 transition-all"><Trash2 size={14} /></button>
              </div>
            );
          })}
        </div>
      </div>

      {/* BARRA DEL REPRODUCTOR */}
      <div className="bg-urban-black/95 backdrop-blur-md border-t border-zinc-800 shadow-2xl relative">
        <div className="relative w-full h-1.5 group cursor-pointer hover:h-2.5 transition-all duration-200">
           <div className="absolute inset-0 bg-zinc-800 w-full h-full"></div>
           <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-urban-gold to-urban-red transition-all duration-100 ease-linear pointer-events-none z-10" style={{ width: `${progressPercent}%`, willChange: 'width', transform: 'translateZ(0)' }}></div>
           <input type="range" min={0} max={duration || 100} value={currentTime} onChange={handleSeek} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" step="0.1" style={{ touchAction: 'none' }} />
        </div>

        <div className="container mx-auto px-4 h-20 flex items-center justify-between mt-2">
          
          {/* TRACK INFO LEFT */}
          <div className="flex items-center gap-3 md:gap-4 w-[50%] md:w-1/3 min-w-0 pr-2 group/player-info">
            <div className="relative group/cover shrink-0 cursor-pointer" onClick={onOpenExpanded}>
               <img 
                 src={currentTrack.cover} 
                 alt="Art" 
                 className={`w-10 h-10 md:w-14 md:h-14 rounded-sm object-cover border border-zinc-700 shadow-lg ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`}
                 style={{ 
                   willChange: isPlaying ? 'transform' : 'auto',
                   transform: 'translateZ(0)',
                   backfaceVisibility: 'hidden'
                 }}
                 loading="eager"
               />
            </div>
            
            <div className="overflow-hidden flex-1 min-w-0 flex flex-col justify-center">
              
              {/* Contenedor Flex para Título y Corazón juntos */}
              <div className="flex items-center gap-3">
                <h3 className="text-white font-bold text-xs md:text-base truncate display-font tracking-wide uppercase leading-tight cursor-pointer hover:text-urban-gold transition-colors" onClick={onOpenExpanded}>
                  {currentTrack.title}
                </h3>
                
                {/* Botón de Like justo al lado */}
                {currentSong && onToggleFavorite && (
                  <button 
                    onClick={() => handleHeartClick(currentSong.id)}
                    className="group/heart relative shrink-0 focus:outline-none"
                    title={isCurrentFavorite ? "Quitar de Mi Mix" : "Agregar a Mi Mix"}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${isCurrentFavorite ? 'bg-urban-red/40 opacity-100' : 'opacity-0'}`}></div>
                    
                    <Heart 
                      size={16} 
                      className={`
                        relative z-10 transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275)
                        ${isCurrentFavorite 
                          ? 'text-urban-red fill-urban-red scale-110' 
                          : 'text-zinc-600 hover:text-white hover:scale-110'
                        }
                        ${isHeartAnimating ? 'scale-125' : ''}
                      `} 
                    />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-x-1 text-urban-gold text-[10px] md:text-sm truncate font-bold uppercase mt-0.5">
                {artists.map((artist, i) => (
                  <React.Fragment key={artist}>
                    <button 
                      onClick={() => onArtistClick && onArtistClick(artist)}
                      className="hover:underline transition-all active:scale-95 hover:text-white"
                    >
                      {artist}
                    </button>
                    {i < artists.length - 1 && <span className="text-zinc-500 no-underline">x</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="flex items-center gap-2 md:gap-6">
               <button 
                 onClick={onToggleShuffle} 
                 className={`p-1.5 transition-colors active:scale-95 ${isShuffle ? 'text-urban-gold' : 'text-zinc-600 hover:text-zinc-400'}`}
                 style={{ touchAction: 'manipulation', transform: 'translateZ(0)' }}
               >
                 <Shuffle size={18} />
               </button>
               <button 
                 onClick={onPrev} 
                 className="text-zinc-400 hover:text-urban-gold transition-colors active:scale-95"
                 style={{ touchAction: 'manipulation', transform: 'translateZ(0)' }}
               >
                 <SkipBack size={20} fill="currentColor" />
               </button>
               <button 
                 onClick={onTogglePlay} 
                 className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-urban-red text-white flex items-center justify-center hover:bg-red-600 transition-all active:scale-90 shadow-[0_0_20px_rgba(218,41,28,0.3)] border border-white/10"
                 style={{ touchAction: 'manipulation', transform: 'translateZ(0)', willChange: 'transform' }}
               >
                 {isPlaying ? <Pause fill="currentColor" size={22} /> : <Play fill="currentColor" size={22} className="ml-1" />}
               </button>
               <button 
                 onClick={onNext} 
                 className="text-zinc-400 hover:text-urban-gold transition-colors active:scale-95"
                 style={{ touchAction: 'manipulation', transform: 'translateZ(0)' }}
               >
                 <SkipForward size={20} fill="currentColor" />
               </button>
               <button onClick={() => setIsQueueOpen(!isQueueOpen)} className="md:hidden p-1.5 rounded transition-all text-zinc-600" style={{ touchAction: 'manipulation' }}><ListMusic size={20} /></button>
            </div>
            <div className="hidden md:flex mt-1 items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${status === StreamStatus.LIVE ? 'bg-urban-gold animate-pulse-fast' : status === StreamStatus.BUFFERING ? 'bg-urban-red' : 'bg-zinc-600'}`}></div>
              <span className={`text-[10px] font-bold tracking-widest uppercase ${status === StreamStatus.LIVE ? 'text-urban-gold' : 'text-zinc-500'}`}>{status}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end gap-6 w-1/3">
             <div className="flex items-center gap-2 group">
              <button onClick={() => {
                const newMutedValue = !isMutedToUse;
                setLocalIsMuted(newMutedValue);
                onMuteToggle?.();
              }} className="text-zinc-400 hover:text-urban-gold">{isMutedToUse || volumeToUse === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
              <div className="relative w-20 lg:w-28 h-1 group cursor-pointer hover:h-2 transition-all duration-200">
                <div className="absolute inset-0 bg-zinc-800 w-full h-full rounded-full"></div>
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-urban-gold to-urban-red rounded-full pointer-events-none" style={{ width: `${displayVolume}%` }}></div>
                <input type="range" min="0" max="100" value={isMutedToUse ? 0 : volumeToUse} onChange={(e) => {
                  const newValue = Number(e.target.value);
                  setLocalVolume(newValue);
                  onVolumeChange?.(newValue);
                }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              </div>
            </div>
            <button onClick={() => setIsQueueOpen(!isQueueOpen)} className={`p-2 rounded-lg transition-all ${isQueueOpen ? 'bg-urban-gold text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}><ListMusic size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};