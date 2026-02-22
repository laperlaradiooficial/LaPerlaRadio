import React, { useState, useEffect, useRef } from 'react';
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
  onToggleFavorite
}) => {
  const [volume, setVolume] = useState(80);
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

  // Improved helper to parse multiple artists from a string
  const parseArtists = (artistStr: string) => {
    return artistStr
      .split(/\s*,\s*|\s+(?:x|Ft\.|ft\.|feat\.|&)\s+/i)
      .map(a => a.trim())
      .filter(Boolean);
  };

  // Inicializar audio una sola vez
  if (!audioRef.current) {
    audioRef.current = new Audio();
  }

  useEffect(() => {
    const audio = audioRef.current!;
    
    const handlePlay = () => setStatus(StreamStatus.LIVE);
    const handlePause = () => setStatus(StreamStatus.OFFLINE);
    const handleWaiting = () => setStatus(StreamStatus.BUFFERING);
    const handleError = () => setStatus(StreamStatus.OFFLINE);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
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
  }, [onNext]);

  // Sincronizar URL
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      const isSameSource = audioRef.current.src === audioUrl;
      if (!isSameSource) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch(e => console.warn("Playback prevented", e));
        }
      }
    }
  }, [audioUrl]);

  // Sincronizar Play/Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn("Playback failed", e);
          setStatus(StreamStatus.OFFLINE);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Sincronizar Volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Set transparent image or modify drag image if needed, for now default is fine
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault(); // Necessary to allow dropping
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || !onReorderPlaylist) return;

    const newPlaylist = [...playlist];
    const [movedItem] = newPlaylist.splice(draggedItemIndex, 1);
    newPlaylist.splice(index, 0, movedItem);

    onReorderPlaylist(newPlaylist);
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handleHeartClick = (id: string) => {
    if (onToggleFavorite) {
      setIsHeartAnimating(true);
      onToggleFavorite(id);
      setTimeout(() => setIsHeartAnimating(false), 300);
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const displayVolume = isMuted ? 0 : volume;
  const artists = parseArtists(currentTrack.artist);

  // Identify current song ID for favorites
  const currentSong = playlist[currentTrackIndex];
  const isCurrentFavorite = currentSong ? favorites.includes(currentSong.id) : false;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* COLA DE REPRODUCCIÓN */}
      <div className={`absolute bottom-full right-0 md:right-4 mb-2 w-full md:w-[400px] bg-zinc-900/98 backdrop-blur-xl border border-zinc-700 rounded-t-xl md:rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform origin-bottom ${isQueueOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
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
           <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-urban-gold to-urban-red transition-all duration-100 ease-linear pointer-events-none z-10" style={{ width: `${progressPercent}%` }}></div>
           <input type="range" min={0} max={duration || 100} value={currentTime} onChange={handleSeek} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" step="0.1" />
        </div>

        <div className="container mx-auto px-4 h-20 flex items-center justify-between mt-2">
          
          {/* TRACK INFO LEFT */}
          <div className="flex items-center gap-3 md:gap-4 w-[50%] md:w-1/3 min-w-0 pr-2 group/player-info">
            <div className="relative group/cover shrink-0">
               <img src={currentTrack.cover} alt="Art" className={`w-10 h-10 md:w-14 md:h-14 rounded-sm object-cover border border-zinc-700 shadow-lg ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`} />
            </div>
            
            <div className="overflow-hidden flex-1 min-w-0 flex flex-col justify-center">
              
              {/* Contenedor Flex para Título y Corazón juntos */}
              <div className="flex items-center gap-3">
                <h3 className="text-white font-bold text-xs md:text-base truncate display-font tracking-wide uppercase leading-tight">
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
               <button onClick={onToggleShuffle} className={`p-1.5 transition-colors ${isShuffle ? 'text-urban-gold' : 'text-zinc-600 hover:text-zinc-400'}`}><Shuffle size={18} /></button>
               <button onClick={onPrev} className="text-zinc-400 hover:text-urban-gold transition-colors"><SkipBack size={20} fill="currentColor" /></button>
               <button onClick={onTogglePlay} className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-urban-red text-white flex items-center justify-center hover:bg-red-600 transition-all active:scale-90 shadow-[0_0_20px_rgba(218,41,28,0.3)] border border-white/10">{isPlaying ? <Pause fill="currentColor" size={22} /> : <Play fill="currentColor" size={22} className="ml-1" />}</button>
               <button onClick={onNext} className="text-zinc-400 hover:text-urban-gold transition-colors"><SkipForward size={20} fill="currentColor" /></button>
               <button onClick={() => setIsQueueOpen(!isQueueOpen)} className="md:hidden p-1.5 rounded transition-all text-zinc-600"><ListMusic size={20} /></button>
            </div>
            <div className="hidden md:flex mt-1 items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${status === StreamStatus.LIVE ? 'bg-urban-gold animate-pulse-fast' : status === StreamStatus.BUFFERING ? 'bg-urban-red' : 'bg-zinc-600'}`}></div>
              <span className={`text-[10px] font-bold tracking-widest uppercase ${status === StreamStatus.LIVE ? 'text-urban-gold' : 'text-zinc-500'}`}>{status}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end gap-6 w-1/3">
             <div className="flex items-center gap-2 group">
              <button onClick={() => setIsMuted(!isMuted)} className="text-zinc-400 hover:text-urban-gold">{isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
              <div className="relative w-20 lg:w-28 h-1 group cursor-pointer hover:h-2 transition-all duration-200">
                <div className="absolute inset-0 bg-zinc-800 w-full h-full rounded-full"></div>
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-urban-gold to-urban-red rounded-full pointer-events-none" style={{ width: `${displayVolume}%` }}></div>
                <input type="range" min="0" max="100" value={isMuted ? 0 : volume} onChange={(e) => setVolume(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              </div>
            </div>
            <button onClick={() => setIsQueueOpen(!isQueueOpen)} className={`p-2 rounded-lg transition-all ${isQueueOpen ? 'bg-urban-gold text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}><ListMusic size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};