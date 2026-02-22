import React from 'react';
import { Play, Heart, Trash2, ListMusic, Music, Star } from 'lucide-react';
import { PLAYLIST_DATA } from '../data/playlist';

interface FavoritesSectionProps {
  favorites: string[];
  onPlayFavorites: () => void;
  onRemoveFavorite: (id: string) => void;
  onResetGlobal: () => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({ 
  favorites, 
  onPlayFavorites, 
  onRemoveFavorite,
  onResetGlobal
}) => {
  const favoriteSongs = PLAYLIST_DATA.filter(song => favorites.includes(song.id));

  if (favorites.length === 0) return null;

  return (
    <section id="favoritos" className="py-12 bg-zinc-950/50 border-y border-zinc-900 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-urban-red rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                <Heart fill="currentColor" size={24} />
             </div>
             <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white display-font tracking-tight leading-none">
                  MI PERLA <span className="text-urban-gold">MIX</span>
                </h2>
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mt-1">
                  Tu selección personalizada • {favorites.length} temas
                </p>
             </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             <button 
                onClick={onResetGlobal}
                className="flex-1 md:flex-none text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white px-4 py-3 transition-colors"
             >
                Radio Global
             </button>
             <button 
                onClick={onPlayFavorites}
                className="flex-1 md:flex-none bg-urban-gold text-black px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10"
             >
                <Play fill="currentColor" size={16} /> Play Mi Mix
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {favoriteSongs.map((song) => (
             <div 
              key={song.id} 
              className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50 group hover:border-urban-gold/30 transition-all"
             >
                <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded">
                   <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Music size={20} className="text-urban-gold" />
                   </div>
                </div>
                
                <div className="flex-1 min-w-0">
                   <h4 className="text-white font-bold truncate display-font text-lg tracking-wide uppercase leading-tight">{song.title}</h4>
                   <p className="text-zinc-500 text-xs truncate uppercase font-semibold">{song.artist}</p>
                </div>

                <button 
                  onClick={() => onRemoveFavorite(song.id)}
                  className="text-zinc-600 hover:text-urban-red p-2 transition-colors"
                  title="Quitar de favoritos"
                >
                   <Trash2 size={18} />
                </button>
             </div>
           ))}
           
           {/* Decorative Slot for Adding More */}
           <a 
            href="#lanzamientos" 
            className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg p-3 group hover:border-urban-gold/40 transition-all cursor-pointer min-h-[80px]"
           >
              <div className="flex items-center gap-2 text-zinc-600 group-hover:text-urban-gold transition-colors">
                <Star size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Agregar más temas</span>
              </div>
           </a>
        </div>
      </div>
    </section>
  );
};