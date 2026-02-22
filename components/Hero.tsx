import React from 'react';
import { Play, Disc, MapPin, Pause } from 'lucide-react';

interface HeroProps {
  onStartRadio?: () => void;
  isPlaying?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onStartRadio, isPlaying = false }) => {
  
  const scrollToSpotify = () => {
    const section = document.getElementById('ranking');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="inicio" className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-urban-black group scroll-mt-24">
      {/* Background Image with Parallax-like Slow Zoom */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear transform hover:scale-110"
        style={{ backgroundImage: 'url(https://i.imgur.com/dNgPbIo.jpeg)' }}
        aria-label="Pereira Urbano"
      >
        {/* Urban Color Grading - Dark tint for night vibe */}
        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-urban-red/20 mix-blend-overlay"></div>
      </div>
      
      {/* Scanlines Effect for Digital Radio Vibe (TV Style) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-60"></div>

      {/* Main Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-urban-black via-urban-black/60 to-transparent z-[2]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-urban-black/80 via-transparent to-transparent z-[2]"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center z-[10]">
        <div className="container mx-auto px-4 md:px-8 pt-10">
          <div className="max-w-4xl relative">
            
            {/* Location Tag */}
             <div className="inline-flex items-center gap-2 mb-6 border-l-4 border-urban-gold bg-black/60 backdrop-blur-md px-4 py-2 rounded-r-sm animate-in slide-in-from-left duration-700">
               <MapPin size={14} className="text-urban-red" />
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                 Pereira <span className="text-urban-gold">///</span> Capital del Eje
               </span>
            </div>

            {/* Main Title with Pereira Colors & Glitch Effect */}
            <h1 className="relative text-7xl md:text-9xl font-bold mb-6 display-font uppercase leading-[0.85] tracking-tighter drop-shadow-xl animate-in slide-in-from-bottom-8 duration-1000">
              <span className="text-urban-gold block radio-glitch" data-text="LA PERLA">LA PERLA</span> 
              <span className="text-urban-red relative block radio-glitch" data-text="RADIO">
                RADIO
                {/* Decorative underline */}
                <svg className="absolute -bottom-4 left-0 w-32 h-3 text-urban-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-zinc-200 text-lg md:text-2xl mb-10 max-w-xl font-light leading-relaxed animate-in slide-in-from-bottom-10 duration-1000 delay-200">
              Transmitiendo la cultura desde el corazón del Eje. 
              El sonido que define nuestras calles, <span className="text-urban-gold font-semibold">sin censura</span> y <span className="text-urban-gold font-semibold">sin pausa</span>.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 animate-in fade-in duration-1000 delay-300">
              <button 
                onClick={onStartRadio}
                className={`${isPlaying ? 'bg-zinc-800 text-urban-gold border border-urban-gold/50' : 'bg-urban-red text-white shadow-[0_0_30px_rgba(218,41,28,0.4)]'} px-10 py-4 font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center gap-3 clip-path-slant`}
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                {isPlaying ? 'Escuchando...' : 'Play Radio'}
              </button>
              
              <button 
                onClick={scrollToSpotify}
                className="px-10 py-4 border-2 border-urban-gold text-urban-gold font-bold uppercase tracking-widest hover:bg-urban-gold hover:text-black transition-all backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  <Disc size={18} className={`animate-spin-slow ${isPlaying ? '' : 'animation-pause'}`} /> Playlist Oficial
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-urban-black to-transparent z-[5]"></div>
    </div>
  );
};